import { Component, Input } from '@angular/core';
import { Column } from './types';
import { EditButton } from '../edit-button/edit-button';
import { DeleteButton } from '../delete-button/delete-button';

@Component({
  selector: 'app-dynamic-table',
  standalone: true,
  imports: [EditButton, DeleteButton],
  templateUrl: './table.html',
  styleUrls: ['./table.css'],
})
export class Table<T extends object> {
  @Input() columns: Column<T>[] = [];
  @Input() data: T[] = [];
  @Input({ required: true }) trackByKey!: keyof T;
}
