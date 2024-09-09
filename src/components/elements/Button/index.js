import React, { memo } from "react";
import { Spinner } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { locales } from '../../../i18n/helper';

const Button = memo((props) => {

    const { t, i18n } = useTranslation()

    const { nopadding, padding, isFilled, title, icon, backgroundColor, textColor, width, borderColor, loading, onClick, disable, bold, iconend } = props

    return (
        <button
            onClick={onClick ? onClick : () => { }}
            disabled={loading}
            className={`m-0 fs-xs ${nopadding ? "px-0" : "px-4"} ${padding && padding} ${i18n.language === locales.AR ? "ar-font-bold" : "en-font-bold en-font-default"} ${bold && (i18n.language === locales.AR ? "ar-font-bold" : "en-font-bold")}`}
            style={{
                backgroundColor: backgroundColor ? backgroundColor : 'white',
                color: textColor ? textColor : 'black',
                height: 52,
                width: width ? width : 'auto',
                borderRadius: 100,
                border: borderColor ? '2px solid' : 'none',
                borderColor: borderColor,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                whiteSpace: "nowrap",
                fontSize:'14px',
                lineHeight:'20px',
            }}>
            {
                loading ? (
                    <Spinner animation="border" size="sm" color={textColor} />
                ) : <>
                    <span className={`d-flex ${iconend && 'flex-row-reverse'}`}>
                        {icon}
                        {title}
                    </span>

                </>
            }
        </button>
    )
});

export default Button;
