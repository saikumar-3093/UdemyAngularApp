import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Recipe } from '../../recipe.model';
import { RecipeService } from '../../recipe.service';

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.css']
})
export class RecipeItemComponent implements OnInit {
   @Input() recipe:Recipe;
   @Input() id:number;
  // @Output() recipeSelected=new EventEmitter<void>();
  constructor(private recipeService:RecipeService,
    private router:Router) { 
    
  }
  

  ngOnInit(): void {
  }

}
