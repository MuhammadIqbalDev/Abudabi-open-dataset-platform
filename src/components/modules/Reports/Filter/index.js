import React, { memo, useEffect, useState, useCallback } from "react";
import RMDrawer from 'react-modern-drawer'
import { useSelector } from "react-redux";
import { RxCross2 } from "react-icons/rx";
import { useTranslation } from "react-i18next";
import { IoIosArrowUp, IoIosArrowDown } from "react-icons/io";
import { locales, string } from '../../../../i18n/helper';
import { colors } from "../../../../utils/colors";
import Accordion from 'react-bootstrap/Accordion';
import Heading from "../../../elements/Heading";
import Tag from "../../../elements/Tag";
import Button from "../../../elements/Button";
import DatePicker from "../../../elements/DatePicker";
import Dropdown from "../../../elements/DropDown";
import '../../../modules/Drawer/style.css';
import 'react-modern-drawer/dist/index.css';
import dayjs from "dayjs";
import CustomButton from "../../../elements/CustomButton";

const ReportsFilter = memo((props) => {

    const { t, i18n } = useTranslation();
    const { open, setOpen, appliedFilters, onApplyFilters, accordinData, kpi, selectedTab } = props;

    const initialFilters = {
        date_type: t("modified")
    }

    // useEffect(() => {
    //     i18n.language === locales.AR && initialFilters.date_type == "تم التعديل"
    // },[])

    const [activeIndex, setActiveIndex] = useState();
    const [filters, setFilters] = useState(initialFilters);

    const toggleDrawer = useCallback(() => setOpen(!open), [open]);
    const onClickAccordian = useCallback((index) => activeIndex === index ? setActiveIndex(null) : setActiveIndex(index), [activeIndex]);

    const CustomToggle = (({ eventKey }) => {
        return (
            activeIndex === eventKey ?
                <IoIosArrowUp color={colors.black} size={20} /> :
                <IoIosArrowDown color={colors.black} size={20} />
        );
    });

    const SortbyData = [
        {
            title: string("modified"),
            onClick: (date_type) => onChangeFilter({ date_type }),
        },
        {
            title: string("createdAt"),
            onClick: (date_type) => onChangeFilter({ date_type }),
        }
    ]

    const SortbyKPI = [
        {
            title: t("yes"),
            onClick: (kpi) => onChangeFilter({ kpi }),
        },
        {
            title: t("no"),
            onClick: (kpi) => onChangeFilter({ kpi }),
        }
    ]



    useEffect(() => {
        if (appliedFilters) {
            setFilters({ ...filters, ...appliedFilters })
        }
    }, [appliedFilters])

    const onClickItem = useCallback((item) => {
        console.log("ITEMS", item);
        item.type === "publisherlear__name" && setFilters({ ...filters, publisher: item.title });
        item.type === "themelear" && setFilters({ ...filters, topic: item.title });
        item.type === "publisher__name" && setFilters({ ...filters, publisher: item.title });
        item.type === "theme" && setFilters({ ...filters, topic: item.title });

    }, [filters])

    console.log("ITEMS", filters);

    const onChangeFilter = useCallback((filter) => setFilters({ ...filters, ...filter }), [filters]);

    const onClickApply = useCallback(() => {
        toggleDrawer()
        if (onClickApply) {
            onApplyFilters(filters)
        }
    });

    const onClickClear = useCallback(() => {

        setFilters(initialFilters)
    });

    return (
        <RMDrawer
            size={"400px"}
            open={open}
            onClose={toggleDrawer}
            direction={i18n.language === locales.AR ? 'left' : 'right'}
            lockBackgroundScroll
        >
            <div className="p-4 bg-white d-flex align-items-center justify-content-between">
                <Heading size="xxs" heading={t("filter")} nomargin />
                <RxCross2 style={{ cursor: "pointer" }} onClick={toggleDrawer} className="mx-1" size={20} />
            </div>
            <div style={{ scrollBehavior: "smooth", height: "75%" }} className={"p-4 scroll-bar"}>
                <div className="w-100">
                    <Dropdown
                        textColor={filters?.date_type && "black"}
                        dropdownWidth={"100%"}
                        padding={"px-1"}
                        reportsFilter
                        name={t("dateType")}
                        options={SortbyData}
                        selectedValue={filters?.date_type}
                    />
                </div>
                {kpi &&
                    <div className="w-100">
                        <Dropdown
                            dropdownWidth={"100%"}
                            padding={"px-1"}
                            name={"KPI"}
                            reportsFilter
                            options={SortbyKPI}
                            selectedValue={filters?.kpi ? filters.kpi : t("selectOption")}
                        />
                    </div>
                }
                <div className="d-flex my-3">
                    <div className="w-100">
                        <DatePicker
                            disabled={selectedTab === "Weekly" || selectedTab === "Monthly" || selectedTab === "Quarterly" || selectedTab === "Yearly"}
                            value={filters?.start_date}
                            title={t("startDate")}
                            onChange={(start_date) => onChangeFilter({ start_date })} maxDate={filters?.end_date} />
                    </div>
                </div>
                <div className="d-flex my-3">
                    <div className="w-100">
                        <DatePicker value={filters?.end_date} title={t("endDate")}
                            onChange={(end_date) => onChangeFilter({
                                end_date,
                                start_date:
                                    selectedTab === "All" || selectedTab === t("linkedResource")
                                        || t("physicalResource") || t("kpi")
                                        ? filters?.start_date : selectedTab === "Weekly" ? dayjs(end_date).subtract(6, 'days').format('YYYY-MM-DD') :
                                            selectedTab === "Monthly" ? dayjs(end_date).subtract(1, 'month').add(1, 'day').format('YYYY-MM-DD') :
                                                selectedTab === "Quarterly" ? dayjs(end_date).subtract(3, 'month').add(1, 'day').format('YYYY-MM-DD') :
                                                    selectedTab === "Yearly" ? dayjs(end_date).subtract(1, 'year').add(1, 'day').format('YYYY-MM-DD') : ""
                            })} minDate={filters?.start_date} />
                    </div>
                </div>
                <div className="py-2">
                    {
                        accordinData?.map((item, index) => {
                            return (
                                <>
                                    <Accordion activeKey={activeIndex} key={index} className="bg-transparent">
                                        <Accordion.Item eventKey={index} className="border-0 my-2">
                                            <Accordion.Header onClick={() => onClickAccordian(index)}>
                                                <div className='w-100 d-flex justify-content-between' style={{ textAlign: 'start' }}>
                                                    <Heading bold size="xs" heading={item.title} nomargin />
                                                    <CustomToggle eventKey={index} />
                                                </div>
                                            </Accordion.Header>
                                            <Accordion.Body>
                                                <div className="d-flex flex-wrap">
                                                    {
                                                        item.tags?.map((items, index) => {
                                                            return (
                                                                <div key={index} className={`my-1`}>
                                                                    <Tag
                                                                        backgroundColor={
                                                                            items.type === 'publisherlear__name' ? filters?.publisher === items.title ? colors.black : colors.white :
                                                                                items.type === 'themelear' ? filters?.topic === items.title ? colors.black : colors.white :
                                                                                    items.type === 'publisher__name' ? filters?.publisher === items.title ? colors.black : colors.white :
                                                                                        items.type === 'theme' ? filters?.topic === items.title ? colors.black : colors.white : null
                                                                        }
                                                                        textColor={
                                                                            items.type === 'publisherlear__name' ? filters?.publisher === items.title ? colors.white : colors.black :
                                                                                items.type === 'themelear' ? filters?.topic === items.title ? colors.white : colors.black :
                                                                                    items.type === 'publisher__name' ? filters?.publisher === items.title ? colors.white : colors.black :
                                                                                        items.type === 'theme' ? filters?.topic === items.title ? colors.white : colors.black : null
                                                                        }
                                                                        borderColor={"1px solid #cfcfcf"}
                                                                        title={items.title}
                                                                        onClick={() => onClickItem(items)}
                                                                    />
                                                                </div>
                                                            )
                                                        })
                                                    }
                                                </div>
                                            </Accordion.Body>
                                        </Accordion.Item>
                                    </Accordion>
                                    {
                                        index != accordinData.length - 1
                                        && <hr className="" />
                                    }
                                </>
                            )
                        })
                    }
                </div>
            </div>

            <div className="h-25">
                <div className="d-flex justify-content-between align-items-center p-2">
                    <div className="">
                        <CustomButton buttonClass="text-purple" onClick={onClickClear} textColor={"#8207C9"} title={t("clearAll")} />
                    </div>
                    <div>
                        <CustomButton buttonClass='contained-black' onClick={onClickApply} title={t("apply")} backgroundColor={"black"} textColor={"white"} />
                    </div>
                </div>
            </div>

        </RMDrawer>
    )
})

export default ReportsFilter;