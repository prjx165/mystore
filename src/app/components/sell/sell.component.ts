import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import app from 'src/app/firebase-init';
import  { getFirestore ,collection ,addDoc} from 'firebase/firestore';

@Component({
  selector: 'app-sell',
  templateUrl: './sell.component.html',
  styleUrls: ['./sell.component.scss']
})
export class SellComponent implements OnInit {

  @Input() products:any;
  showSpinner = false;

  public user_id = sessionStorage.getItem('id');

  product = {id:0,name:'',description:'',contact:'',price:900,url:'',uploadedBy:this.user_id};

  nameHandler(text:string){
    this.product.name = text;
  }

  descHandler(text:string){
    this.product.description = text;
  }

  contactHandler(text:string){
    this.product.contact = text;
  }

  priceHandler(text:any){
    this.product.price = text;
  }

  urlHandler(text:string){
    this.product.url = text;
  }

  constructor(private router:Router) { }

  submitHandler(e:any){
    e.preventDefault();
    this.showSpinner = true;
    this.product.id = this.products.length;
    addDoc(collection(getFirestore(app), 'products') ,this.product).then(
      () => { this.showSpinner = false; location.reload();}
     ).catch(
      (e) => {console.log(e)}
     );     
  }

  

  ngOnInit(): void {
  }

}
