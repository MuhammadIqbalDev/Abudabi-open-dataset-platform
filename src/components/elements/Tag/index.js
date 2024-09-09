import React, { memo } from "react";
import './style.css';

const Tag = memo((props) => {

    const { title, backgroundColor, textColor, onClick, borderColor, crossIcon, hoverEffect, margin } = props;

    return (
        <div
            onClick={() => onClick ? onClick() : () => { }} className={`tag-primary me-${!margin ? "1" : "1"} mx-${margin} d-flex justify-content-center align-items-center ${hoverEffect && "tag-hover"}`}
            style={{
                minHeight: '36px',
                backgroundColor: backgroundColor ? backgroundColor : '#F3E6FA',
                borderRadius: '100px',
                color: textColor ? textColor : '#8207C9',
                cursor: "pointer", border: borderColor && borderColor,
                paddingTop: 8,
                paddingBottom: 8,
                paddingLeft: 12,
                paddingRight: 12
            }}>
            <p className="m-0 fs-2xs-static en-font-default ">{title} {crossIcon && crossIcon}</p>
        </div>
    )
});

export default Tag;