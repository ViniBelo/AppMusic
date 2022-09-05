import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public appPages = [
    { title: 'Artists', url: '/folder/Artists', icon: 'people' },
    { title: 'Albums', url: '/folder/Albums', icon: 'albums' },
    { title: 'Favorites', url: '/folder/Favorites', icon: 'heart' },
    { title: 'Playlists', url: '/folder/Playlists', icon: 'musical-note' },
    { title: 'Genre', url: '/folder/Genre', icon: 'musical-notes' },
    { title: 'Add Songs', url: 'folder/Add', icon: 'add' },
  ];
  constructor() {}
}
