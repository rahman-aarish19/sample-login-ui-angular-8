import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AuthenticationService, AlertService } from './_services';
import { User } from './_models';

import './_content/app.less';
import { AuditService } from './_services/audit.service';

@Component({ selector: 'app', templateUrl: 'app.component.html' })
export class AppComponent {
    currentUser: User;

    constructor(
        private router: Router,
        private authenticationService: AuthenticationService,
        private _auditService: AuditService,
        private alertService: AlertService
    ) {
        this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
        if (this.authenticationService.currentUserValue && !this.authenticationService.currentUserValue.isAuditor) {
            console.log(this.authenticationService.currentUserValue.isAuditor);

            this.router.navigate(['/']);
        }
    }

    login() {
        this.router.navigate(['/login']);
    }

    registr() {
        this.router.navigate(['/register']);
    }

    logout() {

        const payload = {
            token: JSON.parse(localStorage.getItem('currentUser'))['token'],
            loggedOutAt: Math.floor(Date.now())
        }

        this._auditService.createAudit(payload).subscribe(
            data => {
                this.authenticationService.logout();
                this.router.navigate(['/login']);
            },
            err => {
                this.alertService.error(err);
                this.authenticationService.logout();
                this.router.navigate(['/login']);
            }
        );
    }
}