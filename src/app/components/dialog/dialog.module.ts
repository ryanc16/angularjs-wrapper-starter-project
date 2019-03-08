import { NgModule } from '../../decorators/index';
import { DynamicComponentFactoryService } from '../../services/dynamic-component-factory.service';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';
import { DialogComponent } from './dialog.component';
import { ModalDialogService } from './modal-dialog.service';
import { QuantityDialogComponent } from './quantity-dialog/quantity-dialog.component';

@NgModule({
  declarations: [
    DialogComponent,
    ConfirmDialogComponent,
    QuantityDialogComponent
  ],
  providers: [
    DynamicComponentFactoryService,
    ModalDialogService
  ],
  exports: [
    DialogComponent,
    ConfirmDialogComponent,
    QuantityDialogComponent
  ]
})
export class DialogModule {
  
}