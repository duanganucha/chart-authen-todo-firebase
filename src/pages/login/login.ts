import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth' 
import { User } from '../../module/user'
import { RegisterPage } from '../register/register';
import { TabsPage } from '../tabs/tabs';

@IonicPage()  
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  user = {} as User;

  constructor(private toast : ToastController,  private fireAuth : AngularFireAuth,  public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  async login(user: User) {

    try {
      const info = await this.fireAuth.auth.signInWithEmailAndPassword(user.email, user.password)

      if (info) {
        await this.navCtrl.setRoot(TabsPage);
      }
    } 
    catch(e) {
      this.toast.create({
        message : "Invalid email or password",
        duration : 3000,
        cssClass : "error"
      }).present();
    }

  }

  register(){
    this.navCtrl.push(RegisterPage)
  }

}
