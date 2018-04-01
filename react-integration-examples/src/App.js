import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import * as MyScriptJS from 'myscript/src/myscript'
import 'myscript/dist/myscript.min.css';

const editorStyle = {
  'minWidth': '500px',
  'minHeight': '500px',
};

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <div style={editorStyle} ref="editor">
        
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
          applicationKey: 'xxxxxx',
          hmacKey: 'xxxxxx',
        },
      },
    });
    window.addEventListener("resize", () => {this.editor.resize()});
  }
}

export default App;
