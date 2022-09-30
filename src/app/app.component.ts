import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public appPages = [
    { title: 'Songs', url: '/home', icon: 'heart' },
    { title: 'Add Songs', url: '/cadastrar', icon: 'add' },
  ];
  constructor() {}
}
