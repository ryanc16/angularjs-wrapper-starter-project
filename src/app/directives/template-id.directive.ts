import { Directive } from '../annotations/directive.annotation';

@Directive({
  selector: 'templateId'
})
export class TemplateIdDirective {

  constructor($scope: angular.IScope) {
    
  }
}