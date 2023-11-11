import {Component, Inject, NgModule, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {LaundrystoreDataService} from "../../service/laundrystore-data.service";
import {ActivatedRoute} from "@angular/router";
import {UserManagementDataService} from "../../service/user-management-data.service";
import {CoreService} from "../core/core.service";
import {timeFormatValidator} from "./timeFormatValidator";

interface User {
    name: string;
    value: string;
}

@Component({
    selector: 'app-add-new-store',
    templateUrl: './add-new-store.component.html',
    styleUrls: ['./add-new-store.component.scss']
})
export class AddNewStoreComponent implements OnInit {
    selectUser: any;
    selectedUser: any;
    addNewStoreForm = new FormGroup({
        applicationUserID: new FormControl(''),
        name: new FormControl(''),
        address: new FormControl(''),
        status: new FormControl(''),
        startTime: new FormControl('', [Validators.required, timeFormatValidator()]),
        endTime: new FormControl('', [Validators.required, timeFormatValidator()]),
    })
    enterEmailForm = new FormGroup({
        email: new FormControl('',[Validators.required, Validators.email]),
    })

    constructor(
        private _fb: FormBuilder,
        private _coreService: CoreService,
        private _storeService: LaundrystoreDataService,
        private _dialogRef: MatDialogRef<AddNewStoreComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any,
        private route: ActivatedRoute,
        private _userManagementDataService: UserManagementDataService,
    ) {
    }

    ngOnInit(): void {

    }


    getUserById(userId: string) {
        this._userManagementDataService.getUserById(userId).subscribe((user) => {
            this.selectUser = user;
            console.log(user);
        })
    }

    getUserBy() {
        this._userManagementDataService.getUser().subscribe((user) => {
            this.selectUser = user;
            console.log(user);
        })
    }

    onFormSubmit() {
        if (this.addNewStoreForm.valid) {
            this._storeService.addStore(this.addNewStoreForm.value).subscribe({
                next: (val: any) => {
                    alert('Thêm thành công');
                    this._dialogRef.close(true);
                    location.reload();
                },
                error: (err: any) => {
                    console.error(err);
                }
            })
        }
    }

    onEmailFormSubmit() {
        if (this.enterEmailForm.valid) {
            const emailValue = this.enterEmailForm.get('email').value;
            console.log('Email:', emailValue);
            this._userManagementDataService.getUserByEmail(emailValue).subscribe((user) => {
                this.addNewStoreForm = new FormGroup({
                    applicationUserID: new FormControl(user.data.items[0].id),
                    name: new FormControl(''),
                    address: new FormControl(''),
                    status: new FormControl('true'),
                    startTime: new FormControl('', [Validators.required, timeFormatValidator()]),
                    endTime: new FormControl('', [Validators.required, timeFormatValidator()]),
                })
                console.log(user);
            })
        }
    }

}