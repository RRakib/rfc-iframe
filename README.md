# rfc-iframe

This is a react functional component wrapper for iFrame.

### Installation

`npm install rfc-iframe --save`

or

`yarn add rfc-iframe`

### Usage

```JS
import {IFrame} from 'rfc-iframe';

export default class WhatEver extends React.Component {
    state = {
        text: 'Hello World',
    }
    
    render() {
        return (
            <div>
                <IFrame styles={{width: "100%", ...}}>
                    <p>{ this.state.text }</p>            
                </IFrame>        
            </div>
        );
    }
}
```

## Idea Taken From i-rocky (Rasel Rana Rocky). Big shout out to him.