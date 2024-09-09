import React, { memo, useCallback, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import QuestionList from "../../components/modules/Support/QuestionList";
import { getPopularQuestions, getQuestionByCategories } from "../../axios/api";
import { routes } from "../../router/helper";
import BreadCrumb from "../../components/elements/BreadCrumb";
import View from "../../components/modules/View";
import i18n from "../../i18n/i18n";
import { locales } from "../../i18n/helper";
import FooterImageMobSupportPage from '../../assets/images/footImageMobileSupport.png';

const SupportQuestions = memo(() => {

    const { t } = useTranslation()

    let navigate = useNavigate();
    const { search, state } = useLocation();

    const urlParams = new URLSearchParams(search);

    const id = urlParams.get('id');
    const url = state && state.backURL ? state.backURL : routes.SUPPORT
    const title_name = state && state.name
    const title_name_ar = state && state.name_ar

    console.log("datatata", title_name);

    const [questions, setQuestions] = useState();

    useEffect(() => {

        if (!id) return navigate(url, { replace: true })
        getQuestionByCategories(setQuestions, id)

    }, [])

    console.log("QUES", questions);

    const onClickQuestion = useCallback((id, name, name_ar) => {
        navigate(`${routes.SUPPORT_QUESTIONS_DETAIL}?id=${id}`, { state: { backURL: routes.SUPPORT, breadCrumbName: name, breadCrumbNameAr: name_ar } })
    }, []);

    return (
        <View theme="dark" footerImageMobile={i18n.language === locales.AR ? `url(${FooterImageMobSupportPage})` : `url(${FooterImageMobSupportPage})`} footerTitle={t("stillNeedHelp")} footerDescription={t("footerPartText")} footerButton={t("contactUs")}>
            <div className="mt-5 pt-5">
                <div className="breadCrumb-padding pt-5">
                    <BreadCrumb items={[
                        {
                            title: t("supports")
                        }
                    ]} />
                </div>
                <QuestionList title={title_name} titleAr={title_name_ar} data={questions} onClick={onClickQuestion} />
            </div>
        </View>

    )
});

export default SupportQuestions; 