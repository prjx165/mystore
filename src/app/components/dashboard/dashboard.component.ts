import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import app from 'src/app/firebase-init';
import  { getFirestore ,collection ,getDocs} from 'firebase/firestore';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})


export class DashboardComponent implements OnInit {

  public index:number=1;
  public user_id = sessionStorage.getItem('id');
  public showSpinner:boolean = true;

  clickHandler(index:number){
    this.index = index;
  }

  logoutHandler(e:any){
    e.preventDefault();
    sessionStorage.removeItem('id');
    this.router.navigateByUrl('login');
  }


  constructor(private router:Router) { }
  products:any = [];
  
  ngOnInit(): void {
    if(!sessionStorage.getItem('id')){
      this.router.navigateByUrl('login');
    }
    else{
      getDocs(collection(getFirestore(app),'products')).then(
        (res) => { 
            res.forEach((e) => {
              const obj = e.data();
              const product  = {id:'',name:'',description:'',price:0,contact:'',url:'',uploadedBy:''};
              product.id = e.id,
              product.name = obj['name'];
              product.description = obj['description'];
              product.price = obj['price'];
              product.contact = obj['contact'];
              product.url = obj['url'];
              product.uploadedBy = obj['uploadedBy'];
              this.products.push(product);
            }
          )
          this.showSpinner = false;
        }
      )
    }
  }

}
