import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Song } from 'src/app/models/song';
import { SongFirebaseService } from 'src/app/services/song-firebase.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  songs : Song[];
  constructor(private router : Router,
    private songsFS : SongFirebaseService) { 
    this.loadSongs()
  }

  loadSongs() {
    this.songsFS.getSongs().subscribe(res =>{
      this.songs = res.map(s => {
        return{
          id: s.payload.doc.id,
          ...s.payload.doc.data() as Song
        } as Song
      })
    })
  }

  goToAddSongs() {
    this.router.navigate(['/cadastrar'])
  }

  ngOnInit() {
  }
  goToDetails(song : Song){
    this.router.navigateByUrl("/details",
    {state : {objeto : song}});
  }

}
