export function Injectable(options?: ServiceOptions) {
  return (target: any) => {
    if(options && options.providers) {
      target.$inject = options.providers.map(prov => prov.name);
    }
  }
}

export interface ServiceOptions {
  providers?: any[];
}