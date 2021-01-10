# rfc-iframe

[![Version](https://img.shields.io/npm/v/rfc-iframe.svg)](https://www.npmjs.com/package/rfc-iframe)
[![Total Downloads](https://img.shields.io/npm/dt/rfc-iframe.svg)](https://www.npmjs.com/package/rfc-iframe)
[![License](https://img.shields.io/github/license/rrakib/rfc-iframe.svg)](https://github.com/rrakib/rfc-iframe/blob/master/LICENSE)

This is a react functional component wrapper for iFrame.

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
            <IFrame styles={{width: "100%", ...}}>
                <p>Your Beautiful Website</p>            
            </IFrame>        
        </div>
    );
}
```

### Idea Taken From i-rocky (Rasel Rana Rocky). Big shout out to him.