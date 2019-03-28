import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import * as MyScriptJS from 'myscript'
import 'myscript/dist/myscript.min.css';

const editorStyle = {
  'minWidth': '100px',
  'minHeight': '100px',
  'width': '100vw',
  'height': 'calc(100vh - 190px)',
  'touch-action': 'none',
};

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <div style={editorStyle} ref="editor" touch-action="none">
        </div>
      </div>
    );
  }
  componentDidMount() {
    this.editor = MyScriptJS.register(this.refs.editor, {
      recognitionParams: {
        type: 'TEXT',
        protocol: 'WEBSOCKET',
        apiVersion: 'V4',
        server: {
          scheme: 'https',
          host: 'webdemoapi.myscript.com',
          applicationKey: '1463c06b-251c-47b8-ad0b-ba05b9a3bd01',
          hmacKey: '60ca101a-5e6d-4159-abc5-2efcbecce059',
        },
      },
    });
    window.addEventListener("resize", () => {this.editor.resize()});
  }
}

export default App;
