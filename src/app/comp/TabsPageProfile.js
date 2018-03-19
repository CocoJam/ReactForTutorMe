import React from 'react';
import {Tabs, Tab} from 'material-ui/Tabs';
import TextField from './TextFieldFloat';
import Paper from "./Paper";
import RaisedButton from 'material-ui/RaisedButton';
import {connect} from "react-redux";
import CardsNonExends from "./CardsNonExends";
import DatePicker from "./DatePicker";
import TimePicker from "./TimePicker";
import DropDownMenuLongMenuExample from "./DropDown";

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
            date: null,
            time: null,
            course: null
        };
    }

    handleChange = (value) => {
        this.setState({
            value: value,
        });
    };

    handleDateChange(event, ChoseDate) {
        this.setState({
            ...this.state,
            date: ChoseDate
        });
        console.log(this.state);
    }

    handTimeChange(event, ChoseTime) {
        this.setState({
            ...this.state,
            time: ChoseTime
        });
        console.log(this.state);
    }

    handleCourseChange = (event, key, value) => {
        this.setState({
            ...this.state,
            course: value.courseID
        });
        console.log(value.CourseID);
        console.log("course has changed");
    };

    submitTime() {
        console.log(this.state);
        const submitObject = this.state;
        delete submitObject.value;
        submitObject.username = this.props.username;
        fetch("/TimeInsert", {
            method: "POST",

        }).then((res) => {
            if (res.ok) {
                return res.json();
            }
        }).then(function (res) {
                alert(res);
            }
        ).catch(function(err){
            alert(err);
        })
    }

    render() {
        return (
            <Tabs
                value={this.state.value}
                onChange={this.handleChange}
            >
                <Tab label="Profile Page" value="a">
                    <div>
                        <Paper>
                            {CardsNonExends(this.props.username)}
                        </Paper>
                    </div>
                </Tab>
                <Tab label="Otherasd" value="b">
                    <div>
                        <p>
                            <Paper>
                                <h2 style={styles.headline}>Other</h2>
                                {DatePicker(this.handleDateChange.bind(this))}
                                {TimePicker(this.handTimeChange.bind(this))}
                                {/*<DropDownMenuLongMenuExample courseChangeHandler={this.handleCourseChange.bind(this)}/>*/}
                                <RaisedButton onClick={this.submitTime.bind(this)} label="Submit Time" primary={true}/>
                            </Paper>
                        </p>
                    </div>
                </Tab>
            </Tabs>
        );
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
        SubmitTime: (arg) => {
            dispatch({
                type: "TimeSubmition",
                payload: arg
            });
        }
    }
};

export default connect(mappingStore, DispatchStore)(TabsExampleControlled)