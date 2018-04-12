import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {ElementRef, ViewChild} from '@angular/core';
import * as MyScriptJS from 'myscript/dist/myscript.min.js';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {

  @ViewChild('editor') editor: ElementRef;

  constructor(public navCtrl: NavController) {

  }

  ngAfterViewInit() {
      MyScriptJS.register(this.editor.nativeElement, {
      recognitionParams: {
        type: 'TEXT',
        protocol: 'WEBSOCKET',
        apiVersion: 'V4',
        server: {
          scheme: 'https',
          host: 'webdemoapi.myscript.com',
          applicationKey: 'xxxx',
          hmacKey: 'xxxxx',
        },
      },
    });
  }
}
