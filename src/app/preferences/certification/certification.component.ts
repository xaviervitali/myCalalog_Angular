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
  @Input() userCertificationLte = 'null';
  @Input() disclaimer = true;
  @Output()  certificationChange = new EventEmitter<string>();


  ngOnInit(): void {
    // this.userCertificationLte = String(
    //   this.userService.getOption('certification.lte')
    // );
  }

  handleAgeLimitChange(event: MatRadioChange) {
    this.certificationChange.emit(event.value)
    // if (this.setUserSetting) {
    //   const value = event.value;
    //   if (!!event.value) {
    //     this.userService.setOption('certification.lte', value);
    //   } else {
    //     this.userService.removeOption('certification.lte');
    //   }
    // }
  }
}
