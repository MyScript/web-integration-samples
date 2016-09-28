(function () {

    'use strict';

    var mathInput;

    // The initialize function must be run each time a new page is loaded
    Office.initialize = function () {
        // We use jquery to simplify the code
        $(document).ready(function () {
           // Initialize Word features
           document.querySelector('#image').addEventListener("pointerdown", copyImage);
           document.querySelector('#latex').addEventListener("pointerdown", copyLatex);
           document.querySelector('#mathForWord').addEventListener("pointerdown", copyOfficeOpenXmlMath);
        });
    };

    document.addEventListener('WebComponentsReady', function () {
        mathInput = document.querySelector('#mathInput');
        mathInput.addEventListener('pointerdown', function () {
            hideWriteHere();
            hideMenu();
        });

        document.querySelector('#export').addEventListener("pointerdown", toggleMenu);
        document.querySelector('#trash').addEventListener("pointerdown", trash);
        document.querySelector('#undo').addEventListener("pointerdown", undo);
        document.querySelector('#redo').addEventListener("pointerdown", redo);
    });

    // Show / Hide menu
    function toggleMenu() {
        var menu = document.querySelector('#menu');
        if (menu.style.display !== '' && menu.style.display !== 'none') {
            menu.style.display = 'none';
        }
        else {
            menu.style.display = 'block';
        }
    }

    // Hide menu
    function hideMenu() {
        var menu = document.querySelector('#menu');
        if (menu.style.display !== '' && menu.style.display !== 'none') menu.style.display = 'none';
    }

    // Hide Write Here image
    function hideWriteHere() {
        var writeHere = document.querySelector('.write-here');
        if (writeHere) writeHere.parentNode.removeChild( writeHere );
    }

    // Trash drawing strokes
    function trash() {
        hideMenu();
        try {
            if (PointerEventsPolyfill && PointerEventsPolyfill.dispatcher) {
                PointerEventsPolyfill.dispatcher.pointermap = new PointerEventsPolyfill.PointerMap();
            }
        } catch (e) {
            console('Unable to reset PEP pointer map')
        }
        document.querySelector('#mathInput').delete();
    }

    // Undo on your drawing strokes
    function undo() {
        hideMenu();
        try {
            if (PointerEventsPolyfill && PointerEventsPolyfill.dispatcher) {
                PointerEventsPolyfill.dispatcher.pointermap = new PointerEventsPolyfill.PointerMap();
            }
        } catch (e) {
            console('Unable to reset PEP pointer map')
        }
        document.querySelector('#mathInput').undo();
    }

    // Redo on your drawing strokes
    function redo() {
        hideMenu();
        try {
            if (PointerEventsPolyfill && PointerEventsPolyfill.dispatcher) {
                PointerEventsPolyfill.dispatcher.pointermap = new PointerEventsPolyfill.PointerMap();
            }
        } catch (e) {
            console('Unable to reset PEP pointer map')
        }
        document.querySelector('#mathInput').redo();
    }

    // Copy your strokes to image in Word
    function copyImage() {
        hideMenu();
        console.log("Copy strokes as an image");
        var imgBase64 = mathInput._myscriptCommonElement._inkPaper.getInkAsPng();
        console.log(imgBase64);
        imgBase64 = imgBase64.substring(imgBase64.indexOf(',') + 1);
        console.log(imgBase64);
        Office.context.document.setSelectedDataAsync(imgBase64,
            { coercionType: Office.CoercionType.Image },
            function (asyncResult) {
                if (asyncResult.status == Office.AsyncResultStatus.Failed) {
                    console.log('Error: ' + asyncResult.error.message);
                }
            });
    }

    // Copy your handwriting recognize result to LaTeX in Word
    function copyLatex() {
        hideMenu();
        var latexResult = mathInput.result.LATEX;
        if (latexResult) {
            Office.context.document.setSelectedDataAsync(latexResult,
                { coercionType: Office.CoercionType.Text });
        } else {
            console.log('copyLatex failed');
        }
    }

    // Copy your handwriting recognize result to Word Equation in Word
    function copyOfficeOpenXmlMath() {
        hideMenu();
        // jscs:disable
        // Template is split in a begin and end part to ease the construction of a good officeXml fragment
        var officeOpenXmlTemplateStart = '<?xml version="1.0" encoding="UTF-8"?> <pkg:package xmlns:pkg="http://schemas.microsoft.com/office/2006/xmlPackage"> <pkg:part pkg:name="/_rels/.rels" pkg:contentType="application/vnd.openxmlformats-package.relationships+xml" pkg:padding="512"> <pkg:xmlData> <Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"> <Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="word/document.xml"/> </Relationships> </pkg:xmlData> </pkg:part> <pkg:part pkg:name="/word/document.xml" pkg:contentType="application/vnd.openxmlformats-officedocument.wordprocessingml.document.main+xml"> <pkg:xmlData> <w:document xmlns:wpc="http://schemas.microsoft.com/office/word/2010/wordprocessingCanvas" xmlns:mc="http://schemas.openxmlformats.org/markup-compatibility/2006" xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships" xmlns:m="http://schemas.openxmlformats.org/officeDocument/2006/math" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:wp14="http://schemas.microsoft.com/office/word/2010/wordprocessingDrawing" xmlns:wp="http://schemas.openxmlformats.org/drawingml/2006/wordprocessingDrawing" xmlns:w10="urn:schemas-microsoft-com:office:word" xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main" xmlns:w14="http://schemas.microsoft.com/office/word/2010/wordml" xmlns:w15="http://schemas.microsoft.com/office/word/2012/wordml" xmlns:wpg="http://schemas.microsoft.com/office/word/2010/wordprocessingGroup" xmlns:wpi="http://schemas.microsoft.com/office/word/2010/wordprocessingInk" xmlns:wne="http://schemas.microsoft.com/office/word/2006/wordml" xmlns:wps="http://schemas.microsoft.com/office/word/2010/wordprocessingShape"> <w:body> <w:p>';
        var officeOpenXmlTemplateEnd = '</w:p> </w:body> </w:document> </pkg:xmlData> </pkg:part> </pkg:package>';
        // jscs:enable
        var ooXmlRes = mathInput.result.OFFICEOPENXMLMATH;
        if (ooXmlRes) {
            // We remove the xml declaration uneccesary here
            ooXmlRes = ooXmlRes.replace('<?xml version="1.0" encoding="UTF-8"?>', '');
            var officeOpenXmlFragment = officeOpenXmlTemplateStart
                + ooXmlRes
                + officeOpenXmlTemplateEnd;
            //console.log(officeOpenXmlFragment);
            Office.context.document.setSelectedDataAsync(officeOpenXmlFragment,
                { coercionType: Office.CoercionType.Ooxml });
        } else {
            console.log("No office open xml result");
        }
    }

})();