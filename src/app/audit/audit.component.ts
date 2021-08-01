import { AuditService } from '@/_services/audit.service';
import { Component, OnInit } from '@angular/core';
import { AlertService } from '@/_services';

@Component({ templateUrl: 'audit.component.html' })
export class AuditComponent implements OnInit {
    datasource = [];
    page = 1;
    count = 0;
    tableSize = 7;
    tableSizes = [3, 6, 9, 12];

    constructor(
        private _auditService: AuditService,
        private alertService: AlertService
    ) { }

    ngOnInit() {
        this.getAll();
    }

    private getAll() {
        this._auditService.getAll().subscribe(data => {
            this.datasource = data;
        }, err => {
            this.alertService.error(err);
        })
    }

    onTableDataChange(event) {
        this.page = event;
        this.getAll();
    }

    onTableSizeChange(event): void {
        this.tableSize = event.target.value;
        this.page = 1;
        this.getAll();
    }

}