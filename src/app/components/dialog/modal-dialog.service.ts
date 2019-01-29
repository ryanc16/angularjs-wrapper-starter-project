import { Injectable } from '../../decorators/index';
import { DynamicComponentFactoryService, ComponentRef } from '../../services/dynamic-component-factory.service';
import { DialogComponent } from '../../components/dialog/dialog.component';
declare var angular: angular.IAngularStatic;

@Injectable({
  providers: [DynamicComponentFactoryService]
})
export class ModalDialogService {

  currentDialog: ComponentRef<DialogComponent<any>>;

  constructor(private dcfs:DynamicComponentFactoryService) {

  }

  createDialog<T>(component: any, $scope: angular.IScope, options?: any): ComponentRef<T> {
    if(this.currentDialog) {
      angular.element(this.currentDialog.component).remove();
    }
    const dialog = this.dcfs.createComponent<DialogComponent<T>>(DialogComponent, $scope);
    const compref = this.dcfs.createComponent<T>(component, $scope);
    dialog.component.attr('id', 'modal-dialog');
    dialog.component.addClass('dialog');
    dialog.component.addClass('modal-dialog-backdrop');
    angular.element(dialog.component).append(compref.component);
    angular.element(document.body).append(dialog.component);
    this.currentDialog = dialog;
    return compref;
  }

  destroyDialog() {
    if(this.currentDialog) {
      this.dcfs.removeComponent(this.currentDialog);
      this.currentDialog = null;
    }
  }
}