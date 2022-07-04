import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { deleteDoc, doc, getFirestore, updateDoc } from 'firebase/firestore';
import app from 'src/app/firebase-init';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  @Input() products:any;
  

  public user_id = sessionStorage.getItem('id');
  showSpinner = false;

  clickHandler(product:any){
    this.router.navigate(['product'],{
      state:{p_obj:product}
    })
  }

  deleteHandler(id:string){
    this.showSpinner = true;
    deleteDoc(doc(getFirestore(app), 'products',id)).then(
      () => {
        this.showSpinner = false;
      }
    );
  }

  constructor(private router:Router) { }

  ngOnInit(): void {

  }

}
