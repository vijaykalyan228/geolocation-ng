import { Component, ElementRef, NgZone, OnInit, ViewChild } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { FormControl } from "@angular/forms";
import { MapsAPILoader } from 'angular2-google-maps/core';
import {ActivatedRoute} from "@angular/router";

import {Address} from "./address";
import {} from '@types/googlemaps';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  // lat: number = 51.678418;
  // lng: number = 7.809007;
  title = 'app works!';
  location = {};
  latitude: string;
  longitude: string;
  address: any;
  addressStr: string = "null";
  place: google.maps.places.PlaceResult;
  addr: Address;
  lat: number = Number(this.latitude);
  lng: number = Number(this.longitude);
  public searchControl: FormControl;
  public zoom: number;

  @ViewChild("search")
  public searchElementRef: ElementRef;

  constructor(private http: Http, private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone, private route: ActivatedRoute) { }

  setPosition(position) {
    this.location = position.coords;
    this.latitude = position.coords.latitude;
    this.longitude = position.coords.longitude;
    this.getAddress(this.latitude, this.longitude);

    this.lat = Number(this.latitude);
    this.lng = Number(this.longitude);
    // console.log("lat: "+this.lat+", lng: "+this.lng);
  }

  ngOnInit() {
    this.getIpAddress();

    console.log("User Agent:\t"+navigator.userAgent);

    if (this.addr == null) {
      this.clearAddrComps();
    }
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(this.setPosition.bind(this));
    };
    this.zoom = 4;
    this.lat = 39.8282;
    this.lng = -98.5795;
    this.setCurrentPosition();

    this.searchControl = new FormControl();

    this.mapsAPILoader.load().then(() => {
      let autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement, {
        types: ["address"]
      });
      autocomplete.addListener("place_changed", () => {
        this.ngZone.run(() => {
          //get the place result
          this.place = autocomplete.getPlace();

          //verify result
          if (this.place.geometry === undefined || this.place.geometry === null) {
            return;
          }

          //set latitude, longitude and zoom
          this.lat = this.place.geometry.location.lat();
          this.lng = this.place.geometry.location.lng();
          // this.zipcodeRef.nativeElement = place.address_components["postal_code"];
          var addrComps = this.place.address_components;
          this.populateAddressComponents(addrComps);
          // console.log("Zipcode: "+place.address_components["postal_code"]);
          this.zoom = 12;
        });
      });
    });
  }

  private setCurrentPosition() {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.lat = position.coords.latitude;
        this.lng = position.coords.longitude;
        this.zoom = 12;
      });
    }
  }

  getAddress(latitude: string, longitude: string) {
    this.http.get("https://maps.googleapis.com/maps/api/geocode/json?latlng=" + latitude + "," + longitude)
      // .map(res => res.json())
      .subscribe(
      (response) => {
        //  alert(JSON.stringify(response));
        // console.log(response.json().results[0]);
        this.address = response.json().results[0];
        this.addressStr = this.address.formatted_address;
        let addrComps = this.address.address_components;
        this.populateAddressComponents(addrComps);
      }, //For Success Response
      err => { "Error:\n" + console.error(err) } //For Error Response
      );
  }

  populateAddressComponents(addrComps) {
    this.clearAddrComps();
    for (var i = 0; i < addrComps.length; i++) {
      if ("postal_code" === addrComps[i].types[0]) {
        this.addr.postal_code = addrComps[i].long_name;
      }
      else if ("street_number" === addrComps[i].types[0]) {
        this.addr.street_number = addrComps[i].long_name;
      }
      else if ("route" === addrComps[i].types[0]) {
        this.addr.route = addrComps[i].long_name;
      }
      else if ("locality" === addrComps[i].types[0]) {
        this.addr.locality = addrComps[i].long_name;
      }
      else if ("administrative_area_level_1" === addrComps[i].types[0]) {
        this.addr.administrative_area_level_1 = addrComps[i].long_name;
      }
      else if ("country" === addrComps[i].types[0]) {
        this.addr.country = addrComps[i].long_name;
      }
    }
  }

  clearAddrComps() {
    this.addr = {
      street_number: "", postal_code: "", administrative_area_level_1: "",
      locality: "", country: "", route: ""
    };
  }

  getIpAddress() {
    this.http.get("http://ipv4.myexternalip.com/json")
      .subscribe(
      (response) => {
        console.log("Client IP Address:\t"+response.json().ip);
      }, //For Success Response
      err => { console.error(err) } //For Error Response
      );
  }
}
