import React, { memo, useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import AdLogo from "../../components/modules/About/AdLogo";
import Main from "../../components/modules/About/Main";
import Cards from "../../components/modules/Cards";
import LowerFooter from "../../components/modules/Footer/LowerFooter";
import MiddleFooter from "../../components/modules/Footer/MiddleFooter";
import Navbar from "../../components/modules/Navbar";
import View from "../../components/modules/View";
import { routes } from "../../router/helper";
import { colors } from "../../utils/colors";
import { getFacets } from "../../axios/api";
import { setTopics } from "../../redux/reducers/Facets";
import { locales } from "../../i18n/helper";
import i18next from "i18next";
import { useDispatch } from "react-redux";

const About = memo(() => {

    // const { t } = useTranslation();
    // const navigate = useNavigate();

    const aboutus = useSelector(state => state.about.aboutus);
    // const stories = useSelector(state => state.stories.stories);

    // const onClickCard = useCallback((id) => { navigate(`${routes.SUCCESS_STOIRES_DETAIL}?id=${id}`) });
    // const onClickButton = useCallback(() => { navigate(routes.SUCCESS_STOIRES) });

    return (
        <View theme='dark' noupperfooter>
            <div className="my-5 pt-5">
                <Main data={aboutus} />
            </div>
            <hr className="m-0 p-0 mx-4" />
            {/* <Cards
                notagsactive
                noheadercomponent
                backgroundColor={colors.white}
                title={t("successStories")}
                data={stories}
                size="md"
                hoverable="primary"
                onClick={onClickCard}
                onClickViewAll={onClickButton}
            /> */}
            <AdLogo />
        </View>
    )
})

export default About;