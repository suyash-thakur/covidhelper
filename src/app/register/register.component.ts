import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MouseEvent, GoogleMapsAPIWrapper, MarkerManager, MapsAPILoader } from '@agm/core';
import { HttpClient } from '@angular/common/http';
import { SessionService } from '../session.service';
import { Router } from '@angular/router';


declare let google: any;

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css', './sb-admin-2.css', '../../../node_modules/font-awesome/css/font-awesome.min.css'],
})
export class RegisterComponent implements OnInit {
  isLinear = false;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  thirdFormGroup: FormGroup;
  fourthFormGroup: FormGroup;

  verify = false;
  lat: number = -23.8779431;
  lng: number = -49.8046873;
  zoom: number = 15;
  address: any;
  result: any;
  list: number[] = [];
  suspect: any;
  poor: any;
  electricity: any;
  rules: any;
  ration: any;
  discription: any;
  textarea: any = [];
  value: any;
  problem: any;
  electricityDay; any;
  electricityNight: any;
  rationShop: any;
  medical: any;
  addqust: any ;



  count = 0;
  seasons: string[] = ['Winter', 'Spring', 'Summer', 'Autumn'];


  constructor(private _formBuilder: FormBuilder, private mapsAPILoader: MapsAPILoader, private http: HttpClient, private register: SessionService, public route: Router) { }

  ngOnInit() {
    navigator.geolocation.getCurrentPosition(res => {

        this.lat = res.coords.latitude;
        this.lng = res.coords.longitude;
        this.zoom =  15;
        this.getAddress(this.lat, this.lng);

    });
    this.firstFormGroup = this._formBuilder.group({

      firstCtrl: ['', Validators.required]



    });
    this.secondFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required],
      thirdCtrl: ['', Validators.required],
      fourthCtrl: ['', Validators.required],
    });
    this.thirdFormGroup = this._formBuilder.group({
      thirdCtrl: ['', Validators.required]
    });
    this.fourthFormGroup = this._formBuilder.group({
      firstCtrl: ['']
    });
  }

  getAddress( lat: number, lng: number ) {
    console.log('Finding Address');
    if (navigator.geolocation) {
      let geocoder = new google.maps.Geocoder();
      let latlng = new google.maps.LatLng(lat, lng);
      let request = { latLng: latlng };
      geocoder.geocode(request, (results, status) => {
        if (status === google.maps.GeocoderStatus.OK) {
          this.result = results[0];
          let rsltAdrComponent = this.result.address_components;
          console.log(this.result);
          let resultLength = rsltAdrComponent.length;
          if (this.result != null) {
            let i = this.result.address_components.length;
            this.secondFormGroup.controls.firstCtrl.setValue(this.result.address_components[i - 5].long_name);
            this.secondFormGroup.controls.thirdCtrl.setValue(this.result.address_components[i - 4].long_name);
            this.secondFormGroup.controls.fourthCtrl.setValue(this.result.address_components[i - 3].long_name);



          } else {
            alert('No address available!');
          }
        }
      });

  }

  }
  add() {
    this.count = this.count + 1;
    this.list.push(this.count);

  }
  submit() {
    console.log(this.addqust);
    const User = {
      phone: this.firstFormGroup.controls.firstCtrl.value,
      locality: this.secondFormGroup.controls.firstCtrl.value,
      street: '',
      city: this.secondFormGroup.controls.thirdCtrl.value,
      state: this.secondFormGroup.controls.fourthCtrl.value,
      electricityDay: this.electricityDay,
      electricityNight: this.electricityNight,
      medical: this.medical,
      poor: this.poor,
      ration: this.ration,
      rationShop: this.rationShop,
      suspect: this.suspect,
      rules: this.rules,
      description: this.fourthFormGroup.controls.firstCtrl.value,
      addqust: this.addqust

    };
    this.http.post('https://peaceful-shore-40795.herokuapp.com/user/createUser', User).subscribe(
      res => {
        console.log(res);
        localStorage.setItem('registered', 'true');
        this.register.isRegistered = true;
        this.route.navigate(['/dashboard']);

      }
    );

  }
}
