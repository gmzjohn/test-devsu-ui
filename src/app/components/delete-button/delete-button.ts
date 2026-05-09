import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-delete-button',
  imports: [],
  templateUrl: './delete-button.html',
  styleUrl: './delete-button.css',
})
export class DeleteButton {
  @Output() delete = new EventEmitter<void>();

  onClick() {
    this.delete.emit();
  }
}
