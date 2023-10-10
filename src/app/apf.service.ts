import { Injectable } from '@angular/core';
import { Project } from './model/project';
import { Module } from './model/module';
import { Function, FunctionAIE, FunctionALI, FunctionCE, FunctionData, FunctionEE, FunctionSE, FunctionTransaction } from './model/function';
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

    fromXML(xml: string): void {
        const parser    = new DOMParser();
        const document  = parser.parseFromString(xml, "text/xml");
        if (document.documentElement.nodeName !== XML_PROJECT) {
            throw Error('XML não é um projeto de Análise de Pontos de Função.');
        }
        const project   = new Project();
        const nodes     = document.documentElement.children;
        for (let i = 0; i < nodes.length; i++) {
            const node = nodes[i];
            switch (nodes[i].nodeName) {
                case XML_NAME: 
                    project.name = node.textContent!;
                    break;
                case XML_DESCRIPTION:
                    project.description = node.textContent!;
                    break;
                case XML_RESPONSIBLE:
                    project.responsible = node.textContent!;
                    break;
                case XML_DATE:
                    project.date = new Date(node.textContent!);
                    break;
                case XML_VERSION:
                    project.version = +node.textContent!;
                    break;
                case XML_MODULES:
                    this.fromXMLModules(project, node.children);
                    break;
            }
        }
        this.project = project;
    }

    fromXMLModules(project: Project, modules: HTMLCollection) {
        for (let i = 0; i < modules.length; i++) {
            const module = new Module();
            const nodes = modules[i].children;
            for (let j = 0; j < nodes.length; j++) {
                const node = nodes[j];
                switch (node.nodeName) {
                    case XML_ID:
                        module.id = +node.textContent!;
                        break;
                    case XML_NAME:
                        module.name = node.textContent!;
                        break;
                    case XML_DESCRIPTION:
                        module.description = node.textContent!;
                        break;
                    case XML_FUNCTIONS:
                        this.fromXMLFunctions(module, node.children);
                        break;
                }
            }
            project.modules.push(module);
        }
    }

    fromXMLFunctions(module: Module, functions: HTMLCollection) {
        for (let i = 0; i < functions.length; i++) {
            const text = functions[i].getAttribute(XML_TYPE);
            const type = FunctionType[text as keyof typeof FunctionType];
            let func;
            switch (type) {
                case FunctionType.ALI:
                    func = new FunctionALI();
                    this.fromXMLFunctionsData(func, functions[i].children);
                    break;
                case FunctionType.AIE:
                    func = new FunctionAIE();
                    this.fromXMLFunctionsData(func, functions[i].children);
                    break;
                case FunctionType.CE:
                    func = new FunctionCE();
                    this.fromXMLFunctionsTransaction(func, functions[i].children, module);
                    break;
                case FunctionType.EE:
                    func = new FunctionEE();
                    this.fromXMLFunctionsTransaction(func, functions[i].children, module);
                    break;
                case FunctionType.SE:
                    func = new FunctionSE();
                    this.fromXMLFunctionsTransaction(func, functions[i].children, module);
                    break;
            }
            module.functions.push(func);
        }
    }

    fromXMLFunctionsData(func: FunctionData, nodes: HTMLCollection) {
        for (let i = 0; i < nodes.length; i++) {
            const node = nodes[i];
            switch (node.nodeName) {
                case XML_DERS:
                    this.fromXMLFunctionsDatas(func.ders, node.children);
                    break;
                case XML_RLRS:
                    this.fromXMLFunctionsDatas(func.rlrs, node.children);
                    break;
                default:
                    this.fromXMLFunctionsBase(func, node);
            }
        }
    }

    fromXMLFunctionsBase(func: Function, node: Element) {
        switch (node.nodeName) {
            case XML_ID:
                func.id = +node.textContent!;
                break;
            case XML_NAME:
                func.name = node.textContent!;
                break;
            case XML_DESCRIPTION:
                func.description = node.textContent!;
                break;
        }
    }

    fromXMLFunctionsDatas(datas: Data[], nodes: HTMLCollection) {
        for (let i = 0; i < nodes.length; i++) {
            const data = new Data();
            for (let j = 0; j < nodes[i].children.length; j++) {
                const node = nodes[i].children[j];
                switch (node.nodeName) {
                    case XML_ID:
                        data.id = +node.textContent!;
                        break;
                    case XML_NAME:
                        data.name = node.textContent!;
                        break;
                    case XML_DESCRIPTION:
                        data.description = node.textContent!;
                        break;
                }
            }
            datas.push(data);
        }
    }

    fromXMLFunctionsTransaction(func: FunctionTransaction, nodes: HTMLCollection, module: Module) {
        for (let i = 0; i < nodes.length; i++) {
            const node = nodes[i];
            switch (node.nodeName) {
                case XML_DERS:
                    this.fromXMLFunctionsDatas(func.ders, node.children);
                    break;
                case XML_ALRS:
                    this.fromXMLFunctionsALRs(func.alrs, node.children, module);
                    break;
                default:
                    this.fromXMLFunctionsBase(func, node);
            }
        }
    }

    fromXMLFunctionsALRs(datas: FunctionData[], nodes: HTMLCollection, module: Module) {
        for (let i = 0; i < nodes.length; i++) {
            const id = +nodes[i].getAttribute(XML_ID)!;
            let data = module.function(id);
            if (data instanceof FunctionData) {
                datas.push(data);
            }
        }
    }
}
