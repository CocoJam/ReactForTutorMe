import React from 'react';
import DatePicker from 'material-ui/DatePicker';

const DatePickerExampleSimple = (callback) => (
        <DatePicker hintText="Landscape Dialog" mode="landscape" onChange={callback} />
);

export default DatePickerExampleSimple;