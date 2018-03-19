import React from 'react';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import {connect} from "react-redux";


class DropDown extends React.Component {

    constructor(props) {
        super(props);
        const items = [];
        for (let i = 0; i < this.props.courses.length; i++ ) {
            console.log(this.props.courses);
            items.push(<MenuItem value={this.props.courses[i]} key={i} primaryText= { this.props.courses[i].courseID} />);
        }
        this.state = {value: 10, items: items};
        console.log(this.state);
    }

    handleChange = (event, index, value) => {
        this.setState({value});
        this.props.courseChangeHandler(event,index,value);
    };

    render() {
        return (
            <DropDownMenu maxHeight={300} value={this.state.value} onChange={this.handleChange.bind(this)}>
                {this.state.items.map((value,index)=>{
                    return value;
                })}
            </DropDownMenu>
        );
    }
}


const mappingStore = (state) => {
    console.log("Passing");
    console.log(state);
    return state
};

const DispatchStore = (dispatch) => {
    return {
    }
};
export default connect(mappingStore, DispatchStore)(DropDown)