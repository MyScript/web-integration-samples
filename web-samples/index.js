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
