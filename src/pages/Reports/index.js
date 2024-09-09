import React, { memo, useCallback } from "react";
import { useNavigate } from "react-router";
import Cards from "../../components/modules/Cards";
import View from "../../components/modules/View";
import { routes } from "../../router/helper";
import { colors } from "../../utils/colors";
import { useTranslation } from "react-i18next";

const data = [
    {
        title: "Insights",
        title_ar:"رؤى",
        id: routes.REPORTS_INSIGHTS
    },
    {
        title: "Datasets",
        title_ar:"مجموعات البيانات",
        id: routes.REPORTS_DATASETS
    },
    {
        title: "Publisher",
        title_ar:"الناشر",
        id: routes.REPORTS_PUBLISHERS
    }
]

const Reports = memo(() => {

    const { t } = useTranslation();
    const navigate = useNavigate();

    const onClickCard = useCallback((route) => navigate(route))

    return (
        <>
            <View theme={"dark"} noupperfooter>
                <div className="my-5 pt-5">
                    <Cards title={t("reports")} notitlebutton backgroundColor={colors.white} type='image-inner-text' data={data} onClick={onClickCard} />
                </div>
            </View>
        </>
    )
});

export default Reports;