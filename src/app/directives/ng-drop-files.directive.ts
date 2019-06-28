import { Directive, EventEmitter, ElementRef, HostListener, Input, Output } from '@angular/core';
import { FileItem } from '../models/file-item';
// EventEmitter to comunicate with father
// ElementRef to obtain info from the html element where it is
// Hostlistener to listen to events like mouseover
@Directive({
  selector: '[appNgDropFiles]'
})
export class NgDropFilesDirective {

  // The files I will receive
  @Input() files: FileItem[] = [];

  // To comunicate the event to father
  @Output() mouseOver: EventEmitter<boolean> = new EventEmitter();


  constructor() { }

  // to emit an event 
  @HostListener('dragover', ['$event'])
  public onDragEnter(event: any) {
    this.mouseOver.emit(true);
    this._preventStop(event);

  }

  // to emit an event 
  @HostListener('dragleave', ['$event'])
  public onDragLeave(event: any) {
    this.mouseOver.emit(false);
  }

  // to emit an event on drop 
  @HostListener('drop', ['$event'])
  public onDrop(event: any) {

    const transference = this._getTransference(event);

    // If there is nothing to transfer I exit
    if (!transference) { return; }

    this._extractFiles(transference.files);

    this._preventStop(event);

    this.mouseOver.emit(false);

  }

  // For browser compatibility
  private _getTransference(event: any) {
    return event.dataTransfer ? event.dataTransfer : event.originalEvent.dataTransfer;
  }

  // We will create and array with the files dropped
  private _extractFiles(listFiles: FileList) {
    // tslint:disable-next-line:forin
    for (const property in Object.getOwnPropertyNames(listFiles)) {
      const tempFile = listFiles[property];
      if (this._fileCanBeUploaded(tempFile)) {
        const newFile = new FileItem(tempFile);
        this.files.push(newFile);
      }
    }
  }



 
}

