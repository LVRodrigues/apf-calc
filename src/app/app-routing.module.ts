import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { PropertiesComponent } from './properties/properties.component';
import { ModulesComponent } from './modules/modules.component';
import { ModuleGraphComponent } from './modules/module-graph/module-graph.component';
import { FunctionsListComponent } from './modules/functions-list/functions-list.component';

const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', component: HomeComponent, data: { title: 'Início' } },
    { path: 'properties', component: PropertiesComponent, data: { title: 'Propriedades' } },
    { path: 'modules', component: ModulesComponent, data: { title: 'Módulos' } },
    { path: 'module-graph', component: ModuleGraphComponent, data: { title: 'Detalhes do Módulo'} },
    { path: 'functions-list', component: FunctionsListComponent, data: { title: 'Lista de Funções'} },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
