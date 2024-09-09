import './style.css'
import React, { memo, useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { RxCross2 } from "react-icons/rx";
import { useTranslation } from "react-i18next";
import Heading from "../../../elements/Heading";
import Search from "../../../elements/Search";
import Tag from "../../../elements/Tag";
import { colors } from "../../../../utils/colors";
import i18next from "i18next";
import { locales } from "../../../../i18n/helper";

const Main = memo((props) => {

    const { expandedSearchbar, setExpandedSearchbar, search, onChangeSearchEnter, filter, onApplyFilter, onDeleteFilter, searchData, filterData, nofilter } = props;

    const { t } = useTranslation();

    const [offset, setOffset] = useState(false);

    useEffect(() => {
        window.onscroll = function () {
            if (window.scrollY > 300) {
                setOffset(true);
            } else {
                setOffset(false);
            }
        };
    }, []);

    const renderFiltersContainer = (viewport) => (
        filter && filter?.length > 0 &&
        <Row className="pb-3 m-0">
            <Col className="d-flex flex-wrap justify-content-center align-items-center">
                {
                    filter && filter?.length > 0 && filter?.slice(0, viewport == "sm" ? 2 : 5).map((item, index) =>
                    (
                        <div key={index} className="py-1">
                            <Tag
                                backgroundColor={colors.black}
                                textColor={colors.white}
                                title={item.title}
                                crossIcon={<RxCross2 size={20} onClick={() => onDeleteFilter(item)} />} />
                        </div>
                    ))
                }
                {
                    viewport == "sm" ?
                        filter && filter?.length > 2 &&
                        <div className="py-1">
                            <Tag
                                backgroundColor={colors.black}
                                textColor={colors.white}
                                title={`+ ${(filter?.length) - 2}`}
                            />
                        </div>
                        :
                        filter && filter?.length > 5 &&
                        <div className="py-1">
                            <Tag
                                backgroundColor={colors.black}
                                textColor={colors.white}
                                title={`+ ${(filter?.length) - 5}`}
                            />
                        </div>
                }
            </Col>
        </Row>
    )

    return (
        <>
            <Container className="pt-5 mt-5">
                <Row className="pt-4 pt-lg-5 pb2">
                    <Col className="d-flex flex-column justify-content-center">
                        <Row>
                            <Col xs={1} md={2} />
                            <Col xs={10} md={8} style={{ textAlign: 'center' }} className="py-lg-2">
                                {/* <Heading size="xxxl" bold color={colors.black} heading={t("datasetTitle")} /> */}
                                <p className={`fs-lg ${i18next.language === locales.AR ? 'ar-font-bold' : 'en-font-bold'}`}>
                                    {t("datasetTitle")}
                                </p>
                            </Col>
                            <Col xs={1} md={2} />
                        </Row>
                    </Col>
                </Row>
            </Container>
            <Container fluid className={`sticky bg-white mb-5 ${offset && "boxShadow"}`}>
                <Container>
                    <Row>
                        <Col />
                        <Col xs={12} md={10} lg={8} className="py-3">
                            <Search
                                expandedSearchbar={expandedSearchbar}
                                setExpandedSearchbar={setExpandedSearchbar}
                                nofilter={nofilter}
                                filterData={filterData}
                                value={search}
                                searchData={searchData}
                                placeholder={t("searchKeywords")}
                                placeholderformobile={t("searchPlaceholderformobile")}
                                onPressEnter={onChangeSearchEnter}
                                filter
                                isFilterIcon
                                appliedFilters={filter}
                                onClickApplyFilter={onApplyFilter}
                            />
                        </Col>
                        <Col />
                    </Row>
                    <div className='d-none d-md-block'>
                        {renderFiltersContainer("lg")}
                    </div>
                    <div className='d-block d-md-none'>
                        {renderFiltersContainer("sm")}
                    </div>
                </Container>
            </Container>
        </>
    )
});

export default Main;