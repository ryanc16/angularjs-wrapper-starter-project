import { Component } from '../../../annotations/component.annotation';

@Component({
  selector: 'tool',
  templateUrl: 'tool.component.html',
  stylesUrl: 'tool.component.css',
  providers: ['$scope']
})
export class ToolComponent implements angular.IOnDestroy, angular.IOnInit {

  name: string = '';
  price: number = null;
  desc: string = '';
  quant: number = 1;
  constructor(private $scope: angular.IScope) {
    
  }

  $onInit(): void {
    // Called when the component is initialized
  }

  removeTool() {
    this.$scope.$emit('removeTool', this.$scope);
  }
  
  $onDestroy(): void {
    // Called before component is destroyed  
  }
}