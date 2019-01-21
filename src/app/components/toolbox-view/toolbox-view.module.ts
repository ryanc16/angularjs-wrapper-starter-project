import { NgModule } from '../../annotations/module.annotation';
import { ToolComponent } from './tool/tool.component';
import { ToolboxViewComponent } from './toolbox-view.component';
import { DynamicComponentFactoryService } from '../../services/dynamic-component-factory.service';

@NgModule({
  declarations: [
    ToolboxViewComponent,
    ToolComponent
  ],
  providers: [
    DynamicComponentFactoryService
  ],
  exports: [
    ToolboxViewComponent,
    ToolComponent
  ]
})
export class ToolboxViewModule {

}