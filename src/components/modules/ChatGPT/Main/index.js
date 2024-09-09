import { Fragment, memo } from "react";
import i18next from "i18next";
import { useTranslation } from "react-i18next";
import { locales } from "../../../../i18n/helper";

const Main = memo((props) => {

    const { t } = useTranslation()

    return (
        <Fragment>
            <div className="col-12 col-md-6 my-5">
                <p className={`m-0 fs-md ${i18next.language === locales.AR ? "ar-font-bold" : "en-font-bold"}`}>{t("chatWithOpenData")}</p>
            </div>
        </Fragment>
    )
})

export default Main;