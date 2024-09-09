import React, { memo } from "react";
import { Spinner } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { locales } from '../../../i18n/helper';
import './style.css';

const CustomButton = memo((props) => {

    const { t, i18n } = useTranslation()

    const { nopadding, padding, isFilled, title, icon, backgroundColor, textColor, width, borderColor, loading, onClick, disable, bold, iconend, buttonClass } = props

    return (
        <button
            id={title && title?.replace(/\s+/g, '')}
            onClick={onClick ? onClick : () => { }}
            disabled={loading}
            className={`${buttonClass} m-0 fs-xs ${nopadding ? "px-0" : "px-4"} ${padding && padding} ${i18n.language === locales.AR ? "ar-font-bold" : "en-font-bold en-font-default"} ${bold && (i18n.language === locales.AR ? "ar-font-bold" : "en-font-bold")}`}
            style={{
                height: 52,
                width: width ? width : 'auto',
                borderRadius: 100,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                whiteSpace: "nowrap",
                fontSize: '14px',
                lineHeight: '20px',
                outline: 0
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

export default CustomButton;
