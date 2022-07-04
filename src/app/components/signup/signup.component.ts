import { Component, OnInit } from '@angular/core';
import app from 'src/app/firebase-init';
import  { getFirestore ,collection ,addDoc ,getDocs} from 'firebase/firestore';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  constructor(private router:Router) { }

  user = {
    name:'',
    password:'',
    email:'',
    mob_no:'',
    address:'',
    date:'',
    wishlist:{}
  }


  nameHandler(text:string){
    this.user.name = text;
  }

  passwordHandler(text:string){
    this.user.password = text;
  }

  emailHandler(text:string){
    this.user.email = text;
  }

  mobileHandler(text:string){
    this.user.mob_no = text;
  }

  addressHandler(text:string){
    this.user.address = text;
  }

  submitHandler(){  
    const d = new Date();
    const rd = JSON.stringify(d);
    this.user.date = rd.substring(5,16);
    addDoc(collection(getFirestore(app), 'users') ,this.user).then(
      () => {}
     ).catch(
      (e) => {console.log(e)}
     );
    
    this.router.navigateByUrl('login');
  }

  ngOnInit(): void {
  }

}
