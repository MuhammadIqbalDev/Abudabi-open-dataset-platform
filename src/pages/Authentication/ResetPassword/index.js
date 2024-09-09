import React, { memo, useCallback, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { resetPassword } from "../../../axios/api";
import ResetPassComponent from "../../../components/modules/Authentication/ResetPassword";
import View from "../../../components/modules/View";
import { routes } from "../../../router/helper";
import { isStrongPassword, validateEmail } from "../../../utils/generic";

const ResetPassword = memo(() => {

  const navigate = useNavigate();
  const { search } = useLocation();

  const urlParams = new URLSearchParams(search);

  const otp = urlParams.get('xjskd');

  const [loading, setLoading] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rePassword, setRePassword] = useState("");
  const [policyCheck, setPolicyCheck] = useState(false)

  useEffect(() => {
    if (!otp) return navigate(routes.RECOVER, { replace: true })
  }, [])

  const onClickButton = useCallback(() => {

    if (email === '' || password === '' || rePassword === '') {
      toast("Please fill all the fields.", { type: "error" })
    } else if (validateEmail(email) === false) {
      toast("Please provide a valid email address.", { type: "error" })
    } else if (isStrongPassword(password) === false) {
      toast("Password isn't matching validation requirements.", { type: "error" })
    } else if (rePassword !== password) {
      toast("Both passwords doesn't match.", { type: "error" })
    } else if (!policyCheck) {
      toast("Please check Abu dhabi policy.", { type: "error" })
    } else {
      resetPassword(navigate, routes.LOGIN, setLoading, { email, password, otp })
    }

  })

  return (
    <View theme={window.innerWidth <= 768 ? "dark" : "light"} nocontent noupperfooter nomiddlefooter nolowerfooter>
      <ResetPassComponent
        email={email}
        password={password}
        rePassword={rePassword}
        setEmail={setEmail}
        setPassword={setPassword}
        setRePassword={setRePassword}
        setPolicyCheck={setPolicyCheck}
        onClickButton={onClickButton}
        loading={loading}
      />
    </View>
  )
});

export default ResetPassword;
