import React, { memo, useState, useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";
import Button from "../../../elements/Button";
import Search from "../../../elements/Search";
import Heading from "../../../elements/Heading";
import background from '../../../../assets/images/BG.jpg';
import backgroundMobile from '../../../../assets/images/BG-MOB.png';
import { useTranslation } from "react-i18next";
import i18n from "../../../../i18n/i18n";
import { locales } from "../../../../i18n/helper";
import { useSelector } from "react-redux";
import Symbol from "../../../../assets/images/Product-Symbol.png"
import { Link, useNavigate } from "react-router-dom";
import { routes } from "../../../../router/helper";
import i18next from "i18next";
import './style.css';
import CustomButton from "../../../elements/CustomButton";

const Main = memo((props) => {

    const { onSearch, onClickExplore, onApplyFilter, filterData } = props;
    const { datasetsSuggestion } = useSelector((state) => state.facets);
    const storedFilters = useSelector((state) => state.facets.filter);
    const [expandedSearchbar, setExpandedSearchbar] = useState(false);

    const { t } = useTranslation();
    const navigate = useNavigate();

    const [offset, setOffset] = useState(false);
    const [oneTime, setOneTime] = useState(false);

    const staticPopularSearches = {
        en: ["Health", "Education", "Hotels", "Abu Dhabi", "Economy"],
        ar: ["الصحة", "التعليم", "الفنادق", "أبوظبي", "الاقتصاد"]
    }

    useEffect(() => {
        window.onscroll = function () {
            if (window.scrollY > 250) {
                setOneTime(true)
                setOffset(true);
            } else {
                setOffset(false);
            }
        };
    }, []);

    const renderSearchTags = (viewport) =>
        i18n.language === locales.AR ?
            (
                staticPopularSearches?.ar.slice(0, viewport === "md" ? 5 : 1).map((item, index) => {
                    return (
                        <p
                            key={index}
                            className="m-0 me-1 fs-static"
                            onClick={() => {
                                navigate(routes.DATASET, { state: { search: item, listItem: storedFilters } })
                            }}
                            style={{ textAlign: 'center', color: 'white', cursor: "pointer" }}>
                            {item + (index == staticPopularSearches?.ar.slice(0, viewport === "md" ? 5 : 1).length - 1 ? '' : ',')}
                        </p>
                    )
                })
            ) :
            (
                staticPopularSearches?.en.slice(0, viewport === "md" ? 5 : 2).map((item, index) => {
                    return (
                        <p
                            key={index}
                            className="m-0 me-1 fs-static"
                            onClick={() => {
                                navigate(routes.DATASET, {
                                    state: { search: item, listItem: storedFilters }
                                })
                            }}
                            style={{ textAlign: 'center', color: 'white', cursor: "pointer" }}>
                            {item + (index == staticPopularSearches?.en.slice(0, viewport === "md" ? 5 : 2).length - 1 ? '' : ',')}
                        </p>
                    )
                })
            )

    return (
      <div
        className="d-flex background-img"
        style={{
          //height: window.innerWidth >= 768 ? '100vh' : '80vh',
          width: "100vw",
          height: "100vh",
          // backgroundImage: window.innerWidth >= 768 ? `url(${background})` : `url(${backgroundMobile})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
        }}
      >
        <Container>
          <Row className="h-25">
            <Col className="d-flex align-items-end justify-content-center">
              <div>
                <img src={Symbol} style={{ height: "28px" }} />
              </div>
              <div className="no-letter-spacing mx-2">
                <Heading
                  nomargin
                  color="white"
                  size="xxs"
                  heading={t("opendata")}
                />
              </div>
            </Col>
          </Row>
          <Row className="h-50">
            <Col
              className={`${
                offset ? "fade-in" : !offset && oneTime && "fade-out"
              } d-flex flex-column justify-content-center`}
            >
              <Row>
                <Col />
                <Col
                  xs={12}
                  lg={8}
                  md={10}
                  style={{ textAlign: "center" }}
                  className="py-2"
                >
                  {/* <Heading bold color="white" size="xxl" heading={t("dataAvailable")} /> */}
                  <p
                    className={`fs-lg text-white ${
                      i18next.language === locales.AR
                        ? "ar-font-bold"
                        : "en-font-bold"
                    }`}
                  >
                    {t("dataAvailable")}
                  </p>
                </Col>
                <Col />
              </Row>
              <Row>
                <Col />
                <Col xs={12} md={10} lg={8} className="py-3 padding-search">
                  <Search
                    filterData={filterData}
                    // nofocuseffect
                    searchData={
                      i18n.language === locales.AR
                        ? datasetsSuggestion?.ar
                        : datasetsSuggestion?.en
                    }
                    onClickApplyFilter={onApplyFilter}
                    placeholder={t("searchPlaceholderfordesktop")}
                    placeholderformobile={t("searchPlaceholderformobile")}
                    filter
                    isSearchIcon
                    onPressEnter={onSearch}
                    expandedSearchbar={expandedSearchbar}
                    setExpandedSearchbar={setExpandedSearchbar}
                  />
                </Col>
                <Col />
              </Row>
              <Row>
                <Col />
                <Col
                  xs={12}
                  md={10}
                  className="py-2 d-flex align-items-center justify-content-center flex-wrap"
                >
                  <span
                    className={`text-center text-white  fs-static me-1 ${
                      i18n.language === locales.EN
                        ? "en-font-bolder"
                        : "ar-font-bold"
                    }`}
                  >
                    {t("popular")}
                  </span>
                  <div className="d-flex d-md-none">
                    {renderSearchTags("sm")}
                  </div>
                  <div className="d-none d-md-flex">
                    {renderSearchTags("md")}
                  </div>
                </Col>
                <Col />
              </Row>
            </Col>
          </Row>
          <Row className="h-25 align-items-end py-3">
            <Col />
            <Col
              xs={8}
              md={4}
              className="d-none d-md-flex justify-content-center"
            >
              {/* <Button onClick={onClickExplore} title={t("explore")} backgroundColor="#9159FF" textColor="white" /> */}
              <CustomButton
                title={t("explore")}
                onClick={onClickExplore}
                buttonClass="contained-purple"
              />
            </Col>
            <Col />
            <Col
              xs={12}
              md={12}
              className="d-none d-md-flex justify-content-end"
            >
              {/* <Button onClick={onClickExplore} title={t("explore")} backgroundColor="#9159FF" textColor="white" /> */}
              <Link to={routes.RASHIDINTRO}>
                <CustomButton
                  title={t("askRashid")}
                  onClick={onClickExplore}
                  buttonClass="contained-white"
                />
              </Link>
            </Col>
          </Row>
        </Container>
      </div>
    );
});

export default Main;