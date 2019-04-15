import { Input } from '@angular/core';
import * as IsUrl from 'is-url';
import {
  Component,
  ViewChild,
  TemplateRef,
  AfterViewInit,
  ViewContainerRef,
  OnDestroy,
} from '@angular/core';
import {Overlay, OverlayRef} from '@angular/cdk/overlay';
import {TemplatePortal} from '@angular/cdk/portal';
import { AliveUrlParams } from './alive-url-params';

@Component({
  selector: 'lib-ngx-alive',
  templateUrl: 'ngx-alive.component.html',
  styleUrls: ['ngx-alive.component.css']
})
export class NgxAliveComponent implements AfterViewInit, OnDestroy {
  @ViewChild(TemplateRef) dialogTemplate: TemplateRef<any>;
  private overlayRef: OverlayRef;
  private portal: TemplatePortal;
  private isUrl = IsUrl;

  @Input() supportMail = '';
  @Input() checkInterval = 5;
  @Input() urlsParams: Array<AliveUrlParams> = [];

  public aliveStatus = 'alive-status-red';
  public alivePulse = 'pulse-red';
  public urlsRequested: Array<object> = [];
  public resume = {
    service: 0,
    hs: 0,
    priorityPoint: 0,
    hsPriorityPoint: 0,
  };

  constructor(private overlay: Overlay, private viewContainerRef: ViewContainerRef) {
  }


  ngAfterViewInit() {
    this.portal = new TemplatePortal(this.dialogTemplate, this.viewContainerRef);
    this.overlayRef = this.overlay.create({
      positionStrategy: this.overlay.position().global().centerHorizontally().centerVertically(),
      hasBackdrop: true
    });
    this.overlayRef.backdropClick().subscribe(() => this.overlayRef.detach());

    this.castUrlsParams();
    this.timerCheckAlive();
  }

  private castUrlsParams() {
    if (this.urlsParams && Array.isArray(this.urlsParams) && typeof this.urlsParams === 'object' && this.urlsParams.length) {
      this.urlsParams.forEach((oneUrl, index) => {
        if (oneUrl.url && oneUrl.libelle && oneUrl.description && oneUrl.priority) {
          oneUrl = new AliveUrlParams(oneUrl.url, oneUrl.libelle, oneUrl.description, oneUrl.priority);
          this.urlsParams[index] = oneUrl;
        } else {
          delete(this.urlsParams[index]);
        }
      });
    }
  }

  private parseHttpParse(req, oneUrl) {
    let pair = {};

    if (req.status === 200) {
      pair = {url: oneUrl.url, libelle: oneUrl.libelle,
        description: oneUrl.description, priority: oneUrl.priority,
        status: 'OK', color: 'alive-status-green'};
    } else {
      pair = {url: oneUrl.url, libelle: oneUrl.libelle,
        description: oneUrl.description, priority: oneUrl.priority,
        status: 'KO', color: 'alive-status-red'};

      this.resume.hsPriorityPoint += oneUrl.priority;
      this.resume.hs += 1;
    }

    this.resume.service += 1;
    this.resume.priorityPoint += oneUrl.priority;

    this.urlsRequested.push(pair);
  }

  ngOnDestroy() {
    this.overlayRef.dispose();
  }

  openDialog() {
    this.overlayRef.attach(this.portal);

    if (this.urlsRequested.length === 0) {
      this.checkServices();
    }
  }

  private checkStatus() {
    const HSRate = this.resume.hsPriorityPoint / this.resume.priorityPoint;
    if (HSRate === 0) {
      this.alivePulse = 'pulse-green';
      this.aliveStatus = 'alive-status-green';
    } else if (HSRate > 0) {
      this.alivePulse = 'pulse-orange';
      this.aliveStatus = 'alive-status-orange';
    } else if (HSRate > 0.5) {
      this.alivePulse = 'pulse-red';
      this.aliveStatus = 'alive-status-red';
    }
  }

  private clearData() {
    this.urlsRequested = [];
    this.resume = {
      service: 0,
      hs: 0,
      priorityPoint: 0,
      hsPriorityPoint: 0,
    };
  }

  private prepareRequest(oneUrl) {
    return new Promise((resolve) => {
      console.log(oneUrl);
      const req = new XMLHttpRequest();
      req.open('GET', oneUrl.url);
      req.onreadystatechange = () => {
        if (req.readyState === XMLHttpRequest.DONE) {
          this.parseHttpParse(req, oneUrl);
          resolve();
        }
      };
      req.send();
    });
  }

  /**
   * Call for each object who contains url
   * Fill the resume variablr with data received
   */
  private checkServices() {
    this.clearData();

    const arrayPromises = [];
    this.urlsParams.forEach(oneUrl => {
      arrayPromises.push(this.prepareRequest(oneUrl));
    });

    Promise.all(arrayPromises).then(() => {
      this.checkStatus();
    });
  }

  /**
   * Loop who calling the main function
   */
  private timerCheckAlive() {
    setInterval(() => {
      this.checkServices();
    }, (this.checkInterval * 60) * 1000);
  }

}
