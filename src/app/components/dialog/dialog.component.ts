import { Component, ViewChild } from '../../decorators/index';

@Component({
  selector: 'modal-dialog',
  templateUrl: 'dialog.component.html',
  stylesUrl: 'dialog.component.css'
})
export class DialogComponent<T> implements angular.IOnInit {

  @ViewChild('dialog', {readAs: 'JQLite'})
  dialogRef: JQLite;

  constructor() {
  }

  $onInit() {
    
  }
}