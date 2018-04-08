
(function(document) {
    'use strict';

    function $(selector) {
        return document.querySelector(selector);
    }

    window.addEventListener('WebComponentsReady', function() {



        var textInput = $('#textInput');
        var mathInput = $('#mathInput');
        var textButton = $('#textButton');
        var mathButton = $('#mathButton');
        var writeHere = $('.write-here');

        if (textInput.applicationkey === "REPLACE_ME" || mathInput.applicationkey === "REPLACE_ME" ||
            textInput.hmackey === "REPLACE_ME" || mathInput.hmackey === "REPLACE_ME") {
            $('header').remove();
            $('.warningkeys').classList.remove('hidden');
        } else {

            var listOfInputs = [textInput, mathInput];
            listOfInputs.forEach(function(input) {
                input.addEventListener('loaded', function() {
                    writeHere.classList.remove('hidden');
                });
                input.addEventListener('pointerdown', function() {
                    writeHere.classList.add('hidden');
                });
                input.addEventListener('pointerup', function() {
                    writeHere.classList.add('hidden');
                });
            });
            writeHere.addEventListener('pointermove', function() {
                writeHere.classList.add('hidden');
            });

            // Manage the tap on the various buttons
            var setButtonsStates = function(isTextButton, isMathButton) {
                writeHere.classList.add('hidden');
                listOfInputs.forEach(function(input) { input.classList.add('hidden'); });

                textButton.active = isTextButton;
                if (isTextButton) {
                    console.log("I'm running");

                    textInput.classList.remove('hidden');
                    textInput.removeAttribute('unloaded');
                    mathInput.setAttribute('unloaded', true);
                    mathInput.classList.add('hidden');
                    mathInput.clear();
                }

                mathButton.active = isMathButton;
                if (isMathButton) {

                    mathInput.classList.remove('hidden');
                    mathInput.removeAttribute('unloaded');
                    textInput.setAttribute('unloaded', true);
                    textInput.classList.add('hidden');
                    textInput.clear();
                }

            };


            textButton.addEventListener('tap', function() {
                setButtonsStates(true, false);
            });
            mathButton.addEventListener('tap', function() {
                setButtonsStates(false, true);
            });
            // Initialize the default demo
            setButtonsStates(false, true);
        }
    });

})(document);