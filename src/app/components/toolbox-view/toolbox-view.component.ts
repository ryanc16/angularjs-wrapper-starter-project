import { Component } from '../../annotations/component.annotation';
import { ModalDialogService } from '../dialog/modal-dialog.service';
import { ToolModel } from './tool/tool.model';
import { ConfirmDialogComponent } from '../dialog/confirm-dialog/confirm-dialog.component';


@Component({
  selector: 'toolbox-view',
  templateUrl: 'toolbox-view.component.html',
  stylesUrl: 'toolbox-view.component.css',
  providers: ['$scope', ModalDialogService]
})
export class ToolboxViewComponent implements angular.IOnInit {

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

  private toolBox: ToolModel[] = [];

  selectedTool: ToolModel = this.allTools[0];

  constructor(private $scope: angular.IScope, private dialogService: ModalDialogService) {

  }

  $onInit(): void {

  }

  addTool(toolSelection: ToolModel) {
    let locationInToolbox = this.toolBox.indexOf(toolSelection);
    if(locationInToolbox < 0) { 
      this.toolBox.push(toolSelection);
    }
  }

  removeOneTool(tool: ToolModel) {
    if(tool != null) {
      let locationInToolbox = this.toolBox.indexOf(tool);
      if(locationInToolbox > -1) {
          this.toolBox.splice(locationInToolbox,1);
      }
    }
  }

  removeTools(){
    const ref = this.dialogService.createDialog<ConfirmDialogComponent>(ConfirmDialogComponent, this.$scope);
    ref.controller.options =  {title: 'Hold up!', message: 'Are you sure you want to empty the toolbox?'};
    ref.controller.getScope().$on('choice', (event, data) => {
      if(data) {
        this.toolBox.splice(0);
      }
      this.dialogService.destroyDialog();
    });
  }

  get totalCostOfTools(): number {
    return this.toolBox.length > 0 ? Math.round(
      this.toolBox
      .map(tool => tool.price)
      .reduce((prev, current) => prev + current) * 100) / 100 : 0;
  }
}