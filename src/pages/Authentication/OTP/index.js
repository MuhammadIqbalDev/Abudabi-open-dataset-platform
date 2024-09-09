import React, { memo } from "react";
import OTPComponent from "../../../components/modules/Authentication/OTP";
import View from "../../../components/modules/View";

const OTP = memo(() => {
    return (
        <View nocontent noupperfooter nolowerfooter nomiddlefooter>
            <OTPComponent />
        </View>
    )
});

export default OTP;
