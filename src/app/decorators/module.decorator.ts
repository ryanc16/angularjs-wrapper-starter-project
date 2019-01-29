import { Utils } from '../utils/utils';
declare const angular: angular.IAngularStatic;

export function NgModule(options: ModuleOptions) {
  return (target: any) => {
    // Change the module name to camel case
    const modulename = Utils.camelCase(target.name);
    // Map all other imported module names to strings
    const imports = options.imports ? options.imports.map(mod => Utils.camelCase(mod.name)) : [];
    // Create and register the module along with its imported modules
    target = angular.module(modulename, imports);
    // Register all services to this module
    const providers = options.providers ? options.providers : [];
    for(let provider of providers) {
      (target as angular.IModule).service(provider.name, provider);
    }
    // Register all directives and components to this module
    const declarations = options.declarations ? options.declarations : [];
    for(let dec of declarations) {
      const decname = Utils.camelCase(dec.selector);
      if(dec.type === 'component') {
        (target as angular.IModule).component(decname, dec);
      }
      else if(dec.type === 'directive') {
        (target as angular.IModule).directive(decname, dec);
      }
    }

    // TODO: insert the bootstrapped components?
    // for(let comp of options.bootstrap) {
    //   let selector = Utils.kababCase(comp.selector);
    //   let elStr = `<${selector}></${selector}>`;
    //   let el = angular.element(elStr);
    //   angular.element(document.body).append(el);
    //   angular.element(el).scope().$apply();      
    // }
    
  }
}

interface ModuleOptions {
  declarations?: any[];
  imports?: angular.IControllerConstructor[];
  exports?: any[];
  bootstrap?: any[];
  providers?: any[],
  entryComponents?: any[];
}