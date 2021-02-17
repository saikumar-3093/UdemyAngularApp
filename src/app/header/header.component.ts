import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { RecipeService } from '../recipes/recipe.service';
import { DataStorageService } from '../shared/datastorage.service';

@Component({
    selector:'app-header',
    templateUrl:'./header.component.html',
    styleUrls:['./header.component.css']
})
export class HeaderComponent implements OnInit,OnDestroy{
// @Output() featureClicked= new EventEmitter<string>();

    // onClick(feature:string){
    //   this.featureClicked.emit(feature);
    // }
    isAuthenticated = false;
   private authSubscription: Subscription;

    constructor(private dataStorageService:DataStorageService,
        private authService: AuthService){}

     ngOnInit(){
    this.authSubscription = this.authService.user.subscribe(
        user => {
            // if(user){
            //     this.isAuthenticated = true;
            // }else
            // {
            //     this.isAuthenticated = false;
            // }
            this.isAuthenticated = !!user;
        }
    )
}

    onSaveData(){
        this.dataStorageService.storeRecipes();
    }

    onFetchData(){
        this.dataStorageService.fetchRecipes().subscribe();
    }

    ngOnDestroy(){
        this.authSubscription.unsubscribe();
    }
    onLogout(){
        this.authService.logOut();
        this.isAuthenticated = false;
    }
}
