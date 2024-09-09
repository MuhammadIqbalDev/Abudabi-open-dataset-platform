import React, { memo, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { getRealTimeApiById } from "../../axios/api";
import Main from "../../components/modules/RealTimeApisDetail/Main";
import { routes } from "../../router/helper";
import { useTranslation } from "react-i18next";
import BreadCrumb from "../../components/elements/BreadCrumb";
import View from "../../components/modules/View";

const data = [
    {
        title: "Immunizations by Nationality, Type of Vaccine and Age Group",
        publisher: "Ministry of Health and Prevention"
    },
    {
        title: "Licensed Social Care Professional 2021 - 2022",
        publisher: "Ministry of Health and Prevention"
    },
    {
        title: "List of applicants for participation in the school bus supervisors",
        publisher: "Telecommunication Regulatory Authority"
    }
]

const RealTimeApisDetail = memo(() => {

    const { t } = useTranslation()

    const navigate = useNavigate();
    const { search } = useLocation();

    const urlParams = new URLSearchParams(search);

    const id = urlParams.get('id');

    const [realTimeApi, setRealTimeApi] = useState();
    const [loading, setLoading] = useState(false);

    useEffect(() => {

        if (!id) return navigate(routes.REAL_TIME_APIS, { replace: true });

        getRealTimeApiById(id, setRealTimeApi, setLoading);

    }, [id])

    return (
        <View theme="dark" noupperfooter sticky>
            <div className="my-5 pt-5">
                <div className="breadCrumb-padding pt-5">
                    <BreadCrumb items={[
                        {
                            title: t("realTimeAPI")
                        },
                        {
                            title: t("detail")
                        }]} />
                </div>
                <Main data={realTimeApi} />
            </div>
        </View>
    )
});

export default RealTimeApisDetail;