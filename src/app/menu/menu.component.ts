import { Component } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter, map } from 'rxjs';
import { ApfService } from '../apf.service';
import { Project } from '../model/project';

@Component({
    selector: 'app-menu',
    templateUrl: './menu.component.html',
    styleUrls: ['./menu.component.scss']
})
export class MenuComponent {

    title: string | undefined;

    constructor(
        private router: Router,
        private apf: ApfService,
    ) {
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

    newProject(): void {
        this.apf.project = new Project();
    }
}
