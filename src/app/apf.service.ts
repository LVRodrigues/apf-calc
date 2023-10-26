import { Injectable } from '@angular/core';
import { Project } from './model/project';
import { Module } from './model/module';
import { Function, FunctionAIE, FunctionALI, FunctionCE, FunctionData, FunctionEE, FunctionSE, FunctionTransaction } from './model/function';
import { Data } from './model/data';
import { FunctionType } from './model/function-type';
import { SignerService } from './signer.service';

interface IData {
    id: number;
    name: string;
    description?: string;
}

interface IFunction {
    id: number;
    name: string;
    description?: string;
    type: FunctionType;
    ders?: IData[];
    rlrs?: IData[];
    alrs?: number[];
}

interface IModule {
    id: number;
    name: string;
    description?: string;
    functions?: IFunction[];
}

interface IProject {
    name: string;
    description?: string;
    responsible?: string;
    date: Date;
    version: number;
    modules?: IModule[];
}

interface IAPF {
    signature?: string;
    version: number;
    project: IProject;
}

@Injectable({
    providedIn: 'root'
})
export class ApfService {

    project!: Project;

    constructor(private signer: SignerService) {
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

    import(file: string) {
        let json: IAPF = JSON.parse(file);
        this.project = this.importProject(json.project);
    }

    private importProject(project: IProject): Project {
        let result: Project = new Project();
        result.name         = project.name;
        result.description  = project.description;
        result.date         = project.date;
        result.responsible  = project.responsible;
        result.version      = project.version,
        result.modules      = this.importModules(project.modules);
        return result;
    }

    private importModules(modules: IModule[] | undefined): Module[] {
        let result: Module[] = [];
        modules?.forEach(item => {
            let module          = new Module();
            module.id           = item.id;
            module.name         = item.name;
            module.description  = item.description;
            this.importFunctions(module, item.functions);
            result.push(module);
        });
        return result;
    }

    private importFunctions(module: Module, functions: IFunction[] | undefined) {
        functions?.forEach(item => {
            let func: Function;
            switch (item.type) {
                case FunctionType.ALI:
                    func = this.importFunctionsData(new FunctionALI(), item);
                    break;
                case FunctionType.AIE:
                    func = this.importFunctionsData(new FunctionAIE(), item);
                    break;
                case FunctionType.EE:
                    func = this.importFunctionsTransaction(new FunctionEE(), item, module);
                    break;
                case FunctionType.CE:
                    func = this.importFunctionsTransaction(new FunctionCE(), item, module);
                    break;
                case FunctionType.SE:
                    func = this.importFunctionsTransaction(new FunctionSE(), item, module);
                    break;
            }
            module.functions.push(func);
        });
    }

    private importFunctionsTransaction(func: FunctionEE, item: IFunction, module: Module): Function {
        func.id             = item.id;
        func.name           = item.name;
        func.description    = item.description;
        func.ders           = this.importItemData(item.ders);
        func.alrs           = this.importALR(module, item.alrs);
        return func;
    }

    private importALR(module: Module, alrs: number[] | undefined): FunctionData[] {
        let result: FunctionData[] = [];
        alrs?.forEach(alr => {
            let data = module.function(alr);
            if (data instanceof FunctionData) {
                result.push(data);
            }
        });
        return result;
    }

    private importFunctionsData(func: FunctionALI, item: IFunction): Function {
        func.id             = item.id;
        func.name           = item.name;
        func.description    = item.description;
        func.ders           = this.importItemData(item.ders);
        func.rlrs           = this.importItemData(item.rlrs);
        return func;
    }

    private importItemData(datas: IData[] | undefined): Data[] {
        let result: Data[] = [];
        datas?.forEach(item => {
            let data: Data = {
                id: item.id,
                name: item.name,
                description: item.description
            };
            result.push(data);
        })
        return result;
    }

    export(): string {
        let project: IProject = this.exportProject();
        let data: IAPF = {
            version: 1,
            signature: 'assinatura RSA do projeto',
            project: project
        };        
        return JSON.stringify(data);
    }

    private exportProject(): IProject {
        let result: IProject = {
            name: this.project.name,
            description: this.project.description,
            responsible: this.project.responsible,
            date: this.project.date,
            version: this.project.version,
            modules: this.exportModules(this.project.modules)
        };
        return result;
    }

    private exportModules(modules: Module[]): IModule[] | undefined {
        let result: IModule[] = [];
        modules.forEach(item => {
            let module: IModule = {
                id: item.id,
                name: item.name,
                description: item.description,
                functions: this.exportFunctions(item.functions)
            };
            result.push(module);
        });
        return result;
    }

    private exportFunctions(functions: Function[]): IFunction[] | undefined {
        let result: IFunction[] = [];
        functions.filter(f => f instanceof FunctionData).forEach(item => {
            if (item instanceof FunctionData) {
                let func: IFunction = {
                    id: item.id,
                    name: item.name,
                    description: item.description,
                    type: item.type,
                    ders: this.exportItemData(item.ders),
                    rlrs: this.exportItemData(item.rlrs)
                };
                result.push(func);
            }
        });
        functions.filter(f => f instanceof FunctionTransaction).forEach(item => {
            if (item instanceof FunctionTransaction) {
                let func: IFunction = {
                    id: item.id,
                    name: item.name,
                    description: item.description,
                    type: item.type,
                    ders: this.exportItemData(item.ders),
                    alrs: this.exportALRs(item.alrs)
                };
                result.push(func);
            }
        });
        return result;
    }

    private exportALRs(alrs: FunctionData[]): number[] | undefined {
        let result: number[] = [];
        alrs.forEach(item => result.push(item.id) );
        return result;
    }

    private exportItemData(datas: Data[]): IData[] | undefined {
        let result: IData[] = [];
        datas.forEach(item => {
            let data: IData = {
                id: item.id,
                name: item.name,
                description: item.description
            };
            result.push(data);
        })
        return result;
    }
}


