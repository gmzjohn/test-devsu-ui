import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-edit-button',
  standalone: true,
  imports: [],
  templateUrl: './edit-button.html',
  styleUrl: './edit-button.css',
})
export class EditButton {
  @Output() edit = new EventEmitter<void>();

  onClick() {
    this.edit.emit();
  }
}
