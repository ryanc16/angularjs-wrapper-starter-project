import { NgModule } from './annotations/module.annotation';
import { AppComponent } from './app.component';
import { ToolboxViewModule } from './components/toolbox-view/toolbox-view.module';
import { HttpRequestService } from './services/http-request.service';

@NgModule({
  declarations: [
    AppComponent
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