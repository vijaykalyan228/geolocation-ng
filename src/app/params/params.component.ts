import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-params',
  templateUrl: './params.component.html',
  styleUrls: ['./params.component.css']
})
export class ParamsComponent implements OnInit {

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {console.log("Product Name:\t"+ params['productName'] || 'None')});
    this.route.queryParams.subscribe((params) => {console.log("Category:\t"+ params['category'] || 'None')});
    this.route.queryParams.subscribe((params) => {console.log("Customer Type:\t"+ params['customerType'] || 'None')});
  }

}
