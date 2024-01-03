import { CommonModule } from '@angular/common';
import { Component, Input, NgModule, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit {
  @Input() title: string = 'SerieSapiens';
  @Input() showBackButton: boolean = false;

  constructor() { }

  ngOnInit() { }
}

@NgModule({
  imports: [IonicModule, CommonModule],
  declarations: [HeaderComponent],
  exports: [HeaderComponent],
})
export class HeaderModule { }
