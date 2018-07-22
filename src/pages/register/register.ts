import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';

import { AngularFireAuth } from 'angularfire2/auth'
import { User } from '../../module/user';
import { LoginPage } from '../login/login';

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {


  user = {} as User;

  constructor(private toast : ToastController ,  private fireAuth: AngularFireAuth, public navCtrl: NavController, public navParams: NavParams) {
  }

   async register(user: User) {

    try {
      const info = await this.fireAuth.auth.createUserWithEmailAndPassword(user.email, user.password)

      if (info) {
        this.navCtrl.setRoot(LoginPage);
      }
    } 
    catch(e) {
      this.toast.create({
        message : "All field ard required ! Password MUST be at least 6 character long. ",
        duration : 4000,
        cssClass : "error"
      }).present();    }

  }


}
