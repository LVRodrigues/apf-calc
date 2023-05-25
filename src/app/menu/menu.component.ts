import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-menu',
    templateUrl: './menu.component.html',
    styleUrls: ['./menu.component.scss']
})
export class MenuComponent {

    constructor(private router: Router) {
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
}
