import { Component, inject } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MovementService } from '../../../services/movement.service';
import { BackButton } from '../../../components/back-button/back-button';

@Component({
  selector: 'app-create-movements',
  imports: [ReactiveFormsModule, BackButton],
  templateUrl: './create-movements.html',
  styleUrl: './create-movements.css',
})
export class CreateMovements {
  private movementService = inject(MovementService);
  private router = inject(Router);

  movementForm = new FormGroup({
    date: new FormControl('', [Validators.required]),
    movementType: new FormControl('', [Validators.required]),
    amount: new FormControl<number | null>(null, [Validators.required]),
    balance: new FormControl<number | null>(null, [Validators.required]),
  });

  onSubmit() {
    if (this.movementForm.valid) {
      this.movementService.addMovement({
        date: this.movementForm.value.date!,
        movementType: this.movementForm.value.movementType!,
        amount: this.movementForm.value.amount!,
        balance: this.movementForm.value.balance!,
      }).subscribe(() => {
        this.router.navigate(['/movements']);
      });
    }
  }
}
