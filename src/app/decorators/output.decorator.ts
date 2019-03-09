export function Output(): any {
  return (target: any, key:string) => {
    if(target.bindings == null){
      target.bindings = {};
    }
    target.bindings[key] = '<';
  }
}