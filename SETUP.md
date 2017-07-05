## myscript-web-integration-samples

### Installation

You need to install in your windows box:
- Visual Studio
- Office
- https://www.visualstudio.com/en-us/features/office-tools-vs.aspx
- NPM 4.0
- Git

Checkout https://scm.corp.myscript.com/scm/ws/webcomponents-myscript-web-integration-samples.git

For word-add-in-sample project Launch visual by opening myscript-web-integration-samples/word-add-in-sample/MyScript Math Sample.sln

### Testing the UI under Linux

Interaction with office will not work of course

#### dev-word-add-in-sample
launch `make dev-word-add-in-sample`

### Releasing dev-word-add-in-sample only
`make docker` and `make deploy-registry`

### GitHub remote deployment

* Uncomment GITHUB_REPO_PREFIX line in Makefile.inc
* Add remote `make github-add-remote` 
* ...
* Comment GITHUB_REPO_PREFIX line in Makefile.inc
