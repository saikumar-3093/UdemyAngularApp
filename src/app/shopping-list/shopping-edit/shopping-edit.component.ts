import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { ShoppinglistService } from '../shopping-list.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit {
  @ViewChild('f') formRef : NgForm;
  editItemIndex:number;
  editShoppinglistSubscription: Subscription;
  editMode = false;
  editedItem:Ingredient;
  // @ViewChild('nameInput') nameInputRef:ElementRef;
  // @ViewChild('amountInput') amountInputRef:ElementRef;
  // @Output() ingredientAdded=new EventEmitter<Ingredient>();
  constructor(private shoppinglistService:ShoppinglistService) { }

  ngOnInit(): void {
    this.shoppinglistService.editShoppinglist.subscribe(
      (index:number) => {
        this.editItemIndex = index;
        this.editMode = true;
        this.editedItem = this.shoppinglistService.gettingIngredient(index);
        // console.log(this.editedItem)
        this.formRef.setValue({
          name : this.editedItem.name,
          amount : this.editedItem.amount,
        })
      }
    )
    // this.editShoppinglistSubscription = this.shoppinglistService.editShoppinglist.subscribe(
    //   (index:number) => {
    //     this.editItemIndex = index;
    //     this.editMode = true; 
    //     this.editedItem = this.shoppinglistService.gettingIngredient(index); 
    //     this.formRef.setValue({
    //       name:this.editedItem.name,
    //       amount:this.editedItem.amount,
    //     })
    //   }
    // )
  }
  onAddIngredient(form : NgForm) {
const value = form.value;
const ingName = value.name;
const ingAmount = value.amount;
//  const ingName=this.nameInputRef.nativeElement.value;
//  const ingAmount=this.amountInputRef.nativeElement.value;
 const newIngredient = new Ingredient(ingName,ingAmount);
 if(this.editMode){
   this.shoppinglistService.updateIngredient(this.editItemIndex,newIngredient)
 }else{
   this.shoppinglistService.addIngredient(newIngredient);
 }
 this.editMode = false;
 this.formRef.reset(
  
     );
//  this.shoppinglistService.addIngredient(newIngredient);

// if(this.editMode){
//   this.shoppinglistService.updateIngredient(this.editItemIndex,newIngredient)
// }else{
//  this.shoppinglistService.addIngredient(newIngredient);
//   }
//   this.formRef.reset(
//   this.editMode = false,
//     );

}
onClear(){
  this.formRef.reset();
  this.editMode = false;
}
onDelete(){
this.shoppinglistService.deleteIngredient(this.editItemIndex);
this.onClear();
}

}
