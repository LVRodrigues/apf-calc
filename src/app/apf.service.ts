import { Injectable } from '@angular/core';
import { Project } from './model/project';
import { Module } from './model/module';
import { FunctionAIE, FunctionALI, FunctionCE, FunctionEE, FunctionSE } from './model/function';

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
        fun1.der = [
            { id: 1, name: 'id', description: undefined },
            { id: 2, name: 'nome', description: undefined },
            { id: 3, name: 'email', description: undefined },
            { id: 4, name: 'endereco', description: undefined },
            { id: 5, name: 'telefone', description: undefined },
            { id: 6, name: 'cpf', description: undefined }
        ];
        fun1.rlr = [
            { id: 1, name: 'Usuário', description: undefined}
        ];
        mod1.functions.push(fun1);

        let fun2 = new FunctionAIE();
        fun2.id = 2;
        fun2.name = 'LDAP';
        fun2.description = 'Informações de Usuários do Externos';
        fun2.der = [
            { id: 1, name: 'id', description: undefined },
            { id: 2, name: 'nome', description: undefined },
            { id: 3, name: 'email', description: undefined }
        ];
        fun2.rlr = [
            { id: 1, name: 'Usuário', description: undefined },
            { id: 2, name: 'Fornecedor', description: undefined },
            { id: 3, name: 'Autônome', description: undefined },
            { id: 4, name: 'Visitante', description: undefined }
        ];
        mod1.functions.push(fun2);

        let fun3 = new FunctionCE();
        fun3.id = 3;
        fun3.name = 'Consultar Usuários';
        fun3.description = 'Consultar Usuários e LDAP';
        fun3.datas.push(fun1);
        fun3.datas.push(fun2);
        mod1.functions.push(fun3);

        let fun4 = new FunctionALI();
        fun4.id = 4;
        fun4.name = 'Fornecedor';
        fun4.description = 'Teste de fonecimento e CRUD';
        fun4.der = [
            { id: 1, name: 'id', description: undefined },
            { id: 2, name: 'nome', description: undefined },
            { id: 3, name: 'email', description: undefined }
        ]        
        mod1.functions.push(fun4);

        let fun5 = new FunctionCE();
        fun5.id = 5;
        fun5.name = 'Consultar Fornecedor';
        fun5.description = 'Consultar Fonecedor do banco de dados';
        fun5.datas.push(fun4);
        mod1.functions.push(fun5);

        let fun6 = new FunctionEE();
        fun6.id = 6;
        fun6.name = 'Incluir Fornecedor';
        fun6.description = 'Incluir Fonecedor do banco de dados';
        fun6.datas.push(fun4);
        mod1.functions.push(fun6);

        let fun7 = new FunctionEE();
        fun7.id = 7;
        fun7.name = 'Alterar Fornecedor';
        fun7.description = 'Alterar Fonecedor do banco de dados';
        fun7.datas.push(fun4);
        mod1.functions.push(fun7);

        let fun8 = new FunctionEE();
        fun8.id = 8;
        fun8.name = 'Excluir Fornecedor';
        fun8.description = 'Excluir Fonecedor do banco de dados';
        fun8.datas.push(fun4);
        mod1.functions.push(fun8);

        let fun9 = new FunctionSE();
        fun9.id = 9;
        fun9.name = 'Relatório';
        fun9.description = 'Relatório consolidado';
        fun9.datas.push(fun1);
        fun9.datas.push(fun2);
        fun9.datas.push(fun4);
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
}
