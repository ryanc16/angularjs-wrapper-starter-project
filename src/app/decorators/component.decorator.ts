import { Templates } from '../templates';
import { Stylesheets } from '../stylesheets';
import { Utils } from '../utils/utils';
import { DirectiveOptions } from './directive.decorator';
declare var angular: angular.IAngularStatic;

export function Component(options: ComponentOptions){
  return (target: any) => {
    target.selector = Utils.kababCaseToCamelCase(options.selector);
    if(options.template) {
      target.template = options.template;
    }
    else if(options.templateUrl) {
      options.template = '';
      target.template = Templates[options.templateUrl];
    }
    if(options.stylesUrl) {
      const origInit = target.prototype.$onInit;
      const styleEl = angular.element(`<style>${Stylesheets[options.stylesUrl]}</style>`);
      target.prototype.$onInit = function() {
        angular.element(document.head).append(styleEl);
        if(typeof origInit === 'function') {
          origInit.call(target.prototype);
        }
      }
      const origDestroy = target.prototype.$onDestroy;
      target.prototype.$onDestroy = function() {
        let numRemainingElements = document.querySelectorAll(options.selector).length;
        if(numRemainingElements === 1) {
          angular.element(styleEl).remove();
          if(typeof origDestroy === 'function') {
            origDestroy.call(target.prototype);
          }
        }
      }
      
    }
    
    target.$ctrl = target.prototype;
    target.controller = target;
    target.bindings = Object.assign({}, target.prototype.bindings);
    if(options && options.providers) {
      target.$inject = options.providers.map(dep => dep.name || dep.toString());
    }
    target.transclude = options.transclude ? options.transclude : false;
    target.restrict = options.restrict ? options.restrict : 'E';
    target.type = 'component';
  }
}

export interface ComponentOptions extends DirectiveOptions {
  selector: string;
  template?: string;
  templateUrl?: string;
  stylesUrl?: string;
  controller?: angular.IComponentController;
  providers?: any[];
  transclude?: boolean;
  restrict?: string;
}