import React from 'react';
import {connect} from 'react-redux';
import PushNotificationComp from "./PushNotificationComp";
import TabsPageLogin from "./TabsPageLogin";
import TabsPageProfile from "./TabsPageProfile";
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

class App extends React.Component {
    constructor(props) {
        super();
        this.state = {};
    }

    render() {
        var content = "";
        if (!this.props.login) {
            content = <TabsPageLogin/>
        }
        else {
            console.log("logined in")
            content = <TabsPageProfile/>
        }
        return (
            <MuiThemeProvider>
                {content}
            </MuiThemeProvider>
        )
    }
}

const mappingStore = (state) => {
    console.log("Passing");
    console.log(state);
    return state
};

const DispatchStore = (dispatch) => {
    return {
        courses: (arg) => {
            dispatch({
                type: "courses",
                payload: arg
            });
        }
    }
};

export default connect(mappingStore, DispatchStore)(App)