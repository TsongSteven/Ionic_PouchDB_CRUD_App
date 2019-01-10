import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NewNotePage } from './new-note';

@NgModule({
  declarations: [
    NewNotePage,
  ],
  imports: [
    IonicPageModule.forChild(NewNotePage),
  ],
})
export class NewNotePageModule {}
