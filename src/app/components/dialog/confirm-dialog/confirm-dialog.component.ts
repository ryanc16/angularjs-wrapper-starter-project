import { Component, Input } from '../../../decorators/index';
import { EventEmitter } from 'app/utils/event-emitter';

@Component({
  selector: 'confirm-dialog',
  templateUrl: 'confirm-dialog.component.html',
  stylesUrl: 'confirm-dialog.component.css'
})
export class ConfirmDialogComponent {

  @Input('<')
  options: ConfirmDialogOptions;

  events: EventEmitter<boolean> = new EventEmitter<boolean>();


  constructor() {
  }

  private confirm() {
    if(this.events) {
      this.events.emit('choice', true);
    }
  }

  private deny() {
    if(this.events) {
      this.events.emit('choice', false);
    }
  }


}

interface ConfirmDialogOptions {
  title: string;
  message: string;
}