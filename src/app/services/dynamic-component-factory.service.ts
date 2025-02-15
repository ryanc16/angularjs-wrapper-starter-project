import { Injectable } from '../decorators/injectable.decorator';
import { Utils } from '../utils/utils';
declare const angular: angular.IAngularStatic;

@Injectable()
export class DynamicComponentFactoryService {

  constructor(private $compile: angular.ICompileService) {
    
  }

  createComponent<T>(component: T|any, parentScope: angular.IScope): ComponentRef<T> {
    let selector = Utils.kababCase(component.selector);
    let elStr = `<${selector}></${selector}>`;
    let el = angular.element(elStr);
    let scope = parentScope.$new();
    let comp = this.$compile(el)(scope);
    let ctrl = comp.controller(selector);
    return {component: el, newScope: scope, controller: ctrl};
    
  }

  removeComponent<T>(compRef: ComponentRef<T>): void {
    compRef.newScope.$destroy();
    compRef.component.remove();
    compRef.newScope.$apply();
  }
}

export interface ComponentRef<T> {
  component: JQLite;
  newScope: angular.IScope;
  controller: T;
}