import React from 'react';
import Paper from 'material-ui/Paper';

const style = {
    margin: "auto",
    marginTop: "10px",
    textAlign: 'center',
    height: "auto",
    width: "50%"
};

class PaperExampleSimple extends React.Component {
    constructor(prop){
        super(prop);
    }
    render() {
        return(
            <div>
                <Paper style={style} zDepth={5} children={this.props.children}/>
            </div>
        )
    }
};

export default PaperExampleSimple;