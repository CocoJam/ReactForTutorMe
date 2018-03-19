import React from 'react';
import {connect} from 'react-redux';

export class PushNotificationComp extends React.Component {
    constructor(props) {
        super();
        this.state = {}
    }

    render() {
        return (
            <div>
                <button id="subscriptionButton"  value="press">Press sub</button>
                <button id ="press">Press</button>
                <input id="textBox" type="text"/>
            </div>
        )
    }
}

const mappingStore = (state) => {
    console.log("Passing");
    console.log(state);
    return state
};

const DispatchStore = (dispatch) => {
    console.log("Dispatching");
    return {
        a: (arg) => {
            dispatch({type:"Action1",
                payload: arg
            });
        }
    }
};


export default connect(mappingStore, DispatchStore)(PushNotificationComp)