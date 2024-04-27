import { UserService } from './../../../_services/user.service';
import { MatRadioChange, MatRadioModule } from '@angular/material/radio';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-certification',
  standalone: true,

  imports: [MatRadioModule, CommonModule],
  templateUrl: './certification.component.html',
  styleUrl: './certification.component.css',
})
export class CertificationComponent implements OnInit {
  @Input() setUserSetting = true;
  @Input() disclaimer = true;
  @Output() valueChange = new EventEmitter<string>();

  public userCertificationLte: string = '';

  constructor(private userService: UserService) {}
  ngOnInit(): void {
    this.userCertificationLte = String(
      this.userService.getOption('certification.lte')
    );
  }

  handleAgeLimitChange(event: MatRadioChange) {
    if (this.setUserSetting) {
      const value = event.value;
      if (!!event.value) {
        this.userService.setOption('certification.lte', value);
      } else {
        this.userService.removeOption('certification.lte');
      }
    }
  }
}
