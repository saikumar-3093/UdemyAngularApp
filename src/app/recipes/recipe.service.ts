import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppinglistService } from '../shopping-list/shopping-list.service';
import { Recipe } from './recipe.model';

@Injectable()
export class RecipeService{
       recipesChanges= new Subject<Recipe[]>();
    // recipeSelected = new Subject<Recipe>();
   private recipes:Recipe[]=[
        new Recipe('Sandwich',
        'Crisp and Tasty Sandwich',
        'https://www.whiskaffair.com/wp-content/uploads/2020/03/mayonnaise-Sandwich-3.jpg',
        [
            new Ingredient('Breads',2),
            new Ingredient('Meat',1)
        ]),
        new Recipe('Cheese Burger',
        'Cheesy and Tasty Burger',
        'https://www.seriouseats.com/recipes/images/2015/07/20150702-sous-vide-hamburger-anova-primary-1500x1125.jpg',
        [
            new Ingredient('Breads',2),
            new Ingredient('Meat',1)
        ])
      ];

      constructor(private shoppinglistService:ShoppinglistService){
    
      }

      setRecipes(recipes: Recipe[]){
          this.recipes= recipes;
          this.recipesChanges.next(recipes);
      }
      getRecipes(){
          return this.recipes.slice();
      }
    addIngredientstoShoppinglist(ingredients:Ingredient[]){
        this.shoppinglistService.addIngredients(ingredients);
    }
    
    getRecipe(index:number){
        return this.recipes[index];
    }
    updateRecipe(index:number, newRecipe: Recipe){
      this.recipes[index] = newRecipe;
      this.recipesChanges.next(this.recipes.slice())
    }
    addRecipe(newReecipe: Recipe){
    this.recipes.push(newReecipe);
    this.recipesChanges.next(this.recipes.slice())
    }
    deleteRecipe(index:number){
        this.recipes.splice(index,1);
        this.recipesChanges.next(this.recipes.slice());
    }
  
}