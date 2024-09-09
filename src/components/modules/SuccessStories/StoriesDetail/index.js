import React, { memo, useState, useEffect, useRef, useLayoutEffect, useCallback } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { locales } from "../../../../i18n/helper";
import { colors } from "../../../../utils/colors";
import { SlShare } from "react-icons/sl";
import { FaFilePdf, FaFileExcel, FaFileCsv, FaFacebookF, FaLinkedinIn, FaTwitter } from "react-icons/fa";
import { BsPerson } from "react-icons/bs";
import { FiTwitter, FiLinkedin } from "react-icons/fi";
import Heading from "../../../elements/Heading";
import Shimmer from "../../../elements/Shimmer";
import Tag from "../../../elements/Tag";
import Dropdown from "../../../elements/DropDown";
import Button from "../../../elements/Button";
import './style.css';
import { shareOptions } from "../../../../utils";
import BottomSheetBar from "../../BottomSheet";

const StoriesDetails = memo((props) => {

    const { item, shareOption, url } = props;
    const { t, i18n } = useTranslation();
    let option = { dateStyle: 'long' };

    const [headerOnTop, setHeaderOnTop] = useState(false);
    const [openBottomSheet, setOpenBottomSheet] = useState(false)

    // const downloadResources = useCallback((links) => { console.log(links) });

    const options = shareOptions?.map((item, index) => (
        {
            title: t(item.title),
            format: item.format,
            url: url,
            icon: item.format === "facebook" ? <BsPerson />
                : item.format === "linkedin" ? <FiLinkedin />
                    : item.format === "twitter" && <FiTwitter />
        }
    ))

    useEffect(() => {
        window.onscroll = () => {
            if (document?.getElementById("main")?.getBoundingClientRect().top <= 0) {
                setHeaderOnTop(true)
            } else {
                setHeaderOnTop(false)
            }
        }
    }, [])

    return (
        <>
            {
                headerOnTop &&
                <Container fluid className={`transition sticky-top m-0 bg-white shadow-sm`} style={{ zIndex: 1 }}>
                    {<BottomSheetBar
                        open={openBottomSheet}
                        setOpen={setOpenBottomSheet}
                        selectedSheetValue={t("share")}
                        heading={t("share")}
                        options={options}
                    />}
                    <Row className="d-none d-lg-flex m-0 p-0 w-100 align-items-center">

                        <Col className="px-4 py-4 m-0" lg={8}>
                            <Heading nomargin maxNumberOfLines={2} bold size={"md"} heading={i18n.language === locales.AR ? item?.title_ar : item?.title} />
                        </Col>
                        <Col lg={4} sm={0} xs={0} className={"d-flex justify-content-end"}>
                            <div className="d-flex align-items-center">
                                <Dropdown
                                    autoClose={true}
                                    options={shareOption}
                                    size={"xl"}
                                    headerComponent={<Button backgroundColor="white" textColor="black" borderColor={colors.black} icon={<SlShare size={20} />} />}
                                />
                            </div>
                        </Col>
                    </Row>
                    <div className="d-flex d-lg-none justify-content-end fixed-bottom bg-white p-1 bottom-0">
                        <Col xl={12}>
                            {window.innerWidth <= 768 ?
                                <Button onClick={() => setOpenBottomSheet(true)} backgroundColor="white" textColor="black" borderColor={colors.black} icon={<SlShare size={20} />} />
                                :
                                <Dropdown
                                    autoClose={true}
                                    options={shareOption}
                                    size={"lg"}
                                    headerComponent={<Button backgroundColor="white" textColor="black" borderColor={colors.black} icon={<SlShare size={20} />} />}
                                />
                            }
                        </Col>
                    </div>
                </Container>
            }
            <Container>
                <Row className="d-flex align-items-center justify-content-center">
                    <Col lg={8}>
                        {
                            item ? (
                                <div className="py-3">
                                    <div className="no-letter-spacing py-4">
                                        <Heading nomargin size="xxs" heading={i18n.language === locales.AR ? item?.publisher_ar : item?.publisher.toUpperCase()} />
                                    </div>
                                    <div id="main">
                                        <Heading bold size={"xl"} heading={i18n.language === locales.AR ? item?.title_ar : item?.title} />
                                    </div>
                                    <Heading size={"xs"} heading={i18n.language === locales.AR ? item?.short_description_ar : item?.short_description} />
                                    <div className="py-2">
                                        <Heading size={"xxs"} heading={`${t("publishedOn")} ` + new Date(item?.created).toLocaleDateString(i18n.language === locales.AR ? "ar-US" : "en-US", option)} />
                                    </div>
                                    <div className="py-3">
                                        <img src={item?.image} width='100%' style={{ borderRadius: "30px" }} />
                                    </div>
                                    <div className="py-3">
                                        <Heading size={"xxs"} heading={i18n.language === locales.AR ? item?.description_ar : item?.description} />
                                    </div>
                                    {
                                        item?.rows.map(item => (
                                            <div className="py-2">
                                                <div className="py-2">
                                                    <Heading size={"xl"} heading={i18n.language === locales.AR ? item.title_ar : item.title} />
                                                </div>
                                                {
                                                    item.image &&
                                                    <div className="py-5">
                                                        <img src={item.image} width='100%' style={{ borderRadius: "30px" }} />
                                                    </div>
                                                }
                                                <div className="py-2">
                                                    <Heading size={"xxs"} heading={i18n.language === locales.AR ? item.description_ar : item.description} />
                                                </div>
                                            </div>
                                        ))
                                    }
                                    <div className="d-flex py-5">
                                        {
                                            i18n.language === locales.AR ?
                                                item?.tags_ar?.map((item, index) => {
                                                    return (
                                                        <Tag key={index} title={item} />
                                                    )
                                                }) :
                                                item?.tags?.map((item, index) => {
                                                    return (
                                                        <Tag key={index} title={item} />
                                                    )
                                                })
                                        }
                                    </div>
                                </div>
                            ) : (
                                <div className="py-3">
                                    <Col>
                                        <Shimmer rounded="xs" height={36} className="my-1" />
                                        <Shimmer rounded="xs" height={36} className="my-1" width="30%" />
                                    </Col>
                                    <Col className="py-3">
                                        <Shimmer rounded="xs" className="my-1" />
                                        <Shimmer rounded="xs" className="my-1" width="80%" />
                                    </Col>
                                    <Col className="py-2">
                                        <Shimmer rounded="xs" className="my-1" width="50%" />
                                    </Col>
                                    <Col className="py-3">
                                        <Shimmer rounded='sm' height={'70vh'} />
                                    </Col>
                                </div>
                            )
                        }
                    </Col>
                </Row>
            </Container>
        </>
    )
})

export default StoriesDetails;