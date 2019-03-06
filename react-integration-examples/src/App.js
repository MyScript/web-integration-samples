import React, {
  Component
} from 'react';
import logo from './logo.svg';
import './App.css';
import * as MyScriptJS from 'myscript'
import 'myscript/dist/myscript.min.css';

const editorStyle = {
  'minWidth': '45vw',
  'maxWidth': '45vw',
  'minHeight': '500px',
};

const editor2Style = Object.assign({
  'background': 'lightslategray'
}, editorStyle);

class App extends Component {

  render() {
    return ( 
      <div className="App">
        <header className="App-header">
          <img
            src={logo}
            className="App-logo"
            alt="logo"
          />
          <h1 className="App-title"> Welcome to React </h1>
        </header>
        <div className="Container">
          <div
            id="editor1"
            style={editorStyle}
            ref="editor1"
          >
          </div>
          <div
            id="editor2"
            style={editor2Style}
            ref="editor2"
          >
          </div>
        </div>
        <div className="Container">
          <button
            onClick={this.recopyStrokes}> Recopy strokes > </button>
        </div>
      </div>
    );
  }
  
  componentDidMount() {
    const server = {
      scheme: 'https',
      host: 'webdemoapi.myscript.com',
      applicationKey: '1463c06b-251c-47b8-ad0b-ba05b9a3bd01',
      hmacKey: '60ca101a-5e6d-4159-abc5-2efcbecce059',
    };
    const myScriptConfig1 = {
      recognitionParams: {
        type: 'TEXT',
        protocol: 'WEBSOCKET',
        apiVersion: 'V4',
        server
      },
    };
    this.editor1 = MyScriptJS.register(this.refs.editor1, myScriptConfig1);

    const myScriptConfig2 = {
      triggers: {
        exportContent: 'DEMAND',
      },
      recognitionParams: {
        type: 'TEXT',
        protocol: 'REST',
        apiVersion: 'V4',
        server
      },
    };
    this.editor2 = MyScriptJS.register(
      this.refs.editor2,
      myScriptConfig2,
      undefined,
      undefined,
      {
        grabber: undefined,
      },
    );

    window.addEventListener("resize", () => {
      this.editor1.resize()
      this.editor2.resize()
    });
  }

  recopyStrokes = (e) => {
    e.preventDefault()
    console.log('Request for strokes recopy.')
    this.editor2.eastereggs.importStrokeGroups(this.editor2, this.editor1.model.strokeGroups)
    this.editor2.forceChange();
  }

}

export default App;