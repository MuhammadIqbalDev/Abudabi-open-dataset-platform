import React, { memo, useCallback, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { SlShare } from "react-icons/sl";
import StoriesDetails from "../../components/modules/SuccessStories/StoriesDetail";
import demoImage from "../../assets/images/Desktop.jpg";
import Cards from "../../components/modules/Cards";
import { colors } from "../../utils/colors";
import { FaFacebookF, FaLinkedinIn, FaTwitter } from "react-icons/fa";
import { BsPerson } from "react-icons/bs";
import { FiTwitter, FiLinkedin } from "react-icons/fi";
import { routes } from "../../router/helper";
import { getSuccessStoriesById } from "../../axios/api";
import BreadCrumb from "../../components/elements/BreadCrumb";
import Button from "../../components/elements/Button";
import Dropdown from "../../components/elements/DropDown";
import View from "../../components/modules/View";
import { shareOptions } from "../../utils";
import { useSelector } from "react-redux";
import i18n from "../../i18n/i18n";
import { MdArrowForwardIos, MdArrowBackIos } from "react-icons/md";
import { locales } from "../../i18n/helper";

const SuccessStoriesDetail = memo(() => {

    const { t } = useTranslation();
    const navigate = useNavigate();

    const { search } = useLocation();

    const urlParams = new URLSearchParams(search);

    const id = urlParams.get('id');

    const [story, setStory] = useState();

    const downloadResources = useCallback((links) => { console.log(links) });

    const stories = useSelector(state => state.stories.stories);

    const onClickCard = useCallback((id) => { navigate(`${routes.SUCCESS_STOIRES_DETAIL}?id=${id}`) });
    const onClickButton = useCallback(() => { navigate(routes.SUCCESS_STOIRES) });

    useEffect(() => {

        if (!id) return navigate(routes.SUCCESS_STOIRES, { replace: true });

        getSuccessStoriesById(id, setStory);

    }, [])

    const shareOption = shareOptions?.map((item) => (
        {
            title: t(item.title),
            format: item.format,
            downloadLink: "null",
            url: `${process.env.REACT_APP_BASE_URL}/success-stories/detail?id=${id}`,
            icon: item.format === "facebook" ? <BsPerson />
                : item.format === "linkedin" ? <FiLinkedin />
                    : item.format === "twitter" && <FiTwitter />
        }
    ))

    return (
        <View theme="dark" noupperfooter>
            <div className="my-5 pt-5 px-0">
                <div className="px-4 pt-5 d-flex justify-content-between align-items-center">
                    <div className="">
                        <BreadCrumb items={[
                            {
                                title: t("aboutus")
                            },
                            {
                                title: t("successStories")
                            }]} />
                    </div>
                    <div className="d-none d-lg-block">
                        <Dropdown
                            width={"100%"}
                            size={"xl"}
                            autoClose={true}
                            options={shareOption}
                            headerComponent={<Button backgroundColor="white" textColor="black" borderColor={colors.black} icon={<SlShare size={20} />} />}
                        />
                    </div>
                </div>
                <div className="px-4">
                    <hr />
                </div>
                <div>
                    <StoriesDetails url={`${process.env.REACT_APP_BASE_URL}/success-stories/detail?id=${id}`} item={story} shareOption={shareOption} />
                </div>
                <hr className="m-0 mx-3" />
                <Cards noheadercomponent backgroundColor={colors.white} title={t("successStories")} data={stories} size="md" onClick={onClickCard} onClickViewAll={onClickButton} />
            </div>
        </View>

    )
})

export default SuccessStoriesDetail;