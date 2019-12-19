import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(
    private http: HttpClient //insantiate http client for posting
  ) { }

  imgUploader ( payLoad ) {
    return this.http.post("http://localhost/amaka/imgapi.php", payLoad); //uploads images to the specified url (the api)
  }
  
}