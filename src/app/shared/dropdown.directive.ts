import { Directive, ElementRef, HostBinding, HostListener } from '@angular/core';

@Directive({
    selector:'[appDropdown]',
})
export class DropdownDirective{
    @HostBinding('class.open') toOpen=false;
    // @HostListener('click') toggleOpen(){
    //     this.toOpen=!this.toOpen;
    // }
    @HostListener('document:click', ['$event']) toggleOpen(event: Event) {
        this.toOpen = this.elRef.nativeElement.contains(event.target) ? !this.toOpen : false;
      }
      constructor(private elRef:ElementRef){}
}
