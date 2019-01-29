export function Input(type: InputType): any {
  return (target: any, key:string) => {
    if(target.bindings == null){
      target.bindings = {};
    }
    target.bindings[key] = type;
  }
}

export declare type InputType = '<' | '=' | '&' | '@';