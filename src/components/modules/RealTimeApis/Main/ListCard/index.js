import React from "react";
import { memo } from "react";
import Card from "../../../../elements/Card";
import { useTranslation } from "react-i18next";
import { locales } from "../../../../../i18n/helper";
import Loader from "../../../Loader";
import Pagination from "../../../../elements/Pagination";
import { useState } from "react";
import { useCallback } from "react";

const ListCard = memo((props) => {

    const { t, i18n } = useTranslation();

    const { loading, datalist, currentPage, totalCount, rowsPerPage, onChangePage, onClick } = props;

    const [currentHovered, setCurrentHovered] = useState(null);

    const onHover = useCallback((index) => setCurrentHovered(index), [currentHovered]);
    const onLeave = useCallback(() => setCurrentHovered(null), [currentHovered]);
    
    return (
        <div className="">
            {
                !loading ?
                    datalist && datalist.length > 0 && datalist.map((item, index) => (
                        <div key={index} className="p-2" onMouseOver={() => onHover(index)} onMouseLeave={onLeave}>
                            {
                                index > 0 &&
                                <hr className="m-0 mx-2" style={{ color: currentHovered == index || currentHovered != null && currentHovered + 1 == index ? 'white' : '#CFCFCF', borderWidth: 2 }} />
                            }
                            <Card
                                nodropdown
                                notags
                                size='xs'
                                headingSize='lg'
                                noborder
                                hoverable="light"
                                shortTitle
                                title={i18n.language === locales.AR ? item.title_ar : item.title}
                                publisher={i18n.language === locales.AR ? item.publisher_ar : item.publisher}
                                description={i18n.language === locales.AR ? item.description_ar : item.description}
                                onClick={() => onClick(item.id)}
                            />
                        </div>
                    ))
                    : <Loader type="full-width-max" />
            }
            <Pagination
                currentPage={currentPage}
                totalCount={Math.ceil(totalCount / rowsPerPage)}
                onChange={onChangePage}
            />
        </div>
    )
})

export default ListCard;