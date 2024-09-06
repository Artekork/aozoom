import { CommonModule } from '@angular/common';
import { booleanAttribute, Component, ElementRef, inject, signal, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import IMask from 'imask';

@Component({
  selector: 'app-cooperation',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './cooperation.component.html',
  styleUrl: './cooperation.component.scss'
})
export class CooperationComponent {
  @ViewChild('phoneInput') phoneInput!: ElementRef;

  ngAfterViewInit() {
    // Apply IMask to the phone input
    const phoneMask = IMask(this.phoneInput.nativeElement, {
      mask: '+{375} (00) 000-00-00',
      lazy: true 
    });
  }

  signalFillForm = signal<boolean>(false);

  submitted: boolean = false;
  fieldTouched = false;

  fb = inject(FormBuilder)

  form = this.fb.group({
    name: this.fb.control("", Validators.required),
    phone: this.fb.control("", [Validators.required, Validators.minLength(19)]),
    email: this.fb.control('', [Validators.required, Validators.email]),
    city: this.fb.control("", Validators.required),
    organization: this.fb.control("", Validators.required),
  })

  // onSubmit() {
  //   this.form.markAllAsTouched();
  //   this.form.updateValueAndValidity();

  //   if (this.form.invalid) {
  //     alert('Form is INVALID');
  //   } else {
  //     alert('Form is VALID');
  //     console.log(this.form.value);
  //   }
  // }

  onSubmit() {
    this.submitted = true;
    if (this.form.valid) {
      // Обработка отправки формы
      console.log('Form data:', this.form.value);
    }
  }
  onFieldChange() {
  }

  // isFillForm(){
  //   let isValid: boolean = true;
  //   if (this.form.value.name.trim('') == ""){
  //     isValid = false;
  //     console.log("Empty 'name' field")
  //   } else {
  //     console.log(`not empry: ${this.form.value.name}`)
  //   }
  //   if (this.form.value.phone.trim('') == ""){
  //     isValid = false;
  //     console.log("Empty 'phone' field")
  //   } else {
  //     console.log(`not empry: ${this.form.value.phone}`)
  //   }
  //   if (this.form.value.email.trim('') == ""){
  //     isValid = false;
  //     console.log("Empty 'email' field")
  //   } else {
  //     console.log(`not empry: ${this.form.value.email}`)
  //   }
  //   if (this.form.value.city.trim('') == ""){
  //     isValid = false;
  //     console.log("Empty 'city' field")
  //   } else {
  //     console.log(`not empry: ${this.form.value.city}`)
  //   }
  //   if (this.form.value.organization.trim('') == ""){
  //     isValid = false;
  //     console.log("Empty 'organization' field")
  //   } else {
  //     console.log(`not empry: ${this.form.value.organization}`)
  //   }
  // } 
  
  formVal = {
    name: "asd",
    phone: "qwe",
    email: "czx",
    city: "234",
    organization: "678",
  }

  patchForm(){
    this.form.patchValue(this.formVal)
  }
}

