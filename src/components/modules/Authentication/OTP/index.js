import React, { memo, useCallback, useEffect, useState } from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router";
import AuthBackground1 from "../../../../assets/images/Auth-Background-1.jpg";
import { login } from "../../../../axios/api";
import { handleLogin } from "../../../../redux/reducers/Authentication";
import { routes } from "../../../../router/helper";
import { colors } from "../../../../utils/colors";
import Heading from "../../../elements/Heading";
import AuthCard from "../AuthCard";

const OTP = memo(() => {

    const { t } = useTranslation();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();

    if (location && location.state) {
        var { email, password } = location.state;
    }


    const [otp, setOtp] = useState('');

    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (!email || !password) {
            navigate(routes.LOGIN, { replace: true })
        }
    }, []);

    const onClickLogin = useCallback(() => login(dispatch, handleLogin, setLoading, { email, password, otp }, routes.HOME));
    const onClickForgetPassword = useCallback(() => navigate(routes.RECOVER));
    const onClickRegister = useCallback(() => navigate(routes.REGISTER));

    return (
        <div>
            <div
                className="d-none d-lg-flex"
                style={{
                    minHeight: "100vh",
                    width: "100vw",
                    backgroundImage: `url(${AuthBackground1})`,
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "100vw 100%",
                }}
            >
                <Container fluid className="my-5 pt-5">
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
                                    title={t("otpTitle")}
                                    subtitle={t("otpMessage")}
                                    hasOtp
                                    otp={otp}
                                    setOtp={setOtp}
                                    button={[
                                        {
                                            title: t("done"),
                                            onClick: onClickLogin,
                                            backgroundColor: colors.black,
                                            textColor: colors.white,
                                            textSize: "",
                                            loading
                                        }
                                    ]}
                                />
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </div>
            <div style={{ width: '100vw', height: '100vh' }} className="d-flex justify-content-center align-items-end d-lg-none">
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
                                    title={t("otpTitle")}
                                    subtitle={t("otpMessage")}
                                    hasOtp
                                    otp={otp}
                                    setOtp={setOtp}
                                    button={[
                                        {
                                            title: t("done"),
                                            onClick: onClickLogin,
                                            backgroundColor: colors.black,
                                            textColor: colors.white,
                                            textSize: "",
                                            loading
                                        }
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

export default OTP;
