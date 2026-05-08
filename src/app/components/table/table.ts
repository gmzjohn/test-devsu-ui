import { Component, Input } from '@angular/core';
import { Column } from './types';

@Component({
  selector: 'app-dynamic-table',
  standalone: true,
  templateUrl: './table.html',
  styleUrls: ['./table.css'],
})
export class Table<T extends object> {
  @Input() columns: Column<T>[] = [];
  @Input() data: T[] = [];
  @Input({ required: true }) trackByKey!: keyof T;
}
