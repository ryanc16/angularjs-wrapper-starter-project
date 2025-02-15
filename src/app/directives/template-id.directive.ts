import { Directive } from '../decorators/directive.decorator';

@Directive({
  selector: 'templateId'
})
export class TemplateIdDirective {

  constructor($scope: angular.IScope) {
    
  }
}