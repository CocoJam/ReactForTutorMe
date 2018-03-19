import React from 'react';
import TextField from 'material-ui/TextField';


function TextFieldFloat (fieldname,hintText,callBackfunction) {
 return(   <div>
        <TextField
            hintText={hintText}
            errorText="This field is required"
            floatingLabelText= {fieldname}
            onChange={callBackfunction}
        />
    </div>);
};

export default TextFieldFloat;