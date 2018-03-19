import React from 'react';
import TimePicker from 'material-ui/TimePicker';


const TimePicker24 = (callback) => (
        <TimePicker
            format="24hr"
            hintText="24hr Format" onChange={callback}
        />
);
export default TimePicker24
