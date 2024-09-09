import React, { memo, useCallback, useState } from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router";
import AuthBackground1 from "../../../../assets/images/Auth-Background-1.jpg";
import { validateUser } from "../../../../axios/api";
import { routes } from "../../../../router/helper";
import { colors } from "../../../../utils/colors";
import UaePassImg from '../../../../assets/images/Uaepass.png';
import Heading from "../../../elements/Heading";
import AuthCard from "../AuthCard";
import { toast } from "react-toastify";
import { locales } from "../../../../i18n/helper";
import '../style.css';

const Login = memo(() => {

  const { t, i18n } = useTranslation();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);

  const onClickLogin = useCallback(() => {

    if (email && password) {
      validateUser(navigate, routes.OTP, setLoading, { email, password })
    } else {
      toast("All fields are required.", { type: "error" })
    }

  });
  console.log("sssss",loading);
  const onClickForgetPassword = useCallback(() => navigate(routes.RECOVER));
  const onClickRegister = useCallback(() => navigate(routes.REGISTER));

  return (
    <div>
      <div
        className={`d-none d-lg-flex main-auth ${i18n.language === locales.AR ? "flipImage" : "defaultImage"}`}>
        <Container fluid className="my-5 pt-5 max-width">
          <Row>
            <Col>
              <Row className="px-4 py-5">
                <Col className="pt-lg-2 pt-0" md={8}>
                  <p className={`fs-lg text-white ${i18n.language === locales.AR ? "ar-font-bold" : "en-font-bold"}`}>{t("openDataTitle")}</p>
                  {/* <Heading
                    heading={t("openDataTitle")}
                    color={colors.white}
                  /> */}
                </Col>
              </Row>
            </Col>
            <Col className="d-flex justify-content-center align-items-center">
              <Card
                className="p-5"
                style={{
                  width: "450px",
                  backgroundColor: colors.white,
                  borderRadius: "30px",
                  height: "100%"
                }}
              >
                <AuthCard
                  view="dekstop"
                  title={t("logIn")}
                  subtitle={t("accDontExist")}
                  linktext={{ display_text: t("requestAccess"), onClick: onClickRegister }}
                  inputFields={[
                    { placeholder: t("governmentUser"), type: "text", onChange: (value) => setEmail(value) },
                    { placeholder: t("password"), type: "password", onChange: (value) => setPassword(value) },
                  ]}
                  button={[
                    {
                      title: t("logIn"),
                      onClick: onClickLogin,
                      backgroundColor: colors.black,
                      textColor: colors.white,
                      textSize: "",
                      loading
                    },
                    {
                      title: t("LoginWithUAE"),
                      icon: <img src={UaePassImg} className="mx-2" style={{ height: 22, width: 22 }} />,
                      onClick: "",
                      backgroundColor: colors.white,
                      textColor: colors.black,
                      borderColor: colors.black,
                      textSize: "",
                      bold: true
                    },
                  ]}
                  onClickForgetPassword={onClickForgetPassword}
                />
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
      <div style={{ width: '100vw', height: '100vh' }} className="my-5 py-5 d-flex justify-content-center align-items-start d-lg-none">
        <Container fluid>
          <Row>
            <Col className="d-flex justify-content-center align-items-center">
              <Card
                className="p-0 my-5"
                style={{
                  width: "100vw",
                  backgroundColor: colors.white,
                  borderRadius: "30px",
                  height: "100%",
                  borderColor: 'transparent'
                }}
              >
                <AuthCard
                  view="mobile"
                  title={t("logIn")}
                  subtitle={t("accDontExist")}
                  linktext={{ display_text: t("requestAccess"), onClick: onClickRegister }}
                  inputFields={[
                    { placeholder: t("governmentEmail"), type: "text", onChange: (value) => setEmail(value) },
                    { placeholder: t("password"), type: "password", onChange: (value) => setPassword(value) },
                  ]}
                  button={[
                    {
                      title: t("logIn"),
                      onClick: onClickLogin,
                      backgroundColor: colors.black,
                      textColor: colors.white,
                      textSize: "",
                      loading
                    },
                    {
                      title: t("LoginWithUAE"),
                      onClick: "",
                      icon: <img src={UaePassImg} className="mx-2" style={{ height: 22, width: 22 }} />,
                      bold: true,
                      backgroundColor: colors.white,
                      textColor: colors.black,
                      borderColor: colors.black,
                      textSize: "",
                    },
                  ]}
                  onClickForgetPassword={onClickForgetPassword}
                />
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
});

export default Login;
