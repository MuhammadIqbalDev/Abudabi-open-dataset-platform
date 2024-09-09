import React, { memo } from "react";
import { Col, Container, Image, Row } from "react-bootstrap";
import Application from '../../../../assets/images/Applications-1.png'
import Heading from "../../../elements/Heading";
import { useTranslation } from "react-i18next";
import './style.css';
import i18next from "i18next";
import { locales } from "../../../../i18n/helper";
import { colors } from "../../../../utils/colors";
import Search from "../../../elements/Search";

const Main = memo((props) => {

    const { t } = useTranslation()
    const { expandedSearchbar, setExpandedSearchbar, title, description, isSearchBar, noimage, onSearch, popularSearch, nodiscroptiontemp, searchText } = props;

    return (
        <Container fluid className="my-4 page-padding">
            <Row className="align-items-start justify-content-between py-0 py-md-5 margin max-width">
                <Col md={5} xs={12} className='py-3 p-0'>
                    <p className={`m-0 fs-xl ${i18next.language === locales.AR ? "ar-font-bold" : "en-font-bold"}`}>{title ? title : t("applicationTitle")}</p>
                    {/* <Heading bold nomargin heading={t("applicationTitle")} /> */}
                </Col>
                <Col md={5} xs={12} className='py-3 p-0'>
                    {!nodiscroptiontemp &&
                        <p className="m-0 fs-xs-static" style={{ color: colors.dark_gray }}>{description ? description : t("applicationDiscription")}</p>
                    }
                    {/* { <Heading size='xxs' nomargin heading={t("applicationDiscription")} /> } */}
                </Col>
            </Row>
            {!noimage &&
                <Row className="py-2 max-width">
                    <Col className="p-0">
                        <img
                            className="image-sizing"
                            src={Application}
                            style={{ borderRadius: '30px' }} />
                    </Col>
                </Row>
            }
            {isSearchBar &&
                <Row>
                    <Col />
                    <Col xs={12} md={10} lg={8} className="my-4" style={{ zIndex: 1000 }}>
                        <Search
                            expandedSearchbar={expandedSearchbar}
                            setExpandedSearchbar={setExpandedSearchbar}
                            searchData={popularSearch}
                            onPressEnter={onSearch}
                            placeholder={searchText ? searchText : t("searchKeywords")}
                            placeholderformobile={searchText ? searchText : t("searchPlaceholderformobileTopic")}
                            isFilterIcon
                            iconColor={"#707070"}
                        />
                    </Col>
                    <Col />
                </Row>
            }
        </Container>
    )
});

export default Main;