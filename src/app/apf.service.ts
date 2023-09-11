import { Injectable } from '@angular/core';
import { Project } from './model/project';
import { Module } from './model/module';
import { FunctionAIE, FunctionALI, FunctionCE } from './model/function';

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
        this.project.modules.push(mod1);

        let fun1 = new FunctionALI();
        fun1.id = 1;
        fun1.name = 'Usuários';
        fun1.description = 'Informações de Usuários do Sistema';
        fun1.datas = [
            { id: 1, name: 'id', description: undefined },
            { id: 2, name: 'nome', description: undefined },
            { id: 3, name: 'email', description: undefined },
            { id: 4, name: 'endereco', description: undefined },
            { id: 5, name: 'telefone', description: undefined },
            { id: 6, name: 'cpf', description: undefined }
        ]
        mod1.functions.push(fun1);

        let fun2 = new FunctionAIE();
        fun2.id = 2;
        fun2.name = 'LDAP';
        fun2.description = 'Informações de Usuários do Externos';
        fun2.datas = [
            { id: 1, name: 'id', description: undefined },
            { id: 2, name: 'nome', description: undefined },
            { id: 3, name: 'email', description: undefined }
        ]
        mod1.functions.push(fun2);

        let fun3 = new FunctionCE();
        fun3.id = 3;
        fun3.name = 'Consultar';
        fun3.description = 'Consultar Usuários e LDAP';
        fun3.datas.push(fun1);
        fun3.datas.push(fun2);
        mod1.functions.push(fun3);

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
