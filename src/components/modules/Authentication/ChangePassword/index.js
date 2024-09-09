import React, { memo } from "react";
import { Container, Col, Row } from "react-bootstrap";
import { AiOutlineCheckCircle } from 'react-icons/ai'
import { colors } from "../../../../utils/colors";
import Button from "../../../elements/Button";
import Heading from "../../../elements/Heading";
import { useTranslation } from "react-i18next";

const ChangePassword = memo(() => {
    const { t } = useTranslation();
    return (
        <div className="d-flex align-items-center justify-content-center" style={{ height: '100vh' }}>
            <Container className="d-flex justify-content-center align-items-center text-center py-5 mx-5" >
                <Col md={6}>
                    <Row className="my-4">
                        <Col>
                            <AiOutlineCheckCircle color="#762FFF" size="60" />
                        </Col>
                    </Row>
                    <Row className="my-4">
                        <Col>
                            <Heading nomargin heading={t("reset")} />
                        </Col>
                    </Row>
                    <Row className="my-4">
                        <Col>
                            <Heading nomargin size="xs" heading={t("details")} />
                        </Col>
                    </Row>
                    <Row className="my-4">
                        <Col className="d-flex justify-content-center">
                            <Button backgroundColor={colors.black} textColor={colors.white} title={t("changePwd")} />
                        </Col>
                    </Row>
                    <Row className="my-4">
                        <Col className="py-2 rounded-3" style={{ backgroundColor: colors.light_purple }}>
                            <Heading nomargin size="xxs" heading={t("note")} />
                        </Col>
                    </Row>
                </Col>
            </Container>
        </div>
    )
});

export default ChangePassword;