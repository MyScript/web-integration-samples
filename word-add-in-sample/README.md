# Word add-in sample

Think about equations. What seems like the easiest way to get a digital version? You might already be using Microsoft Word to enter all the symbols and characters. But it takes time and it’s definitely slower than just writing on paper.

That’s where we offer added value, with a JavaScript plugin for Word: MyScript Math Sample. You can write your equation directly into the plugin canvas as you would on paper. Your handwriting is recognized in real time and easily editable if needed.  You can export it in Word.

Try it it directly from the [office store]() only take __5 minutes__ to grab the sources and launch this sample in word.


![](word-addin.gif =800x375)

## Installation

### Requirements
You need to install in your windows box:
- Microsoft Office > 2013
- [Visual  Studio 2015 & Office Developer Tools](https://www.visualstudio.com/features/office-tools-vs.aspx)
- [Node JS > 6.0](https://nodejs.org/en/download/current/")
- [NPM > 4.0](https://docs.npmjs.com/getting-started/installing-node)
- [Bower](https://bower.io/)
- [Git](https://git-scm.com/downloads)

### Sources
Checkout this git repository with `git clone https://github.com/MyScript/myscript-web-integration-samples.git`

##Run sample
### Download dependencies
In myscript-web-integration-samples/word-add-in-sample/ folder run the following commands
~~~~
 cd MyScript\ Math\ SampleWeb
 npm install
 bower install
~~~~

### Project opening
Launch visual by opening myscript-web-integration-samples/word-add-in-sample/MyScript Math Sample.sln

You can view the sample and debug it in word by pressing the green arrow RUN in the menu bar.

![](start.png)

### Testing the UI without opening Visual Studio
Just run `gulp serve` if you want to launch a webserver serving the html pages and test them in your web browser. Interaction with office will not work of course

## Learn more

Here are more resources to help you create Word Javascript API based add-ins:

* [Get started with Office Add-ins](https://dev.office.com/getting-started/addins)
* [Office Add-ins platform overview](https://dev.office.com/docs/add-ins/overview/office-add-ins)
* [Build your first Word add-in](https://dev.office.com/docs/add-ins/word/word-add-ins)
* [Develop Office Add-ins for the iPad](https://github.com/OfficeDev/office-js-docs/blob/master/docs/develop/develop-office-add-ins-for-the-ipad.md)
* [Office Add-ins XML manifest](http://dev.office.com/docs/add-ins/overview/add-in-manifests)
* [Office App Compatibility Kit ](https://www.microsoft.com/en-us/download/details.aspx?id=46831)
* [Sideload an Office Add-in on iPad and Mac](http://dev.office.com/docs/add-ins/testing/sideload-an-office-add-in-on-ipad-and-mac)
* [Snippet Explorer for Word](http://officesnippetexplorer.azurewebsites.net/#/snippets/word)
* [Create and debug Office Add-ins in Visual Studio](http://dev.office.com/docs/add-ins/get-started/create-and-debug-office-add-ins-in-visual-studio)


## License

[Apache License 2.0](http://www.apache.org/licenses/LICENSE-2.0)
