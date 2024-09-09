import React, { memo, useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Cards from "../../components/modules/Cards";
import Header from "../../components/modules/Cards/Header";
import { colors } from "../../utils/colors";
import Pagination from "../../components/elements/Pagination";
import { useTranslation } from "react-i18next";
import { routes } from "../../router/helper";
import BreadCrumb from "../../components/elements/BreadCrumb";
import View from "../../components/modules/View";
import i18n from "../../i18n/i18n";
import { locales } from "../../i18n/helper";
import { getStoriesTags, getSuccessStories } from "../../axios/api";
import { setStories, setStoriesFilters, toggleLoading } from "../../redux/reducers/SuccessStories";
import { getYears } from "../../utils/generic";

const SuccessStories = memo(() => {

    const { t } = useTranslation();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const stories = useSelector(state => state.stories.stories);
    const storiesTags = useSelector((state) => state.facets.storiesTags);
    const storiesFilters = useSelector((state) => state.stories.filters);

    const [totalCount, setTotalCount] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    useEffect(() => {
        getSuccessStories(dispatch, setStories, toggleLoading, storiesFilters);
    }, [storiesFilters])

    useEffect(() => {
        dispatch(setStoriesFilters([{
            type: "Sort By",
            title: t('recent')
        }]))
    }, [i18n.language])

    const data = [
        {
            title: t("categories"),
            tags: i18n.language === locales.AR ? storiesTags && storiesTags.tags_ar : storiesTags && storiesTags.tags
        },
        {
            title: t("year"),
            data: getYears().map(item => ({ type: t("year"), title: item }))
        },
        {
            title: t("sortBy"),
            data: [
                {
                    title: t('recent'),
                    type: t("sortBy")
                },
                {
                    title: t('alphabetically'),
                    type: t("sortBy")
                }
            ]
        }
    ]

    const onChangePage = useCallback((page) => setCurrentPage(page), [])

    const onClickCard = useCallback((id) => { navigate(`${routes.SUCCESS_STOIRES_DETAIL}?id=${id}`) }, []);

    const onApplyFilter = useCallback((filters) => {
        setCurrentPage(1)
        dispatch(setStoriesFilters(filters))
    })

    const onDeleteFilter = useCallback((filter) => {
        if (filter) {
            let arr = [...storiesFilters];
            let newArr = arr.filter((item) => item.title !== filter.title)
            dispatch(setStoriesFilters(newArr))
        }

    })

    const onClickClearAll = () => {
        dispatch(setStoriesFilters([{
            type: "Sort By",
            title: t('recent')
        }]))
    }

    return (
        <View theme="dark" noupperfooter>
            <div className="my-5 pt-5">
                <div className="px-4 pt-5">
                    <BreadCrumb items={[
                        {
                            title: t("aboutus")
                        }
                    ]} />
                </div>
                <div className="px-2">
                    <Header count={stories?.length} onClickClearAll={onClickClearAll} filterData={data} title={t("successStories")} nobutton backgroundColor={colors.white} filterbutton filters={storiesFilters} onClickApplyFilter={onApplyFilter} onDeleteFilter={onDeleteFilter} appliedFilters={storiesFilters} />
                </div>
                <Cards type="story-cards" data={stories} onClick={onClickCard} />
            </div>
            <Pagination
                currentPage={currentPage}
                totalCount={totalCount}
                onChange={onChangePage}
            />
        </View>

    )
})

export default SuccessStories;