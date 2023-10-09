import { Injectable } from '@angular/core';
import { Project } from './model/project';
import { Module } from './model/module';
import { FunctionAIE, FunctionALI, FunctionCE, FunctionData, FunctionEE, FunctionSE, FunctionTransaction } from './model/function';
import { Data } from './model/data';
import { create } from 'xmlbuilder2';
import { FunctionType } from './model/function-type';

const XML_PROJECT       = 'project';
const XML_ID            = 'id';
const XML_NAME          = 'name';
const XML_DESCRIPTION   = 'description';
const XML_RESPONSIBLE   = 'responsible';
const XML_DATE          = 'date';
const XML_VERSION       = 'version';
const XML_TYPE          = 'type';
const XML_DERS          = 'ders';
const XML_DER           = 'der';
const XML_RLRS          = 'rlrs';
const XML_RLR           = 'rlr';
const XML_MODULES       = 'modules';
const XML_MODULE        = 'module';
const XML_FUNCTIONS     = 'functions';
const XML_FUNCTION      = 'function';
const XML_ALRS          = 'alrs';
const XML_ALR           = 'alr';

@Injectable({
    providedIn: 'root'
})
export class ApfService {

    project!: Project;

    constructor() {
        this.project = new Project();
        this.project.name = 'Auto Exemplo';
        this.project.description = 'Exemplo criado automaticamente para teste';
        this.project.responsible = 'Luciano Vieira Rodrigues';

        let mod1 = new Module();
        mod1.id = 1;
        mod1.name = 'Primeiro'
        mod1.description = 'A descrição ficou longa para verificar o comportoamento do componente redimensionando-se automaticamente.';
        this.project.modules.push(mod1);

        let fun1 = new FunctionALI();
        fun1.id = 1;
        fun1.name = 'Usuários';
        fun1.description = 'Informações de Usuários do Sistema';
        fun1.ders = [
            { id: 1, name: 'id', description: undefined },
            { id: 2, name: 'nome', description: undefined },
            { id: 3, name: 'email', description: undefined },
            { id: 4, name: 'endereco', description: undefined },
            { id: 5, name: 'telefone', description: undefined },
            { id: 6, name: 'cpf', description: undefined }
        ];
        fun1.rlrs = [
            { id: 1, name: 'Usuário', description: undefined}
        ];
        mod1.functions.push(fun1);

        let fun2 = new FunctionAIE();
        fun2.id = 2;
        fun2.name = 'LDAP';
        fun2.description = 'Informações de Usuários do Externos';
        fun2.ders = [
            { id: 1, name: 'id', description: undefined },
            { id: 2, name: 'nome', description: undefined },
            { id: 3, name: 'email', description: undefined }
        ];
        fun2.rlrs = [
            { id: 1, name: 'Usuário', description: undefined },
            { id: 2, name: 'Fornecedor', description: undefined },
            { id: 3, name: 'Autônome', description: undefined },
            { id: 4, name: 'Visitante', description: undefined },
            { id: 5, name: 'Dependente', description: undefined },
            { id: 6, name: 'Sabotador', description: undefined },
            { id: 7, name: 'Sistema', description: undefined },
        ];
        mod1.functions.push(fun2);

        let fun3 = new FunctionCE();
        fun3.id = 3;
        fun3.name = 'Consultar Usuários';
        fun3.description = 'Consultar Usuários e LDAP';
        fun3.alrs.push(fun1);
        fun3.alrs.push(fun2);
        fun3.ders = [
            { id: 1, name: 'CPF', description: undefined },
            { id: 2, name: 'Nome', description: undefined },
            { id: 3, name: 'Telefone', description: undefined },
            { id: 4, name: 'Email', description: undefined },
            { id: 5, name: 'RG', description: undefined },
            { id: 6, name: 'Apelido', description: undefined },
        ];
        mod1.functions.push(fun3);

        let fun4 = new FunctionALI();
        fun4.id = 4;
        fun4.name = 'Fornecedor';
        fun4.description = 'Teste de fonecimento e CRUD';
        for (let i = 1; i < 60; i++) {
            let der: Data = {
                id: i, 
                name: 'Name__'+i, 
                description: undefined
            };
            fun4.ders.push(der);
        }
        fun4.rlrs = [
            { id: 1, name: 'Fornecedor', description: undefined },
            { id: 2, name: 'Cobrador', description: undefined }
        ];
        mod1.functions.push(fun4);

        let fun5 = new FunctionCE();
        fun5.id = 5;
        fun5.name = 'Consultar Fornecedor';
        fun5.description = 'Consultar Fonecedor do banco de dados';
        fun5.alrs.push(fun4);
        fun5.ders = [
            { id: 1, name: 'CNPJ', description: undefined }
        ];
        mod1.functions.push(fun5);

        let fun6 = new FunctionEE();
        fun6.id = 6;
        fun6.name = 'Incluir Fornecedor';
        fun6.description = 'Incluir Fonecedor do banco de dados';
        fun6.alrs.push(fun4);
        fun6.ders = [
            { id: 1, name: 'CNPJ', description: undefined },
            { id: 2, name: 'Nome', description: undefined}
        ];        
        mod1.functions.push(fun6);

        let fun7 = new FunctionEE();
        fun7.id = 7;
        fun7.name = 'Alterar Fornecedor';
        fun7.description = 'Alterar Fonecedor do banco de dados';
        fun7.alrs.push(fun4);
        fun7.ders = [
            { id: 1, name: 'CNPJ', description: undefined },
            { id: 2, name: 'Nome', description: undefined}
        ];          
        mod1.functions.push(fun7);

        let fun8 = new FunctionEE();
        fun8.id = 8;
        fun8.name = 'Excluir Fornecedor';
        fun8.description = 'Excluir Fonecedor do banco de dados';
        fun8.alrs.push(fun4);
        fun8.ders = [
            { id: 1, name: 'CNPJ', description: undefined },
            { id: 2, name: 'Nome', description: undefined}
        ];          
        mod1.functions.push(fun8);

        let fun9 = new FunctionSE();
        fun9.id = 9;
        fun9.name = 'Relatório';
        fun9.description = 'Relatório consolidado';
        fun9.alrs.push(fun1);
        fun9.alrs.push(fun2);
        fun9.alrs.push(fun4);
        for (let i = 1; i < 25; i++) {
            let der: Data = {
                id: i, 
                name: 'Name__'+i, 
                description: undefined
            };
            fun9.ders.push(der);
        }
        mod1.functions.push(fun9);

        let mod2 = new Module();
        mod2.id = 2;
        mod2.name = 'Segundo';
        this.project.modules.push(mod2);

        let mod3 = new Module();
        mod3.id = 3;
        mod3.name = 'Terceiro';
        this.project.modules.push(mod3);
    }

    toXML(): string {
        const xml = create({version: '1.0', encoding: 'UTF-8', standalone: true});
        const xproject = xml.ele(XML_PROJECT)
                .ele(XML_NAME).txt(this.project.name).up()
                .ele(XML_DESCRIPTION).txt(this.project.description!).up()
                .ele(XML_RESPONSIBLE).txt(this.project.responsible!).up()
                .ele(XML_DATE).txt(this.project.date.toUTCString()).up()
                .ele(XML_VERSION).txt(this.project.version.toString()).up();
        const xmodules = xproject.ele(XML_MODULES);
        this.project.modules.forEach(module => {
            const xmodule = xmodules.ele(XML_MODULE)
                .ele(XML_ID).txt(module.id.toString()).up()
                .ele(XML_NAME).txt(module.name).up()
                .ele(XML_DESCRIPTION).txt(module.description!).up();
            const xfunctions = xmodule.ele(XML_FUNCTIONS);
            module.functions.filter(fun => fun instanceof FunctionData).forEach(func => {
                if (func instanceof FunctionData) {
                    const xfunction = xfunctions.ele(XML_FUNCTION, {type: FunctionType[func.type]})
                        .ele(XML_ID).txt(func.id.toString()).up()
                        .ele(XML_NAME).txt(func.name).up()
                        .ele(XML_DESCRIPTION).txt(func.description!).up();
                    const xders = xfunction.ele(XML_DERS);
                    func.ders.forEach(data => {
                        const xder = xders.ele(XML_DER)
                            .ele(XML_ID).txt(data.id.toString()).up()
                            .ele(XML_NAME).txt(data.name).up()
                            .ele(XML_DESCRIPTION).txt(data.description!).up();
                    });
                    const xrlrs = xfunction.ele(XML_RLRS);
                    func.rlrs.forEach(data => {
                        const xrlr = xrlrs.ele(XML_RLR)
                            .ele(XML_ID).txt(data.id.toString()).up()
                            .ele(XML_NAME).txt(data.name).up()
                            .ele(XML_DESCRIPTION).txt(data.description!).up();                        
                    });
                }
            });
            module.functions.filter(fun => fun instanceof FunctionTransaction).forEach(func => {
                if (func instanceof FunctionTransaction) {
                    const xfunction = xfunctions.ele(XML_FUNCTION, {type: FunctionType[func.type]})
                        .ele(XML_ID).txt(func.id.toString()).up()
                        .ele(XML_NAME).txt(func.name).up()
                        .ele(XML_DESCRIPTION).txt(func.description!).up();
                        const xalrs = xfunction.ele(XML_ALRS);
                        func.alrs.forEach(alr => {
                            xalrs.ele(XML_ALR, {id: alr.id.toString()});
                        });
                        const xders = xfunction.ele(XML_DERS);
                        func.ders.forEach(data => {
                            const xder = xders.ele(XML_DER)
                                .ele(XML_ID).txt(data.id.toString()).up()
                                .ele(XML_NAME).txt(data.name).up()
                                .ele(XML_DESCRIPTION).txt(data.description!).up();
                        });
                }
            });
        });
        return xml.end({prettyPrint: true});
    }
}
