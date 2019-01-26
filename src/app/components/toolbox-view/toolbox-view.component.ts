import { Component } from '../../annotations/component.annotation';
import { ToolComponent } from './tool/tool.component';
import { ToolModel } from './tool/tool.model';
import { ComponentRef, DynamicComponentFactoryService } from '../../services/dynamic-component-factory.service';
import { ViewChild } from '../../annotations/viewchild.annotation';


@Component({
  selector: 'toolbox-view',
  templateUrl: 'toolbox-view.component.html',
  stylesUrl: 'toolbox-view.component.css',
  providers: ['$scope', DynamicComponentFactoryService]
})
export class ToolboxViewComponent implements angular.IOnInit {

  @ViewChild('tools', { readAs: 'JQLite'})
  private toolElRef: JQLite;

  private allTools: ToolModel[] = [
    {
      name: 'Hammer',
      price: 4.99,
      desc: "This durable grip hammer has a fiberglass handle to absorb impact and relieve arm strain. Won't crack or splinter. The drop forged polished steel head features a claw that enables you to remove nails with ease and a fiberglass handle that provides a comfortable, shock-absorbing grip."
    },
    {
      name: 'Wrench',
      price: 14.99,
      desc: "This 15 in. adjustable wrench is extra-long so you can tackle especially tough fasteners. Featuring a carbon steel construction and a rugged I-beam handle, this adjustable wrench is made for handling big jobs. The jaw design allows for greater strength and a better fit."
    },
    {
      name: 'Phillips Screwdriver',
      price: 1.69,
      desc: "This durable Phillips screwdriver is a staple for any toolbox. The chrome vanadium steel construction is rugged enough for even the most stubborn screws and a textured TPR grip handle provides plenty of control and comfort."
    }
  ];

  private toolBox: {option: ToolModel, comp: ComponentRef<ToolComponent>}[] = [];

  selectedTool: ToolModel = this.allTools[0];

  constructor(private $scope: angular.IScope, private dcfs: DynamicComponentFactoryService) {

  }

  $onInit(): void {

  }

  addTool(toolSelection: ToolModel) {

    let locationInToolbox = this.toolBox.map(tool => tool.option).indexOf(toolSelection);
    if(locationInToolbox < 0) {
      const compRef = this.dcfs.createComponent<ToolComponent>(ToolComponent, this.$scope);
      this.toolElRef.append(compRef.component);

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