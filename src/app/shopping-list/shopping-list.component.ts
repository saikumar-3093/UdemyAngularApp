import { Component, EventEmitter, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppinglistService } from './shopping-list.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit,OnDestroy {
  
  private igSubscription:Subscription;
  ingredients:Ingredient[];
  constructor(private shoppinglistService:ShoppinglistService) { }

  ngOnInit(): void {
  this.ingredients=this.shoppinglistService.getIngredient();
  this.igSubscription = this.shoppinglistService.changeinIngredients.subscribe(
    (ingredients:Ingredient[])=> {
      this.ingredients=ingredients;
    })
  }
  ngOnDestroy(){
    this.igSubscription.unsubscribe();
  }

// onIngredientAdded(ingredient:Ingredient){
//   this.ingredients.push(ingredient);
// }
onClick(index:number){
 this.shoppinglistService.editShoppinglist.next(index);
}
}
