import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css'],
  
})
export class RecipeListComponent implements OnInit,OnDestroy {
  // @Output() recipeWasSelected=new EventEmitter<Recipe>();
  recipes:Recipe[];
  recipeSubscription: Subscription;
  
  constructor(private recipeService:RecipeService,
    private router:Router,
    private route:ActivatedRoute) {}
  
  ngOnInit() {
    this.recipeSubscription = this.recipeService.recipesChanges.subscribe(
      (recipes: Recipe[]) => {
        this.recipes = recipes;
      }
    )
    this.recipes=this.recipeService.getRecipes();
  }
  ngOnDestroy(){
    this.recipeSubscription.unsubscribe();
  }
  newRecipe(){
    this.router.navigate(['new'],{relativeTo:this.route});
  }
 
//   onRecipeSelected(recipe:Recipe){
// this.recipeWasSelected.emit(recipe)
//   }
}
