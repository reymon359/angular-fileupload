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

  // File validations
  // ---------------------
  // File can be uploaded if it has been dropped and is an image
  private _fileCanBeUploaded(file: File): boolean {
    if (!this._fileAlreadyDropped(file.name) && this._isImage(file.type)) {
      return true;
    } else {
      return false;
    }
  }

  // Prevent that file does not open on browser
  private _preventStop(event) {
    event.preventDefault();
    event.stopPropagation();
  }

  // Check that files is not already on files
  private _fileAlreadyDropped(fileName: string): boolean {
    for (const file of this.files) {
      if (file.fileName === fileName) {
        console.log('The file ' + fileName + ' is already added');
        return true;
      }
    }
    return false;
  }

  // Check if it is an image
  private _isImage(fileType: string): boolean {
    return (fileType === '' || fileType === undefined) ? false : fileType.startsWith('image');
  }



}

