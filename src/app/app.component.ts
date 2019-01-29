import { Component } from './decorators/component.decorator';

@Component({
  selector: 'app-component',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  constructor() {
  }
}