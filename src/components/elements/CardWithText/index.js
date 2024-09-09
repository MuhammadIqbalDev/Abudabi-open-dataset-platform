import './style.css';
import React, { memo, useCallback, useState } from "react";
import { Card as RBCard, Col, Row } from "react-bootstrap";
import Heading from "../Heading";
import i18next from "i18next";
import { locales } from "../../../i18n/helper";
import { colors } from '../../../utils/colors';

const CardWithText = memo((props) => {

    const { title, description, image, noborder, hoverable, maxNumberOfLines, onClick } = props

    const [currentHovered, setCurrentHovered] = useState(null);

    const onHover = useCallback(() => setCurrentHovered(true), [currentHovered])
    const onLeave = useCallback(() => setCurrentHovered(false), [currentHovered])

    var height = "250px", border, ClassName;

    if (noborder) {
        border = 0
    }

    if (hoverable) {
        ClassName = "card-hover"
    }

    return (
        <div onMouseOver={onHover} onMouseLeave={onLeave} className={ClassName} style={{
            borderRadius: '30px',
            backgroundImage: currentHovered ? `url(${image.image_hover})` : `url(${image.image})`,
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover'
        }}>
            <RBCard onClick={onClick} className={`p-4 justify-content-center align-items-center bg-transparent card-with-text-height`} style={{ borderWidth: border, cursor: "pointer" }}>
                <Row>
                    <Col className="d-flex text-center">
                        <p className={`fs-sm-md-const ${i18next.language === locales.AR ? "ar-font-bold" : "en-font-bold"}`}>{title}</p>
                        {/* <Heading bold size='md' heading={title} onClick={onClick} /> */}
                    </Col>
                </Row>
                <Row>
                    <Col />
                    <Col md={8} className="d-flex text-center">
                        <p className="m-0 multine-ellipsis-4 en-font-default fs-xs" style={{ color: !currentHovered && colors.dark_gray }}>{description}</p>
                        {/* <Heading nomargin size='xxs' heading={description} maxNumberOfLines={maxNumberOfLines} /> */}
                    </Col>
                    <Col />
                </Row>
            </RBCard>
        </div>
    )
});

export default CardWithText;