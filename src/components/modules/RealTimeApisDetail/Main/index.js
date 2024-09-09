import React, { memo } from "react";
import { Container } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { colors } from "../../../../utils/colors";
import { locales } from '../../../../i18n/helper';
import { BsDot } from "react-icons/bs"
import Shimmer from '../../../elements/Shimmer';
import Heading from "../../../elements/Heading";
import Tabs from "../../Tabs";
import DataCard from "../../DatasetDetail/DataCard";
import SwaggerUI from "../../SwaggerUI";
import DataHeader from "../../DatasetDetail/DataHeader";

const Main = memo((props) => {

    const { data } = props;

    const { t, i18n } = useTranslation();

    let option = { dateStyle: 'long' };

    let des = data?.description.split("-");

    let des_ar = data?.description_ar.split("-");

    let e = [
        {
            title: t("about"),
            detail: data ? (
                i18n.language === locales.AR ? des_ar?.map((item, index) => <p>{`${index != 0 ? "• " : ""} ${item}`}</p>) : des?.map((item, index) => <p>{`${index != 0 ? "• " : ""} ${item}`}</p>)
            ) : (
                <>
                    <Shimmer rounded='xs' className={"my-1"} />
                    <Shimmer rounded='xs' className={"my-1"} />
                    <Shimmer rounded='xs' width="70%" className={"my-1"} />
                </>
            )
        },
        {
            title: t("managedBy"),
            detail: data ? (
                i18n.language === locales.AR ? data.publisher_ar : data.publisher
            ) : <Shimmer rounded='xs' width="70%" className={"my-1"} />
        },
        {
            title: t("frequency"),
            detail: data ? t("realTime") : <Shimmer rounded='xs' width="70%" className={"my-1"} />
        }
    ]

    let f = [
        {
            title: t("createdAt"),
            detail: data ? (
                new Date(data.created).toLocaleDateString("en-US", option)
            ) : <Shimmer rounded='xs' width="40%" className={"my-1"} />
        },
        {
            title: t("lastUpdated"),
            detail: data ? (
                new Date(data.modified).toLocaleDateString("en-US", option)
            ) : <Shimmer rounded='xs' width="40%" className={"my-1"} />
        },
        {
            title: t("sourceURL"),
            detail: data ? data?.url?.split("3.0")[0] : <Shimmer rounded='xs' width="40%" className={"my-1"} />,
            color: colors.purple,
            underline: true
        }
    ]

    let tabs = [
        {
            name: t("overview"),
            component: <DataCard data={e} />
        },
        {
            name: t("APIDocumentation"),
            component: <SwaggerUI url={data && data.fileUrl} />
        }
    ]

    return (
        <Container fluid className="px-0">
            <DataHeader
                nooptions
                title={i18n.language === locales.AR ? data && data.title_ar : data && data.title}
            />
            <div className="page-padding-md-sm">
                <Tabs data={tabs} staticComponentOnRight={<DataCard data={f} />} />
            </div>
        </Container>
    )
});

export default Main;