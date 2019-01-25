import { Component } from '../../annotations/component.annotation';
import { ToolComponent } from './tool/tool.component';
import { ComponentRef, DynamicComponentFactoryService } from '../../services/dynamic-component-factory.service';

@Component({
  selector: 'toolbox-view',
  templateUrl: 'toolbox-view.component.html',
  providers: ['$scope', '$element', DynamicComponentFactoryService]
})
export class ToolboxViewComponent {

  private allTools: ToolOption[] = [
    {
      name: 'Hammer',
      price: 4.99,
      desc: "This durable grip hammer has a fiberglass handle to absorb impact and relieve arm strain. Won't crack or splinter. The drop forged polished steel head features a claw that enables you to remove nails with ease and a fiberglass handle that provides a comfortable, shock-absorbing grip.",
      component: ToolComponent
    },
    {
      name: 'Wrench',
      price: 14.99,
      desc: "This 15 in. adjustable wrench is extra-long so you can tackle especially tough fasteners. Featuring a carbon steel construction and a rugged I-beam handle, this adjustable wrench is made for handling big jobs. The jaw design allows for greater strength and a better fit.",
      component: ToolComponent
    },
  ];

  private toolBox: {option: ToolOption, comp: ComponentRef<ToolComponent>}[] = [];

  selectedTool: ToolOption = this.allTools[0];

  constructor(private $scope: angular.IScope, private $element: angular.IRootElementService, private dcfs: DynamicComponentFactoryService) {
    
  }

  addTool(toolSelection: ToolOption) {
    let locationInToolbox = this.toolBox.map(tool => tool.option).indexOf(toolSelection);
    if(locationInToolbox < 0) {
      const compRef = this.dcfs.createComponent<ToolComponent>(toolSelection.component, this.$scope);
      this.$element.append(compRef.component);

      compRef.controller.name = toolSelection.name;
      compRef.controller.price = toolSelection.price;
      compRef.controller.desc = toolSelection.desc;
      compRef.newScope.$on('removeTool', (event, data) => {
        let compref = this.toolBox.filter(tool => tool.comp.newScope === data);
        this.removeOneTool(compRef);
      });

      this.toolBox.push({option: toolSelection, comp: compRef});
    }
    else {
      this.toolBox[locationInToolbox].comp.controller.quant++;
    }
    
    
  }

  removeOneTool(tool: ComponentRef<ToolComponent>) {
    if(tool != null) {
      let locationInToolbox = this.toolBox.map(tool => tool.comp).indexOf(tool);
      if(locationInToolbox > -1) {
        const ctrl = this.toolBox[locationInToolbox].comp.controller;
        if(ctrl.quant > 1) {
          ctrl.quant--;
        }
        else {
          this.dcfs.removeComponent(tool);
          this.toolBox.splice(locationInToolbox,1);
        }
      }
    }
  }

  removeTools(){
    for(let tool of this.toolBox) {
      this.dcfs.removeComponent(tool.comp);
    }
    this.toolBox.splice(0);
  }

  get totalCostOfTools(): number {
    return this.toolBox.length > 0 ? Math.round(
      this.toolBox
      .map(tool => tool.comp.controller.price*tool.comp.controller.quant)
      .reduce((prev, current) => prev + current) *100) / 100 : 0;
  }
}

interface ToolOption {
  name: string;
  price: number;
  desc: string;
  component: angular.IComponentController;
}