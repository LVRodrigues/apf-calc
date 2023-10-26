import { HttpClient } from '@angular/common/http';
import { ThisReceiver } from '@angular/compiler';
import { Injectable } from '@angular/core';
import * as forge from 'node-forge';
import { blob } from 'stream/consumers';

const KEYSTORE_KEY  = 'apfcalc';
const KEYSTORE_URL = './assets/apf-calc.p12';

@Injectable({
    providedIn: 'root'
})
export class SignerService {

    private privateKey: any;
    private publicKey: any;

    constructor(private http: HttpClient) {
        this.http.get(KEYSTORE_URL, { responseType: 'blob' }).subscribe(res => {
            const reader = new FileReader();
            reader.onloadend = () => {
                const buffer    = reader.result?.toString()!;
                const keystore  = forge.asn1.fromDer(buffer);
                const p12       = forge.pkcs12.pkcs12FromAsn1(keystore, KEYSTORE_KEY);
                // const bags      = p12.getBags({friendlyName: 'apf-calc.lvrodrigues.github.io'});
                // const bags      = p12.getBags({bagType: forge.pki.oids['keyBag']});
                const bags      = p12.getBags({bagType: forge.pki.oids['pkcs8ShroudedKeyBag']});
                console.log(bags);
                let keybag = bags[forge.pki.oids.pkcs8ShroudedKeyBag][0];
                // const bag = bags[forge.pki.oids['keyBag']][0];
                // const key = bag.key;
                // this.privateKey = p12.safeContents[0].safeBags[0].attributes.localKeyId[0];
                // this.publicKey  = p12.safeContents[0].safeBags[0].cert?.publicKey;
            }
            reader.readAsBinaryString(res);
        });
    }

    sign(data: string): string {
        const digester = forge.md.sha256.create();
        digester.update(data);
        const signed = this.privateKey.sign(data);
        return forge.util.encode64(signed);
    }

    verify (data: string, signature: string): boolean {
        const decoded = forge.util.encode64(signature);
        return this.publicKey.verify(data, decoded);
    }
}
