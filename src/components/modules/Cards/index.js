import './style.css';
import React, { memo, useCallback, useState } from "react";
import { Row, Col, Container } from "react-bootstrap";
import Header from "./Header";
import Loader from "../Loader";
import Card from "../../elements/Card";
import CardWithText from "../../elements/CardWithText";
import SupportOne from '../../../assets/images/Support-1.png';
import SupportOneHover from '../../../assets/images/Support-1-Hover.png';
import SupportTwo from '../../../assets/images/Support-2.png';
import SupportTwoHover from '../../../assets/images/Support-2-Hover.png';
import SupportThree from '../../../assets/images/Support-3.png';
import SupportThreeHover from '../../../assets/images/Support-3-Hover.png';
import CardWithOuterText from "../../elements/CardWithOuterText";
import CardStory from "../../elements/CardStory";
import { useTranslation } from "react-i18next";
import { locales } from "../../../i18n/helper";
import Heading from "../../elements/Heading";

let images = [
    {
        image: SupportOne,
        image_hover: SupportOneHover
    },
    {
        image: SupportTwo,
        image_hover: SupportTwoHover
    },
    {
        image: SupportThree,
        image_hover: SupportThreeHover
    }
]

// let sizes = ['400px', '340px', '280px']
let sizes = ['400px', '650px', '540px']

const Cards = memo((props) => {

    const { i18n, t } = useTranslation();

    const { title, notitlebutton, data, backgroundColor, hoverable, type,
        size, onClick, onClickViewAll, buttonText, notagsactive, noheadercomponent, dropdownWidth
        , handleReload, cardsCount, textSize, padding, setData, setIsOpenModal, loading
    } = props;

    var numberOfColumns = 4;
    if (data?.length === 4) {
        numberOfColumns = 3;
    }
    const renderContent = () => {
        if (type === 'image-inner-text') {
            return (
                data && data?.length > 0 ? data?.map((item, index) => (
                    <Col key={index} md={6} lg={4} className="py-2">
                        <CardWithText
                            hoverable
                            noborder
                            maxNumberOfLines={3}
                            title={i18n.language === locales.AR ? item.title_ar : item.title}
                            description={i18n.language === locales.AR ? item.description_ar : item.description}
                            image={images[Math.floor(Math.random() * images.length)]}
                            onClick={() => onClick(item.id, item.title, item.title_ar)}
                        />
                    </Col>
                )) : <Loader type={type} backgroundColor={backgroundColor} />
            )
        } else if (type === 'image-outer-text') {
            return (

                !loading && data && data?.length > 0 ? data?.map((item, index) => (
                    <Col key={index} md={6} lg={4} className="py-2">
                        <CardWithOuterText
                            title={i18n.language === locales.AR ? item.title_ar : item.title}
                            description={i18n.language === locales.AR ? item.description_ar : item.description}
                            image={item.image}
                            datasetViewCount={item.viewDatasets}
                            setData={setData}
                            setIsOpenModal={setIsOpenModal}
                            onClick={() => onClick(item.id)}
                        />
                    </Col>
                )) :
                    !loading ?
                        <p className={`${i18n.language === locales.AR ? "ar-font-bold" : "en-font-bold"} m-0 text-center en-font-default`}>{t("noPublisherFound")}</p>
                        :
                        <Loader type={type} backgroundColor={backgroundColor} />
            )
        } else if (type === 'story-cards') {
            return (
                data ? (
                    data.length > 0 ? data.map((item, index) => (
                        <Col key={index} md={6} lg={4} className="py-2">
                            <CardStory
                                title={i18n.language === locales.AR ? item.title_ar : item.title}
                                description={item.description && item.description_ar && i18n.language === locales.AR ? item.description_ar : item.description}
                                tags={i18n.language === locales.AR ? item.tags && item.tags_ar.slice(0, 2) : item.tags && item.tags.slice(0, 2)}
                                created={item.created}
                                image={item.image}
                                height={sizes[Math.floor(Math.random() * sizes.length)]}
                                onClick={() => onClick(item.id)}
                            />
                        </Col>
                    )) : <Heading size="md" bold nomargin heading={t("noResultFound!")} />
                ) : <Loader type={type} backgroundColor={backgroundColor} />
            )
        } else {

            return (
                <>
                    <div className="m-0 d-flex d-lg-none scroll-bar">
                        {
                            data && data.length > 0 ? data.map((item, index) => (
                                <div key={index} className="py-2 pe-2 d-flex" style={{ minWidth: "300px" }}>
                                    <Card
                                        datasetID={item.id}
                                        notagsactive={notagsactive}
                                        noheadercomponent={noheadercomponent}
                                        size={"md"}
                                        hoverable={hoverable}
                                        title={i18n.language === locales.AR ? item.title_ar : item.title}
                                        description={item.description && item.description_ar && i18n.language === locales.AR ? item.description_ar : item.description}
                                        publisher={item.publisher && item.publisher_ar && i18n.language === locales.AR ? item.publisher_ar : item.publisher}
                                        tags={i18n.language === locales.AR ? item.tags && item.tags_ar.slice(0, 2) : item.tags && item.tags.slice(0, 2)}
                                        resources={i18n.language === locales.AR ? item.resources_ar : item.resources}
                                        url={item.url}
                                        onClick={() => onClick(item.id)}
                                        headingSize="lg"
                                    />
                                </div>
                            )) : <Loader type='image-inner-text' width={290} backgroundColor={backgroundColor} />
                        }
                    </div>

                    <Row className="d-none d-lg-flex w-100 align-items-center m-0">
                        {
                            data && data.length > 0 ? data.map((item, index) => (
                                <Col key={index} lg={numberOfColumns} md={numberOfColumns} sm={4} className="py-2">
                                    <Card
                                        datasetID={item.id}
                                        handleReload={handleReload}
                                        dropdownWidth={dropdownWidth}
                                        notagsactive={notagsactive}
                                        noheadercomponent={noheadercomponent}
                                        size={size}
                                        hoverable={hoverable}
                                        title={i18n.language === locales.AR ? item.title_ar : item.title}
                                        description={item.description && item.description_ar && i18n.language === locales.AR ? item.description_ar : item.description}
                                        publisher={item.publisher && item.publisher_ar && i18n.language === locales.AR ? item.publisher_ar : item.publisher}
                                        tags={i18n.language === locales.AR ? item.tags && item.tags_ar.slice(0, 2) : item.tags && item.tags.slice(0, 2)}
                                        resources={i18n.language === locales.AR ? item.resources_ar : item.resources}
                                        url={item.url}
                                        onClick={() => onClick(item.id)}
                                        headingSize={textSize}
                                    />
                                </Col>
                            )) : <Loader size={288} numberOfColumns={4} backgroundColor={backgroundColor} />
                        }
                    </Row>
                </>
            )
        }
    }

    return (
        <Container fluid style={{ backgroundColor: backgroundColor }}>
            {
                title &&
                <Row className="max-width">
                    <Col className='datalist-title-padding'>
                        <Header nobutton={notitlebutton && true} buttonText={buttonText} backgroundColor={backgroundColor} title={title} onClickButton={onClickViewAll} />
                    </Col>
                </Row>
            }
            <Row className='m-0'>
                <Col className={`x-4 max-width  ${padding ? 'page-padding-md' : 'page-padding'}`}>
                    <Row>
                        {renderContent()}
                    </Row>
                </Col>
            </Row>
        </Container>
    )
});

export default Cards;