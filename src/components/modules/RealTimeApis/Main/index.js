import React from "react";
import { memo } from "react";
import { Col, Container, Row } from "react-bootstrap";
import BreadCrumb from "../../../elements/BreadCrumb";
import Heading from "../../../elements/Heading";
import { useTranslation } from "react-i18next";
import { routes } from "../../../../router/helper";
import i18next from "i18next";
import { locales } from "../../../../i18n/helper";
import '../style.css';

const RealTimeApisHeader = memo((props) => {

    const { t } = useTranslation();

    return (
        <div className="my-xl-5 pt-5 max-width">
            <div className="pt-5 breadCrumb-padding">
                <BreadCrumb items={[
                    {
                        title: t("applications")
                    },
                    {
                        title: t("realTimeAPI")
                    }]} />
            </div>
            <Container fluid>
                <div className="row mt-2 align-items-center justify-content-between header-padding">
                    <div className="col-lg-7 col-12 my-2">
                        {/* <Heading size={"xl"} heading={t("openData")} bold /> */}
                        <p className={`fs-lg ${i18next.language === locales.AR ? "ar-font-bold" : "en-font-bold"}`}>
                            {t("openData")}
                        </p>
                    </div>
                    <div className="col-lg-7 col-xl-8  my-0 my-lg-2 col-12">
                        <Heading heading={t("openDataDescription")} size={"xxs"} />
                    </div>
                </div>
            </Container>
        </div>
    )
})

export default RealTimeApisHeader;