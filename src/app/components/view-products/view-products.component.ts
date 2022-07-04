import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { addDoc,collection, doc, getDoc, getFirestore, setDoc } from 'firebase/firestore';
import app from 'src/app/firebase-init';

@Component({
  selector: 'app-view-products',
  templateUrl: './view-products.component.html',
  styleUrls: ['./view-products.component.scss']
})
export class ViewProductsComponent implements OnInit {


  constructor(private router:Router) { }

  public product = {id:'',name:'',description:'',price:0,contact:'',url:''};
  public id:any;
  @Output() item = new EventEmitter<object>();
  showSpinner = false;


  clickHandler(e:any){
    e.preventDefault();
    this.router.navigateByUrl('dashboard');
  } 

  addToWishlist(){
    this.showSpinner = true;
    const db = getFirestore(app);
    this.id = sessionStorage.getItem('id');
    setDoc(doc(db,'users/'+ this.id +'/wishlist',this.product.id),{
      name:this.product.name,
      description:this.product.description,
      price:this.product.price,
      contact:this.product.contact,
      url:this.product.url,
      id:this.product.id
    }).then(
      (e) => {
        this.showSpinner = false;
      }
    )
    // const docRef = doc(db, "users",this.id);
    // getDoc(docRef).then(
    //   (p) => {
    //       const obj = p.data();
          
    //   }
    // ); 
  }

  ngOnInit(): void {
    if(!sessionStorage.getItem('id')){
      this.router.navigateByUrl('login');
    }
    else{
      const obj = history.state.p_obj;
      this.product.id = obj.id;
      this.product.name = obj.name;
      this.product.description = obj.description;
      this.product.price = obj.price;
      this.product.contact = obj.contact;
      this.product.url = obj.url;
    }
  }

}
