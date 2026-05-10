import { Component, inject, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { MovementService } from '../../../services/movement.service';
import { BackButton } from '../../../components/back-button/back-button';

@Component({
  selector: 'app-edit-movement',
  imports: [ReactiveFormsModule, BackButton],
  templateUrl: './edit-movement.html',
  styleUrl: './edit-movement.css',
})
export class EditMovement implements OnInit {
  private movementService = inject(MovementService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  private id!: number;

  movementForm = new FormGroup({
    date: new FormControl('', [Validators.required]),
    movementType: new FormControl('', [Validators.required]),
    amount: new FormControl<number | null>(null, [Validators.required]),
    balance: new FormControl<number | null>(null, [Validators.required]),
  });

  ngOnInit() {
    this.id = Number(this.route.snapshot.paramMap.get('id'));
    this.movementService.getMovementById(this.id).subscribe(movement => {
      this.movementForm.setValue({
        date: movement.date,
        movementType: movement.movementType,
        amount: movement.amount,
        balance: movement.balance,
      });
    });
  }

  onSubmit() {
    if (this.movementForm.valid) {
      this.movementService.updateMovement(this.id, {
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
