import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-cooperation',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './cooperation.component.html',
  styleUrl: './cooperation.component.scss'
})
export class CooperationComponent {

  form: FormGroup = new FormGroup({
    name: new FormControl(null),
    phone: new FormControl(null),
    email: new FormControl(null),
    city: new FormControl(null),
    organization: new FormControl(null),
  })


  onSubmit(){
    console.log(this.form.value)
  }
}
