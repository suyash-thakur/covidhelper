import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ChartsModule } from 'ng2-charts';
import {MatSnackBar} from '@angular/material/snack-bar';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css', './sb-admin-2.css', '../../../node_modules/font-awesome/css/font-awesome.min.css']
})
export class DashboardComponent implements OnInit {
  state: any;
  city;
  locality: any;

  selectedState: String;
  selectedCity: String;
  selectedLocation: String;
  data: any;
  total: any = 0;
  elecdayCount = 0;
  elecNightCount = 0;
  poorCount = 0;
  rationCount = 0;
  rationShopCount = 0;
  medicalCount = 0;
  suspectCount = 0;
  rulesCount = 0;
  hide = true;
  temp: any;
  stats: any;
durationInSeconds = 5;

  public pieChartLabels = ['Yes', 'NO', ];
 public pieChartType = 'pie';
  public elecDayPie = [0, 0];
  public elecNightPie = [0, 0];

  public poorPie = [0, 0];
  public rationPie = [0, 0];
  public rationShopPie = [0, 0];
  public MedicalPie = [0, 0];

  public suspectPie = [0, 0];
  public rulesPie = [0, 0];

  cases = 0;
  deaths = 0;
  recovered = 0;
  problem = [];

  constructor(private http: HttpClient, private _snackBar: MatSnackBar ) { }

  ngOnInit() {

    let headers: HttpHeaders = new HttpHeaders();
    headers = headers.append('x-rapidapi-host', 'covid-193.p.rapidapi.com');
    headers = headers.append('x-rapidapi-key', 'f82a79729dmshb9a395a4966fae0p1dc999jsneb3b8c2c710c');
    this.http.get('https://covid-193.p.rapidapi.com/statistics', {headers}).subscribe(
      res => {
        this.stats = res;
        console.log(this.stats);
        this.cases = this.stats.response[42].cases.total;
        this.deaths = this.stats.response[42].deaths.total;
        this.recovered = this.stats.response[42].cases.recovered;
      }
    );

      this.onAllInfo();
    this.http.get('https://peaceful-shore-40795.herokuapp.com/user/state').subscribe(
      (res: any[] )=> {
        var ids = [];
        this.temp = res;


          this.temp = this.temp.filter(function(o) {
            if (ids.indexOf(o.state) !== -1) return false;
            ids.push(o.state);
            return true;
        });
          this.state = this.temp;



      }
    );

  }


  onChange(Value: string) {
    console.log(Value);
    this.selectedState = Value;
    this.http.get('https://peaceful-shore-40795.herokuapp.com/user/city' + Value).subscribe(
      res => {
        var ids = [];
        console.log(res);
        this.temp = res;
        let result = [];
        this.temp = this.temp.filter(function(o) {
          if (ids.indexOf(o.city) !== -1) return false;
          ids.push(o.city);
          return true;
      });
        this.city = this.temp;
        console.log(this.city);

      }
    );
}
onChangeCity(Value: string) {
  console.log(Value);
  this.selectedCity = Value;
  const state = {
    state: Value
  };
  this.http.get('https://peaceful-shore-40795.herokuapp.com/user/locality' + Value).subscribe(
    res => {
      console.log(res);
      this.temp = res;
      let result = [];
      var ids = [];

      this.temp = this.temp.filter(function(o) {
        if (ids.indexOf(o.locality) !== -1) return false;
        ids.push(o.locality);
        return true;
    });
      this.locality = this.temp;
    }
  );
}
onChangelocality(Value: string) {
  console.log(Value);
  this.selectedLocation = Value;
  this.http.get('https://peaceful-shore-40795.herokuapp.com/user/info/' + this.selectedLocation + '/' + this.selectedCity + '/' + this.selectedState).subscribe(
    res => {
      console.log(res);
      this.data = res;
      this.data.forEach(element => {
        if(element.addqust) {
          this.problem.push(element.addqust);
        }
      });
      this.createchart();
    }
  );

}
onAllInfo() {

  this.http.get('https://peaceful-shore-40795.herokuapp.com/user/allUser').subscribe(
    res => {
      console.log(res);
      this.data = res;
      this.createchart();
    }
  );

}

createchart() {
  this.elecdayCount = 0;
  this.elecNightCount = 0;
  this.poorCount = 0;
  this.rationCount = 0;
  this.suspectCount = 0;
  this.rulesCount = 0;
  this.medicalCount = 0;
  this.total = 0;
  this.data.forEach(element => {
    this.total = this.total + 1;
    if ( element.electricityDay === 'Yes') {
      this.elecdayCount = this.elecdayCount + 1;
    }
    if ( element.electricityNight === 'Yes') {
      this.elecNightCount = this.elecNightCount + 1;
    }
    if ( element.poor === 'Yes') {
      this.poorCount = this.poorCount + 1;
    }
    if ( element.ration === 'Yes') {
      this.rationCount = this.rationCount + 1;
    }
    if ( element.suspect === 'Yes') {
      this.suspectCount = this.suspectCount + 1;
    }
    if ( element.rules === 'Yes') {
      this.rulesCount = this.rulesCount + 1;
    }
    if ( element.medical === 'Yes') {
      this.medicalCount = this.medicalCount + 1;
    }

  });
  this.elecDayPie = [this.elecdayCount, this.total - this.elecdayCount];
  this.elecNightPie = [this.elecNightCount, this.total - this.elecNightCount];
  this.poorPie = [this.poorCount, this.total - this.poorCount];
  this.suspectPie = [this.suspectCount, this.total - this.suspectCount];
  this.rulesPie = [this.rulesCount, this.total - this.rulesCount];
  this.rationPie = [this.rationCount, this.total - this.rationCount];
  this.rationShopPie = [this.rationCount, this.total - this.rationCount];
  this.MedicalPie = [this.medicalCount, this.total - this.medicalCount];
  this.hide = false;
}
}
