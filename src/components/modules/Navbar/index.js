import React, { Fragment, memo, useCallback, useState } from "react";
import { Container, Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { RxHamburgerMenu } from "react-icons/rx";
import { AiOutlineSearch } from "react-icons/ai";
import Drawer from 'react-modern-drawer';
import 'react-modern-drawer/dist/index.css';
import { useSelector, useDispatch } from "react-redux";
import { routes } from '../../../router/helper';
import { colors } from "../../../utils/colors";
import LanguageSwitcher from "../../elements/LanguageSwitcher";
import { locales } from "../../../i18n/helper";
import AbuDhabiLogo from '../../../assets/images/Abu-Dhabi-Data-Logo.png';
import AbuDhabiLogoDark from '../../../assets/images/Abu-Dhabi-Data-Logo-Dark.png';
import AbuDhabiLogoMobile from '../../../assets/images/Abu-Dhabi-Data-Logo-Mobile.png';
import AbuDhabiLogoDarkMobile from '../../../assets/images/Abu-Dhabi-Data-Logo-Mobile-Dark.png';
import Button from "../../elements/Button";
import Heading from "../../elements/Heading";
import './style.css';
import { handleLogout } from "../../../redux/reducers/Authentication";
import { logout } from "../../../axios/api";
import CustomButton from "../../elements/CustomButton";
import { setNavbarIndex } from "../../../redux/reducers/Navbar";

const Navbar = memo((props) => {

    const { theme, sticky, nocontent, nolanguageswitcher, searchIcon, setExpandedSearchbar } = props;

    const { t, i18n } = useTranslation();
    const dispatch = useDispatch();

    const { isLoggedIn } = useSelector(state => state.authentication);
    const { navbarIndex } = useSelector(state => state.navbar);

    console.log("navbarIndex", navbarIndex);

    const [isOpen, setIsOpen] = useState(false);
    const [scroll, setScrolling] = useState();
    const [selectedLinkIndex, setSelectedLinkIndex] = useState();

    const [loading, setLoading] = useState(false);

    let color = colors.white;

    if (theme === 'dark') {
        color = colors.black
    }

    const onClickDrawer = useCallback(() => setIsOpen(!isOpen), [isOpen]);

    const onClickLogout = useCallback(() => logout(dispatch, setLoading, handleLogout))

    const MobileRoutes = [
        {
            name: t("datasets"),
            route: routes.DATASET
        },
        {
            name: t("publisher"),
            route: routes.PUBLISHER
        },
        {
            name: t("chatGPT"),
            route: routes.CHATGPT
        },
        {
            name: t("supports"),
            route: routes.SUPPORT
        },
        {
            name: t("aboutus"),
            route: routes.ABOUTUS
        }

    ]

    window.addEventListener("scroll", () => {
        const windowHeight = window.innerHeight;
        const currScroll = window.scrollY;
        if (sticky && windowHeight < currScroll) {
            setScrolling(windowHeight < currScroll);
        } else {
            setScrolling();
        }
    });

    const selectedLink = (index) => {
        console.log("index", index);
    }

    return (
        <>
            <Container fluid className="nav-padding py-3 d-none d-lg-block" style={{ zIndex: 99, position: 'absolute', top: isLoggedIn ? '78px' : 0, right: 0, left: 0 }}>
                <Row>
                    <Col className="d-flex align-items-center">
                        <Link onClick={() => dispatch(setNavbarIndex(null))} to={routes.HOME} className={``}>
                            <img height={"40px"} src={theme === 'dark' ? AbuDhabiLogoDark : AbuDhabiLogo} />
                        </Link>
                    </Col>
                    {
                        !nocontent &&
                        <Col md={6} className="d-flex justify-content-center align-items-center">
                            <div onClick={() => dispatch(setNavbarIndex("/opendata/dataset"))} className="mx-4">
                                <Link className="text-decoration-none" to={routes.DATASET}>
                                    <p className={`m-0 fs-xs-static en-font-default ${navbarIndex == "/opendata/dataset" ? "active-underline" : "hover-underline-animation"} ${i18n.language === locales.AR ? "ar-font-bold" : "en-font-bold"} ${color === colors.black ? "underline-black" : "underline-white"}`} style={{ color: color }}>{t("datasets")}</p>
                                    {/* <p className={`m-0 hover-underline-animation en-font-default ${i18n.language === locales.AR ? "ar-font-bold" : "en-font-bold"} ${color === colors.black ? "underline-black" : "underline-white"}`} style={{ fontSize: '18px', color: color }}>{t("datasets")}</p> */}
                                </Link>
                            </div>
                            <div onClick={() => dispatch(setNavbarIndex("/opendata/publishers"))} className="mx-4">
                                <Link className="text-decoration-none" to={routes.PUBLISHER} replace={true}>
                                    <p className={`m-0 fs-xs-static en-font-default hover-underline-animation ${navbarIndex == "/opendata/publishers" ? "active-underline" : "hover-underline-animation"} ${i18n.language === locales.AR ? "ar-font-bold" : "en-font-bold"} ${color === colors.black ? "underline-black" : "underline-white"}`} style={{ color: color }}>{t("publishers")}</p>
                                    {/* <p className={`m-0 hover-underline-animation en-font-default ${i18n.language === locales.AR ? "ar-font-bold" : "en-font-bold"} ${color === colors.black ? "underline-black" : "underline-white"}`} style={{ fontSize: '18px', color: color }}>{t("application")}</p> */}
                                </Link>
                            </div>
                            <div onClick={() => dispatch(setNavbarIndex("/rashid/chat"))} className="mx-4">
                                <Link className="text-decoration-none" to={routes.CHATGPT} replace={true}>
                                    <p className={`m-0 fs-xs-static en-font-default hover-underline-animation ${navbarIndex == "/rashid/chat" ? "active-underline" : "hover-underline-animation"} ${i18n.language === locales.AR ? "ar-font-bold" : "en-font-bold"} ${color === colors.black ? "underline-black" : "underline-white"}`} style={{ color: color }}>{t("chatGPT")}</p>
                                    {/* <p className={`m-0 hover-underline-animation en-font-default ${i18n.language === locales.AR ? "ar-font-bold" : "en-font-bold"} ${color === colors.black ? "underline-black" : "underline-white"}`} style={{ fontSize: '18px', color: color }}>{t("application")}</p> */}
                                </Link>
                            </div>
                            <div onClick={() => dispatch(setNavbarIndex("/opendata/support"))} className="mx-4">
                                <Link className="text-decoration-none" to={routes.SUPPORT} replace={true}>
                                    <p className={`m-0 fs-xs-static en-font-default hover-underline-animation ${navbarIndex == "/opendata/support" ? "active-underline" : "hover-underline-animation"} ${i18n.language === locales.AR ? "ar-font-bold" : "en-font-bold"} ${color === colors.black ? "underline-black" : "underline-white"}`} style={{ color: color }}>{t("supports")}</p>
                                    {/* <p className={`m-0 hover-underline-animation en-font-default ${i18n.language === locales.AR ? "ar-font-bold" : "en-font-bold"} ${color === colors.black ? "underline-black" : "underline-white"}`} style={{ fontSize: '18px', color: color }}>{t("supports")}</p> */}
                                </Link>
                            </div>
                            <div onClick={() => dispatch(setNavbarIndex("/opendata/about-us"))} className="mx-4">
                                <Link className="text-decoration-none" to={routes.ABOUTUS} replace={true}>
                                    <p className={`m-0 fs-xs-static en-font-default hover-underline-animation ${navbarIndex == "/opendata/about-us" ? "active-underline" : "hover-underline-animation"} ${i18n.language === locales.AR ? "ar-font-bold" : "en-font-bold"} ${color === colors.black ? "underline-black" : "underline-white"}`} style={{ color: color }}>{t("aboutus")}</p>
                                    {/* <p className={`m-0 hover-underline-animation en-font-default ${i18n.language === locales.AR ? "ar-font-bold" : "en-font-bold"} ${color === colors.black ? "underline-black" : "underline-white"}`} style={{ fontSize: '18px', color: color }}>{t("aboutus")}</p> */}
                                </Link>
                            </div>
                        </Col>
                    }
                    <Col className="d-flex justify-content-end align-items-center px-0">
                        {!nolanguageswitcher &&
                            <div className="d-flex justify-content-center mx-2">
                                <LanguageSwitcher theme={theme} />
                            </div>
                        }
                        {
                            !nocontent &&
                            <>
                                {/* register button is hide */}
                                <div className="d-none justify-content-center mx-1">
                                    <Link style={{ textDecoration: 'none' }} to={routes.REGISTER}>
                                        {/* <Button borderColor={color} backgroundColor='transparent' textColor={color} title={t("register")} /> */}
                                        <CustomButton title={t("register")} buttonClass={`${theme === 'dark' ? 'outlined' : 'outlined-transparent'}`} />
                                    </Link>
                                </div>
                                <div className="d-flex justify-content-center mx-2">
                                    {
                                        isLoggedIn ? (
                                            <CustomButton title={t("logout")} loading={loading} onClick={onClickLogout} buttonClass={`${theme === 'dark' ? 'contained-black' : 'contained'}`} />

                                        ) : (
                                            <Link style={{ textDecoration: 'none' }} to={routes.LOGIN}>
                                                <CustomButton title={t("LogIn")} buttonClass={`${theme === 'dark' ? 'contained-black' : 'contained'}`} />
                                            </Link>
                                        )
                                    }
                                </div>
                            </>
                        }
                    </Col>
                </Row>
            </Container>
            <Container fluid className={`nav-padding py-3 d-block d-lg-none ${scroll && "sticky bg-white transition"}`} style={{ position: !scroll && 'absolute', top: isLoggedIn ? '78px' : 0, left: 0, right: 0, zIndex: 99 }}>
                <Row className="d-flex justify-content-between align-items-center" >
                    <Col className="d-flex d-md-none align-items-center justify-content-start">
                        <Link to={routes.HOME}>
                            <img height={"40px"}
                                src={theme === 'dark' || scroll ? AbuDhabiLogoDarkMobile : AbuDhabiLogoMobile} />
                        </Link>
                    </Col>
                    <Col className="d-none d-md-flex align-items-center justify-content-start">
                        <Link to={routes.HOME}>
                            <img height={"40px"}
                                src={theme === 'dark' || scroll ? AbuDhabiLogoDark : AbuDhabiLogo} />
                        </Link>
                    </Col>
                    {!nolanguageswitcher &&
                        <Col className="d-flex align-items-center justify-content-end">
                            {searchIcon &&
                                <AiOutlineSearch className="" size={25} onClick={() => setExpandedSearchbar(true)} />
                            }
                            {!nolanguageswitcher &&
                                <div className="d-flex">
                                    <div className="ps-3">
                                        <LanguageSwitcher theme={theme} />
                                    </div>
                                    <RxHamburgerMenu size={25} color={theme === 'dark' || scroll ? colors.black : colors.white} onClick={onClickDrawer} />
                                </div>
                            }
                        </Col>
                    }
                </Row>
            </Container >
            <Drawer
                style={{ width: "100%", height: "100%", scrollBehavior: "smooth", minHeight: "100%", zIndex: 1050, backgroundColor: colors.white }}
                open={isOpen}
                direction='right'
                className="p-3"
                lockBackgroundScroll
            >
                <div className="" style={{ minHeight: "85%" }}>
                    <Row className="">
                        <Col className="d-flex d-md-none align-items-center">
                            <Link to={routes.HOME}>
                                <img height={"40px"} src={AbuDhabiLogoDarkMobile} />
                            </Link>
                        </Col>
                        <Col className="d-none d-md-block align-items-center">
                            <Link to={routes.HOME}>
                                <img height={"40px"} src={AbuDhabiLogoDark} />
                            </Link>
                        </Col>
                        <Col className="d-flex justify-content-end align-items-center">
                            <div className="d-flex justify-content-center">
                                {/* <div className="px-4">
                                    <AiOutlineSearch size={25} color="black" onClick={onClickDrawer} />
                                </div> */}
                                <div className="">
                                    <RxHamburgerMenu size={25} color="black" onClick={onClickDrawer} />
                                </div>
                            </div>
                        </Col>
                    </Row>
                    <Row className="d-flex my-4">
                        {
                            MobileRoutes.map((item, index) => {
                                return (
                                    <Fragment key={index}>
                                        <Col className="d-flex align-items-center py-2" xs={12}>
                                            <Link style={{ textDecoration: "none" }} to={item.route} replace={true}>
                                                <p className="m-0 text-black fs-2xl p-0">{item.name}</p>
                                                {/* <Heading size={"xl"} color={colors.black} nomargin heading={item.name} /> */}
                                            </Link>
                                        </Col>
                                        {
                                            index != MobileRoutes.length - 1
                                            &&
                                            <div className="">
                                                <hr className="py-1" />
                                            </div>
                                        }
                                    </Fragment>
                                )
                            })}
                    </Row>
                    <Row className="">
                        <Col>
                            {
                                isLoggedIn ? (
                                    <CustomButton width={"100%"} buttonClass='contained-black' title={t("logout")} loading={loading} onClick={onClickLogout} />
                                ) : (
                                    <Link style={{ textDecoration: 'none' }} to={routes.LOGIN}>
                                        <CustomButton width={"100%"} title={t("LogIn")} buttonClass='contained-black' />
                                    </Link>
                                )
                            }
                        </Col>
                    </Row>
                    {/* mobile register is hide */}
                    <Row className="d-none justify-content-center my-3">
                        <Col sm={11} xs={11} className="d-flex align-items-center justify-content-center py-4 bg-light" style={{ borderRadius: "20px" }}>
                            <p className="m-0 en-font-default" style={{ color: colors.black }}>
                                {`${t("newUser")} ${i18n.language === locales.EN ? " ? " : " ؟ "}`}
                                <Link style={{ textDecoration: 'none' }} to={routes.REGISTER}>
                                    <span className="m-0 en-font-default" style={{ color: colors.purple }}>
                                        {t("regHere")}
                                    </span>
                                </Link>
                            </p>
                        </Col>
                    </Row>
                </div>
                <Row className="p-4 fixed-bottom">
                    <Col className="d-flex align-items-center" xs={3}>
                        <LanguageSwitcher theme={"dark"} />
                    </Col>
                    <Col className="d-flex align-items-center justify-content-end p-0">
                        <p className="m-0 p-0 fs-mini" style={{ color: colors.light_gray }}><small>{t("adda")}</small></p>
                    </Col>
                </Row>
            </Drawer>
        </>
    )
});

export default Navbar;
