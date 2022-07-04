import { Component, Input, OnInit } from '@angular/core';
import { doc, getDoc, getDocs, getFirestore ,collection, deleteDoc} from 'firebase/firestore';
import app from 'src/app/firebase-init';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.scss']
})
export class WishlistComponent implements OnInit {

  public list:any = [];
  showSpinner = false;
  constructor() { }
  

  delete(id:string){
    this.showSpinner = true;
    const prodRef = doc(getFirestore(app), "users/"+ sessionStorage.getItem('id') +"/wishlist" ,id);
    deleteDoc(prodRef).then(
      (e) =>{
        this.showSpinner = false;
        window.location.reload();
      }
    );
  }

  ngOnInit(): void{
    this.showSpinner = true;
    const db = getFirestore(app);
    getDocs(collection(db, "users/"+ sessionStorage.getItem('id') +"/wishlist"))
      .then((e)=>{
        let d;
        e.forEach((p)=>{
          const product = {name:'',description:'',price:0,contact:'',url:'',uploadedBy:'',id:''}
          d=p.data();
          product.name = d['name'];
          product.description = d['description'];
          product.contact = d['contact'];
          product.price = d['price'];
          product.url = d['url'];
          product.uploadedBy = d['uploadedBy'];
          product.id = p.id;

          getDoc(doc(db,'products',p.id)).then(
            (x)=>{
              if(x.data()!=undefined){
                this.list.push(product);
              }
              else{
                deleteDoc(doc(db,"users/"+ sessionStorage.getItem('id') +"/wishlist",p.id));
              }
            }
          )
        });
        this.showSpinner = false;
      })
      .catch((e)=>console.log(e));
    }


  }

