import React, { memo, useCallback } from 'react';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Typography from '@mui/material/Typography';
import { MdArrowForwardIos, MdArrowBackIos } from "react-icons/md";
import { colors } from '../../../utils/colors';
import i18n from '../../../i18n/i18n';
import { locales } from '../../../i18n/helper';
import { useNavigate } from "react-router-dom";

const BreadCrumb = memo((props) => {

    const navigate = useNavigate()

    const { items, textcolor, iconColor } = props;

    const breadcrumbs = [
        items?.map((item, index) => {
            return (
                <div onClick={() => {
                    let arr = items.map((_, index) => -(index + 1)).reverse()
                    navigate(arr[index])
                }}>
                    <Typography className='m-0 p-0' style={{ cursor: "pointer", color: textcolor ? textcolor : colors.gray }} key={index} color="text.primary">
                        {item.title}
                    </Typography>
                </div >
            )
        }
        )
    ];

    return (
        <div className='d-flex justify-content-start align-items-center m-0 p-0'>
            <Breadcrumbs className='m-0 p-0' separator={i18n.language === locales.EN ? <MdArrowForwardIos size={12} color={colors.gray} /> : <MdArrowBackIos size={12} color={colors.gray} />} aria-label="breadcrumb">
                {breadcrumbs}
            </Breadcrumbs>
            {i18n.language === locales.EN ? <MdArrowForwardIos size={12} className={`mx-2`} color={iconColor ? colors.white : colors.gray} /> : <MdArrowBackIos size={12} className={`${iconColor && iconColor} mx-2`} color={iconColor ? colors.white : colors.gray} />}
        </div>
    );
})

export default BreadCrumb;