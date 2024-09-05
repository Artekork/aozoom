import { booleanAttribute, Component, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-cooperation',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './cooperation.component.html',
  styleUrl: './cooperation.component.scss'
})
export class CooperationComponent {

  signalFillForm = signal<boolean>(false);

  form: FormGroup = new FormGroup({
    name: new FormControl(""),
    phone: new FormControl(""),
    email: new FormControl(""),
    city: new FormControl(""),
    organization: new FormControl(""),
  })

  isFillForm(){
    let isValid: boolean = true;
    if (this.form.value.name.trim('') == ""){
      isValid = false;
      console.log("Empty 'name' field")
    } else {
      console.log(`not empry: ${this.form.value.name}`)
    }
    if (this.form.value.phone.trim('') == ""){
      isValid = false;
      console.log("Empty 'phone' field")
    } else {
      console.log(`not empry: ${this.form.value.phone}`)
    }
    if (this.form.value.email.trim('') == ""){
      isValid = false;
      console.log("Empty 'email' field")
    } else {
      console.log(`not empry: ${this.form.value.email}`)
    }
    if (this.form.value.city.trim('') == ""){
      isValid = false;
      console.log("Empty 'city' field")
    } else {
      console.log(`not empry: ${this.form.value.city}`)
    }
    if (this.form.value.organization.trim('') == ""){
      isValid = false;
      console.log("Empty 'organization' field")
    } else {
      console.log(`not empry: ${this.form.value.organization}`)
    }
  } 

  onSubmit(){
    alert("active")
    //console.log(this.form.value)
  }



}

