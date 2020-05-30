import { HostListener, Directive, Input, Output, EventEmitter } from '@angular/core';
export enum KEY_CODE {
  CHAR_C = 17,
  CHAR_F = 37
}
@Directive({
  selector: '[element-focus-directive]'
})
export class ElementFocusDirective {
  @Input('element-focus-directive') selectedItem: any;
  @Output()
  deleteElement: EventEmitter<string> = new EventEmitter<string>();
  @Output()
  addElement: EventEmitter<string> = new EventEmitter<string>();
  @Output()
  editElement: EventEmitter<string> = new EventEmitter<string>();

  @HostListener('keydown', ['$event']) onKeyDown(e) {
    let tempKeyCode = this.getKey(e);
    console.log(`keyCode=>${tempKeyCode}`);
    // ctrl + x or X - delete
    if (e.ctrlKey && (tempKeyCode === 'x' || tempKeyCode === 'X')) {
      this.deleteElement.emit(this.selectedItem);
    }
    // ctrl + a or A - delete
    if (e.ctrlKey && (tempKeyCode === 'a' || tempKeyCode === 'A')) {
      this.addElement.emit(this.selectedItem);
    }
     // ctrl + e or E - Edit
     if (e.ctrlKey && (tempKeyCode === 'e' || tempKeyCode === 'E')) {
      this.editElement.emit(this.selectedItem);
    }
  }
  @HostListener('focus', ['$event']) onFocus(e) {
    console.log(this.selectedItem);
    console.log(e);

  }
  getKey(e: any) {
    let code;
    if (e.key !== undefined) {
      code = e.key;
    } else if (e.keyIdentifier !== undefined) {
      code = e.keyIdentifier;
    } else if (e.keyCode !== undefined) {
      code = e.keyCode;
    }
    return code;
  }
}
