import React, { memo } from "react";
import { Container } from "react-bootstrap";
import { colors } from "../../../../utils/colors";
import Heading from "../../../elements/Heading";
import Shimmer from "../../../elements/Shimmer";
import Tag from "../../../elements/Tag";
import { useNavigate } from "react-router-dom";
import { routes } from "../../../../router/helper";
import { locales } from "../../../../i18n/helper";
import { useTranslation } from "react-i18next";
import i18next from "i18next";

const DataCard = memo((props) => {

    const { data } = props;
    const navigate = useNavigate();
    const { t, i18n } = useTranslation();

    console.log("LOGOGOGOG", data);

    return (
        <Container fluid className="p-0">
            {
                data && data.length > 0 && data?.map((item, index) => (
                    <div key={index} className="py-1">
                        <div>
                            {/* <Heading heading={item.title} size='xs' bold /> */}
                            <p style={{ color: colors.darker_gray }} className={`fs-sm ${i18next.language === locales.AR ? "ar-font-bolder" : "en-font-bolder"}`}>
                                {item.title}
                            </p>
                        </div>
                        {
                            !item.tags ? (
                                <div>
                                    <p style={{ color: item.color }} className={`fs-xs en-font-default ${item.capitalize && "text-capitalize"} ${item.underline && "text-underline-hover"}`} onClick={item.onClick}>{item.detail}</p>
                                    {/* <Heading capitalize={item.capitalize} color={item.color} underline={item.underline} heading={item.detail} size='xxs' onClick={item.onClick} /> */}
                                </div>
                            ) : (
                                <div className="d-flex flex-wrap mb-3">
                                    {
                                        item && item.detail && item.detail.length > 0 ? item.detail.map((value, index) => (
                                            <div key={index} className="my-1">
                                                {console.log("LOG", value)}
                                                <Tag
                                                    onClick={() => {
                                                        value != t("noTagsFound") &&
                                                            navigate(routes.DATASET, {
                                                                replace: true, state: {
                                                                    listItem: [{
                                                                        title: value,
                                                                        type: i18n.language === locales.AR ? item.title === t("tags") ? "keywordlear" : "themelear" : item.title === t("tags") ? "keyword" : "theme"
                                                                    }]
                                                                }
                                                            })
                                                    }}
                                                    margin={"0"}
                                                    title={value}
                                                    backgroundColor={item.theme === 'light' && colors.white}
                                                    borderColor={item.theme === 'light' && `1.5px solid ${colors.light_gray}`}
                                                    textColor={item.theme === 'light' && colors.black}
                                                />
                                            </div>
                                        )) : (
                                            <>
                                                <Shimmer rounded='lg' width="25%" height="36px" className={"m-1"} />
                                                <Shimmer rounded='lg' width="40%" height="36px" className={"m-1"} />
                                                {/* <Shimmer rounded='lg' width="30%" height="36px" className={"m-1"} /> */}
                                            </>
                                        )
                                    }
                                </div>
                            )
                        }
                    </div>
                ))
            }
        </Container>
    )
});

export default DataCard;