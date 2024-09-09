import React, { memo, useCallback } from "react";
import View from "../../components/modules/View";
import { useTranslation } from "react-i18next";
import RealTimeApisHeader from "../../components/modules/RealTimeApis/Main";
import ListCard from "../../components/modules/RealTimeApis/Main/ListCard";
import { useState } from "react";
import { useEffect } from "react";
import { getAllRealTimeApis } from "../../axios/api";
import DatasetList from "../../components/modules/Dataset/DatasetList";
import { routes } from "../../router/helper";
import { useNavigate } from "react-router-dom";

const RealTimeApis = memo((props) => {

    const { t } = useTranslation();
    const navigate = useNavigate();

    const [totalCount, setTotalCount] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    const [loading, setLoading] = useState(false);
    const [realTimeApisData, setRealTimeApisData] = useState();

    useEffect(() => {
        getAllRealTimeApis(setRealTimeApisData, setLoading)
    }, []);

    const onClickCard = useCallback((id) => {
        navigate(`${routes.REAL_TIME_APIS_DETAIL}?id=${id}`)
    }, []);

    const style = {
        titleFs: 'tittle-sm-md',
        descFs: 'fs-xs',
        publisher: 'publisher-xs-sm'
    }

    return (
        <View theme="dark" footerTitle={t("GetMore")} footerButton={t("explorepublisher")}>
            <RealTimeApisHeader />
            <DatasetList
                datasets={realTimeApisData}
                loading={loading}
                totalCount={totalCount}
                rowsPerPage={rowsPerPage}
                currentPage={currentPage}
                notags
                cardSize="xs"
                noheader
                onClick={onClickCard}
                cardStyle={style}
            />
            {/* <ListCard loading={loading} datalist={data} /> */}
        </View>
    )
})

export default RealTimeApis;