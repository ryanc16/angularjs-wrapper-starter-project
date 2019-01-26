import { NgModule } from '../../annotations/index';
import { DynamicComponentFactoryService } from '../../services/dynamic-component-factory.service';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';
import { DialogComponent } from './dialog.component';
import { ModalDialogService } from './modal-dialog.service';

@NgModule({
  declarations: [
    DialogComponent,
    ConfirmDialogComponent
  ],
  providers: [
    DynamicComponentFactoryService,
    ModalDialogService
  ],
  exports: [
    DialogComponent,
    ConfirmDialogComponent,
    ModalDialogService
  ]
})
export class DialogModule {
  
}