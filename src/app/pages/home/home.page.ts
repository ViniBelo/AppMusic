import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Song } from 'src/app/models/song';
import { SongsService } from 'src/app/services/songs.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  songs : Song[];
  constructor(private router : Router, private songsService : SongsService) { 
    this.songs = songsService.songs;
  }

  ngOnInit() {
  }
  goToDetails(song : Song){
    this.router.navigateByUrl("/details",
    {state : {objeto : song}});
  }

}
