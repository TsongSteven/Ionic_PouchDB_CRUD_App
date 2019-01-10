import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { NewNotePage } from '../new-note/new-note';
import  PouchDB  from 'pouchdb';
import { AlertController } from 'ionic-angular';
import { ShowLyricsPage } from '../show-lyrics/show-lyrics';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {


  public lyricsList;
  public lyricsList_id;
  private db;

  constructor(public navCtrl: NavController, public alertCtrl: AlertController) {

  }

  addNewLyrics(){

        this.navCtrl.push(NewNotePage);

  }

  getlyricsList(){
      

      this.db = new PouchDB('lyricsDB');
      this.lyricsList = [];

      this.db.allDocs({include_docs: true},(err, result)=>{

        if(!err){

          let rows =result.rows;
          
          for(let i =0; i<rows.length; i++){

            this.lyricsList.push(rows[i].doc);
          }
        }
      })

  }
  ionViewDidEnter(){
   
    this.getlyricsList();
  }
  edit(lyrics){

      this.navCtrl.push(NewNotePage,{

        lyricsList_id : lyrics._id 

      });


  }


  delete(lyrics){

    let alert = this.alertCtrl.create({

      title: 'Are You Sure?',
      message: 'Are you sure you want to permanently delete this Lyrics?',
      buttons: [
        {
          text: 'No',
          handler: ()=>{
            this.getlyricsList();
          }
        },
        {
          text: 'Yes',
          handler: ()=>{
            this.db.remove(lyrics, (err, result)=>{

              if(!err){
                this.getlyricsList();
              }
            });
            
          }
        }
      ]
    });
    alert.present();
  }

  viewLyrics(lyrics){

    this.navCtrl.push(ShowLyricsPage,{
      lyricsList_id : lyrics._id 
    });
  }

}
