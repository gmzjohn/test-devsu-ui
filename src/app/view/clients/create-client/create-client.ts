import { Component, inject } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ClientService } from '../../../services/client.service';
import { BackButton } from '../../../components/back-button/back-button';

@Component({
  selector: 'app-create-client',
  imports: [ReactiveFormsModule, BackButton],
  templateUrl: './create-client.html',
  styleUrls: ['./create-client.css'],
})
export class CreateClient {
  private clientService = inject(ClientService);
  private router = inject(Router);

  clientForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    gender: new FormControl('', [Validators.required]),
    age: new FormControl<number | null>(null, [Validators.required, Validators.min(0)]),
    identification: new FormControl('', [Validators.required]),
    address: new FormControl('', [Validators.required]),
    phoneNumber: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
    status: new FormControl(true, [Validators.required]),
  });

  onSubmit() {
    if (this.clientForm.valid) {
      this.clientService.addClient({
        name: this.clientForm.value.name!,
        gender: this.clientForm.value.gender!,
        age: this.clientForm.value.age!,
        identification: this.clientForm.value.identification!,
        address: this.clientForm.value.address!,
        phoneNumber: this.clientForm.value.phoneNumber!,
        password: this.clientForm.value.password!,
        status: this.clientForm.value.status!,
      });
      this.router.navigate(['/clients']);
    }
  }
}
