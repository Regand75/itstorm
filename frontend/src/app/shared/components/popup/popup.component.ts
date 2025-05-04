import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {RequestService} from "../../services/request.service";
import {DefaultResponseType} from "../../../../types/default-response.type";
import {HttpErrorResponse} from "@angular/common/http";

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.scss']
})
export class PopupComponent implements OnInit {

  isOpenOrderConsultation: boolean = false;
  isOpenRequestService: boolean = true;
  isSuccessRequest: boolean = false;
  isOpenError: boolean = false;
  selectedService: string = '';
  allServices: string[] = [];
  applicationForm = this.fb.group({
    service: [this.data?.selectedService || ''],
    name: ['', [Validators.required]],
    phone: ['', [Validators.required]],
  });

  constructor(private fb: FormBuilder,
              private requestService: RequestService,
              private dialogRef: MatDialogRef<PopupComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) {
    this.selectedService = data.selectedService;
    this.allServices = data.allServices;
    this.isOpenRequestService = data.openRequestService ?? false;
    this.isOpenOrderConsultation = !this.isOpenRequestService;
  }

  ngOnInit(): void {
  }

  submitApplication(): void {
    if (this.applicationForm.valid && this.applicationForm.value.name && this.applicationForm.value.phone && this.applicationForm.value.service) {
      this.requestService.addRequest(this.applicationForm.value.name, this.applicationForm.value.phone, 'order', this.applicationForm.value.service)
        .subscribe({
          next: (request: DefaultResponseType) => {
            if (request.error) {
              this.isOpenError = true;
              return;
            }
            this.isOpenOrderConsultation = false;
            this.isSuccessRequest = true;
          },
          error: (errorResponse: HttpErrorResponse) => {
            if (errorResponse.error && errorResponse.error.message) {
              this.isOpenError = true;
            } else {
              this.isOpenError = true;
            }
          }
        });
    }
  }

  orderConsultation(): void {
    if (this.applicationForm.valid && this.applicationForm.value.name && this.applicationForm.value.phone) {
      this.requestService.addRequest(this.applicationForm.value.name, this.applicationForm.value.phone, 'consultation')
      .subscribe({
        next: (request: DefaultResponseType) => {
          if (request.error) {
            this.isOpenError = true;
            return;
          }
          this.isOpenOrderConsultation = false;
          this.isSuccessRequest = true;
        },
        error: (errorResponse: HttpErrorResponse) => {
          if (errorResponse.error && errorResponse.error.message) {
            this.isOpenError = true;
          } else {
            this.isOpenError = true;
          }
        }
      });
    }
  }

  closePopup(): void {
    this.dialogRef.close();
  }

}
