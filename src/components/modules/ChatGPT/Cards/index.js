import './style.css';
import React, { memo } from "react";
import CustomButton from "../../../elements/CustomButton";
import { useTranslation } from "react-i18next";
import { locales } from "../../../../i18n/helper";
import i18next from "i18next";
import { colors } from "../../../../utils/colors";

const Cards = memo((props) => {

    const { t } = useTranslation();
    const { data } = props;

    return (
        <div class="container overflow-hidden">
            <p className={`fs-sm ${i18next.language === locales.AR ? "ar-font-bold" : "en-font-bold"}`}>Examples</p>
            <div class="row gy-4">
                {data?.map((items) => {
                    return (
                        <div class="col-12 col-md-6">
                            <div className="border-col rounded">
                                <div className='d-flex p-3 align-items-center justify-content-between'>
                                    <div className=''>
                                        <div>
                                            <p className={`my-1 fs-sm ${i18next.language === locales.AR ? "ar-font-bold" : "en-font-bold"}`}>{items.title}</p>
                                        </div>
                                        <div>
                                            <p className={`m-0 fs-xs`} style={{ color: colors.light_gray }}>{items.subTitle}</p>
                                        </div>
                                    </div>
                                    <div>
                                        <CustomButton
                                            // onClick={onSubmitHandler}
                                            title={t("Create")}
                                            buttonClass={`outlined`} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
})

export default Cards;