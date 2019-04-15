import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NgxAliveComponent } from './ngx-alive.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { Overlay } from '@angular/cdk/overlay';
import { NgxAliveModule } from './ngx-alive.module';

describe('NgxAliveComponent', () => {
  let component: NgxAliveComponent;
  let fixture: ComponentFixture<NgxAliveComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        NgxAliveModule,
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NgxAliveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
