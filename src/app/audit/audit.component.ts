import { AuditService } from '@/_services/audit.service';
import { Component, OnInit } from '@angular/core';

@Component({ templateUrl: 'audit.component.html' })
export class AuditComponent implements OnInit {
    datasource = [];
    page = 1;
    count = 0;
    tableSize = 7;
    tableSizes = [3, 6, 9, 12];

    constructor(private _auditService: AuditService) { }

    ngOnInit() {
        this.getAll();
    }

    private getAll() {
        this._auditService.getAll().subscribe(data => {
            this.datasource = data; console.log(data)
        }, err => { console.error(err); })
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