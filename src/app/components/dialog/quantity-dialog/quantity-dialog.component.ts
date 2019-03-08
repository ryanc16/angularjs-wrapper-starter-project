import { Component } from '../../../decorators/component.decorator';
import { Output } from 'app/decorators/output.decorator';
import { EventEmitter } from 'app/utils/event-emitter';

@Component({
  selector: 'quantity-dialog',
  templateUrl: 'quantity-dialog.component.html',
  stylesUrl: 'quantity-dialog.component.css'
})
export class QuantityDialogComponent {

  @Output()
  emitter: EventEmitter<number>;

  quantity: number;

  constructor() {}

  private confirm() {
    this.emitter.emit('confirm', this.quantity);
  }

  private deny() {
    this.emitter.emit('deny');
  }

}