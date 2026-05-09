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
    address: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
    status: new FormControl(true, [Validators.required]),
  });

  onSubmit() {
    if (this.clientForm.valid) {
      this.clientService.addClient({
        name: this.clientForm.value.name!,
        address: this.clientForm.value.address!,
        password: this.clientForm.value.password!,
        status: this.clientForm.value.status!,
      });
      this.router.navigate(['/clients']);
    }
  }
}
