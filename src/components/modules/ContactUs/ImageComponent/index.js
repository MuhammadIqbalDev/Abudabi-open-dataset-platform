import React, { memo } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { colors } from "../../../../utils/colors";
import Heading from "../../../elements/Heading";
import Background from '../../../../assets/images/Contact-Us-en.jpg'
import BackgroundAr from '../../../../assets/images/Contact-Us-ar.jpg'
import BreadCrumb from "../../../elements/BreadCrumb";
import { useTranslation } from "react-i18next";
import i18n from "../../../../i18n/i18n";
import { locales } from "../../../../i18n/helper";
import { routes } from "../../../../router/helper";

const ImageComponent = memo(() => {
    const { t } = useTranslation();
    return (
        <div
            style={{
                height: "100%",
                width: "100%",
                backgroundImage: i18n.language === locales.EN ? `url(${Background})` : `url(${BackgroundAr})`,
                backgroundRepeat: "no-repeat",
                backgroundSize: "100% 100%",
            }}
        >
            <Container className="pt-1 px-4" fluid>
                <Row className="pt-5 p-0">
                    <Col>
                        <div className="py-4 p-0">
                            <BreadCrumb textcolor={colors.white} iconColor={colors.white}
                                items={[
                                    {
                                        title: t("aboutus")
                                    }
                                ]}
                            />
                        </div>
                        <p className={`text-white ${i18n.language === locales.AR ? "ar-font-bold" : "en-font-bold"} fs-lg`}>{t("contactUs")}</p>
                        {/* <Heading heading={t("contactUs")} size="xl" bold color={colors.white} /> */}
                    </Col>
                </Row>
                <Row className="px-0">
                    <Col md={7}>
                        <p className="fs-xxs m-0 text-white">{t("footerPartText")}</p>
                        {/* <Heading nomargin heading={t("footerPartText")} size="xs" color={colors.white} /> */}
                    </Col>
                </Row>
            </Container>

        </div>
    )
})

export default ImageComponent;