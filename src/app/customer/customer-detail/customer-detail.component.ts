import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {CustomerDataService} from "../../service/customer-data.service";


@Component({
  selector: 'app-customer-detail',
  templateUrl: './customer-detail.component.html',
  styleUrls: ['./customer-detail.component.scss']
})
export class CustomerDetailComponent implements OnInit {
  selectCustomer: any;
  imageUrl: string;
  constructor(
      private route: ActivatedRoute,
      private customer: CustomerDataService,
  ) {
  }

  ngOnInit(): void {
    this.getCustomerById();
  }

  getCustomerById() {
    const customerId = this.route.snapshot.paramMap.get('id');
    this.customer.getCustomerById(customerId).subscribe((customer) => {
      this.selectCustomer = customer;
      this.imageUrl = customer.data.applicationUser.imageUrl
      console.log(customer);
    })
  }

}
