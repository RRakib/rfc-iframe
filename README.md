# rfc-iframe

[![Version](https://img.shields.io/npm/v/rfc-iframe.svg)](https://www.npmjs.com/package/rfc-iframe)
[![Total Downloads](https://img.shields.io/npm/dt/rfc-iframe.svg)](https://www.npmjs.com/package/rfc-iframe)
[![License](https://img.shields.io/github/license/rrakib/rfc-iframe.svg)](https://github.com/rrakib/rfc-iframe/blob/master/LICENSE)

This is a react iframe wrapper. You can easily integrate external or internal style and scripts with this plugin. This plugin supports goober out of the box. 

### Installation

`npm install rfc-iframe --save`

or

`yarn add rfc-iframe`

### Usage

```JS
import {IFrame} from 'rfc-iframe';

const WhatEver = () => {
    
    return (
        <div>
            <IFrame
                goober = {false} // default True
                frameAttributes = {{width: "100%", ...}}
                externalStyleLinks = ["https://yourextercsslink.com"] // default []
                externalScripts = ["https://yourexterscriptlink.com"] // default []
            >
                <p>Your Beautiful Website</p>            
            </IFrame>        
        </div>
    );
}
```

### Props
* ``` goober (optional) ``` - this plugin supports goober out of the box. If you dont want this feature then set the value to false. (default boolean)
* ``` frameAttributes (optional) ``` - specify dom attributes for iframe. (default {})
* ``` externalStyleLinks (optional) ``` - you can include any external css or css from you own domain. You have to pass the links as an array. (default [])
* ``` externalScripts (optional) ``` - you can include any external scripts or scripts from you own domain. You have to pass them as an array. (default [])

### Changelog
> V3 is very light weight. We have removed support for styled component and brought goober as a replacement.

### Thanks
Thank you for checking this our.
 
 iFrame can be complex at times, mostly when you what to work with external style or scripts. I hope this will help with that problem. If you want to contribute to this project send a pull request.



**Inspiration Taken From My Good Friend [i-rocky](https://github.com/i-rocky).**
