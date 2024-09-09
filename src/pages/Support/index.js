import React, { memo, useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import Cards from "../../components/modules/Cards";
import Main from "../../components/modules/Support/Main";
import QuestionList from "../../components/modules/Support/QuestionList";
import { routes } from "../../router/helper";
import { locales } from "../../i18n/helper";
import View from "../../components/modules/View";
import { getFacets, getQuestionBySearch, getSearch } from "../../axios/api";
import FooterImage from '../../assets/images/Contact-Us.jpg';
import FooterImageMobSupportPage from '../../assets/images/footImageMobileSupport.png';
import FooterImageAr from '../../assets/images/Contact-Us.jpg';
import { useDispatch } from "react-redux";
import { setTopics } from "../../redux/reducers/Facets";

const Support = memo(() => {

    const { t, i18n } = useTranslation()

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const categories = useSelector(state => state.support.categories)
    const questions = useSelector(state => state.support.questions)
    const { supportSuggestion } = useSelector(state => state.facets)
    const ip_address = useSelector(state => state.ip_address.ip_address);

    const [searchText, setSearchText] = useState('');
    const [searchedData, setSearchedData] = useState();

    useEffect(() => {
        if (searchText !== '') {
            getQuestionBySearch(searchText, setSearchedData, i18n.language, ip_address)
        }
    }, [searchText])

    const onClickCard = useCallback((id, name, name_ar) => {
        navigate(`${routes.SUPPORT_QUESTIONS}?id=${id}`, { state: { backURL: routes.SUPPORT, name, name_ar } })
    }, []);

    const onClickQuestion = useCallback((id) => {
        navigate(`${routes.SUPPORT_QUESTIONS_DETAIL}?id=${id}`, { state: { backURL: routes.SUPPORT } })
    }, []);

    const onSearch = useCallback((value) => {
        setSearchedData();
        if (value && value !== '') {
            setSearchText(value)
        } else {
            setSearchText('')
        }
    }, [searchText])

    return (
        <View theme="dark" footerImageMobile={i18n.language === locales.AR ? `url(${FooterImageMobSupportPage})` : `url(${FooterImageMobSupportPage})`} footerImage={i18n.language === locales.AR ? `url(${FooterImageAr})` : `url(${FooterImage})`} footerTitle={t("stillNeedHelp")} footerDescription={t("footerPartText")} footerButton={t("contactUs")} onClickFooterButton={routes.CONTACT}>
            <Main popularSearch={i18n.language === locales.AR ? supportSuggestion?.ar : supportSuggestion?.en} onSearch={onSearch} />
            {
                searchText === '' &&
                <Cards type='image-inner-text' data={categories} onClick={onClickCard} />
            }
            <QuestionList titleAr={t("popularQues")} title={searchText !== '' ? t("results") : t("popularQues")} data={searchText !== '' ? searchedData : questions} onClick={onClickQuestion} />
        </View>

    )
});

export default Support; 