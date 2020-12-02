import React, { useRef, useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import * as iink from 'iink-js';

function App() {
  const editorRef = useRef(null);
  const editorStyle = {
    'minWidth': '100px',
    'minHeight': '100px',
    'width': '100vw',
    'height': 'calc(100vh - 190px)',
    'touchAction': 'none',
  };
  const theme = {
    name: 'Thin green theme',
    id: 'thin-green',
    theme: {
      ink: {
        color: '#2E7D32',
        '-myscript-pen-width': 1
      },
      '.text': {
        'font-size': 10
      }
    }
  };
  const [penEnable, setPenEnable] = useState(false);

  const onChange = (event) => {
    setPenEnable(event.target.checked);
    if (event.target.checked) {
      console.log(editorRef.current);
      const newTheme = Object.assign({}, theme.theme);
      newTheme['.greenThickPen'] = {
        color: '#00FF00',
        '-myscript-pen-width': 3
      };
      editorRef.current.editor.theme = newTheme;
      editorRef.current.editor.penStyleClasses = 'greenThickPen';
    } else {
      editorRef.current.editor.penStyleClasses = undefined;
      editorRef.current.editor.theme = theme.theme;
    }
  }

  useEffect(() => {
    let editor = editorRef.current;

    editor = iink.register(editorRef.current, {
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
        iink: {
          text: {
            guides: {
              enable: false
            }
          }
        }
      },
    }, undefined, theme.theme);

    window.addEventListener('resize', () => { 
      editor.resize() 
    });

    return () => {
      window.removeEventListener('resize', () => { editor.resize() });
      this.editor.close();
    }
  }, [theme]);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h1 className="App-title">Welcome to React</h1>
      </header>
      <div>
        <label htmlFor="penStyleEnable">Apply pen style class (greenThickPen)</label>
        <input type="checkbox" id="penStyleEnable" checked={penEnable} onChange={onChange}></input>
      </div>
      <div style={editorStyle} ref={editorRef} touch-action="none">
      </div>
    </div>
  )
}

export default App;
