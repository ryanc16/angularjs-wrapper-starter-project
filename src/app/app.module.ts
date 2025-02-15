import { NgModule } from './decorators/module.decorator';
import { AppComponent } from './app.component';
import { ToolboxViewModule } from './components/toolbox-view/toolbox-view.module';
import { HttpRequestService } from './services/http-request.service';
import { TemplateIdDirective } from './directives/template-id.directive';

@NgModule({
  declarations: [
    AppComponent,
    TemplateIdDirective
  ],
  providers: [
    HttpRequestService
  ],
  imports: [
    ToolboxViewModule
  ],
  bootstrap: [AppComponent] //TODO: this is not currently doing anything. still a manual process to put it into the index.html
})
export class AppModule {}