import React, { memo } from "react";
import { Col, Container, Row } from "react-bootstrap";
import background from '../../../../assets/images/Desktop.jpg';
import CardOne from '../../../../assets/images/Card-One.jpg';
import CardTwo from '../../../../assets/images/Card-Two.jpg';
import Heading from "../../../elements/Heading";
import Button from "../../../elements/Button";
import { colors } from "../../../../utils/colors";
import { useTranslation } from "react-i18next";

const StoryTitleImage = memo(() => {

    const { t } = useTranslation()

    return (
        <Container fluid style={{ }}>
            <Row>
                <Col className="my-3">
                    <div className="d-flex flex-column justify-content-center" style={{
                        height: '100vh',
                        backgroundImage: `url(${background})`,
                        backgroundRepeat: 'no-repeat',
                        backgroundSize: 'cover',
                        borderRadius: '30px',
                        backgroundPosition: 'center'
                    }}>
                        <Row>
                            <Col className='text-center'>
                                <Heading size="xxs" color="white" heading="27 August 2022  ·  7-minute read" />
                            </Col>
                            <div className="d-flex">
                                <Col />
                                <Col xs={12} md={8} className='px-3 d-flex justify-content-center align-items-center text-center'>
                                    <Heading underline color='white' heading={t("storyTitleDescription")} />
                                </Col>
                                <Col />
                            </div>
                        </Row>
                    </div>
                </Col>
            </Row>

        </Container>
    )
});

export default StoryTitleImage;