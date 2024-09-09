import React, { memo, useCallback, useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { getInsightsReport } from "../../../axios/api";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { locales } from "../../../i18n/helper";
import Table from "../../../components/elements/Table";
import LowerFooter from "../../../components/modules/Footer/LowerFooter";
import MiddleFooter from "../../../components/modules/Footer/MiddleFooter";
import Navbar from "../../../components/modules/Navbar";
import AppliedFilters from "../../../components/modules/Reports/AppliedFilters";
import Header from "../../../components/modules/Reports/Header";
import Tabs from "../../../components/modules/Reports/Tabs";
import ReportsFilter from '../../../components/modules/Reports/Filter';
import Reports from "..";
import dayjs from "dayjs";

const Insights = memo(() => {

    const { t, i18n } = useTranslation();

    const publishers = useSelector((state) => state.facets.publishers);

    const [insights, setInsights] = useState();
    const [filters, setFilters] = useState({ date_type: "Modified" });
    const [selectedTab, setSelectedTab] = useState("All");
    const [datatype, setDataType] = useState('json');

    const [totalCount, setTotalCount] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    const [loading, setLoading] = useState(true);

    const [filterOpen, setFilterOpen] = useState(false);

    let tabs = [
        {
            title: t("all"),
            onClick: (val) => {
                setFilters({ date_type: "Modified" })
                setSelectedTab(val)
            }
        },
        {
            title: t("weekly"),
            onClick: (val) => {
                setFilters({ ...filters, start_date: dayjs().subtract(6, 'days').format('YYYY-MM-DD'), end_date: dayjs().format('YYYY-MM-DD') })
                setSelectedTab(val)
            }
        },
        {
            title: t("monthly"),
            onClick: (val) => {
                setFilters({ ...filters, start_date: dayjs().subtract(1, 'month').add(1, 'day').format('YYYY-MM-DD'), end_date: dayjs().format('YYYY-MM-DD'), })
                setSelectedTab(val)
            }
        },
        {
            title: t("quarterly"),
            onClick: (val) => {
                setFilters({ ...filters, start_date: dayjs().subtract(3, 'month').add(1, 'day').format('YYYY-MM-DD'), end_date: dayjs().format('YYYY-MM-DD'), })
                setSelectedTab(val)
            }
        },
        {
            title: t("yearly"),
            onClick: (val) => {
                setFilters({ ...filters, start_date: dayjs().subtract(1, 'year').add(1, 'day').format('YYYY-MM-DD'), end_date: dayjs().format('YYYY-MM-DD') })
                setSelectedTab(val)
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
        setDataType(datatype);
    }

    useEffect(() => {
        getInsightsReport(setInsights, {
            enddate: filters?.end_date ? filters.end_date : "all",
            startdate: filters?.start_date ? filters.start_date : "all",
            datatype: datatype,
            date_type: filters?.date_type ? filters.date_type.toLocaleLowerCase() : "updated",
            publisher: filters?.publisher ? filters.publisher : ""
        }, setLoading, setDataType)
    }, [filters, datatype]);

    const onChangePage = useCallback((page) => setCurrentPage(page), [currentPage]);

    const onClickFilter = useCallback(() => setFilterOpen(!filterOpen), [filterOpen]);
    const onApplyFilters = useCallback((obj) => setFilters(obj), []);

    return (
        <>
            <Navbar theme='dark' />
            <ReportsFilter selectedTab={selectedTab} accordinData={AccordinData} open={filterOpen} setOpen={setFilterOpen} appliedFilters={filters} onApplyFilters={onApplyFilters} />
            <Container fluid className="my-5 pt-5 page-padding">
                <Header title={t("insightsReport")} onClickFilter={onClickFilter} datatypeCallback={datatypeCallback} />
                <Tabs loading={loading} data={tabs} selected={selectedTab} />
                <AppliedFilters
                    loading={true}
                    filters={filters}
                />
                <Table
                    data={insights && [insights]}
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

export default Insights;