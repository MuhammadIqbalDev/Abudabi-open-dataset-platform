import React, { memo } from "react";
import { Col, Container, Row } from "react-bootstrap";
import FormComponent from "../FormComponent";
import ImageComponent from "../ImageComponent";

const Main = memo(() => {
    return (
        <Container className="pt-5 mt-4 px-0" fluid >
            <Row className="p-0 mt-3 max-width">
                <Col lg={6} className='d-none d-lg-block p-0'>
                    <ImageComponent />
                </Col>
                <Col className="px-md-5" sm={12} md={12} lg={6} >
                    <FormComponent />
                </Col>
            </Row>
        </Container>
    )
})

export default Main