import { Component } from '../../../decorators/component.decorator';
import { Input } from 'app/decorators/input.decorator';
import { ToolModel } from './tool.model';

@Component({
  selector: 'tool',
  templateUrl: 'tool.component.html',
  stylesUrl: 'tool.component.css',
  providers: ['$scope']
})
export class ToolComponent implements angular.IOnDestroy, angular.IOnInit {

  @Input('<')
  model: ToolModel;

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