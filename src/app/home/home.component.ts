import { Component, OnInit } from '@angular/core';
import { DataService } from '../service/data.service'; //import service file

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  imgno: number = localStorage.length; //get the number of data saved in the localStorage (uploaded image data is saved in the localStorage)
  uploaded; //array that will hold data from the localStorage
  message: string; //holds message string to be alerted to the user
  error: string; //holds error message

  constructor(
    public data: DataService //instantiates the data service
  ) { }

  ngOnInit() {
    this.onLoad(); //calls the onLoad function
  }

  onLoad () {
    if ( this.imgno != 0 ) { //if there is at least a data saved in localStorage, run a while loop that pushes the data into an array
      let i = 1;
      this.uploaded = [];
      while ( i <= this.imgno ) {
        if ( localStorage.getItem(JSON.stringify(i)) ) {
          let get = JSON.parse(localStorage.getItem(JSON.stringify(i))).name;
          this.uploaded.push(get);
        } else {
          i ++;
          continue;
        }
        i ++;
      }
    }
  }

  //opens modal for uploading image
  modal;
  openModal () {
    this.modal = document.getElementById('modaldiv');
    this.modal.style.display = 'block'; //change the display value of the modal div from none to block
  }

  //closes modal
  closeModal (a) {
    this.modal.style.display = 'none';
    this.removeImage(); //call function to remove selected image incase if image was selected
    a.reset(); //reset the modal form when modal is closed
  }

  //when image is selected
  file;
  imgFile;
  reader;
  onChange ( event ) {
    event.target != undefined ? this.file = event.target.files[0] : this.file = "" ; //get the selected image

    if ( this.file != "" ) {
      this.reader = new FileReader(); //instantiate FileReader to read the image
      this.reader.readAsDataURL(this.file);
      this.reader.onload = (x: any) => { //to get the image for preview
        this.imgFile = x.target.result;
      }
    }
    
  }

  //to remove the image displayed. Incase the user wants to choose another image
  removeImage () {
    (<HTMLInputElement>document.getElementById('file')).value = ""; //reset the file input
    this.imgFile = null //empty the imgFile
  }

  //SUBMIT form
  submit (a) {
    const fd = new FormData(); //instantiate form data
    fd.append("file", this.file, this.file.name); //appending metadata to the file

    let i = localStorage.length;
    this.data.imgUploader(fd).subscribe(
      res => {
        if ( res['code'] == '00') {
          let info = {
            name: this.file.name,
            id: res['message'] //generated ID of the uploaded image
          }
          localStorage.setItem(JSON.stringify(i + 1), JSON.stringify(info));
          location.reload();
        } else {
          this.error = res['message'];

          setTimeout(() => {
            this.error = null;
          }, 3000);
        }
        
      }
    )
  }

  //to copy an ID
  copyID (i) {
    var copyText = localStorage.getItem(JSON.stringify(i + 1))
    var textArea = document.createElement("textarea");
    textArea.value = JSON.parse(copyText).id;
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand("Copy");
    textArea.remove();
    copyText ? this.message = 'ID copied' : this.message = null;

    setTimeout(() => {
      this.message = null
    }, 2000);
  }

}
