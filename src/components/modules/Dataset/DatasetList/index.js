import React, { memo, useCallback, useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { locales, string } from "../../../../i18n/helper";
import { colors } from "../../../../utils/colors";
import Card from "../../../elements/Card";
import Pagination from "../../../elements/Pagination";
import Header from "../../Cards/Header";
import Loader from "../../Loader";
import { useTranslation } from "react-i18next";
import { numberWithCommas } from "../../../../utils/generic";
import './style.css';

const DatasetList = memo((props) => {

    const { minWidth, nocount, title, onClick, datasets, totalCount, currentPage, rowsPerPage, loading, notagsactive, onChangePage, selectedValue, onSelectDropdown, notags, noheader, cardSize, nodropdown ,cardStyle } = props

    const { t, i18n } = useTranslation();

    const [currentHovered, setCurrentHovered] = useState(null);

    const onHover = useCallback((index) => setCurrentHovered(index), [currentHovered]);
    const onLeave = useCallback(() => setCurrentHovered(null), [currentHovered]);

    const data = [
        {
            title: string("modified"),
            onClick: onSelectDropdown,
        },
        {
            title: string("title"),
            onClick: onSelectDropdown,
        }
    ]

    return (
        <Container fluid className="max-width" style={{paddingLeft:'10px'}} >
            {
                !noheader &&
                <>
                    <hr className="mt-4 mt-lg-5" style={{ color: '#CFCFCF', borderWidth: 2 }} />
                    <div className="dataset-padding" >
                    <Header
                        
                        title={`${numberWithCommas(totalCount)} ${title}`}
                        backgroundColor={colors.white}
                        nobutton
                        nocount={nocount}
                        dropdown={!nodropdown && {
                            title: t("sortBy"),
                            options: data,
                            selectedValue
                        }}
                    />
                    </div>
                </>
            }
            {
                !loading ?
                    datasets && datasets.length > 0 && datasets.map((item, index) => (
                        <div key={index} onMouseOver={() => onHover(index)} onMouseLeave={onLeave}>
                            {
                                index > 0 &&
                                <hr className="m-0" style={{ color: currentHovered == index || currentHovered != null && currentHovered + 1 == index ? 'white' : '#CFCFCF', borderWidth: 2 }} />
                            }
                            <Card
                                notagsactive={notagsactive}
                                size={cardSize ? cardSize : 'sm'}
                                headingSize='lg'
                                notags={notags}
                                noborder
                                nopadding
                                hoverable="light"
                                shortTitle
                                tempIncreaseDownloadCount
                                datasetID={item.id}
                                url={item.url}
                                title={i18n.language === locales.AR ? item.title_ar : item.title}
                                publisher={i18n.language === locales.AR ? item.publisher_ar : item.publisher}
                                description={item.Views ? `${item.Views + ` ${t("viewCount")}`}` : i18n.language === locales.AR ? item.description_ar : item.description}
                                tags={i18n.language === locales.AR ? item.tags_ar : item.tags}
                                resources={item.resources}
                                minWidth={minWidth}
                                // resources={i18n.language === locales.AR ? item.resources : item.resources}
                                onClick={() => onClick(item.id)}
                                cardStyle ={cardStyle}
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
        </Container >
    )
});

export default DatasetList;