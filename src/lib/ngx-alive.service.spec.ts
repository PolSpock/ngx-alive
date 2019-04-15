import { TestBed } from '@angular/core/testing';

import { NgxAliveService } from './ngx-alive.service';
import { NgxAliveModule } from './ngx-alive.module';
import { NgxAliveComponent } from './ngx-alive.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { Overlay } from '@angular/cdk/overlay';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('NgxAliveService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({}).compileComponents();
  });

  it('should be created', () => {
    const service: NgxAliveService = TestBed.get(NgxAliveService);
    expect(service).toBeTruthy();
  });
});
