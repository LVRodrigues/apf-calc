import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDividerModule } from '@angular/material/divider';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog';
import { MatRadioModule } from '@angular/material/radio';
import { MatChipsModule } from '@angular/material/chips';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatListModule } from '@angular/material/list';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';

import { NgxEchartsModule } from 'ngx-echarts';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './home/home.component';
import { MenuComponent } from './menu/menu.component';
import { PropertiesComponent } from './properties/properties.component';
import { ModulesComponent } from './modules/modules.component';
import { ModuleDialogComponent } from './modules/module-dialog/module-dialog.component';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';
import { FunctionWizardComponent } from './modules/function-wizard/function-wizard.component';
import { ModuleGraphComponent } from './modules/module-graph/module-graph.component';
import { FunctionsListComponent } from './modules/functions-list/functions-list.component';
import { FunctionEditDataComponent } from './modules/function-edit-data/function-edit-data.component';
import { EditDataDialogComponent } from './modules/edit-data-dialog/edit-data-dialog.component';
import { FunctionEditTransactionComponent } from './modules/function-edit-transaction/function-edit-transaction.component';

@NgModule({
    declarations: [
        AppComponent,
        HeaderComponent,
        FooterComponent,
        HomeComponent,
        MenuComponent,
        PropertiesComponent,
        ModulesComponent,
        ModuleDialogComponent,
        ConfirmDialogComponent,
        FunctionWizardComponent,
        ModuleGraphComponent,
        FunctionsListComponent,
        FunctionEditDataComponent,
        EditDataDialogComponent,
        FunctionEditTransactionComponent,
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        MatToolbarModule,
        MatButtonModule,
        MatIconModule,
        MatTooltipModule,
        MatDividerModule,
        MatCardModule,
        MatFormFieldModule,
        MatInputModule,
        FormsModule,
        ReactiveFormsModule,
        MatDialogModule,
        MatRadioModule,
        MatChipsModule,
        MatCheckboxModule,
        MatListModule,
        MatTableModule,
        MatTabsModule,
        NgxEchartsModule.forRoot({
            echarts: () => import('echarts')
        })
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
