# MyScript Web Samples

## Description

MyScript Web Samples enable you to easily integrate our web components in a simple webpage. Use your stylus, your finger or even your mouse! Convert your text, equation, graphics, music and use the recognition results as you want. Delete elements by using a simple erase gesture. Use the buttons to undo or redo an action or to clear the screen.

## Features

* Real-time recognition
* Clean rendering
* Editing gesture (scratch-out) + undo/redo
* Multi handwriting recognition types

## Requirements

The following must be installed:

* [Git](https://git-scm.com/)
* [Node.js](https://nodejs.org/en/)
* [Bower](http://bower.io/)

## Play with the sample

1) Unzip the package `MyScript-Web-Samples-v1.2.0.zip`.

2) Type the following command in a command terminal:

         cd web-samples
         
3) Type the following command to initialize dependencies:
        
        npm install && bower install

4) Launch the server:  

         npm run-script run
            
5) Open [http://localhost:8000](http://localhost:8000) in your browser.

You are now ready to go!

## Step by step

This is a step-by-step tutorial to integrate MyScript Web Components as dependencies.
    
1) Create a directory for your project.

2) In a command line terminal, go to the project folder and type the following lines to download the MyScript Math web component into your project:
   
         bower init
         bower install --save myscript-common-element myscript-text-web myscript-math-web

3) Create an index.html file in your project directory and edit it as follows.

4) In `<head>`, add the polyfills to make sure all browsers are supported, then add the web component:
   
           <script type="text/javascript" src="./bower_components/webcomponentsjs/webcomponents-lite.min.js"></script>
           <script type="text/javascript" src="index.js"></script>
       
           <link rel="import" href="./bower_components/paper-button/paper-button.html">
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
                 .write-here-wrapper{
                     position: relative;
                 }
                 .write-here{
                     position: absolute;
                     width : 100vw;
                     text-align : center;
                     padding:  0;
                     margin: -33px auto 0;
                     top: 50%;
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
               <div class="write-here-wrapper">
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
               </div>
               <pre id="MUSICXML" class="prettyprint lang-xml" hidden></pre>
           </div>
           </body>


The application and HMAC keys displayed here are only part of the demo, you will later need to generate your own keys.
To generate your own keys, see the [Registration]() section. 

7) Create an index.js file in your project directory and edit it as follows.

8) Add the following javascript in index.js file to add the interaction between buttons and MyScript web component. This will enable you to switch between MyScript handwriting recognition web components:

            (function (document) {
                'use strict';
            
                function $(selector){
                    return document.querySelector(selector);
                }
            
                window.addEventListener('WebComponentsReady', function () {
            
                    var textInput = $('#textInput');
                    var mathInput = $('#mathInput');
                    var graphicsInput = $('#graphicsInput');
                    var musicInput = $('#musicInput');
                    var musicXML = $('#MUSICXML');
                    var textButton = $('#textButton');
                    var mathButton = $('#mathButton');
                    var graphicsButton = $('#graphicsButton');
                    var musicButton = $('#musicButton');
            
                    // Small piece of code to hide the write here message
                    var hideWriteHere = function(input){
                        input.addEventListener('pointerdown', function () {
                                $('.write-here').setAttribute('hidden', 'true');
                        });
                    };
                    var listOfInputs = [textInput, mathInput, graphicsInput, musicInput];
                    listOfInputs.forEach(function(input){hideWriteHere(input)});
            
                    // Manage the tap on the various buttons
                    var setButtonsStates = function (isTextButton, isMathButton, isGraphicsButton, isMusicButton){
                        listOfInputs.forEach(function(input){input.setAttribute('hidden', 'true');});
                        musicXML.setAttribute('hidden', 'true');
            
                        textButton.active = isTextButton;
                        if(isTextButton)textInput.removeAttribute('hidden');textInput.clear();
            
                        mathButton.active = isMathButton;
                        if(isMathButton) mathInput.removeAttribute('hidden');mathInput.clear();
            
                        graphicsButton.active = isGraphicsButton;
                        if(isGraphicsButton) graphicsInput.removeAttribute('hidden');graphicsInput.clear();
            
                        musicButton.active = isMusicButton;
                        if(isMusicButton){
                            musicInput.removeAttribute('hidden');
                            initMusic(musicInput, musicXML);
                            musicInput.clear();
                            musicInput.notifyResize();
                            musicXML.removeAttribute('hidden');
                        }
                        $('.write-here').removeAttribute('hidden');
                    };
            
                    var initMusic = function (musicInput, musicXML){
                        // Setting the mandatory parameters for music input.
                        musicInput.components = [new MyScript.MusicClefInputComponent({value: {yAnchor: 160,octave: 0,symbol: 'G'},boundingBox: {x: 5,y: 72,height: 140}})];
                        musicInput.musicparameters = new MyScript.MusicParameter({divisions: 480,staff: {count: 5,gap: 20,top: 100},resultTypes: [MyScript.ResultType.Music.MUSICXML, MyScript.ResultType.Music.SCORETREE]});
            
                        //Register the common element result event to print the MusicXML output in a textfield.
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
            
                    textButton.addEventListener('tap', function () {
                        setButtonsStates(true, false, false, false);
                    });
                    mathButton.addEventListener('tap', function () {
                        setButtonsStates(false, true, false, false);
                    });
                    graphicsButton.addEventListener('tap', function () {
                        setButtonsStates(false, false, true, false);
                    });
                    musicButton.addEventListener('tap', function () {
                        setButtonsStates(false, false, false, true);
                    });
                });
            
            })(document);

9) Type the following command to launch the server: 

            npm run-script run
            
10) Open [http://localhost:8000](http://localhost:8000) in your browser.

You are now ready to go!
