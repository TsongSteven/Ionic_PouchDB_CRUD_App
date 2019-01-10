import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import  PouchDB  from 'pouchdb';
import { ToastController } from 'ionic-angular';

/**
 * Generated class for the NewNotePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-new-note',
  templateUrl: 'new-note.html',
})
export class NewNotePage {


  public title: string ="";
  public lyrics: string="";
  private db;
  private _lyrics;

  constructor(public navCtrl: NavController, public navParams: NavParams, private toastCtrl: ToastController) {
  }

  setupDB(){

    this.db = new PouchDB('lyricsDB');

  }
  ionViewDidLoad() {
    
    this.setupDB();

    if(this.navParams.get('lyricsList_id') != null){

      this.db.get(this.navParams.get('lyricsList_id'),(err, result)=>{

        if(!err){

          this._lyrics = result;
          this.title = result.title;
          this.lyrics = result.lyrics;
        }
      });
    }
    
  }
 
  save(){
      if(this.title ==''){

        const toastTitle = this.toastCtrl.create({

          message:'Lyrics Title Cannot be Empty!!',
          duration: 3000
        });
        toastTitle.present();
      }
      else if(this.lyrics ==''){

        const toastLyrics = this.toastCtrl.create({

          message:'Lyrics Cannot be Empty!!',
          duration: 3000
        });
        toastLyrics.present();
      }
      else if(this.title =='' && this.lyrics==''){

        const toastTitleLyrics = this.toastCtrl.create({

          message:'Title and Lyrics are mandatory!!!',
          duration: 3000
        });
        toastTitleLyrics.present();
      }
      else{

        if(this._lyrics){

          this._lyrics.title = this.title,
          this._lyrics.lyrics = this.lyrics
  
          this.db.put( this._lyrics ,(err, result)=>{
  
            if(!err){
              
              this.navCtrl.pop();
             let toast = this.toastCtrl.create({
  
              message: 'Edited Successfully!!!',
              position: 'top',
              duration: 3000
             });
             toast.present();
             
            }
          })
        }
        else{
  
          this.db.post({
  
            title: this.title,
            lyrics: this.lyrics
    
          },(err, result)=>{
    
            if(!err){
              this.navCtrl.pop();
              let toast = this.toastCtrl.create({
  
                message: 'Saved Successfully!!!',
                position: 'top',
                duration: 3000
              });
              toast.present();
            }
          });
        }

      }
  }

  cancel(){

    this.navCtrl.pop();
  }

}
