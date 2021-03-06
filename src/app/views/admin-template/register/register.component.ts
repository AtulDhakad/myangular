
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

import { AuthenticationService } from './../../../services/authentication.service';
import { UserService  } from './../../../services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  submitted = false;
  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private userService:UserService,
    private authenticationService:AuthenticationService
) {
     // redirect to home if already logged in
    if (this.authenticationService.currentUserValue) { 
        this.router.navigate(['/admin/dashboard']);
    }
}


ngOnInit() {
    this.registerForm = this.formBuilder.group({
        username: ['', Validators.required],
        email: ['', Validators.required],
        mobile: ['', Validators.required],
        password: ['', Validators.required],
        copassword: ['', Validators.required]
    });

}

// convenience getter for easy access to form fields
get f() { return this.registerForm.controls; }

onRegister() {
    this.submitted = true;
   
    console.log(this.registerForm.value);
    // stop here if form is invalid
    if (this.registerForm.invalid) {
        return;
    }

   // this.loading = true;
    this.userService.register(this.registerForm.value)
        .pipe(first())
        .subscribe(
            data => {
                this.router.navigate(['/admin/login']);
            },
            error => {
                //this.alertService.error(error);
                //this.loading = false;
                console.log(error);
            });
}



}
