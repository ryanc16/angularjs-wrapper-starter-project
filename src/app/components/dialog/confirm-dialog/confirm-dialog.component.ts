import { Component, Input } from '../../../annotations/index';

@Component({
  selector: 'confirm-dialog',
  templateUrl: 'confirm-dialog.component.html',
  stylesUrl: 'confirm-dialog.component.css'
})
export class ConfirmDialogComponent {

  @Input('<')
  options: ConfirmDialogOptions;


  constructor(private $scope: angular.IScope) {
  }

  getScope(): angular.IScope {
    return this.$scope;
  }

  private confirm() {
    this.$scope.$emit('choice', true);
  }

  private deny() {
    this.$scope.$emit('choice', false);
  }


}

interface ConfirmDialogOptions {
  title: string;
  message: string;
}