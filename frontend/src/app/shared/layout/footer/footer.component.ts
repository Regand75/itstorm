import { Component, OnInit } from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {PopupComponent} from "../../components/popup/popup.component";
import {FragmentService} from "../../services/fragment.service";

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  constructor(private dialog: MatDialog,
              private fragmentService: FragmentService) { }

  ngOnInit(): void {
  }

  openOrderConsultation(): void {
    this.dialog.open(PopupComponent, {
      width: '727px',
      data: {
        openRequestService: false,
      }
    });
  }

  scrollTo(fragment: string): void {
    this.fragmentService.goToFragment(fragment);
  }
}
