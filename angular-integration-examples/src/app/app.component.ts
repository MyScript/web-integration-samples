import { Component, AfterViewInit, ViewChild,  ElementRef, ViewEncapsulation} from '@angular/core';
import * as MyScriptJS from 'myscript/src/myscript';

@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent  implements AfterViewInit {
  @ViewChild("tref", {read: ElementRef}) domEditor: ElementRef;
  title = 'app';
  editor;
  ngAfterViewInit() : void {
    // your code
     console.log(this.domEditor.nativeElement);
     this.editor = MyScriptJS.register(this.domEditor.nativeElement, {
      recognitionParams: {
        type: 'TEXT',
        protocol: 'WEBSOCKET',
        apiVersion: 'V4',
        server: {
          scheme: 'https',
          host: 'webdemoapi.myscript.com',
          applicationKey: 'f1355ec8-c74a-4da9-8d63-691ab05952eb',
          hmacKey: '752acf37-5a45-481b-9361-fcb32cd7f6a1',
        },
      },
    });
  }
}
