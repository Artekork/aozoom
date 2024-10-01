//test.component.ts
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AccountService } from '../../../app/data/services/account.service';
import { Account } from '../../../app/data/interfaces/account';
import { Token } from '@angular/compiler';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-test',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './test.component.html',
  styleUrl: './test.component.scss'
})
export class TestComponent{

  accountServices = inject(AccountService);
  fb = inject(FormBuilder)


  form = this.fb.group({
    email: this.fb.control('', [Validators.required, Validators.email]),
    password: this.fb.control("", Validators.required),
  })

  constructor(private cookieService: CookieService) {
  }

  
  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    
  }

  //accounts method
  onSubmit() {
    if (this.form.valid) {
      
    } else {
      console.log('Invalid data');
    }
  }


  onSubmit1(){
    this.accountServices.registerUser( this.form.value ).subscribe(val => {
      console.log(val);
    });
  }

  onSubmit2(){
    this.accountServices.login(this.form.value).subscribe(response => {
      const token = response.token;
      if (token) {
        this.accountServices.setToken(token); // Сохраняем токен в куки
        console.log('Login successful');
        // Логика после успешного входа (например, перенаправление)
      } else {
        console.log('Login failed');
      }
    }, error => {
      console.log('Error:', error);
    });
  }

  onSubmit3(){
    this.accountServices.getUserInfo().subscribe(val => {
      console.log(val);
    });
  }

  onSubmit4(){
    this.accountServices.logout();
  }

  onSubmit5(){
    console.log( this.accountServices.isLoggedIn())
  }

 onSubmit6(){
  let userInfo = {
    photo: "a",
    email: 'a@a'
  }

  this.accountServices.updateInfo(userInfo).subscribe(
    (response) => {
      console.log('User info updated:', response); // Успешное обновление
    },
    (error) => {
      console.error('Error updating user info:', error); // Обработка ошибок
    }
  );
}



  // onSubmit() {
  //   if (this.form.valid) {
  //     try {
  //       // Обработка отправки формы
  //       console.log('Данные формы' + this.form.value)

  //       // this.accountServices.registerUser( this.form.value ).subscribe(val => {
  //       //   console.log(val);
  //       //});


  //       this.accountServices.login( this.form.value ).subscribe(val => {
  //         console.log(val); 
  //         // а вот тут получай эту куку и через NGX cookie server записывай их в куки 
  //       });


  //       // this.accountServices.user().subscribe({
  //       //   next: (data) => console.log("User data:", data),
  //       //   error: (err) => console.error("Error:", err)
  //       // });
  //     } catch {
  //       console.log('что-то пошло не так' + this.form.value)
  //     }
      
  //   } else {
  //     console.log('invalid data')
  //   }
  // }
}
