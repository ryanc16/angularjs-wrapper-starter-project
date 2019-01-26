import { Templates } from '../templates';
import { Stylesheets } from '../stylesheets';
import { Utils } from '../utils/utils';
import { DirectiveOptions } from './directive.annotation';
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
      target.prototype.$onInit = () => {
        angular.element(document.head).append(styleEl);
        if(typeof origInit === 'function') {
          origInit();
        }
      }
      const origDestroy = target.$onDestroy;
      target.prototype.$onDestroy = () => {
        let numRemainingElements = document.querySelectorAll(options.selector).length;
        if(numRemainingElements === 1) {
          angular.element(styleEl).remove();
          if(typeof origDestroy === 'function') {
            origDestroy();
          }
        }
      }
      
    }
    
    target.$ctrl = target.prototype;
    target.controller = target
    target.$inject = options.providers ? options.providers.map(dep => dep.name || dep.toString()) : [];
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