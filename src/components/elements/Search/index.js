import './style.css'
import React, { useRef, memo, useState, useCallback, useEffect, Fragment } from "react";
import { Col, Container, Row } from "react-bootstrap";
import _ from 'lodash';
import { IoIosSearch } from 'react-icons/io';
import { BiSend } from 'react-icons/bi';
import { MdOutlineFilterAlt, MdCancel } from 'react-icons/md';
import { RxDotFilled } from 'react-icons/rx';
import { useTranslation } from "react-i18next";
import { colors } from "../../../utils/colors";
import Drawer from '../../modules/Drawer';
import Heading from "../Heading";
import ExpandSearchBarModal from "./ExpandSearchBarModal";
import { isEmptyString } from "../../../utils/generic";
import i18n from "../../../i18n/i18n";
import { locales } from "../../../i18n/helper";

const Search = memo((props) => {

    const [openModal, setOpenModal] = useState(false);
    const wrapperRef = useRef(null);

    const { t } = useTranslation();

    const { isAttachmentFileOption, isForwarededButton, isSearchIcon, IsfilterIcon, expandedSearchbar, setExpandedSearchbar, isFilterIcon, nofilter, filterData, nofocuseffect, placeholder, placeholderformobile, value, filter, onChange, onPressEnter, appliedFilters, onClickApplyFilter, searchData, iconColor } = props;

    const [filterOpen, setFilterOpen] = useState(false);

    const [toggler, setToggler] = useState(false)
    const [inputText, setInputText] = useState('');

    useEffect(() => {
        setOpenModal(expandedSearchbar);
    }, [expandedSearchbar])

    useEffect(() => {
        setInputText(value)
    }, [value])

    const toggle = useCallback(() => {
        setToggler(false)
        setFilterOpen(!filterOpen)
    });

    const onChangeSearch = useCallback((e) => {
        setInputText(e.target.value);
    });

    const onClickedPopularSearch = useCallback((e) => {
        setInputText(e.target.value);
        setOpenModal(false)
        setToggler(false)
        onPressEnter((e.target.value).trim())
    })

    const onKeyDown = useCallback((e) => {

        let value = e.target.value;

        if (e.key === "Enter") {
            onPressEnter && onPressEnter((value).trim())
            setInputText(value.trim())
            setOpenModal(false)
            setToggler(false)
            setExpandedSearchbar(false);
        }
    }, [toggler, openModal])

    const onClickApply = useCallback((filters) => {
        setFilterOpen(!filterOpen)
        onClickApplyFilter(filters)
    });

    function useOutsideAlerter(ref) {
        useEffect(() => {
            function handleClickOutside(event) {
                if (ref.current && !ref.current.contains(event.target)) {
                    setToggler(false)
                }
            }
            document.addEventListener("mousedown", handleClickOutside);
            return () => {
                document.removeEventListener("mousedown", handleClickOutside);
            };
        }, [ref]);
    }

    useOutsideAlerter(wrapperRef);

    const renderSearchBox = (searchIcon) => (
        searchIcon ?
            <Col xs={12} className={`d-flex px-2 ${i18n.language === locales.AR ? "justify-content-end" : "justify-content-end"}`}>
                <div onClick={() => onKeyDown()} style={{ position: "relative" }} className="bg-black rounded-pill p-2">
                    <IoIosSearch size={24} color="white" />
                </div>
            </Col>
            :
            <Col>
                <div onClick={toggle} className='d-flex align-items-center justify-content-center filter p-lg-2 p-0' style={{ borderRadius: '30px', position: 'relative' }}>
                    <MdOutlineFilterAlt className='d-flex' size={24} />
                    <div className="d-none d-md-flex align-items-center justify-content-center ">
                        <p className='m-0'>{t("filters")}</p>
                        {appliedFilters && appliedFilters.length > 0
                            &&
                            <Fragment>
                                <div className='d-md-block d-lg-none d-none' style={{ position: "absolute", right: i18n.language === locales.EN && 4, top: -8, left: i18n.language === locales.AR && 10 }}>
                                    <RxDotFilled color={colors.red} />
                                </div>
                                <div className='d-md-none d-lg-block d-none' style={{ position: "absolute", right: i18n.language === locales.EN && 6, top: 0, left: i18n.language === locales.AR && 10 }}>
                                    <RxDotFilled color={colors.red} />
                                </div>
                            </Fragment>
                        }
                    </div>
                    {appliedFilters && appliedFilters.length > 0
                        &&
                        <div className="d-flex d-md-none" style={{ position: "absolute", right: i18n.language === locales.EN && 6, top: -8, left: i18n.language === locales.AR && 6 }}>
                            <RxDotFilled color={colors.red} />
                        </div>
                    }

                </div>
                <Drawer data={filterData} open={filterOpen} setOpen={setFilterOpen} onClickApplyFilter={onClickApply} appliedFilters={appliedFilters} />
            </Col>
    )

    return (
        <div>
            {
                openModal &&
                <ExpandSearchBarModal
                    setExpandedSearchbar={setExpandedSearchbar}
                    value={inputText}
                    onChangeSearch={onChangeSearch}
                    onKeyDown={onKeyDown}
                    placeholder={placeholder}
                    searchData={searchData}
                    show={openModal}
                    setShow={() => setOpenModal(false)} />
            }
            <Container id="cont" fluid ref={wrapperRef}>
                <Row id="main" className={`d-flex ${!(toggler && !nofocuseffect) && "hover"} ${toggler && !nofocuseffect ? "search-box-active input-focused" : "search-box"}`}>
                    <Col xs={10} sm={i18n.language === locales.AR ? 9 : 10} md={i18n.language === locales.AR ? 9 : 10} xl={i18n.language === locales.AR ? 9 : 10} className={`p-0 d-flex align-items-center ${!isFilterIcon && "justify-content-center"} display-search-icon`}>
                        <div className={`${i18n.language === locales.AR ? "ms-1 me-3" : "ms-3 me-1"} ${!isFilterIcon && "d-none d-lg-block"} `}>
                            <IoIosSearch color={iconColor ? iconColor : !isFilterIcon ? "gray" : "black"} size={24} />
                        </div>

                        {/* tab */}
                        <div className="w-100 d-none d-md-block d-lg-none">
                            <input
                                onClick={() => {
                                    document?.getElementById("cont")?.offsetWidth <= 540 ?
                                        setOpenModal(true)
                                        :
                                        setToggler(true)
                                }}
                                type="text"
                                className={`${!inputText && !isFilterIcon && "textAlignCenter"} ${!isFilterIcon && "mx-4"} border-0 bg-transparent wid placeholder-color ${i18n.language === locales.AR ? "text-lg-end" : "text-lg-center"}`}
                                value={inputText} placeholder={placeholder} onChange={onChangeSearch} onKeyDown={onKeyDown} />
                        </div>

                        {/* desktop */}
                        <div className="w-100 d-none d-lg-block">
                            <input
                                onClick={() => {
                                    document?.getElementById("cont")?.offsetWidth <= 540 ?
                                        setOpenModal(true)
                                        :
                                        setToggler(true)
                                }}
                                type="text"
                                className={`border-0 bg-transparent wid placeholder-color ${i18n.language === locales.AR ? "text-lg-end" : "text-lg-start"}`}
                                value={inputText} placeholder={placeholder} onChange={onChangeSearch} onKeyDown={onKeyDown} />
                        </div>

                        {/* mobile */}
                        <div className="d-block d-md-none">
                            <input
                                onClick={() => {
                                    document?.getElementById("cont")?.offsetWidth <= 540 ?
                                        setOpenModal(true)
                                        :
                                        setToggler(true)
                                }}
                                type="text"
                                className={`border-0 bg-transparent ${!isFilterIcon && "text-center"} placeholder-color ${i18n.language === locales.AR ? "text-lg-end" : "text-lg-start"}`}
                                value={inputText} placeholder={placeholderformobile} onChange={onChangeSearch} onKeyDown={onKeyDown} />
                        </div>
                    </Col>
                    {
                        inputText?.length > 0 && !nofocuseffect && toggler ?
                            <Col md={2} xs={2} className='d-flex justify-content-end px-3'>
                                <MdCancel color="#9f9f9f" style={{ cursor: "pointer" }} onClick={() => {
                                    setInputText('');
                                    onPressEnter('');
                                }} size={24} />
                            </Col>
                            :
                            filter && !nofilter ?
                                <Fragment>
                                    {/* {isSearchIcon
                                    &&
                                    <Col xs={2} className="d-flex d-lg-none justify-content-end">
                                        <div style={{ position: "relative", left: 4 }} className="bg-black rounded-pill p-2">
                                                <IoIosSearch size={24} color="white" />
                                        </div>
                                    </Col>
                                } */}
                                    {/* ahmed made change here */}
                                    <Col xs={2} md={2} xl={i18n.language === locales.AR ? 3 : 2} lg={i18n.language === locales.AR ? 3 : 2} className='d-flex d-none d-lg-block'>
                                        {renderSearchBox()}
                                    </Col>
                                    <Col xs={2} className='p-0 d-flex d-lg-none'>
                                        {renderSearchBox(isSearchIcon)}
                                    </Col>
                                </Fragment>
                                :
                                isAttachmentFileOption &&
                                <Fragment>
                                    <Col xs={2} md={2} className='d-flex align-items-center justify-content-end'>
                                        {/* <p style={{ color: colors.purple }} className={`me-2 fs-mini text-wrap m-0 text-underline-hover ${i18n.language === locales.AR ? "ar-font-bold" : "en-font-bold"}`}>Attach File</p> */}
                                        <div className='filter p-2 rounded-pill'>
                                            <BiSend style={{ cursor: "pointer" }} size={25} />
                                        </div>
                                    </Col>
                                </Fragment>
                    }
                </Row>
                {
                    toggler && !nofocuseffect &&
                    <Row className="search-box-extend d-none d-md-block" style={{ zIndex: 999, width: toggler && document?.getElementById("main")?.offsetWidth }}>
                        <Col className="m-0">
                            <hr className="m-0 p-0" style={{ borderWidth: "2px", borderColor: colors.purple }} />
                            <div className="py-3">
                                <div style={{ marginLeft: "32px", marginRight: "32px" }}>
                                    <p style={{ fontSize: 12 }} className="py-2 m-0 text-secondary">{t("popularsearches")}</p>
                                </div>
                                {
                                    searchData?.slice(-5).map((item, index) => {
                                        return (
                                            <div key={index} style={{ marginLeft: "30px", marginRight: "30px" }} className="d-flex py-1">
                                                <IoIosSearch color="black" size={20} />
                                                <div className="mx-2">
                                                    <Heading heading={item} size="xxs" nomargin onClick={() => onClickedPopularSearch({ target: { value: item } })} />
                                                </div>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        </Col>
                    </Row>
                }
            </Container>
        </div >
    )
});

export default Search;