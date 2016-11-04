# MyScript Web Samples

## Description

MyScript Unified Sample allow you to understand the easy way to integrate ours web components in simple webpage. Use your stylus, your finger or even your mouse! Convert your text, equation, graphics, music and use the recognition results as you want. Delete elements by using a simple erase gesture. Use the buttons to undo or redo an action or to clear the add-in screen.

## Features

* Real-time recognition
* Clean rendering
* Editing gesture (scratch-out) + undo/redo
* Multi handwriting recognition type

## Requirements

The following must be installed:

* A valid MyScript CDK account (you can use your trial version)
* A local HTTP server: [Python SimpleHTTPServer](http://stackoverflow.com/a/4351609/2961452)
* [Node.js](https://nodejs.org/en/)
* [Git](http://git-scm.com/)
* [Bower](http://bower.io/)
        

## Getting Started
1) Create the directory for your project

2) In a command line terminal, go to the project folder and type the following lines to download the MyScript Math web component into your project:
   
         bower init
         bower install --save myscript-common-element myscript-text-web myscript-math-web
3) Create and edit an index.html file in your project directory

4) In `<head>`, add the polyfills to make sure all browsers are supported, then add the web component:
   
       <script src="./bower_components/webcomponentsjs/webcomponents-lite.min.js"></script>
       <script type="text/javascript" src="index.js"></script>
       
       <link rel="import" href="./bower_components/myscript-common-element/myscript-common-element.html">
       <link rel="import" href="./bower_components/myscript-text-web/myscript-text-web.html">
       <link rel="import" href="./bower_components/myscript-math-web/myscript-math-web.html">

5) In `<head>`, add the following style to optimize the height of web component integration:
   
          <style is="custom-style">
                  body {
                      margin: 0;
                      padding: 0;
                      border: 0;
                      height: 100%;
                      max-height: 100%;
                      overflow-x : hidden;
                  }
                  header {
                      height: 49px;
                      border-bottom: 1px solid #dddddd;
                      display: -webkit-flex;
                      display: flex;
                      align-items: center;
                      justify-content: center;
                  }
                  .write-here{
                      position: absolute;
                      width : 100vw;
                      text-align : center;
                      padding:  0;
                      margin: 48vh auto 0;
                      transform: translateY(-50%);
                      font-family: 'Waiting for the Sunrise', cursive;
                      font-size: 40px;
                      z-index: 1;
                  }
                  #textInput, #mathInput, #graphicsInput{
                      height : calc(100vh - 50px);
                  }
                  paper-button[toggles][active] {
                      background: rgba(0, 0, 0, 0.2);
                  }
                  #musicInput{
                      height : 300px;
                  }
                  #MUSICXML {
                      border: none;
                      margin: 0;
                      overflow: auto;
                      height: calc(100vh - 350px);
                  }
              </style>

6) In `<body>`, add this content with the web component integration. All properties are already set for a quick integration but you can also add your own values:

           <body touch-action="none">
           <header>
               <paper-button id="textButton" toggles><iron-icon src="./assets/img/demo/myscript-text.svg"></iron-icon></paper-button>
               <paper-button id="mathButton" toggles><iron-icon src="./assets/img/demo/myscript-math.svg"></iron-icon></paper-button>
               <paper-button id="graphicsButton" toggles><iron-icon src="./assets/img/demo/myscript-shape.svg"></iron-icon></paper-button>
               <paper-button id="musicButton" toggles><iron-icon src="./assets/img/demo/myscript-music.svg"></iron-icon></paper-button>
           </header>
           <div id="content">
               <div class="write-here">Write here</div>
               <myscript-text-web id="textInput"
                                  host="webdemoapi.myscript.com"
                                  applicationkey="9faa1259-48ba-44c4-9857-b3c86d986f94"
                                  hmackey="fb166b5d-3ffd-93bd-7b5b-bca0fe2216a0"
               ></myscript-text-web>
               <myscript-math-web id="mathInput"
                                  host="webdemoapi.myscript.com"
                                  applicationkey="9faa1259-48ba-44c4-9857-b3c86d986f94"
                                  hmackey="fb166b5d-3ffd-93bd-7b5b-bca0fe2216a0"
                                  hidden
               ></myscript-math-web>
               <myscript-common-element id="graphicsInput"
                                        host="webdemoapi.myscript.com"
                                        protocol="REST"
                                        applicationkey="9faa1259-48ba-44c4-9857-b3c86d986f94"
                                        hmackey="fb166b5d-3ffd-93bd-7b5b-bca0fe2216a0"
                                        type="SHAPE"
                                        typeset="true"
                                        hidden
               ></myscript-common-element>
               <myscript-common-element id="musicInput"
                                        host="webdemoapi.myscript.com"
                                        protocol="REST"
                                        applicationkey="9faa1259-48ba-44c4-9857-b3c86d986f94"
                                        hmackey="fb166b5d-3ffd-93bd-7b5b-bca0fe2216a0"
                                        type="MUSIC"
                                        hidden
               ></myscript-common-element>
               <pre id="MUSICXML" class="prettyprint lang-xml" hidden></pre>
           </div>
           </body>


The application and HMAC keys displayed here are only part of the demo, you will later need to generate your own keys.
To generate your own keys, see the [Registration]() section. 

7) Create and edit an index.js file in your project directory

8) Add the following javascript in index.js file to add the interaction between buttons and MyScript web component. This will allow to switch between MyScript handwriting recognition web components:

            (function (document) {
                'use strict';
            
                window.addEventListener('WebComponentsReady', function () {
            
                    var writeHere = document.querySelector('.write-here');
            
                    var textInput = document.getElementById('textInput'),
                        mathInput = document.getElementById('mathInput'),
                        graphicsInput = document.getElementById('graphicsInput'),
                        musicInput = document.getElementById('musicInput'),
                        musicXML = document.getElementById('MUSICXML');
            
                    var textButton = document.getElementById('textButton'),
                        mathButton = document.getElementById('mathButton'),
                        graphicsButton = document.getElementById('graphicsButton'),
                        musicButton = document.getElementById('musicButton');
            
                    var hideWriteHere = function(input){
                        input.addEventListener('pointerdown', function () {
                            if (writeHere) {
                                writeHere.setAttribute('hidden', 'true');
                            }
                        });
                    };
            
                    var setButtonsStates = function (isTextButton, isMathButton, isGraphicsButton, isMusicButton){
                        textButton.active = isTextButton;
                        mathButton.active = isMathButton;
                        graphicsButton.active = isGraphicsButton;
                        musicButton.active = isMusicButton;
                    };
            
                    var initMusic = function (musicInput, musicXML){
                        musicInput.components = [new MyScript.MusicClefInputComponent({value: {yAnchor: 160,octave: 0,symbol: 'G'},boundingBox: {x: 5,y: 72,height: 140}})];
                        musicInput.musicparameters = new MyScript.MusicParameter({divisions: 480,staff: {count: 5,gap: 20,top: 100},resultTypes: [MyScript.ResultType.Music.MUSICXML, MyScript.ResultType.Music.SCORETREE]});
            
                        musicInput.addEventListener('myscript-common-element-result', function (e) {
                            musicXML.innerText = '';
                            if (e.detail && e.detail.getDocument) {
                                var results = e.detail.getDocument().getResultElements();
                                for (var i in results) {
                                    if (results[i].isMusicXML()) {
                                        musicXML.innerText = results[i].getValue();
                                    }
                                }
                            }
            
                        }, true);
                    };
            
                    // Initialize the default demo
                    textButton.active = true;
            
                    // Small piece of code to hide the write here message
                    hideWriteHere(textInput);
                    hideWriteHere(mathInput);
                    hideWriteHere(graphicsInput);
                    hideWriteHere(musicInput);
            
                    textButton.addEventListener('tap', function () {
                        setButtonsStates(true, false, false, false);
                        textInput.removeAttribute('hidden');
                        mathInput.setAttribute('hidden', 'true');
                        graphicsInput.setAttribute('hidden', 'true');
                        musicInput.setAttribute('hidden', 'true');
                        musicXML.setAttribute('hidden', 'true');
                        textInput.delete();
                        writeHere.removeAttribute('hidden');
                    });
                    mathButton.addEventListener('tap', function () {
                        setButtonsStates(false, true, false, false);
                        textInput.setAttribute('hidden', 'true');
                        mathInput.removeAttribute('hidden');
                        graphicsInput.setAttribute('hidden', 'true');
                        musicInput.setAttribute('hidden', 'true');
                        musicXML.setAttribute('hidden', 'true');
                        mathInput.delete();
                        writeHere.removeAttribute('hidden');
                    });
                    graphicsButton.addEventListener('tap', function () {
                        setButtonsStates(false, false, true, false);
                        textInput.setAttribute('hidden', 'true');
                        mathInput.setAttribute('hidden', 'true');
                        graphicsInput.removeAttribute('hidden');
                        musicInput.setAttribute('hidden', 'true');
                        musicXML.setAttribute('hidden', 'true');
                        graphicsInput.clear();
                        writeHere.removeAttribute('hidden');
                    });
                    musicButton.addEventListener('tap', function () {
                        setButtonsStates(false, false, false, true);
                        textInput.setAttribute('hidden', 'true');
                        mathInput.setAttribute('hidden', 'true');
                        graphicsInput.setAttribute('hidden', 'true');
                        musicInput.removeAttribute('hidden');
                        musicXML.removeAttribute('hidden');
                        musicInput.clear();
                        writeHere.removeAttribute('hidden');
                        initMusic(musicInput, musicXML);
                    });
                });
            
            })(document);

9) Launch polyserve

Type the following command: 

            python -m SimpleHTTPServer 8080
            
10) Ready to go! Now start up your preferred browser and open http://localhost:8080 


