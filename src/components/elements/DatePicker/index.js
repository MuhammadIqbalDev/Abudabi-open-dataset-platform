import React, { memo } from 'react';
import dayjs from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import TextField from '@mui/material/TextField';

const DatePicker = memo((props) => {

    const { title, onChange, value, minDate, maxDate, disabled } = props;

    const handleChange = (newValue) => {
        onChange(dayjs(newValue).format('YYYY-MM-DD'))
    };
    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DesktopDatePicker
                disabled={disabled}
                label={title}
                inputFormat="YYYY-MM-DD"
                className='w-100'
                value={value ? value : null}
                onChange={handleChange}
                renderInput={(params) => <TextField {...params} />}
                // minDate={minDate}
                maxDate={maxDate}
            />
        </LocalizationProvider>
    )
});

export default DatePicker;
