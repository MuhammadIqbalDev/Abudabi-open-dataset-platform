import { useTranslation } from 'react-i18next';
import React, { memo } from "react";
import { locales } from '../../../i18n/helper';
import { colors } from '../../../utils/colors';

const LanguageSwitcher = memo((props) => {

    const { theme } = props;

    const { i18n } = useTranslation();

    const handler = () => {
        i18n.language === locales.EN ? i18n.changeLanguage(locales.AR) :
            i18n.language === locales.AR && i18n.changeLanguage(locales.EN)
    }

    return (
        <div>
            <p
                style={{ cursor: "pointer", color: theme === 'dark' ? colors.black : colors.white }}
                onClick={handler}
                className={`m-0 ${i18n.language === locales.EN ? "ar-font" : "en-font"}`}
            >
                {i18n.language === locales.AR ? "English" : "عربي"}
            </p>
        </div>
    )
})

export default LanguageSwitcher;