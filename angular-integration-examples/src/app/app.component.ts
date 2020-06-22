import { Component, ViewChild, ElementRef, AfterViewInit, OnDestroy } from '@angular/core';
import * as iink from 'iink-js';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit, OnDestroy {
  @ViewChild("tref", {read: ElementRef}) domEditor: ElementRef;
  title = 'app';
  editor;
  ngAfterViewInit() : void {
     this.editor = iink.register(this.domEditor.nativeElement, {
      recognitionParams: {
        type: 'TEXT',
        protocol: 'WEBSOCKET',
        apiVersion: 'V4',
        server: {
          scheme: 'https',
          host: 'webdemoapi.myscript.com',
          applicationKey: 'xxxx',
          hmacKey: 'xxxx',
        },
      }
    });
  };
  ngOnDestroy() : void {
      this.editor.close();
  }
}
