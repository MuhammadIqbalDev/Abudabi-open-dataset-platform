import React, { memo } from "react";
import { Col, Container, Row } from "react-bootstrap";
import Heading from "../../../elements/Heading";
import Shimmer from "../../../elements/Shimmer";
import i18next from "i18next";
import { locales } from "../../../../i18n/helper";
import { colors } from "../../../../utils/colors";

const Main = memo((props) => {

    const { title, description } = props

    return (
        <Container fluid className="px-4 page-padding">
            <Row>
                <Col lg={8} md={12}>
                    <Row className="py-4">
                        <Col>
                            {
                                title ?
                                    // <Heading heading={title} />
                                    <p className={`fs-lg ${i18next.language === locales.AR ? "ar-font-bold" : "en-font-bold"}`}>{title}</p>
                                    : <Shimmer rounded='xs' height="48px" />
                            }
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            {
                                description ? (
                                    // <Heading nomargin size="xxs" heading={description} />
                                    <p className="fs-xs m-0 en-font-default" style={{ color: colors.dark_gray }} dangerouslySetInnerHTML={{ __html: description }} />
                                ) : (
                                    <>
                                        <Shimmer className='my-1' rounded='xs' />
                                        <Shimmer className='my-1' rounded='xs' />
                                        <Shimmer className='my-1' rounded='xs' />
                                        <Shimmer className='my-1' rounded='xs' width='60%' />
                                    </>
                                )
                            }
                        </Col>
                    </Row>
                </Col>
            </Row>
        </Container>
    )
});

export default Main;