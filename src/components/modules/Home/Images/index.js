import React, { memo, useCallback } from "react";
import { Col, Container, Row } from "react-bootstrap";
import background from '../../../../assets/images/Desktop.jpg';
import CardOne from '../../../../assets/images/Card-One.jpg';
import CardTwo from '../../../../assets/images/Card-Two.jpg';
import CardTwoMob from '../../../../assets/images/Card-two-mob.png';
import Heading from "../../../elements/Heading";
import Button from "../../../elements/Button";
import { colors } from "../../../../utils/colors";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router";
import { routes } from "../../../../router/helper";
import './style.css';
import CustomButton from "../../../elements/CustomButton";
import i18next from "i18next";
import { locales } from "../../../../i18n/helper";

const Images = memo(() => {

    const { t } = useTranslation();
    const navigate = useNavigate();

    const onClickFindOutMore = useCallback(() => navigate(routes.SUCCESS_STOIRES));
    const onClickDiscover = useCallback(() => navigate(routes.DATASET));
    const onClickRegister = useCallback(() => navigate(routes.PUBLISHER));

    return (
        <Container className="" fluid style={{ backgroundColor: colors.black }}>
            {/* <Row>
                <Col className="my-3 px-4">
                    <div className="d-flex flex-column justify-content-center" style={{
                        height: '75vh',
                        backgroundImage: `url(${background})`,
                        backgroundRepeat: 'no-repeat',
                        backgroundSize: 'cover',
                        borderRadius: '30px',
                        backgroundPosition: 'center'
                    }}>
                        <Row>
                            <Col className='text-center'>
                                <Heading size="xs" color="white" heading={t("latest")} />
                            </Col>
                            <div className="d-flex">
                                <Col />
                                <Col xs={12} md={8} className='px-3 d-flex justify-content-center align-items-center text-center'>
                                    <Heading color='white' heading={t("renewable")} />
                                </Col>
                                <Col />
                            </div>
                            <Col className='d-flex justify-content-center py-2'>
                                <Button bold textColor={"#101010"} title={t("find")} onClick={onClickFindOutMore} />
                            </Col>
                        </Row>
                    </div>
                </Col>
            </Row> */}
            <Row >
                <Col className="max-width">
                    <Row className="card-padding-lg">
                        <Col xs={12} md={12} lg={6} className="my-2">
                            <div className="d-flex flex-column justify-content-center card-height" id="zoom-in-out-card-one" style={{
                                //height: window.innerWidth <= 765 ? '400px' : '500px',
                                // backgroundImage: `url(${CardOne})`,
                                backgroundRepeat: 'no-repeat',
                                backgroundSize: 'cover',
                                borderRadius: '30px',
                                backgroundPosition: 'center',
                                position: 'relative'
                            }}>
                                <div className="overlay" />
                                <Row className="pt-1" style={{ zIndex: 1 }}>
                                    <Col />
                                    <Col xs={10} sm={12} md={8} className='text-center' id='zoom-in'>
                                        <p className={`fs-lg text-white ${i18next.language === locales.AR ? "ar-font-bold" : "en-font-bold"}`}>{t("areYouNewToOpenData")}</p>
                                        {/* <Heading bold size={"xxl"} color='white' heading={t("areYouNewToOpenData")} /> */}
                                    </Col>
                                    <Col />
                                </Row>
                                <Row className="pt-4" style={{ zIndex: 1 }}>
                                    <Col />
                                    <Col sm={12} md={8} className='d-flex justify-content-center align-items-center text-center'>
                                        {/* <Button bold title={t("discover")} onClick={onClickDiscover} /> */}
                                        <CustomButton bold title={t("discover")} onClick={onClickDiscover} buttonClass='contained' />
                                    </Col>
                                    <Col />
                                </Row>
                            </div>
                        </Col>
                        <Col xs={12} md={12} lg={6} className="my-2">
                            <div className="d-flex flex-column justify-content-center card-two card-height " id="zoom-in-out-card-two" style={{
                                //height: window.innerWidth <= 765 ? '400px' : '500px',
                                //backgroundImage: `url(${CardTwo})`,
                                backgroundRepeat: 'no-repeat',
                                backgroundSize: 'cover',
                                borderRadius: '30px',
                                backgroundPosition: 'center'
                            }}>
                                <Row className="pt-1" style={{ zIndex: 1 }}>
                                    <Col />
                                    <Col xs={10} md={6} className='d-flex flex-column justify-content-center align-items-center text-center' id='zoom-in'>
                                        {/* <Heading bold size='xxl' color='white' heading={t("joinUsRegisterWithUs")} /> */}
                                        <p className={`text-white fs-lg ${i18next.language === locales.AR ? "ar-font-bold" : "en-font-bold"}`}>
                                            {t("joinUsRegisterWithUs")}
                                        </p>
                                        <Heading size='xxs' color='white' heading={t("joinUsRegisterWithUsDescription")} />
                                    </Col>
                                    <Col />
                                </Row>
                                <Row className="pt-3" style={{ zIndex: 1 }}>
                                    <Col />
                                    <Col sm={12} md={8} className='d-flex justify-content-center align-items-center text-center'>
                                        {/* <Button bold title={t("getStarted")} onClick={onClickRegister} /> */}
                                        <CustomButton bold title={t("explorepublisher")} onClick={onClickRegister} buttonClass='contained' />
                                    </Col>
                                    <Col />
                                </Row>
                            </div>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </Container>
    )
});

export default Images;