import React, { memo, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import RecoverPassComponent from "../../../components/modules/Authentication/RecoverPassword";
import View from "../../../components/modules/View";
import { routes } from "../../../router/helper";

const RecoverPassword = memo(() => {

  // const navigate = useNavigate();
  // const { search } = useLocation();

  // const urlParams = new URLSearchParams(search);

  // const otp = urlParams.get('xjskd');

  // useEffect(() => {
  //   if (!otp) return navigate(routes.RESET, { replace: true })
  // }, [])

  return (
    <View theme={window.innerWidth <= 768 ? "dark" : "light"} nocontent noupperfooter nomiddlefooter nolowerfooter>
      <RecoverPassComponent />
    </View>

  )
});

export default RecoverPassword;
