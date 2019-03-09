import { ClassExpression, ClassDeclaration, ClassElement } from "../../../node_modules/typescript/lib/typescript";

export class EventEmitter<T> {
  private readonly eventMap:{[index:string]: Function} = {};
  constructor() {}

  emit(event: string, value?: T): EventEmitter<T> {
    if(typeof this.eventMap[event] === 'function') {
      this.eventMap[event].call(this.eventMap[event]['context'], value);
    }
    return this;
  }

  on(event: string, callback: (value?: T) => void, context?: any): EventEmitter<T> {
    callback['context'] = context || this;
    this.eventMap[event] = callback;
    return this;
  }

  once(event: string, callback: (value?: T) => void, context?: any): EventEmitter<T> {
    this.eventMap[event] = (val) => {
      callback['context'] = context || this;
      callback.call(callback['context'], val);
      delete this.eventMap[event];
    };
    return this;
  }

  off(event: string): EventEmitter<T> {
    delete this.eventMap[event];
    return this;
  }
}