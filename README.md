# rfc-iframe

This is a react functional component wrapper for iFrame.

### Installation

`npm install rfc-iframe --save`

or

`yarn add rfc-iframe`

### Usage

```JS
import {IFrame} from 'rfc-iframe';

const WhatEver = () => {
    
    render() {
        return (
            <div>
                <IFrame styles={{width: "100%", ...}}>
                    <p>Your Beautiful Website</p>            
                </IFrame>        
            </div>
        );
    }
}
```

### Idea Taken From i-rocky (Rasel Rana Rocky). Big shout out to him.