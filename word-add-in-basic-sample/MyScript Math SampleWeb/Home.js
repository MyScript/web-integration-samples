/// <reference path="/Scripts/FabricUI/MessageBanner.js" />


(function () {
    "use strict";

    var messageBanner;

    // La fonction d'initialisation doit être exécutée chaque fois qu'une nouvelle page est chargée.
    Office.initialize = function (reason) {
        $(document).ready(function () {
            // Initialiser le mécanisme de notification de FabricUI, et le masquer
            var element = document.querySelector('.ms-MessageBanner');
            messageBanner = new fabric.MessageBanner(element);
            messageBanner.hideBanner();

            // Si Word 2016 n'est pas utilisé, employez la logique de secours.
            if (!Office.context.requirements.isSetSupported('WordApi', '1.1')) {
                $("#template-description").text("Cet exemple affiche le texte sélectionné.");
                $('#button-text').text("Afficher !");
                $('#button-desc').text("Afficher le texte sélectionné");
                
                $('#highlight-button').click(
                    displaySelectedText);
                return;
            }

            $("#template-description").text("Cet exemple met en surbrillance le mot le plus long du texte que vous avez sélectionné dans le document.");
            $('#button-text').text("Mettre en surbrillance !");
            $('#button-desc').text("Met en surbrillance le mot le plus long.");
            
            loadSampleData();

            // Ajoutez un gestionnaire d'événements Click pour le bouton de mise en surbrillance.
            $('#highlight-button').click(
                hightlightLongestWord);
        });
    };

    function loadSampleData() {

        // Exécutez une opération de traitement par lots sur le modèle objet Word.
        Word.run(function (context) {

            // Créez un objet proxy pour le corps du document.
            var body = context.document.body;

            // Mettez en file d'attente une commande pour effacer le contenu du corps.
            body.clear();
            // Mettez en file d'attente une commande pour insérer du texte à la fin du corps du document Word.
            body.insertText("This is a sample text inserted in the document",
                            Word.InsertLocation.end);

            // Synchronisez l'état du document en exécutant les commandes en file d'attente, puis retournez une promesse pour indiquer l'achèvement de la tâche.
            return context.sync();
        })
        .catch(errorHandler);
    }

    function hightlightLongestWord() {

        Word.run(function (context) {

            // Mettez en file d'attente une commande pour obtenir la sélection actuelle, puis
            // créez un objet de plage proxy avec les résultats.
            var range = context.document.getSelection();
            
            // variable de conservation des résultats de la recherche pour le mot le plus long.
            var searchResults;
            
            // Mettez en file d'attente une commande pour charger le résultat de la sélection de plage.
            context.load(range, 'text');

            // Synchronisez l'état du document en exécutant les commandes en file d'attente, puis
            // retournez une promesse pour indiquer l'achèvement de la tâche.
            return context.sync()
                .then(function () {
                
                    // Obtenez le mot le plus long de la sélection.
                    var words = range.text.split(/\s+/);
                    var longestWord = words.reduce(function (word1, word2) { return word1.length > word2.length ? word1 : word2; });

                    // Mettez en file d'attente une commande de recherche.
                    searchResults = context.document.body.search(longestWord, { matchCase: true, matchWholeWord: true });

                    // Mettez en file d'attente une commande pour charger la propriété de police des résultats.
                    context.load(searchResults, 'font');

                })
                .then(context.sync)
                .then(function () {
                    // Mettez en file d'attente une commande pour mettre en surbrillance les résultats de la recherche.
                    searchResults.items[0].font.highlightColor = '#FFFF00'; // Jaune
                    searchResults.items[0].font.bold = true;
                })
                .then(context.sync)
        })
        .catch(errorHandler);
    } 


    function displaySelectedText() {
        Office.context.document.getSelectedDataAsync(Office.CoercionType.Text,
            function (result) {
                if (result.status === Office.AsyncResultStatus.Succeeded) {
                    showNotification('Le texte sélectionné est :', '"' + result.value + '"');
                } else {
                    showNotification('Erreur :', result.error.message);
                }
            });
    }

    //$$(Helper function for treating errors, $loc_script_taskpane_home_js_comment34$)$$
    function errorHandler(error) {
        // $$(Always be sure to catch any accumulated errors that bubble up from the Word.run execution., $loc_script_taskpane_home_js_comment35$)$$
        showNotification("Erreur :", error);
        console.log("Error: " + error);
        if (error instanceof OfficeExtension.Error) {
            console.log("Debug info: " + JSON.stringify(error.debugInfo));
        }
    }

    // Fonction d'assistance pour afficher les notifications
    function showNotification(header, content) {
        $("#notificationHeader").text(header);
        $("#notificationBody").text(content);
        messageBanner.showBanner();
        messageBanner.toggleExpansion();
    }
})();
