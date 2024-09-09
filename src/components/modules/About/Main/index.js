import React, { Fragment, memo } from "react";
import { Col, Container, Image, Row } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { locales } from "../../../../i18n/helper";
import Heading from "../../../elements/Heading";
import Shimmer from "../../../elements/Shimmer";
import Rows from "../Rows";
import { colors } from "../../../../utils/colors";

const Main = memo((props) => {

    const { i18n } = useTranslation();

    const { data } = props;

    const renderLoader = () => (
        <Container fluid className="px-4">
            <Row className="align-items-center">
                <Col md={6} xs={12} className='py-2'>
                    <Shimmer height={41} rounded='xs' />
                </Col>
                <Col md={6} xs={12} className='py-2'>
                    <Shimmer className='my-1' rounded='xs' />
                    <Shimmer className='my-1' rounded='xs' width={'70%'} />
                </Col>
            </Row>
            <Row className="py-2">
                <Col>
                    <Shimmer rounded='sm' height={'70vh'} />
                </Col>
            </Row>
        </Container>
    )

    return (
        data && data.length > 0 ? data.map((item, index) => (
            <Fragment key={index}>
                <Container fluid className="my-4 px-4 page-padding">
                    <Row className="justify-content-between max-width">
                        <Col md={5} xs={12} className='py-2 px-0'>
                            <p style={{color:colors.darker_gray}} className={`fs-xl m-0 ${i18n.language === locales.AR ? "ar-font-bold" : "en-font-bold"}`}>{i18n.language === locales.AR ? item.title_ar : item.title}</p>
                            {/* <Heading bold nomargin heading={i18n.language === locales.AR ? item.title_ar : item.title} /> */}
                        </Col>
                        <Col md={6} xs={12} className='py-2 px-0'>
                            <p style={{color:colors.dark_gray}} className={`fs-xs m-0 ${i18n.language === locales.AR ? "ar-font" : "en-font-default"}`}>{i18n.language === locales.AR ? item.description_ar : item.description}</p>
                            {/* <Heading size='xxs' nomargin heading={i18n.language === locales.AR ? item.description_ar : item.description} /> */}
                        </Col>
                    </Row>
                    <Row className="py-5">
                        <Col className="d-flex justify-content-center">
                            <Image className="img-about-us" src={item.image} fluid style={{ borderRadius: '30px' }} />
                        </Col>
                    </Row>
                </Container>
                {
                    item.rows && item.rows.length > 0 && item.rows.map((item, index) => (
                        <Rows key={index} title={i18n.language === locales.AR ? item.title_ar : item.title} description={i18n.language === locales.AR ? item.description_ar : item.description} image={item.image} />
                    ))
                }
            </Fragment>
        )) : renderLoader()
    )
});

export default Main;