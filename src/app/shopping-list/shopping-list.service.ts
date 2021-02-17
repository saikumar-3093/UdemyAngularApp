import { Injectable, OnInit } from '@angular/core';
import { Subject } from 'rxjs';

import { Ingredient } from '../shared/ingredient.model';

@Injectable()
export class ShoppinglistService{
    changeinIngredients=new Subject<Ingredient[]>();
    editShoppinglist = new Subject<number>();
  private ingredients:Ingredient[]= [
        new Ingredient('Apple',5),
        new Ingredient('Tomato',10),
      ];

      getIngredient(){
          return this.ingredients.slice();
      }
addIngredient(ingredient:Ingredient){
this.ingredients.push(ingredient);
this.changeinIngredients.next(this.ingredients.slice());
}

addIngredients(ingredients:Ingredient[]){
    this.ingredients.push(...ingredients);
    this.changeinIngredients.next(this.ingredients.slice())
}
gettingIngredient(index){
    return this.ingredients[index];
}
// updateIngredient(index:number,newIngredient:Ingredient){
// this.ingredients[index] = newIngredient;
// this.changeinIngredients.next(this.ingredients.slice());
// }
updateIngredient(index:number,newIngredient:Ingredient){
this.ingredients[index] = newIngredient;
this.changeinIngredients.next(this.ingredients.slice())
}
deleteIngredient(index:number){
    this.ingredients.splice(index, 1);
    this.changeinIngredients.next(this.ingredients.slice())
}
}