import { Component, inject, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ClientService } from '../../../services/client.service';
import { BackButton } from '../../../components/back-button/back-button';

@Component({
  selector: 'app-edit-client',
  imports: [ReactiveFormsModule, BackButton],
  templateUrl: './edit-client.html',
  styleUrl: './edit-client.css',
})
export class EditClient implements OnInit {
  private clientService = inject(ClientService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  private id!: number;

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

  ngOnInit() {
    this.id = Number(this.route.snapshot.paramMap.get('id'));
    const client = this.clientService.getClientById(this.id);
    if (client) {
      this.clientForm.setValue({
        name: client.name,
        gender: client.gender,
        age: client.age,
        identification: client.identification,
        address: client.address,
        phoneNumber: client.phoneNumber,
        password: client.password,
        status: client.status,
      });
    }
  }

  onSubmit() {
    if (this.clientForm.valid) {
      this.clientService.updateClient(this.id, {
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
