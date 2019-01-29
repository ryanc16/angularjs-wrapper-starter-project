import { Injectable } from '../decorators/injectable.decorator';

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