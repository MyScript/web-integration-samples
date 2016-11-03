webcomponent-unified-sample
===========================

The easy way to integrate handwriting recognition in your web app.

```html
<html>
<head>
    <script src="bower_components/webcomponentsjs/webcomponents-lite.js"></script>
    <link rel="import" href="bower_components/myscript-common-element/myscript-common-element.html">
    <link rel="import" href="bower_components/myscript-text-web/myscript-text   -web.html">
    <link rel="import" href="bower_components/myscript-math-web/myscript-math-web.html">
</head>
<body>
    <myscript-text-web id="textInput"
                       applicationkey="#PUT YOUR MYSCRIPT CDK APPLICATION KEY HERE#" 
                       hmackey="#PUT YOUR MYSCRIPT CDK HMAC KEY HERE#">
    ></myscript-text-web>
    <myscript-math-web id="mathInput"
            applicationkey="#PUT YOUR MYSCRIPT CDK APPLICATION KEY HERE#" 
            hmackey="#PUT YOUR MYSCRIPT CDK HMAC KEY HERE#">
    </myscript-math-web>
    <myscript-common-element id="graphicsInput"
                             protocol="REST"
                             applicationkey="#PUT YOUR MYSCRIPT CDK APPLICATION KEY HERE#" 
                             hmackey="#PUT YOUR MYSCRIPT CDK HMAC KEY HERE#">
                             type="SHAPE"
                             typeset="true"
    ></myscript-common-element>
    <myscript-common-element id="musicInput"
                             protocol="REST"
                             applicationkey="#PUT YOUR MYSCRIPT CDK APPLICATION KEY HERE#" 
                             hmackey="#PUT YOUR MYSCRIPT CDK HMAC KEY HERE#">
                             type="MUSIC"
    ></myscript-common-element>
</body>
</html>
```    

[Test it live](https://myscript.github.io/)!

## What is it about?

myscript-common-element, myscript-text-web and myscript-math-web are web components that can be used in every web application (whatever the JavaScript library you are using) to bring handwriting recognition. It integrates all you need:  
* Signal capture,
* Nice digital ink rendering,
* Plug with MyScript CDK to bring handwriting recognition.

## Installation

**Bower**: `bower install myscript-common-element myscript-text-web myscript-math-web`

## Start using myscript-common-element, myscript-text-web and myscript-math-web

1. Create an account on the [Developer portal](https://dev.myscript.com/), which will allow you to generate an application key and HMAC key.  

2. Import Web Components' polyfill

    `<script src="bower_components/webcomponentsjs/webcomponents-lite.js"></script>`

3. Import Custom Element

    `<link rel="import" href="bower_components/myscript-common-element/myscript-common-element.html">`
    `<link rel="import" href="bower_components/myscript-text-web/myscript-text-web.html">`
    `<link rel="import" href="bower_components/myscript-math-web/myscript-math-web.html">`    

3. Use it

    `<myscript-common-element applicationkey="#PUT YOUR MYSCRIPT CDK APPLICATION KEY HERE#" hmackey="#PUT YOUR MYSCRIPT CDK HMAC KEY HERE#" TYPE="#PUT CDK HANDWRITING RECOGNITION TYPE HERE##"></myscript-common-element>`  
    `<myscript-text-web applicationkey="#PUT YOUR MYSCRIPT CDK APPLICATION KEY HERE#" hmackey="#PUT YOUR MYSCRIPT CDK HMAC KEY HERE#"></myscript-text-web>`  
    `<myscript-math-web applicationkey="#PUT YOUR MYSCRIPT CDK APPLICATION KEY HERE#" hmackey="#PUT YOUR MYSCRIPT CDK HMAC KEY HERE#"></myscript-math-web>`  

## Documentation 

The API References are available here: 

[https://myscript.github.io/myscript-common-element/](https://myscript.github.io/myscript-common-element/)
[https://myscript.github.io/myscript-text-web/](https://myscript.github.io/myscript-text-web/)
[https://myscript.github.io/myscript-math-web/](https://myscript.github.io/myscript-math-web/)

## Contribute

If you wish to contribute to myscript-math-web, feel free to fork it, fire `bower install` and use [polyserve](https://github.com/PolymerLabs/polyserve) as an HTTP server. The demo page (in `demo` directory) can help you make your first experimentation.

Please sign our [Contributor License Agreement](CONTRIBUTING.md) before submitting your pull request.

## Share your feedback

Made a cool app with myscript-math-web? We would love to hear about it!

We plan to showcase apps, so let us know by writing to [myapp@myscript.com](mailto://myapp@myscript.com)

## License

[Apache License 2.0](http://www.apache.org/licenses/LICENSE-2.0)
