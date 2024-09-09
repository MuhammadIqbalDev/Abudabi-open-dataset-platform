import React, { memo, useCallback, useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { getAllApplications, getPublishers, getFacets } from "../../axios/api";
import { setTopics } from "../../redux/reducers/Facets";
import Pagination from "../../components/elements/Pagination";
import Main from "../../components/modules/Applications/Main";
import Cards from "../../components/modules/Cards";
import Navbar from '../../components/modules/Navbar';
import UpperFooter from "../../components/modules/Footer/UpperFooter";
import MiddleFooter from "../../components/modules/Footer/MiddleFooter";
import LowerFooter from '../../components/modules/Footer/LowerFooter';
import { useSelector, useDispatch } from "react-redux";
import View from "../../components/modules/View";
import Modal from "../../components/elements/Modal/index";
import useIsFocused from "../../utils/hooks/useIsFocused";
import { colors } from "../../utils/colors";
import i18next from "i18next";
import { locales } from "../../i18n/helper";
import Search from "../../components/elements/Search";
import { Col, Row } from "react-bootstrap";

const Publisher = memo(() => {

    const { t, i18n } = useTranslation()
    const ref1 = useRef(null);
    const dispatch = useDispatch()

    const { publisherSuggestion } = useSelector(state => state.publisher)
    const ip_address = useSelector(state => state.ip_address.ip_address)

    console.log("publisherSuggestion", publisherSuggestion);

    const cardsDiv = document.getElementById("publisher-cards");

    const [displayPublishers, setDisplayPublishers] = useState();

    const [isOpen, setIsOpen] = useState(false);
    const [totalCount, setTotalCount] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(9);

    // for search
    const [searchText, setSearchText] = useState('');
    const [searchedData, setSearchedData] = useState();
    const [expandedSearchbar, setExpandedSearchbar] = useState(false);

    const [loading, setLoading] = useState(false);
    const [modalData, setModalData] = useState();

    const onChangePage = useCallback((page) => {
        console.log("PAGE", page);
        setCurrentPage(page);
        setDisplayPublishers();
    }, [currentPage]);

    useEffect(() => {
        setCurrentPage(1)
    }, [i18next.language])

    useEffect(() => {
        getFacets(i18n.language === locales.AR ? "themelear" : "theme", dispatch, setTopics);
        getPublishers(currentPage, rowsPerPage, i18n.language === locales.AR ? "ar" : "en", setDisplayPublishers, setTotalCount, searchText, setLoading, ip_address)
    }, [currentPage, i18next.language, searchText])

    // useEffect(() => {
    //     if (searchText !== '') {
    //         getQuestionBySearch(searchText, setSearchedData, i18n.language)
    //     }
    // }, [searchText])

    const onSearch = useCallback((value) => {
        setCurrentPage(1);
        setSearchedData();
        if (value && value !== '') {
            setSearchText(value)
        } else {
            setSearchText('')
        }
    }, [searchText])

    // useEffect(() => {
    //     if (demo_data) {
    //         let arr = [...demo_data]
    //         let x = arr.slice(0, rowsPerPage)
    //         setDisplayPublishers(x)
    //     }
    // }, [])

    // const onChangePage = useCallback((page) => {

    //     if (page) {
    //         let start = (page - 1) * rowsPerPage
    //         let end = (start + rowsPerPage)

    //         let arr = [...demo_data]
    //         let x = arr.slice(start, end);
    //         setDisplayPublishers(x);
    //         setCurrentPage(page)
    //     }

    // }, [currentPage, displayPublishers])

    return (
        <>
            {console.log("isOPEN", isOpen)}
            {!isOpen ?
                <div style={{ maxWidth: "1800px", margin: "auto" }}>
                    <View theme="dark" footerTitle={t("GetMore")} footerButton={t("explorepublisher")}>
                        <div className="my-5 pt-lg-5 pt-2 pt-md-0">
                            <Main
                                title={t("publisherheading")}
                                description={t("publishersDiscription")}
                                //nodiscroptiontemp
                                isSearchBar
                                noimage
                                onSearch={onSearch}
                                searchText={t("searchPublishers")}
                                expandedSearchbar={expandedSearchbar}
                                setExpandedSearchbar={setExpandedSearchbar}
                                popularSearch={i18n.language === locales.AR ? publisherSuggestion?.ar : publisherSuggestion?.en}
                            />
                            <div className="" id="publisher-cards">
                                <Cards
                                    type="image-outer-text"
                                    data={i18next.language === locales.AR ? displayPublishers?.data_ar : displayPublishers?.data_en}
                                    isModalForPublisher
                                    setData={setModalData}
                                    setIsOpenModal={setIsOpen}
                                    loading={loading}
                                // onClick={onClickCard}
                                />
                            </div>
                            <Pagination
                                currentPage={currentPage}
                                totalCount={Math.ceil(totalCount / rowsPerPage)}
                                onChange={(page) => {
                                    cardsDiv?.scrollIntoView(true)
                                    onChangePage(page)
                                }}
                            />
                        </div>
                    </View>
                </div>
                :
                <div ref={ref1} className={`d-none d-lg-block`} style={{
                    height: "100vh", width: "100vw",
                    backgroundColor: colors.dark_purple,
                    opacity: 0.5
                }} />
            }

            <Modal
                height={"422px"}
                width={"898px"}
                isOpen={isOpen}
                setIsOpen={setIsOpen}
                loading={false}
                backdrop={useIsFocused(ref1)}
                title={modalData?.title}
                description={modalData?.description}
                descriptionHeight={"250px"}
                setData={setModalData}
                isPublisherModal
            />

        </>
    )
})

export default Publisher;