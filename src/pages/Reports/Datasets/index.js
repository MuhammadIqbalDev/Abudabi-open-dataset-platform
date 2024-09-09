import React, { memo, useCallback, useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { getDatasetsReport } from "../../../axios/api";
import { useTranslation } from "react-i18next";
import Table from "../../../components/elements/Table";
import LowerFooter from "../../../components/modules/Footer/LowerFooter";
import MiddleFooter from "../../../components/modules/Footer/MiddleFooter";
import Navbar from "../../../components/modules/Navbar";
import AppliedFilters from "../../../components/modules/Reports/AppliedFilters";
import Header from "../../../components/modules/Reports/Header";
import Tabs from "../../../components/modules/Reports/Tabs";
import ReportsFilter from '../../../components/modules/Reports/Filter';
import { locales } from "../../../i18n/helper";
import { useSelector } from "react-redux";

const Datasets = memo(() => {

    const topics = useSelector((state) => state.facets.topics);
    const publishers = useSelector((state) => state.facets.publishers);

    const { t, i18n } = useTranslation();

    const [datasets, setDatasets] = useState();
    const [filters, setFilters] = useState({ date_type: "Modified" });
    const [selectedTab, setSelectedTab] = useState("All");

    const [datatype, setDatatype] = useState();
    const [totalCount, setTotalCount] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    const [loading, setLoading] = useState(true);

    const [filterOpen, setFilterOpen] = useState(false);

    const datasetsDiv = document.getElementById("tableList");

    let tabs = [
        {
            title: "All",
            onClick: (val) => {
                setFilters({ date_type: "Modified" })
                setSelectedTab(val)
                setCurrentPage(1);
            }
        },
        {
            title: t("linkedResource"),
            onClick: (val) => {
                setFilters({ ...filters, type: "linked" })
                setSelectedTab(val)
                setCurrentPage(1);
            }
        },
        {
            title: t("physicalResource"),
            onClick: (val) => {
                setFilters({ ...filters, type: "physical" })
                setSelectedTab(val)
                setCurrentPage(1);
            }
        },
        {
            title: t("kpi"),
            onClick: (val) => {
                setFilters({ ...filters, type: "kpi" })
                setSelectedTab(val)
                setCurrentPage(1);
            }
        }
    ]

    const AccordinData = [
        {
            title: t("publisher"),
            tags: i18n.language === locales.AR ? publishers && publishers.ar : publishers && publishers.en
        },
        {
            title: t("topics"),
            tags: i18n.language === locales.AR ? topics && topics.ar : topics && topics.en
        }
    ]

    const AccordinDataWithoutTopics = [
        {
            title: t("publisher"),
            tags: i18n.language === locales.AR ? publishers && publishers.ar : publishers && publishers.en
        }
    ]

    const datatypeCallback = (datatype) => {
        setDatatype(datatype)
    }

    useEffect(() => {
        getDatasetsReport(setDatasets, {
            date_type: filters?.date_type ? filters.date_type.toLocaleLowerCase() : "created",
            startdate: filters?.start_date ? filters.start_date : "all",
            enddate: filters?.end_date ? filters.end_date : "all",
            datatype: datatype,
            publisher: filters?.publisher ? filters.publisher : "",
            kpi: filters?.kpi ? filters.kpi : "",
            topic: filters?.topic ? filters.topic : "",
            perpage: datatype === "pdf" || datatype === "csv" || datatype === "excel" ? "all" : rowsPerPage,
            pagenumber: datatype === "pdf" || datatype === "csv" || datatype === "excel" ? "all" : currentPage,
            type: filters?.type ? filters.type : "all"

        }, setLoading, setTotalCount, setDatatype)
    }, [filters, currentPage, datatype]);

    useEffect(() => {
        datasetsDiv?.scrollIntoView()
    }, [currentPage])

    const onChangePage = useCallback((page) => {
        setCurrentPage(page)
    }, [currentPage]);

    const onClickFilter = useCallback(() => setFilterOpen(!filterOpen), [filterOpen]);
    const onApplyFilters = useCallback((obj) => {
        setCurrentPage(1)
        setFilters(obj)
    }, []);

    console.log("datasssssssssssssssss", datasets);

    return (
        <>
            <Navbar theme='dark' />
            <ReportsFilter selectedTab={selectedTab} kpi={filters?.type === "kpi"} accordinData={filters?.type === "kpi" ? AccordinDataWithoutTopics : AccordinData} open={filterOpen} setOpen={setFilterOpen} appliedFilters={filters} onApplyFilters={onApplyFilters} />
            <Container fluid className="my-5 pt-5 page-padding">
                <Header title={t("datasetsReports")} onClickFilter={onClickFilter} datatypeCallback={datatypeCallback} />
                <Tabs loading={loading} data={tabs} selected={selectedTab} />
                <div id="tableList">
                    <AppliedFilters
                        loading={loading}
                        numberOfDatasets={datasets?.length}
                        pageNumber={currentPage}
                        totalCount={totalCount}
                        filters={filters}
                    />
                </div>
                <Table
                    data={datasets}
                    currentPage={currentPage}
                    totalCount={Math.ceil(totalCount / rowsPerPage)}
                    onChange={onChangePage}
                    loading={loading}
                />
            </Container>
            <MiddleFooter />
            <LowerFooter />
        </>
    )
});

export default Datasets;