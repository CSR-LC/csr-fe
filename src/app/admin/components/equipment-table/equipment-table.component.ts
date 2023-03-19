import { Component, ChangeDetectionStrategy, ViewChild, Input, AfterViewInit, OnInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { Equipment } from '@app/catalog/models/equipment';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'lc-equipment-table',
  templateUrl: './equipment-table.component.html',
  styleUrls: ['./equipment-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EquipmentTableComponent implements OnInit, AfterViewInit {
  @Input() equipments!: Equipment[] | null;
  displayedColumns: string[] = ['inventoryNumber', 'name', 'name_substring', 'category', 'status', 'buttons'];
  dataSource!: MatTableDataSource<Equipment>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngOnInit() {
    this.dataSource = new MatTableDataSource(this.equipments ? this.equipments : []);
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
}
