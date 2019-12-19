import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-decrypt',
  templateUrl: './decrypt.component.html',
  styleUrls: ['./decrypt.component.css']
})
export class DecryptComponent implements OnInit {
  message: string;

  constructor() { }

  ngOnInit() {
  }

  decryptimg;
  decrypt (d) {
    let password = "123456789"; //simulated password
    if ( d.value.password == password ) { //check if inputed password is correct
      let link = d.value.id;
      this.decryptimg = "../../assets/img/"+link+".jpg"; //insert the link into the path
      d.resetForm();
    } else {
      this.message = "Password is incorrect";
      setTimeout(() => {
        this.message = null
      }, 2000);
    }
    
  }

}
