import React, { memo, useState } from "react";
import { Col, Row } from "react-bootstrap";
import './style.css';
import Heading from "../Heading";
import i18next from "i18next";
import { locales } from "../../../i18n/helper";

const ListItem = memo((props) => {

    const { title, value, image, onClick } = props;

    const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });

    const innerwidth = window.innerWidth;

    const handleMouseMove = (event) => {
        setCursorPosition({ x: event.clientX, y: event.clientY });
    };

    return (
        <Row
            onMouseMove={handleMouseMove} style={{ position: "relative" }} className="page-padding m-0 list-item-hover padding-xl">
            <div className="p-0 m-0 d-flex">
                <p className={`fs-2xl m-0 text-white ${i18next.language === locales.AR ? 'ar-font-bold' : 'en-font-bold'}`} onClick={() => onClick()} style={{ cursor: 'pointer' }}>
                    {title}
                    <span className="mx-3 position-relative">
                        <sup className={`text-white h1 position-absolute m-0 fs-kilo ${i18next.language === locales.AR ? 'ar-font' : 'en-font'}`} style={{ top: -7 }}>{value}</sup>
                    </span>
                </p>
                {
                    image &&
                    <div style={{
                        zIndex: 1,
                        position: 'absolute',
                        left: i18next.language === locales.AR ?
                            cursorPosition.x < 300 ? 300 : cursorPosition.x
                            :
                            cursorPosition.x > innerwidth - 300 ? innerwidth - 300 : cursorPosition.x,
                        transform: `translate(${i18next.language === locales.AR ? "-105%" : "5%"}, -35%)`,
                    }}
                        className='d-none d-lg-flex align-items-center'>
                        <img src={image} height="268px" />
                    </div>
                }
            </div>
        </Row >
    )
});

export default ListItem;