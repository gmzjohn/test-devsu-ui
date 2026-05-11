import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Column } from './types';
import { EditButton } from '../edit-button/edit-button';
import { DeleteButton } from '../delete-button/delete-button';

@Component({
  selector: 'app-dynamic-table',
  standalone: true,
  imports: [EditButton, DeleteButton, FormsModule],
  templateUrl: './table.html',
  styleUrls: ['./table.css'],
})
export class Table<T extends object> {
  @Input() columns: Column<T>[] = [];
  @Input() data: T[] = [];
  @Input({ required: true }) trackByKey!: keyof T;
  @Input() searchKey?: keyof T;
  @Output() onEdit = new EventEmitter<number>();
  @Output() onDelete = new EventEmitter<number>();

  searchTerm = '';

  get filteredData(): T[] {
    if (!this.searchKey || !this.searchTerm.trim()) {
      return this.data;
    }
    const term = this.searchTerm.trim().toLowerCase();
    return this.data.filter(row =>
      String(row[this.searchKey!]).toLowerCase().includes(term)
    );
  }
}
