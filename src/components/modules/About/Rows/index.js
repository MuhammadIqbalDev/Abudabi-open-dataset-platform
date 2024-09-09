import './style.css';
import React, { memo } from 'react';
import { Col, Container, Image, Row } from 'react-bootstrap';
import Heading from '../../../elements/Heading';
import i18next from 'i18next';
import { locales } from '../../../../i18n/helper';

const Rows = memo((props) => {

    const { title, description, image } = props;

    return (
        <Container fluid className="my-4 px-4 max-width page-padding">
            <Row className='d-flex justify-content-between'>
                <Col md={6} xs={12} className='py-2 m-0'>
                    <Row>
                        <Col md={10} className={"m-0"}>
                            <p className={`fs-md m-0 ${i18next.language === locales.AR ? "ar-font-bold" : "en-font-bold"}`}>{title}</p>
                            {/* <Heading bold size='xl' nomargin heading={title} /> */}
                        </Col>
                    </Row>
                    <Row className='py-4'>
                        <Col md={10} className={"m-0"}>
                            <p className={`fs-xs m-0 en-font-default`}>{description}</p>
                        </Col>
                    </Row>
                </Col>
                <Col md={6} xs={12} className='py-2 m-0 d-flex justify-content-lg-end justify-content-center'>
                    <Image className='image-height' src={image} fluid style={{ borderRadius: '30px' }} />
                </Col>
            </Row>
        </Container>
    )
});

export default Rows;