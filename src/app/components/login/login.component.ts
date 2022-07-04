import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import app from 'src/app/firebase-init';
import  { getFirestore ,collection ,getDocs, query, where} from 'firebase/firestore';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private router:Router) { }

  hide = true;
  showSpinner = false;


  private user = {username:'',password:''};

  clickHandlerForUsername(userName:string){
    this.user.username = userName;
  }

  clickHandlerForPassword(password:string){
    this.user.password = password;

  }

  submitHandler(e:any){
    this.showSpinner = true;
    e.preventDefault();
    const db=getFirestore(app);
    const q=query(collection(db, 'users'), where('name', '==', this.user.username), where('password', '==', this.user.password));
    getDocs(q)
      .then((e)=>{
        let val=true;
        e.forEach(d=>{
        sessionStorage.setItem('id',d.id);
        this.router.navigateByUrl('dashboard');
        val=false;
      })
      if(val)
        alert("Incorrect email or password");
        this.showSpinner = false;
      })
     .catch(e=>console.log(e));
  }

  ngOnInit(): void {
    
  }

}

