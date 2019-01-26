declare var angular: angular.IAngularStatic;

export function ViewChild(varname: string, options?: ViewChildOptions): any {
  return (target: any, key:string) => {
    let origInit = target.$onInit;
    target.$onInit = function() {
      const el = document.querySelector('[templateId='+varname+']');
      let returnValue;
      if(options && options.readAs) {
        switch(options.readAs) {
          case 'JQLite': returnValue = angular.element(el); break;
          default: returnValue = el; break;
        }
      }
      else {
        returnValue = el;
      }
      target[key] = returnValue;
      if(typeof origInit === 'function') {
        origInit.call(target);
      }
    }
    
  }
}

export interface ViewChildOptions {
  readAs?: 'JQLite';
}