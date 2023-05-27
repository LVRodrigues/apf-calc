import { Component } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter, map } from 'rxjs';
import { ApfService } from '../apf.service';
import { Project } from '../model/project';
import { Module } from '../model/module';
import { MatDialog } from '@angular/material/dialog';
import { ModuleDialogComponent } from '../modules/module-dialog/module-dialog.component';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';

@Component({
    selector: 'app-menu',
    templateUrl: './menu.component.html',
    styleUrls: ['./menu.component.scss']
})
export class MenuComponent {

    title: string | undefined;

    private opened: boolean;

    constructor(
        private router: Router,
        private apf: ApfService,
        private dialog: MatDialog,
    ) {
        this.opened = false;
        this.router.events
            .pipe(
                filter((event: any) => event instanceof NavigationEnd),
                map(() => {
                    let route: ActivatedRoute = this.router.routerState.root;
                    let title = '';
                    while (route!.firstChild) {
                        route = route.firstChild;
                    }
                    if (route.snapshot.data['title']) {
                        title = route!.snapshot.data['title'];
                    }
                    return title;
                })
            )
            .subscribe((title: string) => {
                this.title = title;
            });
    }

    isHome(): boolean {
        return this.router.url === '/home';
    }

    showHome(): void {
        this.router.navigate(['/']);
    }

    isProperties(): boolean {
        return this.router.url === '/properties';
    }

    showProperties(): void {
        this.router.navigate(['/properties']);
    }

    isModules(): boolean {
        return this.router.url === '/modules';
    }

    showModules(): void {
        this.router.navigate(['/modules']);
    }

    newModule(): void {
        if (!this.opened) {
            this.opened = true;
            let module = new Module();
            const dialogRef = this.dialog.open(ModuleDialogComponent, {
                data: module,
                maxHeight: '100%',
                width: '540px',
                maxWidth: '100%',
                disableClose: false,
                hasBackdrop: true
            });
            dialogRef.afterClosed().subscribe((data: Module) => {
                if (data) {
                    data.id = this.apf.project.modules.length + 1;
                    this.apf.project.modules.push(data);
                }
                this.opened = false;
            });
        }
    }

    newProject(): void {
        if (!this.opened) {
            this.opened = true;
            const dialogRef = this.dialog.open(ConfirmDialogComponent, {
                data: {
                    title: 'Novo Projeto',
                    question: 'Isso apagará as funções analisadas atualmente. Deseja realmente iniciar um novo projeto?',
                },
                maxHeight: '100%',
                width: '440px',
                maxWidth: '100%',
                disableClose: false,
                hasBackdrop: true
            });
            dialogRef.afterClosed().subscribe((result: boolean) => {
                if (result) {
                    this.apf.project = new Project();
                    this.showHome();
                }
                this.opened = false;
            });
        }
    }
}
