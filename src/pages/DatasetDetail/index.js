import React, { memo, useCallback, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { getDatasetById, getSimilarDatasets } from "../../axios/api";
import Cards from "../../components/modules/Cards";
import Main from "../../components/modules/DatasetDetail/Main";
import { routes } from "../../router/helper";
import { colors } from "../../utils/colors";
import { useTranslation } from "react-i18next";
import BreadCrumb from "../../components/elements/BreadCrumb";
import View from "../../components/modules/View";
import i18n from "../../i18n/i18n";
import { locales } from "../../i18n/helper";
import { useSelector } from "react-redux";

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

const DatasetDetail = memo(() => {

    const mainDiv = document.getElementById("main");
    const ip_address = useSelector(state => state.ip_address.ip_address);

    const { t } = useTranslation()

    const navigate = useNavigate();
    const { search } = useLocation();

    const urlParams = new URLSearchParams(search);

    const id = urlParams.get('id');

    const [dataset, setDataset] = useState();
    const [similarDataset, setSimilarDataset] = useState();

    // useEffect(() => {
    //     mainDiv.scrollIntoView();
    //     setDataset();
    // }, [id])

    console.log("datatatattatatat");

    const onClickCard = useCallback((id) => {
        mainDiv.scrollIntoView();
        setDataset()
        setSimilarDataset()
        navigate(`${routes.DATASET_DETAIL}?id=${id}`, { replace: true })
    }, [id]);



    useEffect(() => {

        if (!id) return navigate(routes.DATASET, { replace: true });

        getDatasetById(id, setDataset, ip_address);
        mainDiv?.scrollIntoView();

    }, [id])

    const handleReload = useCallback(() => {
        getDatasetById(id, setDataset, ip_address);
    })

    useEffect(() => {

        if (dataset) {
            getSimilarDatasets(dataset.id, dataset.topics[0], setSimilarDataset)
        }

    }, [dataset])

    console.log("IDDD--->", dataset);

    return (
        <div style={{ maxWidth: "1800px", margin: "auto" }}>
            <View theme="dark" noupperfooter sticky>
                <div id="main" className="my-5 pt-5">
                    <div className="breadCrumb-padding pt-5">
                        <BreadCrumb
                            items={[
                                {
                                    title: t("datasets")
                                }
                            ]}
                        />
                    </div>
                    <Main handleReload={handleReload} id={id} data={dataset} url={`https://data.abudhabi/opendata/dataset/detail?id=${id}`} />
                    <Cards onClickViewAll={() => {
                        navigate(routes.DATASET, {
                            replace: true, state: {
                                listItem: [{
                                    title: i18n.language === locales.AR ? dataset.topics_ar[0] : dataset.topics[0],
                                    type: i18n.language === locales.AR ? "themelear" : "theme"
                                }]
                            }
                        })
                    }}
                        dropdownWidth={"55%"}
                        title={t("similarDatasets")}
                        backgroundColor={colors.white}
                        data={similarDataset}
                        onClick={onClickCard}
                        size={"md"}
                        padding="page-padding-md"
                        hoverable="primary"
                    />
                </div>
            </View>
        </div>
    )
});

export default DatasetDetail;