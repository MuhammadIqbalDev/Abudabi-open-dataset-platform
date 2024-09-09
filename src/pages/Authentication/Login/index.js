import React, { memo } from "react";
import LoginComponent from "../../../components/modules/Authentication/Login";
import View from "../../../components/modules/View";

const Login = memo(() => {
  return (
    <View theme={window.innerWidth <= 768 ? "dark" : "light"} nocontent nomiddlefooter noupperfooter nolowerfooter>
      <LoginComponent />
    </View>
  )
});

export default Login;
