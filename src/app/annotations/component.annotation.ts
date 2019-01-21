import { Templates } from '../templates';
import { Utils } from '../utils/utils';
import { DirectiveOptions } from './directive.annotation';

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
  controller?: angular.IComponentController;
  providers?: any[];
  transclude?: boolean;
  restrict?: string;
}