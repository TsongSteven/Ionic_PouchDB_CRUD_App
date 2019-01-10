import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import  PouchDB  from 'pouchdb';

/**
 * Generated class for the ShowLyricsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-show-lyrics',
  templateUrl: 'show-lyrics.html',
})
export class ShowLyricsPage {

  public title;
  public lyrics;
  private db;
  private _lyrics;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  setupDB(){

    this.db = new PouchDB('lyricsDB');

  }

  ionViewDidLoad() {
    
    this.setupDB();

    this.db.get(this.navParams.get('lyricsList_id'),(err, result)=>{

        this._lyrics = result;
        this.title = result.title;
        this.lyrics = result.lyrics;
    });

  }

}
