import React, { useEffect, useState } from 'react';
import { Dropdown as BSDropdown } from 'react-bootstrap';
import { MdKeyboardArrowDown } from "react-icons/md";
import { FacebookShareButton, LinkedinShareButton, TwitterShareButton, EmailShareButton } from 'react-share';
import i18n from '../../../i18n/i18n';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import { colors } from '../../../utils/colors';
import Heading from '../Heading';
import './style.css';
import { locales } from '../../../i18n/helper';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';

const Dropdown = (props) => {

    const { t } = useTranslation();

    const { iconColor, borderColor, nopadding, onClickDownloadItem, minWidth, reportsFilter, autoClose, options, setSelectedDropdownValue, textColor, selectedValue, name, size, noheadercomponent, headerComponent, highlightableItem, width, dropdownToggleWidth, dropdownWidth, selectedDropdownValue } = props;

    const [isOpen, setIsOpen] = useState(false);
    const [indexx, setIndexx] = useState();

    const toggle = (e) => {
        setIsOpen(e)
        selectedDropdownValue && setSelectedDropdownValue();
    };

    useEffect(() => {
        setIndexx();
    }, [i18n.language])

    const renderTooltip = (props) => (
        <Tooltip id="button-tooltip" {...props}>
            {props}
        </Tooltip>
    );

    const emptyTooltip = (props) => (
        <></>
    );

    const onClickCopyLink = (url, title) => {
        { title === t("copylink") && toast("Copied to clipboard", { type: "success" }) }
        navigator.clipboard.writeText(url)
    };

    const itemComponent = (icon, title, downloadUrl, linkUrl) => {
        return (
            <OverlayTrigger
                placement="bottom"
                delay={{ show: 400, hide: 0 }}
                overlay={downloadUrl ? renderTooltip(title) : emptyTooltip}
            >
                <div className='d-flex align-items-center'>
                    {
                        icon &&
                        <div className='px-2'>
                            {icon}
                        </div>
                    }
                    <div onClick={() => title === t("copylink") && onClickCopyLink(linkUrl, title)} className={`d-flex flex-wrap ${icon && "px-2"}`}>
                        <span className='m-0 p-0 multine-ellipsis-1 text-underline-hover'
                            style={{
                                color: colors.black
                            }}>
                            {title}
                        </span>
                        {/* <Heading nomargin color={colors.black} maxNumberOfLines={1} size="xxs" heading={item.title} /> */}
                    </div>
                </div>
            </OverlayTrigger>
        )
    }

    return (
        <div className='d-flex align-items-center w-100 justify-content-end'>
            {
                name &&
                <div style={{ width: "10%" }} className={`w-50 ${reportsFilter ? 'p-0' : 'px-3'} d-none d-md-block  ${reportsFilter ? "text-start" : i18n.language === locales.AR ? "text-start" : "text-end"}`}>
                    <Heading size="xxs" heading={name} nomargin />
                </div>
            }
            {/* here we set width to 100% incase if there is any issue we need to change it to dropdownWidth inplace of 100% */}
            <BSDropdown className='' style={{ width: "100%" }} autoClose={autoClose} onToggle={toggle}>
                {
                    noheadercomponent ? null :
                        headerComponent ? (
                            <BSDropdown.Toggle href={null} className={`w-100 bg-transparent border-0 my-dropdown-toggle d-flex justify-content-end ${nopadding && "px-0"} p-0`}>
                                {headerComponent}
                            </BSDropdown.Toggle>
                        ) : (
                            <BSDropdown.Toggle
                                href={null}
                                style={{ border: borderColor && !isOpen ? "1px solid black" : "1px solid #cfcfcf" }}
                                className={`w-100 bg-white my-1 d-flex align-items-center justify-content-between my-dropdown-toggle text-black ${isOpen && "dropdown-hover"}`}
                            >
                                <div className=''>
                                    <Heading size="xxs" color={isOpen ? "#AD50F0" : textColor} nomargin heading={selectedValue} />
                                </div>
                                <div className='my-1'>
                                    <MdKeyboardArrowDown color={`${!isOpen ? "#404040" : "#AD50F0"}`} size={20} />
                                </div>
                            </BSDropdown.Toggle>
                        )
                }
                {
                    isOpen && options && options != false &&
                    <BSDropdown.Menu
                        align={i18n.language === locales.AR ? "start" : "end"}
                        className={`d-flex shadow-sm flex-column my-1 p-1`}
                        style={{ backgroundColor: "white", zIndex: 999, minWidth: minWidth ? minWidth : "100%", width: size === "xl" ? "175px" : size === "lg" ? "50px" : size === "md" ? "30px" : size === "sm" ? "15px" : "10px" }}>
                        {
                            options && options.length > 0 && options?.map((item, index) => (
                                <BSDropdown.Item
                                    as={"div"}
                                    onClick={(e) => {
                                        e.preventDefault();
                                        if (item.onClick) {
                                            highlightableItem && setIndexx(index)
                                            item.onClick(item.title, item.id)
                                        }

                                        if (item.downloadLink) {
                                            window.open(item.downloadLink)
                                        }

                                    }}
                                    style={{ width: "auto", alignItems: "center" }}
                                    key={index} className={`d-flex rounded p-2 align-items-center ${indexx === index && "dropdown-items"} ${index > 0 && "mt-1"}`}>
                                    {
                                        item.format === "facebook" ? (
                                            <FacebookShareButton url={item.url}>
                                                {itemComponent(item.icon, item.title, item.downloadLink)}
                                            </FacebookShareButton>
                                        ) : item.format === 'twitter' ? (
                                            <TwitterShareButton url={item.url}>
                                                {itemComponent(item.icon, item.title, item.downloadLink)}
                                            </TwitterShareButton>
                                        ) : item.format === 'linkedin' ? (
                                            <LinkedinShareButton url={item.url}>
                                                {itemComponent(item.icon, item.title, item.downloadLink)}
                                            </LinkedinShareButton>
                                        ) : item.format === 'copylink' ? (
                                            <>
                                                {itemComponent(item.icon, item.title, item.downloadLink, item.url)}
                                            </>
                                        ) : item.format === "email" ? (
                                            <EmailShareButton url={item.url}>
                                                {itemComponent(item.icon, item.title, item.downloadLink)}
                                            </EmailShareButton>
                                        ) : (
                                            <>
                                                {itemComponent(item.icon, item.title, item.downloadLink)}
                                            </>
                                        )
                                    }

                                </BSDropdown.Item>
                            ))
                        }
                    </BSDropdown.Menu>
                }
            </BSDropdown>

        </div >
    );
}

export default Dropdown;