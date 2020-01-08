import { Component, OnInit } from '@angular/core';
import { HttpClientModule, HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-value',
  templateUrl: './value.component.html',
  styleUrls: ['./value.component.css']
})
export class ValueComponent implements OnInit {
  values: any;

  constructor( private http: HttpClient) { }

  ngOnInit() {
    this.getValues();
  }
  getValues() {
    this.http.get('https://localhost:44367/api/Values').subscribe(Response => {
      this.values = Response;
    }, error => {
       console.log(error);
      });
  }

}
