import { Utils } from "../utils/utils";
import { Templates } from "../templates";

export function Directive(options: DirectiveOptions) {
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
    target.controller = target;
    target.$inject = options.providers ? options.providers.map(dep => dep.name || dep.toString()) : [];
    target.transclude = options.transclude ? options.transclude : false;
    target.restrict = options.restrict ? options.restrict : 'EA';
    target.link = options.link || function(scope, elem, attrs) {};
    target.type = 'directive';
  }
}

export interface DirectiveOptions {
  selector: string;
  scope?: object;
  template?: string;
  templateUrl?: string;
  controller?: angular.IComponentController;
  providers?: any[];
  transclude?: boolean;
  restrict?: string;
  link?: (scope, elem, attrs) => void;
}