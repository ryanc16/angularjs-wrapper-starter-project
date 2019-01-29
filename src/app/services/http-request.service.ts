import { Injectable } from '../decorators/injectable.decorator';

@Injectable()
export class HttpRequestService {

  constructor(private $http: angular.IHttpService) {
  }

  loadTemplate(url: string): angular.IPromise<angular.IHttpResponse<any>> {
    return this.$http.get(url, {responseType: 'text/html'});
    // return angular.injector(['ng']).get('$http').get(url, {responseType: 'text/html'});
  }

}