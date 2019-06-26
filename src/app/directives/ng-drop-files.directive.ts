import { Directive, EventEmitter, ElementRef, HostListener, Input, Output } from '@angular/core';
// EventEmitter to comunicate with father
// ElementRef to obtain info from the html element where it is
// Hostlistener to listen to events like mouseover
@Directive({
  selector: '[appNgDropFiles]'
})
export class NgDropFilesDirective {

  // To comunicate the event to father
  @Output() mouseOver: EventEmitter<boolean> = new EventEmitter();


  constructor() { }

  // to emit an event 
  @HostListener('dragover', ['$event'])
  public onDragEnter(event: any) {
    this.mouseOver.emit(true);
  }

  // to emit an event 
  @HostListener('dragleave', ['$event'])
  public onDragLeave(event: any) {
    this.mouseOver.emit(false);
  }


}
