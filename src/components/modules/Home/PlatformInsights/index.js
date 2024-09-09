import React, { memo } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { colors } from "../../../../utils/colors";
import Heading from "../../../elements/Heading";
import { useTranslation } from "react-i18next";
import { locales } from "../../../../i18n/helper";
import { nFormatter, numberWithCommas } from "../../../../utils/generic";

const PlatformInsights = memo((props) => {

    const { t, i18n } = useTranslation()

    const { data } = props


    return (
        <div className="bg-black py-4 pt-md-5 pb-xl-3">
            <Container>
                <Row className="my-3">
                    <Col className="text-center pt-md-3">
                        <Heading size="xs" color={colors.pearl_white} heading={t("abuDhabiDataInNumbers")} />
                    </Col>
                </Row>
                <Row className="my-4 px-4 pb-xl-4 pb-md-4">
                    {/* <Col className="bg-dark">
                        <Row> */}
                            {
                                data && data.length > 0 && data.map((item, index) => (
                                    <Col key={index} xs={6} md={4} xl={2} className='text-center m-0 my-3 my-lg-0'>
                                        <Col>
                                            {/* <Heading color="white"
                                        heading={item.label === "Datasets" ? numberWithCommas(item.value) :
                                        item.label === "APIS" ? numberWithCommas(item.value) :
                                                nFormatter(item.value, 2)} /> */}
                                            <p className={`text-white fs-md ${i18n.language === locales.EN ? "en-font-bolder" : "ar-font-bold"} `} style={{ marginBottom: '10px' }}>
                                                {item.label === "Datasets" ? numberWithCommas(item.value) :
                                                    item.label === "APIS" ? numberWithCommas(item.value) :
                                                        nFormatter(item.value, 2)}
                                            </p>
                                        </Col>
                                        <Col>
                                            {/* <Heading size='xxs' color={colors.pearl_white} heading={i18n.language === locales.AR ? item.label_ar : item.label} /> */}
                                            <p className={`fs-static ${i18n.language === locales.EN ? "en-font" : "ar-font"} ${index == 0 ? 'pb-md-5 pb-xl-2' : 'pb-md-0'}`} style={{ color: colors.pearl_white }}>{i18n.language === locales.AR ? item.label_ar : item.label} </p>
                                        </Col>
                                    </Col>
                                ))
                            }
                        {/* </Row>
                    </Col> */}
                </Row>
            </Container>
        </div>
    )
})

export default PlatformInsights;