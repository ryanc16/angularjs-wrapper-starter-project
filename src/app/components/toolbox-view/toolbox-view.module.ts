import { NgModule } from '../../decorators/module.decorator';
import { DialogModule } from '../dialog/dialog.module';
import { ToolComponent } from './tool/tool.component';
import { ToolboxViewComponent } from './toolbox-view.component';

@NgModule({
  declarations: [
    ToolboxViewComponent,
    ToolComponent,
  ],
  providers: [
    
  ],
  imports: [
    DialogModule
  ],
  exports: [
    ToolboxViewComponent,
    ToolComponent
  ]
})
export class ToolboxViewModule {

}