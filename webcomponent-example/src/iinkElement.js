import { html, css, LitElement } from 'lit-element';
import * as iink from 'iink-js';
import ResizeObserver from 'resize-observer-polyfill';

export class iinkElement extends LitElement {
  static get styles() {
    return css`
      :host {
        --iink-element-text-color: #000;
        display: block;
        color: var(--iink-element-text-color);
      }

      #editor {
        min-width: 300px;
        min-height: 600px;
      }

      #latex {
        position: fixed;
        top: 12px;
        right: 12px;
        border: solid grey 1px;
        padding: 6px;
        background-color: lightgray;
        border-bottom-left-radius: 2px;
        border-bottom-right-radius: 2px;
        z-index: 45;
      }
    `;
  }

  static get properties() {
    return {
      type: { type: String }, // MATH or TEXT
      applicationkey: { type: String },
      hmackey: { type: String },
      latex: { type: String },
      exports: { type: Object },
      params: { type: Object },
    };
  }

  firstUpdated() {
    this.$editorElement = this.shadowRoot.querySelector('#editor');
    this.$mathRecoElement = this.shadowRoot.querySelector('#mathReco');

    // iinkJS initialization
    // Map the attributes you need according to iinkJS documentation
    this.$editor = iink.register(this.$editorElement, {
      recognitionParams: {
        type: this.type,
        protocol: 'WEBSOCKET',
        server: {
          scheme: 'https',
          host: 'webdemoapi.myscript.com',
          applicationKey: this.applicationkey,
          hmacKey: this.hmackey,
        },
        ...this.params,
      },
    });

    // Resize observer init
    this.$ro = new ResizeObserver(() => {
      this.$editor.resize();
    });
    this.$ro.observe(document.body);
  }

  disconnectedCallback() {
    this.$ro.disconnect();
    this.$editor.close();
  }

  exportedHandler(evt) {
    if (evt.detail.exports) {
      this.exports = evt.detail.exports;
      this.latex = evt.detail.exports['application/x-latex'];
    }
  }

  render() {
    return html`
      <div id="editor" @exported=${this.exportedHandler}></div>
      ${this.latex
        ? html`
            <div id="latex">${this.latex}</div>
          `
        : html``}
    `;
  }
}
