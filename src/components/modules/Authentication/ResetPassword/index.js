import React, { memo, useCallback } from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import AuthBackground2 from "../../../../assets/images/recover-pass-Image.jpg";
import { colors } from "../../../../utils/colors";
import Heading from "../../../elements/Heading";
import AuthCard from "../AuthCard";
import { useTranslation } from "react-i18next";
import { useNavigate, useLocation } from "react-router-dom";
import { routes } from "../../../../router/helper";

const ResetPassword = memo((props) => {

  const { t } = useTranslation();
  const navigate = useNavigate();
  const { state } = useLocation();

  const { setEmail, setPassword, setRePassword, setPolicyCheck, onClickButton, loading, email, password, rePassword } = props;

  const checked = useCallback((check) => setPolicyCheck(check));
  const onClickTermsAndPolicy = useCallback(() => navigate(routes.POLICY));

  return (
    <div>
      <div
        className="d-none d-lg-flex"
        style={{
          minHeight: "100vh",
          width: "100vw",
          backgroundImage: `url(${AuthBackground2})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "100vw 100%",
        }}
      >
        <Container fluid className="my-5 pt-5 max-width">
          <Row>
            <Col>
              <Row className="px-3 py-5">
                <Col md={8}>
                  <Heading heading={t("almostThere")} color={colors.white} />
                  <Heading
                    heading={t("passwordValidation")}
                    color={colors.white}
                    size="xs"
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
                  title={t("resetPassword")}
                  password={password}
                  subtitle={t("strongPassword")}
                  inputFields={[
                    { placeholder: t("governmentEmail"), type: "text", onChange: (val) => setEmail(val), value: email },
                    { placeholder: t("password"), type: "password", onChange: (val) => setPassword(val), value: password },
                    { placeholder: t("rePwd"), type: "rePassword", onChange: (val) => setRePassword(val), value: rePassword },
                  ]}
                  checkbox={{
                    // label: t("agreeCond"),
                    // linktext: "terms and privacy policy",
                    // borderColor: colors.light_gray,
                    // linktextColor: colors.purple,
                    // labelColor: colors.black,
                    onClick: checked,
                    naviagte: onClickTermsAndPolicy,
                    label: <p>{t("agreeCond")} <span onClick={() => navigate(routes.POLICY)} style={{ color: colors.purple, cursor: "pointer" }}> {t("terms")} </span > {t("and")} <span onClick={() => navigate(routes.POLICY)} style={{ color: colors.purple, cursor: "pointer" }}> {t("policy")} </span></p>,
                    borderColor: colors.light_gray,
                    linktextColor: colors.purple,
                    labelColor: colors.black,
                  }}
                  button={[
                    {
                      title: t("login"),
                      onClick: onClickButton,
                      backgroundColor: colors.black,
                      textColor: colors.white,
                      textSize: "",
                      loading
                    },
                  ]}
                />
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
      <div style={{ width: '100vw', height: '90vh' }} className="d-flex justify-content-center align-items-start d-lg-none mt-5 pt-5">
        <Container>
          <Row>
            <Col className="d-flex justify-content-center align-items-center">
              <Card
                className="p-0 mt-5"
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
                  title={t("changePassword")}
                  subtitle={t("strongPassword")}
                  password={password}
                  inputFields={[
                    { placeholder: t("governmentEmail"), type: "text", onChange: (val) => setEmail(val) },
                    { placeholder: t("password"), type: "password", onChange: (val) => setPassword(val) },
                    { placeholder: t("rePwd"), type: "password", onChange: (val) => setRePassword(val) },
                  ]}
                  checkbox={{
                    onClick: checked,
                    naviagte: onClickTermsAndPolicy,
                    label: <p>{t("agreeCond")} <span onClick={() => navigate(routes.POLICY)} style={{ color: colors.purple, cursor: "pointer" }}> {t("terms")} </span > {t("and")} <span onClick={() => navigate(routes.POLICY)} style={{ color: colors.purple, cursor: "pointer" }}> {t("policy")} </span></p>,
                    borderColor: colors.light_gray,
                    linktextColor: colors.purple,
                    labelColor: colors.black,
                  }}
                  button={[
                    {
                      title: t("login"),
                      onClick: onClickButton,
                      backgroundColor: colors.black,
                      textColor: colors.white,
                      textSize: "",
                      loading
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

export default ResetPassword;
