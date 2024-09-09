import React, { memo } from "react";
import View from "../../components/modules/View";
import wavybg from '../../assets/images/Wavy_Background.png';
import { MdOutlineMailOutline } from "react-icons/md";
import Button from "../../components/elements/Button";
import { useLocation, useNavigate } from "react-router-dom";
import { routes } from "../../router/helper";
import { colors } from "../../utils/colors";
import { Col, Container, Row } from "react-bootstrap";
import Heading from "../../components/elements/Heading";
import { useTranslation } from "react-i18next";

const Confirmation = memo((props) => {

    const { state } = useLocation();

    const { email } = props;

    const navigate = useNavigate();
    const { t } = useTranslation();

    return (
        <View theme={"dark"} noupperfooter>
            <div className="pt-5">
                <div
                    style={{
                        minHeight: "100vh",
                        width: "100vw",
                        backgroundImage: `url(${wavybg})`,
                        backgroundRepeat: "no-repeat",
                        backgroundSize: "100vw 100%",
                        justifyContent: "center",
                        display: "flex"
                    }}>
                    <Container className="d-flex justify-content-center align-items-center flex-column">
                        <Row className="my-2 justify-content-center align-items-center">
                            <Col className="d-flex align-items-center justify-content-center flex-column py-3">
                                <MdOutlineMailOutline className="my-2" size={45} color={"#762FFF"} />
                                <div className="my-1">
                                    <Heading size={"md"} bold heading={t("thankyou")} />
                                </div>
                                <div className="text-center my-1">
                                    <Heading size={"xs"} heading={`${t("thankyouPara")}`} />
                                    <Heading size={"xs"} heading={`${t("thankyouSecPara")} ${email ? `on ${state && state.email}` : ""}`} />
                                </div>
                                <div className="py-4">
                                    <Button
                                        onClick={() => { navigate(routes.SUPPORT, { replace: true }) }}
                                        title={t("getsupport")}
                                        backgroundColor={colors.black}
                                        textColor={colors.white} />
                                </div>
                            </Col>
                        </Row>
                    </Container>
                </div>
            </div>
        </View>
    )
})

export default Confirmation;