import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AccountService } from '../_services/account.service';
import { FormValidationRegex } from '../_validations/form-validation';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  model: any = {};
  registerForm: FormGroup;
  maxDate: Date;
  regex = FormValidationRegex;

  constructor(private accountService: AccountService,
    private route: Router,
    private toastr: ToastrService,
    private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.initializeForm();
    this.maxDate = new Date();
    this.maxDate.setFullYear(this.maxDate.getFullYear() - 18);
  }


  initializeForm() {
    this.registerForm = this.formBuilder.group({
      username: ['', [Validators.required, Validators.pattern(this.regex.stringNumber)]],
      password: ['', [Validators.required,
      Validators.minLength(8),
      Validators.maxLength(32)]],
      confirmPassword: ['', [Validators.required,
      this.matchValues('password')]],
      firstName: ['', [Validators.required, Validators.pattern(this.regex.string)]],
      lastName: ['', [Validators.required, Validators.pattern(this.regex.string)]],
      gender: ['Nam'],
      dateOfBirth: ['', Validators.required],
      email: ['', [Validators.required,
      Validators.pattern(this.regex.email)]],
      phoneNumber: ['', [Validators.required,
      Validators.pattern(this.regex.phoneNumber)]],
      userAgreement: ['', Validators.required],

    })
    this.registerForm.controls.password.valueChanges.subscribe(() => {
      this.registerForm.controls.confirmPassword.updateValueAndValidity;
    })

  }

  matchValues(matchTo: string): ValidatorFn {
    return (control: AbstractControl) => {
      return control?.value === control?.parent?.controls[matchTo].value ? null : { isMatching: true }
    }
  }


  register() {
    if (this.registerForm.controls.userAgreement.value === true) {
      this.accountService.register(this.registerForm.value).subscribe(response => {
        this.toastr.success('Đăng ký thành công');
        this.route.navigateByUrl('/');
      }, error => {
        console.log(this.registerForm.controls.value);
        this.toastr.error('Đăng ký không thành công');
      })
    }
  }
}
