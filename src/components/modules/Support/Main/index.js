import React, { memo, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import Heading from '../../../elements/Heading';
import Search from '../../../elements/Search';
import i18next from "i18next";
import { locales } from "../../../../i18n/helper";

const Main = memo((props) => {

    const { popularSearch, onSearch } = props;

    const { t } = useTranslation();

    const [expandedSearchbar, setExpandedSearchbar] = useState(false);

    return (
        <Container className="pt-5 mt-5">
            <Row className="py-5">
                <Col className="d-flex flex-column justify-content-center">
                    <Row>
                        <Col />
                        <Col xs={10} md={8} style={{ textAlign: 'center' }} className="py-2">
                            <p className={`text-black fs-mega ${i18next.language === locales.AR ? "ar-font-bold" : "en-font-bold"}`}>{t("howCanHelp")}</p>
                            {/* <Heading bold color="black" heading={t("howCanHelp")} /> */}
                        </Col>
                        <Col />
                    </Row>
                    <Row>
                        <Col />
                        <Col xs={12} md={10} lg={8} className="py-3" style={{ zIndex: 1000 }}>
                            <Search
                                setExpandedSearchbar={setExpandedSearchbar}
                                expandedSearchbar={expandedSearchbar}
                                searchData={popularSearch}
                                onPressEnter={onSearch}
                                placeholder={t("searchKeywords")}
                                placeholderformobile={t("searchPlaceholderformobileTopic")}
                                isFilterIcon
                                iconColor={"#707070"}
                            />
                        </Col>
                        <Col />
                    </Row>
                </Col>
            </Row>
        </Container>
    )
});

export default Main;