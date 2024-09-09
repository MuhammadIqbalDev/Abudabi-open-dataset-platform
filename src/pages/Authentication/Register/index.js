import React, { memo } from "react";
import RegisterComponent from "../../../components/modules/Authentication/Register";
import View from "../../../components/modules/View";

const Register = memo(() => {
  return (
    <View theme={window.innerWidth <= 768 ? "dark" : "light"} nocontent noupperfooter nomiddlefooter nolowerfooter>
      <RegisterComponent />
    </View>
  )

});

export default Register;
