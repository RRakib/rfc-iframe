# rfc-iframe

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
                <IFrame width={"500px"} height={"500px"}>
                    <p>{ this.state.text }</p>            
                </IFrame>        
            </div>
        );
    }
}
```