import './style.css';
import React, { memo } from "react";
import { Col, Row, Card as RBCard } from "react-bootstrap";
import { FiArrowUpLeft, FiArrowUpRight } from 'react-icons/fi';
import { locales } from "../../../i18n/helper";
import { colors } from "../../../utils/colors";
import { useTranslation } from "react-i18next";
import _ from 'lodash';
import { useNavigate } from 'react-router-dom';
import { routes } from '../../../router/helper';

const CardWithOuterText = memo((props) => {

    const { title, description, image, datasetViewCount, onClick, setIsOpenModal, setData } = props;
    const { t, i18n } = useTranslation();
    const navigate = useNavigate();

    var height = "250px";

    return (
        <div>
            <RBCard className="p-4 justify-content-center align-items-center" style={{ height: height, borderRadius: "30px" }}>
                <img height={'140px'} width={'240px'} style={{ objectFit: "contain" }} src={image} />
            </RBCard>
            <Row>
                <Col style={{ paddingTop: "20px" }} className="d-flex pb-2" xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                    <p onClick={!datasetViewCount && onClick} className={`fs-md-static ${!datasetViewCount && "text-underline-hover"} m-0 text-black ${i18n.language === locales.AR ? "ar-font-bold" : "en-font-bold"}`}>{title}</p>
                    {/* <Heading bold underline nomargin size='sm' heading={title} onClick={onClick} /> */}
                    {!datasetViewCount &&
                        <sup className="mx-1 my-1">
                            {
                                i18n.language === locales.AR ? <FiArrowUpLeft size={28} /> : <FiArrowUpRight size={28} />
                            }
                        </sup>
                    }
                </Col>
                <Col md={10} style={{ paddingBottom: !datasetViewCount ? "32px" : "16px" }}>
                    <p className="fs-2xs-static en-font-default m-0 mt-2">
                        {
                            datasetViewCount &&
                            _.truncate(description, {
                                'length': 220,
                            })}
                        {
                            datasetViewCount && description?.length > 200 &&
                            <span
                                onClick={() => {
                                    setIsOpenModal(true)
                                    setData({
                                        title,
                                        description
                                    })
                                }}
                                className={`fs-2xs-static en-font-default ${i18n.language === locales.AR ? "ar-font-bold" : "en-font-bold"} ms-2`}
                                style={{ color: colors.purple, cursor: "pointer" }}>
                                {t("more")}
                            </span>
                        }
                        {!datasetViewCount && description}
                    </p>
                </Col>
                {datasetViewCount &&
                    <div className="d-flex">
                        <p
                            onClick={() => {
                                navigate(routes.DATASET, {
                                    replace: true, state: {
                                        listItem: [{
                                            title: title,
                                            type: i18n.language === locales.AR ? "publisherlear__name" : "publisher__name"
                                        }]
                                    }
                                })
                            }}
                            className="fs-2xs-static p-0 text-underline-hover" style={{ color: colors.purple, cursor: "pointer" }}>
                            {`${t('viewDatasets')} (${datasetViewCount})`}
                        </p>
                    </div>
                }
            </Row>
        </div >
    )
});

export default CardWithOuterText;