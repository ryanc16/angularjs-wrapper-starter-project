import { Injectable } from '../annotations/injectable.annotation';

@Injectable()
export class NgServices {

  constructor(private $compile, private $injector) {

  }

  getCompileService(): angular.ICompileService {
    return this.$compile;
  }

  getInjectorService(): angular.auto.IInjectorService {
    return this.$injector;
  }

}