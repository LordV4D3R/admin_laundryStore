import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {StaffDataService} from "../../service/staff-data.service";

@Component({
  selector: 'app-staff-detail',
  templateUrl: './staff-detail.component.html',
  styleUrls: ['./staff-detail.component.scss']
})
export class StaffDetailComponent implements OnInit {
  selectStaff: any;
  imageUrl: string;
  constructor(
      private route: ActivatedRoute,
      private staffDataService: StaffDataService,
  ) { }

  ngOnInit(): void {
  }

  getStaffById() {
    const staffId = this.route.snapshot.paramMap.get('id');
    this.staffDataService.getStaffById(staffId).subscribe((staff) => {
      this.selectStaff = staff;
      this.imageUrl = staff.data.applicationUser.imageUrl
      console.log(staff);
    })
  }
}
