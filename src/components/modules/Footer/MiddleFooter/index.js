import './style.css';
import React, { memo, useEffect , useCallback, useState } from 'react';
import { Col, Container, Row, useAccordionButton } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { IoIosArrowUp, IoIosArrowDown } from "react-icons/io";
import { getFacets } from "../../../../axios/api";
import { setTopics } from "../../../../redux/reducers/Facets";
import { useDispatch } from "react-redux";
import { RxArrowTopRight, RxArrowTopLeft } from "react-icons/rx";
import { useSelector } from 'react-redux';
import { useTranslation } from "react-i18next";
import { colors } from '../../../../utils/colors';
import { routes } from '../../../../router/helper';
import { locales } from '../../../../i18n/helper';
import { BsFillArrowUpCircleFill } from "react-icons/bs";
import { ScrollToTop } from '../../../../utils';
import { Link } from "react-router-dom";
import Heading from '../../../elements/Heading';
import Accordion from 'react-bootstrap/Accordion';
import LanguageSwitcher from '../../../elements/LanguageSwitcher';
import AbuDhabiLogo from "../../../../assets/images/Abu-Dhabi-Data-Logo.png";
import i18next from 'i18next';

const MiddleFooter = memo(() => {

    const { t, i18n } = useTranslation();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const topics = useSelector((state) => state.facets.topics);
    const { isLoggedIn } = useSelector(state => state.authentication);

    console.log("TOPICS", topics);


    useEffect(() => {
        getFacets(i18n.language === locales.AR ? "themelear" : "theme", dispatch, setTopics);
    }, [i18n.language])

    const [activeIndex, setActiveIndex] = useState();

    function CustomToggle({ eventKey }) {
        return (
            activeIndex === eventKey ?
                <IoIosArrowUp color='white' style={{}} className="" size={20} /> :
                <IoIosArrowDown color='white' style={{}} className="" size={20} />
        );
    }

    const onClick = useCallback((route, state) => {
        if (route) navigate(route, { state })
    }, [])

    const onClickAccordian = useCallback((index) => activeIndex === index ? setActiveIndex(null) : setActiveIndex(index), [activeIndex]);

    const data = [
        {
            heading: t("datasets"),
            data: i18n.language === locales.AR ? topics?.map(item => { return ({ ...item, link: routes.DATASET, params: { listItem: [item] } }) }) : topics?.map(item => { return ({ ...item, link: routes.DATASET, params: { listItem: [item] } }) })
        },
        {
            heading: t("supports"),
            data: [
                {
                    title: t("gettingStarted"),
                    link: routes.SUPPORT
                },
                {
                    title: t("usingOpenData"),
                    link: routes.DATASET
                },
                {
                    title: t("contactUs"),
                    link: routes.CONTACT
                },
            ]
        },
        {
            heading: t("aboutus"),
            data: [
                {
                    title: t("openDataPlatform"),
                    link: routes.ABOUTUS
                },
                // {
                //     title: t("successStories"),
                //     link: routes.SUCCESS_STOIRES
                // },
                {
                    title: t("applications"),
                    link: routes.APPLICATIONS
                },
            ]
        },
        {
            heading: t("developers"),
            data: isLoggedIn ? [
                {
                    title: t("realTimeAPI"),
                    link: routes.REAL_TIME_APIS
                },
                {
                    title: t("reports"),
                    link: routes.REPORTS
                }
            ] : [
                {
                    title: t("realTimeAPI"),
                    link: routes.REAL_TIME_APIS
                }
            ]
        },
        {
            heading: t("ourPlatforms"),
            data: [
                {
                    title: t("GovtManagStandard"),
                    link: `https://data.abudhabi/opendata/sites/default/files/AD-Gov-Data-Management-Standards-EN-v1.0.pdf`,
                    downloadURL: `https://data.abudhabi/opendata/sites/default/files/AD-Gov-Data-Management-Standards-EN-v1.0.pdf`
                },
                {
                    title: t("GovtManagPolicy"),
                    link: `https://data.abudhabi/opendata/sites/default/files/AD-Gov-Data-Management-Policy-EN-v1.0.pdf`,
                    downloadURL: `https://data.abudhabi/opendata/sites/default/files/AD-Gov-Data-Management-Policy-EN-v1.0.pdf`
                },
            ]
        }
    ]

    return (
        <div className=''>
            <Container fluid className='bg-black py-3 d-none d-xl-block page-padding'>
                <div className='d-flex max-width'>
                    {
                        data?.map((item, index) => (
                            <Col key={index}>
                                <div className='my-3 d-flex align-items-center'>
                                    <p className={`text-white fs-xs-static en-font-default ${i18next.language === locales.AR ? "ar-font-bolder" : "en-font-bolder"}`}>{item.heading}</p>
                                    {/* <Heading size="md" bold color="white" heading={item.heading} /> */}
                                </div>
                                <div className='my-1'>
                                    {
                                        item.data?.map((item, index) => (
                                            <div key={index} className='d-flex'>
                                                {
                                                    item.downloadURL ? (
                                                        <>
                                                            <p className={`text-white fs-xs-static en-font-default text-underline-hover`} onClick={() => window.open(item.downloadURL, '_blank')}>{t(item.title)}</p>
                                                            {/* <Heading size='xxs' underline heading={t(item.title)} color={colors.white} onClick={() => window.open(item.downloadURL, '_blank')} /> */}
                                                            {i18n.language === locales.EN ? <RxArrowTopRight size={25} color='white' className='mx-2' /> : <RxArrowTopLeft size={25} color='white' className='mx-2' />}
                                                        </>

                                                    ) : (
                                                        <Link style={{ textDecoration: "none" }} to={item.link} state={item.params}>
                                                            <p className={`text-white fs-xs-static en-font-default`}>{t(item.title)}</p>
                                                            {/* <Heading size='xxs' heading={t(item.title)} color={colors.white} /> */}
                                                        </Link>
                                                    )
                                                }
                                            </div>
                                        ))
                                    }
                                </div>
                            </Col>
                        ))
                    }
                </div>
            </Container>
            <Container fluid className='d-xl-none bg-black m-0 page-padding'>
                <div className='py-4'>
                    <img height={"50px"} src={AbuDhabiLogo} />
                </div>
                <hr className="text-white m-0 p-0" />
                {
                    data?.map((item, index) => {
                        return (
                            <>
                                <Accordion className='bg-black' activeKey={activeIndex} key={index}>
                                    <Accordion.Item eventKey={index} className="py-3 border-0 bg-black">
                                        <Accordion.Header className='bg-black' onClick={() => onClickAccordian(index)}>
                                            <div className='w-100 bg-black d-flex justify-content-between' style={{ textAlign: 'start' }}>
                                                <Heading bold size="xs" color={colors.white} nomargin heading={item.heading} />
                                                <CustomToggle eventKey={index} />
                                            </div>
                                        </Accordion.Header>
                                        <Accordion.Body className='bg-black'>
                                            {
                                                item.data?.map((items, index) => {
                                                    return (
                                                        <Col xs={10} key={index} className="py-3">
                                                            {items.downloadURL ?
                                                                <div>
                                                                    <a style={{ textDecoration: "none" }} href={items.downloadURL}>
                                                                        <Heading nomargin size="xs" heading={items.title} color={colors.white} />
                                                                    </a>
                                                                </div>
                                                                :
                                                                <Link style={{ textDecoration: "none" }} to={items.link} state={items.params}>
                                                                    <Heading nomargin size="xs" heading={items.title} color={colors.white} />
                                                                </Link>
                                                            }
                                                        </Col>
                                                    )
                                                })
                                            }
                                        </Accordion.Body>
                                    </Accordion.Item>
                                </Accordion>
                                <div>
                                    <hr className="m-0 p-0 text-white" />
                                </div>
                            </>
                        )
                    })
                }
                <Row className='d-flex py-3'>
                    <Col sm={12} xs={12}>
                        <div className='d-flex align-items-center justify-content-end'>
                            <div className='px-3'>
                                <Heading onClick={() => ScrollToTop()} nomargin size="xxs" heading={t("backToTop")} color={colors.white} />
                            </div>
                            <div className=''>
                                <BsFillArrowUpCircleFill onClick={() => ScrollToTop()} color='white' size={20} />
                            </div>
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    )
});

export default MiddleFooter;