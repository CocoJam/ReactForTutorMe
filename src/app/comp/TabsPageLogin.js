import React from 'react';
import {Tabs, Tab} from 'material-ui/Tabs';
import TextField from './TextFieldFloat';
import Paper from "./Paper";
import RaisedButton from 'material-ui/RaisedButton';
import {connect} from "react-redux";

const styles = {
    headline: {
        fontSize: 24,
        paddingTop: 16,
        marginBottom: 12,
        fontWeight: 400,
    },
    textField: {
        padding: 10
    }
};

class TabsExampleControlled extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: "",
            name: "",
            login: false
        };
    }

    handleChange = (value) => {
        this.setState({
            value: value,
        });
    };
    handleUsernameChange = (event, index, values) => {
        // this.setState({values});
        console.log("outter change");
        this.setState({
            ...this.state,
            username: event.target.value
        })
        console.log(event.target.value);
    };
    handlePasswordChange = (event, index, values) => {
        // this.setState({values});
        console.log("outter change");
        this.setState({
            ...this.state,
            password: event.target.value
        });
        console.log(event.target.value)
    };
    handleNameChange = (event, index, values) => {
        // this.setState({values});
        console.log("outter change");
        this.setState({
            ...this.state,
            name: event.target.value
        });
        console.log(event.target.value);
    };
    handleLogin = (event) => {
        let esc = encodeURIComponent;
        const params = {username: this.state.username, password: this.state.password};
        const query = Object.keys(params).map(k => esc(k) + '=' + esc(params[k])).join('&');
        fetch("/sql?" + query).then((res) => {
            console.log("login comes back")
            if (res.ok) {
                console.log(res);
                try{
                    return res.json();
                }
                catch (err){
                    console.log(err)
                }
            }
            else {
                console.log("error in the res.ok");
                throw Error("parse error of responds")
            }
        }).then((res) => {
            console.log("setState");
            this.setState({
                ...this.state,
                login: true
            });
            console.log();
            console.log(this.state);
            this.props.Logined(this.state);
            return res
        }).catch((err) => {
            console.log(err);
        });
        fetch("/courses",{Method: "GET"}).then((res)=>{
            return res.json();
        }).then((res)=>{
            this.props.courses(res);
            return res;
        });
    };
    handleRegister = (event) => {
        let esc = encodeURIComponent;
        const params = {username: this.state.username, password: this.state.password, name: this.state.name};
        const query = Object.keys(params).map(k => esc(k) + '=' + esc(params[k])).join('&');
        fetch("/register?" + query).then((res) => {
            if (res.ok) {
                return res.json();
            }
            else {
                throw Error("parse error of responds")
            }
        }).then((res) => {
            this.setState({
                ...this.state,
                login: true
            });
            console.log("store dispatched");
            console.log(this.state);
            this.props.Logined(this.state);
            return res
        }).catch((err) => {
            console.log(err);
        });
    };

    render() {
        return (
            <Tabs
                value={this.state.value}
                onChange={this.handleChange}
            >
                <Tab label="Login" value="a">
                    <div>
                        <Paper>
                            <h2 style={styles.headline}>Login</h2>
                            {TextField("Username", "Please Enter Your Username", this.handleUsernameChange)}
                            {TextField("Password", "Please Enter Your Password", this.handlePasswordChange)}
                            <RaisedButton onClick={this.handleLogin} label="Login" primary={true}/>
                        </Paper>
                    </div>
                </Tab>
                <Tab label="Register" value="b">
                    <div>
                        <Paper>
                            <h2 style={styles.headline}>Register</h2>
                            {TextField("Username", "Please Enter Your Username", this.handleUsernameChange)}
                            {TextField("Password", "Please Enter Your Password", this.handlePasswordChange)}
                            {TextField("Password", "Please Enter Your Password", this.handleNameChange)}
                            <RaisedButton onClick={this.handleRegister} label="Register" primary={true}/>
                        </Paper>
                    </div>
                </Tab>
            </Tabs>
        );
    }
}


const mappingStore = (state) => {
    return state
};

const DispatchStore = (dispatch) => {
    return {
        Logined: (arg) => {
            delete arg.password;
            dispatch({
                type: "Login",
                payload: arg
            });
        },
        courses: (arg) => {
            dispatch({
                type: "courses",
                payload: arg
            });
        }
    }
};

export default connect(mappingStore, DispatchStore)(TabsExampleControlled)