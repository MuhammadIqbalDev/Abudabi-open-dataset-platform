import axios from "axios";
import { memo, useEffect, useRef, useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";

const ReactRecaptcha = memo((props) => {

    const { callBack } = props;

    const onChange = async (value) => {
        console.log("RECAPTCHA", value);
        callBack(value);

        // let captchaToken = req.body.captchaToken;
        // Call Google's API to get score
        // const res = await axios.post(
        //     `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.REACT_APP_SECRET_KEY}&response=${value}`
        // );

        // // Extract result from the API response
        // console.log("HELLLLLLLLLLLLLLLLLLLLLLLLLLLL",res);
        // if (res.data.success) {
        //     console.log('Valid');
        // } else {
        //     console.log('Invalid');
        // }
    }

    return (
        <ReCAPTCHA
            sitekey={process.env.REACT_APP_SITE_KEY}
            onChange={onChange}
            type="image"
            size="normal"
        />
    )
})

export default ReactRecaptcha;