import React, { memo, useCallback, useState } from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import AuthBackground2 from "../../../../assets/images/recover-pass-Image.jpg";
import { colors } from "../../../../utils/colors";
import Heading from "../../../elements/Heading";
import AuthCard from "../AuthCard";
import { useTranslation } from "react-i18next";
import { recoverPassword } from "../../../../axios/api";
import { routes } from "../../../../router/helper";
import { useNavigate } from "react-router-dom";
import { validateEmail } from "../../../../utils/generic";
import { toast } from "react-toastify";
import UaePassImg from '../../../../assets/images/Uaepass.png';
import '../style.css';
import i18next from "i18next";
import { locales } from "../../../../i18n/helper";

const RecoverPassword = memo(() => {

  const { t, i18n } = useTranslation()
  const navigate = useNavigate();

  const [email, setEmail] = useState();
  const [loading, setLoading] = useState(false);

  const onClickRecoverPassword = useCallback(() => {
    if (email == '') {
      toast("Email is empty, Please enter your email.", { type: "error" })
    } else if (validateEmail(email) === false) {
      toast("Please provide a valid email address.", { type: "error" })
    } else {
      recoverPassword(navigate, routes.HOME, setLoading, { email })
    }
  });

  return (
    <div>
      <div
        className={`d-none d-lg-flex main-recover ${i18n.language === locales.AR ? "flipImage" : "defaultImage"}`}>
        <Container fluid className="my-5 pt-5 max-width">
          <Row>
            <Col>
              <Row className="p-4">
                <Col md={8}>
                  <Heading
                    heading={t("openDataTitle")}
                    color={colors.white}
                  />
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
                  title={t("recoverPassword")}
                  subtitle={t("pwdrecovery")}
                  inputFields={[{ placeholder: t("registeredEmail"), type: "text", onChange: (value) => setEmail(value) }]}
                  button={[
                    {
                      title: t("sendCode"),
                      onClick: onClickRecoverPassword,
                      backgroundColor: colors.black,
                      textColor: colors.white,
                      textSize: "",
                      loading
                    },
                    {
                      title: t("LoginWithUAE"),
                      icon: <img src={UaePassImg} className="mx-2" style={{ height: 22, width: 22 }} />,
                      bold: true,
                      onClick: "",
                      backgroundColor: colors.white,
                      textColor: colors.black,
                      borderColor: colors.black,
                      textSize: "",
                    },
                  ]}
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
                className="p-0"
                style={{
                  width: "100vw",
                  backgroundColor: colors.white,
                  height: "100%",
                  borderColor: 'transparent'
                }}
              >
                <AuthCard
                  view="mobile"
                  title={t("passwordRecovery")}
                  subtitle={t("pwdrecovery")}
                  inputFields={[{ placeholder: t("registeredEmail"), type: "text", onChange: (value) => setEmail(value) }]}
                  button={[
                    {
                      title: t("sendCode"),
                      onClick: onClickRecoverPassword,
                      backgroundColor: colors.black,
                      textColor: colors.white,
                      textSize: "",
                    },
                    {
                      title: t("LoginWithUAE"),
                      icon: <img src={UaePassImg} className="mx-2" style={{ height: 22, width: 22 }} />,
                      bold: true,
                      onClick: "",
                      backgroundColor: colors.white,
                      textColor: colors.black,
                      borderColor: colors.black,
                      textSize: "",
                    },
                  ]}
                />
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
});

export default RecoverPassword;
