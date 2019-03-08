import { Component } from '../../../decorators/component.decorator';
import { Input } from '../../../decorators/input.decorator';
import { ToolModel } from './tool.model';
import { Output } from '../../../decorators/output.decorator';
import { EventEmitter } from '../../../utils/event-emitter';
import { ModalDialogService } from '../../../components/dialog/modal-dialog.service';
import { QuantityDialogComponent } from '../../dialog/quantity-dialog/quantity-dialog.component';

@Component({
  selector: 'tool',
  templateUrl: 'tool.component.html',
  stylesUrl: 'tool.component.css',
  providers: ['$scope', ModalDialogService]
})
export class ToolComponent implements angular.IOnDestroy, angular.IOnInit {

  @Input('<')
  model: ToolModel;

  @Output()
  emitter: EventEmitter<ToolModel>;

  @Input('=')
  quant: number;

  constructor(private $scope, private _mds: ModalDialogService) { }

  $onInit(): void {
    // Called when the component is initialized
  }

  removeTool() {
    this.emitter.emit('remove_tool', this.model);
  }

  changeQuantity() {
    const dialog = this._mds.createDialog<QuantityDialogComponent>(QuantityDialogComponent, this.$scope);
    dialog.controller.quantity = this.quant;
    dialog.controller.emitter = new EventEmitter<number>().once('confirm', (newQuantity) => {
      this.quant = newQuantity;
      this._mds.destroyDialog();
    })
    .once('deny', () => {
      this._mds.destroyDialog();
    });
  }
  
  $onDestroy(): void {
    // Called before component is destroyed  
  }
}