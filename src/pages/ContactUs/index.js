import React, { memo } from "react";
import Main from "../../components/modules/ContactUs/Main";
import View from "../../components/modules/View";

const ContactUs = memo(() => {
    return (
        <View theme="dark" noupperfooter>
            <Main />
        </View>
    )
})

export default ContactUs;