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
