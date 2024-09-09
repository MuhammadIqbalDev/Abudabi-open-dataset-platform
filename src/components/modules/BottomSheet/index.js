import { BottomSheet } from 'react-spring-bottom-sheet'
import { GrClose } from "react-icons/gr";
import { useTranslation } from 'react-i18next';
import { EmailShareButton, FacebookShareButton, LinkedinShareButton, TwitterShareButton } from 'react-share';
import 'react-spring-bottom-sheet/dist/style.css';
import Heading from '../../elements/Heading';
import './style.css';
import i18n from '../../../i18n/i18n';
import { locales } from '../../../i18n/helper';
import { toast } from 'react-toastify';

const BottomSheetBar = (props) => {

    const { t } = useTranslation();

    const { open, setOpen, options, setSelectedSheetValue, selectedSheetValue, heading, downloadCount } = props;

    const onClickCopyLink = (url, title) => {
        { title === t("copylink") && toast("Copied to clipboard", { type: "success" }) }
        navigator.clipboard.writeText(url)
    };

    const itemComponent = (icon, title, downloadUrl, linkUrl) => {
        return (
            <div className='d-flex align-items-center'>
                {
                    icon &&
                    <div className='px-2'>
                        {icon}
                    </div>
                }
                <div onClick={() => title === t("copylink") && onClickCopyLink(linkUrl, title)} className={`d-flex flex-wrap ${icon && "px-2"}`}>
                    <span className='m-0 p-0 multine-ellipsis-1'
                        style={{
                            color: 'black'
                        }}>
                        {title}
                    </span>
                    {/* <Heading nomargin color={colors.black} maxNumberOfLines={1} size="xxs" heading={item.title} /> */}
                </div>
            </div>
        )
    }

    return (
        <>
            <BottomSheet
                className={`${i18n.language === locales.AR ? "ar-font" : "en-font"}`}
                style={{ height: "100%" }}
                open={open}
                onDismiss={() => {
                    setOpen(false)
                    setSelectedSheetValue("")
                }}
            >
                <div className='p-0 m-0'>
                    <div className='d-flex px-4 py-3 align-items-center justify-content-between'>
                        <div className='w-75'>
                            <Heading nomargin size={"xxs"} maxNumberOfLines={1} heading={heading ? heading : t("download")} />
                        </div>
                        <div>
                            <GrClose onClick={() => {
                                setOpen(false)
                                setSelectedSheetValue(null)
                            }} color='#101010' />
                        </div>
                    </div>
                    <hr className='m-0 p-0' />
                    {
                        options?.map((item, index) => {
                            return (
                                <div key={index} className='px-4 py-3 d-flex col-md-6 col-12 align-items-center justify-content-between'>
                                    {selectedSheetValue !== t("share")
                                        &&
                                        <div className='col-2'>
                                            {item.icon}
                                        </div>
                                    }
                                    <div className='col-10'>
                                        {
                                            selectedSheetValue === t("share") ?
                                                <>
                                                    {
                                                        item.format === "facebook" ? (
                                                            <FacebookShareButton url={item.url}>
                                                                {itemComponent(item.icon, item.title)}
                                                            </FacebookShareButton>
                                                        ) : item.format === 'twitter' ? (
                                                            <TwitterShareButton url={item.url}>
                                                                {itemComponent(item.icon, item.title)}
                                                            </TwitterShareButton>
                                                        ) : item.format === 'linkedin' ? (
                                                            <LinkedinShareButton url={item.url}>
                                                                {itemComponent(item.icon, item.title)}
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
                                                                {itemComponent(item.icon, item.title)}
                                                            </>
                                                        )
                                                    }
                                                </>
                                                :
                                                selectedSheetValue ? <a onClick={() => item.onClick(item.title, item.id)} href={item.downloadLink} className='multine-ellipsis-2 text-decoration-none text-black m-0 p-0'>{item.title}</a>
                                                    :
                                                    <p onClick={() => {
                                                        setSelectedSheetValue(item.title, item.id)
                                                        item.onClick(item.title, item.id)
                                                    }}
                                                        className='font-weight-bold multine-ellipsis-2 text-decoration-none text-black m-0 p-0'>{item.title}</p>
                                        }
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            </BottomSheet>
        </>
    )
}

export default BottomSheetBar;