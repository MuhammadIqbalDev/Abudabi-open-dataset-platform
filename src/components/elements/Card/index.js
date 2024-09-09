import './style.css';
import React, { memo, useEffect, useRef, useState } from "react";
import { Card as RBCard, Col, Row, Spinner } from "react-bootstrap";
import { BsPerson, BsShare, BsThreeDots } from "react-icons/bs";
import { FiTwitter, FiLinkedin } from "react-icons/fi";
import { MdOutlineFileDownload } from 'react-icons/md';
import { BsArrowDownCircleFill } from "react-icons/bs";
import { HiOutlineDotsHorizontal, HiLink } from "react-icons/hi";
import { colors } from "../../../utils/colors";
import { useCallback } from "react";
import Dropdown from '../../elements/DropDown';
import Heading from "../Heading";
import Tag from "../Tag";
import { shareOptions } from "../../../utils";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import pdfImage from '../../../assets/images/pdf_img.png';
import excelImage from '../../../assets/images/excel_img.png';
import csvImage from '../../../assets/images/csv_img.png';
import apiImage from '../../../assets/images/api_img.png';
import i18n from "../../../i18n/i18n";
import { locales } from "../../../i18n/helper";
import BottomSheetBar from "../../modules/BottomSheet";
import { routes } from "../../../router/helper";
import { addDownloadCount, getResourcesByIdentifier } from "../../../axios/api";
import i18next from "i18next";
import { useSelector } from 'react-redux';

const Card = memo((props) => {

    const { t } = useTranslation();
    const navigate = useNavigate();
    const ip_address = useSelector(state => state.ip_address.ip_address);

    const { resources, title, publisher, description, tags, size, noborder,
        hoverable, nopadding, shortTitle, headingSize, onClick, nodropdown,
        noheadercomponent, notags, notagsactive, url, dropdownWidth, handleReload, cardStyle, datasetID, tempIncreaseDownloadCount } = props;

    var HEIGHT = "332px", border, ClassName;

    const [selectedDropdownValue, setSelectedDropdownValue] = useState();
    const [openBottomSheet, setOpenBottomSheet] = useState(false)
    const [selectedSheetValue, setSelectedSheetValue] = useState();

    const [overflowedWidth, setOverflowedWidth] = useState(0);
    const divRef = useRef(null);

    useEffect(() => {
        const divElement = divRef.current;

        // Check if the content inside the div is overflowing in width
        const isOverflowing = divElement?.offsetWidth < divElement?.scrollWidth;

        if (isOverflowing) {
            // Get the exact width of the div when it becomes overflowed
            const { width } = divElement.getBoundingClientRect();
            setOverflowedWidth(width);
        }
    }, [divRef]);

    // for resources
    const [newResources, setNewResources] = useState();

    const isClicked = useCallback((value, id) => {
        getResourcesByIdentifier(id, setNewResources)

        setSelectedDropdownValue(value)
    })

    const addDownloadCounts = useCallback((title, id) => {
        addDownloadCount(id, ip_address).then((res) => {
            handleReload();
        })
    });

    if (size === "xs") {
        HEIGHT = "225px"
    } else if (size === 'sm') {
        HEIGHT = "332px"
    } else if (size === 'md') {
        HEIGHT = '288px'
    }

    if (noborder) {
        border = 0
    }

    if (hoverable) {
        ClassName = "card-hover-" + hoverable

        if (hoverable === "primary") {
            if (description && !shortTitle) {
                ClassName = ClassName + " " + "hover-second"
            } else {
                ClassName = ClassName + " " + "hover-third"
            }
        }
    }

    const onClickTag = useCallback((route, state) => {
        if (route) navigate(route, { state })
    }, [])

    const options = [
        {
            id: datasetID,
            title: window.innerWidth <= 768 ? t("downloadDatasets") : t("download"),
            icon: window.innerWidth <= 768 ? <BsArrowDownCircleFill size={20} color="black" /> : <MdOutlineFileDownload size={20} color="black" />,
            onClick: isClicked,
        },
        {
            id: "share",
            title: t("share"),
            icon: <BsShare color="black" />,
            onClick: isClicked,
        }
    ]

    const specificDownloadOptions = newResources?.length > 0 ? newResources?.map(item => (
        {
            id: item.identifier,
            title: i18n.language === locales.AR ? (item.titlelear && item.titlelear != "" ? item.titlelear : item.url) : (item.title && item.title != "" ? item.title : item.url),
            onClick: addDownloadCounts,
            downloadLink: item.url,
            icon: item.format === "pdf" ? <img src={pdfImage} />
                : item.format === "excel" ? <img src={excelImage} />
                    : item.format === "xlsx" ? <img src={excelImage} />
                        : item.format === "csv" ? <img src={csvImage} height={20} width={20} />
                            : item.format === "api" || item.format === "API" && <img src={apiImage} />
        }

    ))
        :
        [{
            title: t("loading"),
            icon: <Spinner size='sm' />
        }]
    // <div className='bg-info' style={{height:"20px"}}>
    //     <Shimmer rounded='xs' width="70%" className={"my-1"} backgroundColor={colors.black} />
    // </div>

    const specificShareOptions = shareOptions?.map(item => (
        {
            title: t(item.title),
            format: item.format,
            url: url,
            icon: item.format === "facebook" ? <BsPerson />
                : item.format === "linkedin" ? <FiLinkedin />
                    : item.format === "twitter" ? <FiTwitter />
                        : item.format === "copylink" ? <HiLink />
                            : item.format === "email" && <BsPerson />
        }
    ))

    return (
        <>
            <BottomSheetBar
                open={openBottomSheet}
                setOpen={setOpenBottomSheet}
                setSelectedSheetValue={setSelectedSheetValue}
                selectedSheetValue={selectedSheetValue}
                heading={title}
                options={selectedSheetValue === t("downloadDatasets") ? specificDownloadOptions : selectedSheetValue === t("share") ? specificShareOptions : options} />
            <RBCard
                // onClick={onClick}
                className={`${nopadding ? "py-lg-4" : "paddofcards"} ${ClassName} hover-pl`}
                style={{
                    height: HEIGHT,
                    width: "100%",
                    borderRadius: "30px",
                    borderWidth: border
                }}>
                {
                    !notags &&
                    <Row className={`${nopadding && "m-0"} h-25 align-items-center`}>
                        <div ref={divRef} className="d-flex col-8 scroll" style={{ overflow: "hidden" }}>
                            {
                                tags && tags?.length > 0 &&
                                tags.slice(0,
                                    overflowedWidth && overflowedWidth < 215 ? 1 :
                                        overflowedWidth && overflowedWidth < 230 ? 2 :
                                            overflowedWidth && overflowedWidth < 250 ? 1 :
                                                overflowedWidth && overflowedWidth < 300 ? 2 : 4).map((item, index) => (

                                                    <Tag key={index} title={item}
                                                        margin={index == 0 ? "0" : "1"}
                                                        onClick={() => !notagsactive && onClickTag(routes.DATASET, { listItem: [{ title: item, type: i18n.language === locales.AR ? "themelear" : "theme" }] })}
                                                    />
                                                ))
                            }
                            {
                                overflowedWidth && overflowedWidth == 0 ?
                                    null
                                    :
                                    overflowedWidth && overflowedWidth < 215 ? <Tag
                                        title={`+ ${(tags?.length) - 1}`}
                                    /> :
                                        overflowedWidth && overflowedWidth < 230 ? <Tag
                                            title={`+ ${(tags?.length) - 2}`}
                                        /> :
                                            overflowedWidth && overflowedWidth < 250 ? <Tag
                                                title={`+ ${(tags?.length) - 1}`}
                                            /> :
                                                overflowedWidth && overflowedWidth < 300 ? <Tag
                                                    title={`+ ${(tags?.length) - 2}`}
                                                />
                                                    : null
                            }
                        </div>
                        {
                            !nodropdown &&
                            <Col xs={4} className='d-flex justify-content-end'>
                                <div className="d-block d-lg-none">
                                    <HiOutlineDotsHorizontal className='btn-primary' onClick={() => setOpenBottomSheet(true)} color={colors.black} size={28} style={{ cursor: 'pointer' }} />
                                </div>
                                <div className="d-none d-lg-block">
                                    <Dropdown
                                        dropdownWidth={dropdownWidth ? dropdownWidth : "15%"}
                                        width={"100%"}
                                        noheadercomponent={noheadercomponent}
                                        autoClose={"outside"}
                                        minWidth={"50%"}
                                        size={"xl"}
                                        // size={selectedDropdownValue === t("download") ? window.innerWidth >= 768 ? "sm" : "xl" : window.innerWidth >= 768 ? "sm" : "lg"}
                                        options={selectedDropdownValue === t("download") ? specificDownloadOptions : selectedDropdownValue === t("share") ? specificShareOptions : options}
                                        selectedDropdownValue={selectedDropdownValue}
                                        setSelectedDropdownValue={setSelectedDropdownValue}
                                        headerComponent={<div className='d-flex align-items-center m-0' style={{ height: '10px', overflow: 'hidden' }}><HiOutlineDotsHorizontal color={colors.black} size={28} style={{ cursor: 'pointer' }} /> </div>}
                                    />
                                </div>
                            </Col>
                        }
                    </Row>
                }
                <Row className={`${nopadding && "m-0"} ${publisher && !notags ? "h-50" : "h-75"}`}>
                    <Col md={shortTitle ? 8 : 12}>
                        {cardStyle ?
                            <p className={`${onClick && 'text-underline-hover'} ${shortTitle ? 'multine-ellipsis-2' : 'multine-ellipsis-3'} ${cardStyle?.titleFs} ${i18next.language === locales.AR ? "ar-font-bold" : "en-font-bold"}`}
                                onClick={onClick ? onClick : () => { }}
                            >
                                {title}
                            </p>
                            :
                            <>
                                <p
                                    className={`${headingSize ? headingSize : "fs-sm"} text-underline-hover ${shortTitle ? 'multine-ellipsis-2' : 'multine-ellipsis-3'} ${i18n.language === locales.AR ? "ar-font-bold" : "en-font-bold"}`}
                                    onClick={onClick}>
                                    {title}
                                </p>
                                {/* <Heading
                                    bold
                                    underline
                                    maxNumberOfLines={shortTitle ? 2 : 3}
                                    size={headingSize ? headingSize : "md"}
                                    heading={title}
                                    onClick={onClick}
                                /> */}
                            </>
                        }

                    </Col>
                    {
                        description && cardStyle ?
                            <Col md={8}>
                                <p className={`${shortTitle ? 'multine-ellipsis-2' : 'multine-ellipsis-3'} ${cardStyle?.descFs} ${i18next.language === locales.AR ? "ar-font" : "en-font"}`} style={{ color: colors.dark_gray }}>
                                    {description}
                                </p>
                            </Col>
                            :
                            <Col md={8}>
                                <Heading maxNumberOfLines={shortTitle ? 2 : 3} color={'#404040'} size={shortTitle ? "xs" : "xxs"} heading={description} />
                            </Col>
                    }
                </Row>
                {
                    publisher && cardStyle ?
                        <Row className={`${nopadding && "m-0"} h-25 align-items-end`} >
                            <Col>
                                <p className={`${cardStyle?.publisher} ${i18next.language === locales.AR ? "ar-font" : "en-font"}`} style={{ color: colors.gray }}>
                                    {publisher}
                                </p>
                            </Col>
                        </Row>
                        :
                        <Row className={`${nopadding && "m-0"} h-25 align-items-end`} >
                            <Col>
                                <Heading size='xxs' color={colors.gray} nomargin heading={publisher} />
                            </Col>
                        </Row>
                }
            </RBCard >
        </>
    )
});

export default Card;