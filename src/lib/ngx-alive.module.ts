import { NgModule } from '@angular/core';
import { NgxAliveComponent } from './ngx-alive.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import 'hammerjs';
import { Overlay } from '@angular/cdk/overlay';
import { MatIconModule } from '@angular/material/icon';
import {MatDividerModule} from '@angular/material/divider';
import {MatTooltipModule} from '@angular/material/tooltip';

@NgModule({
  declarations: [NgxAliveComponent],
  imports: [
    BrowserAnimationsModule,
    MatButtonModule,
    MatIconModule,
    MatDividerModule,
    MatTooltipModule,
  ],
  providers: [
    Overlay,
  ],
  exports: [NgxAliveComponent]
})
export class NgxAliveModule { }
