import React, { memo, useCallback, useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { getPublishersReport } from "../../../axios/api";
import { useTranslation } from "react-i18next";
import { locales } from "../../../i18n/helper";
import { useSelector } from "react-redux";
import Table from "../../../components/elements/Table";
import LowerFooter from "../../../components/modules/Footer/LowerFooter";
import MiddleFooter from "../../../components/modules/Footer/MiddleFooter";
import Navbar from "../../../components/modules/Navbar";
import AppliedFilters from "../../../components/modules/Reports/AppliedFilters";
import Header from "../../../components/modules/Reports/Header";
import Tabs from "../../../components/modules/Reports/Tabs";
import ReportsFilter from '../../../components/modules/Reports/Filter';

const Publishers = memo(() => {

    const { t, i18n } = useTranslation();

    const publishers = useSelector((state) => state.facets.publishers);

    const tableDiv = document.getElementById("table");
    const headerDiv = document.getElementById("header");

    const [publisherData, setPublishersData] = useState();
    const [filters, setFilters] = useState({ date_type: "Modified" });
    const [selectedTab, setSelectedTab] = useState("All");

    const [datatype, setDatatype] = useState('json');
    const [totalCount, setTotalCount] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    const [loading, setLoading] = useState(true);

    const [filterOpen, setFilterOpen] = useState(false);

    let tabs = [
        {
            title: t("All"),
            onClick: (val) => {
                setFilters({ ...filters, date_type: "Modified", type: "all" })
                setSelectedTab(val)
                setCurrentPage(1);
            }
        },
        {
            title: t("users"),
            onClick: (val) => {
                setFilters({ ...filters, type: "user" })
                setSelectedTab(val)
                setCurrentPage(1);
            }
        }
    ]

    const AccordinData = [
        {
            title: t("publisher"),
            tags: i18n.language === locales.AR ? publishers && publishers.ar : publishers && publishers.en
        }
    ]

    const datatypeCallback = (datatype) => {
        setDatatype(datatype)
    }

    useEffect(() => {
        getPublishersReport(setPublishersData, {
            startdate: filters?.start_date ? filters.start_date : "all",
            enddate: filters?.end_date ? filters.end_date : "all",
            date_type: filters?.date_type ? filters.date_type.toLocaleLowerCase() : "modified",
            datatype: datatype,
            type: filters?.type ? filters.type : "all",
            publisher: filters?.publisher ? filters.publisher : "",
            perpage: datatype === "pdf" || datatype === "csv" || datatype === "excel" ? "all" : rowsPerPage,
            pagenumber: datatype === "pdf" || datatype === "csv" || datatype === "excel" ? "all" : currentPage,
        }, setLoading, setTotalCount, setDatatype)
    }, [filters, currentPage, datatype]);

    const onChangePage = useCallback((page) => {
        tableDiv.scrollIntoView();
        setCurrentPage(page)
    }, [currentPage, tableDiv]);

    const onClickFilter = useCallback(() => setFilterOpen(!filterOpen), [filterOpen]);
    const onApplyFilters = useCallback((obj) => {
        setCurrentPage(1)
        setFilters(obj)
    }, []);

    return (
        <>
            <Navbar theme='dark' />
            <ReportsFilter accordinData={AccordinData} open={filterOpen} setOpen={setFilterOpen} appliedFilters={filters} onApplyFilters={onApplyFilters} />
            <Container id="header" fluid className="my-5 pt-5 page-padding">
                <Header title={t("publishersReports")} onClickFilter={onClickFilter} datatypeCallback={datatypeCallback} />
                <Tabs loading={loading} data={tabs} selected={selectedTab} />
                <div id="table">
                    <AppliedFilters
                        loading={loading}
                        numberOfDatasets={publisherData?.length}
                        pageNumber={currentPage}
                        totalCount={totalCount}
                        filters={filters}
                    />
                </div>
                <Table
                    data={publisherData}
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

export default Publishers;