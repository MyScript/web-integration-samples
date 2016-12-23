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
