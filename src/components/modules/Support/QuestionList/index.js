import './style.css';
import React, { memo, useCallback, useState } from "react";
import { Container, Row } from "react-bootstrap";
import { locales } from "../../../../i18n/helper";
import { colors } from "../../../../utils/colors";
import { useTranslation } from "react-i18next";
import Heading from "../../../elements/Heading";
import QuestionListItem from "../../../elements/QuestionListItem";
import Loader from "../../Loader";

const QuestionList = memo((props) => {

    const { title, data, onClick, titleAr } = props;
    const { t, i18n } = useTranslation();

    const [currentHovered, setCurrentHovered] = useState(null);

    const onHover = useCallback((index) => setCurrentHovered(index), [currentHovered])
    const onLeave = useCallback(() => setCurrentHovered(null), [currentHovered])

    return (
        <Container fluid className="my-2 max-width">
            <div className="padd-support page-padding">
                <p className={`fs-md ${i18n.language === locales.AR ? "ar-font-bold" : "en-font-bold"}`}>{i18n.language === locales.AR ? titleAr : title}</p>
                {/* <Heading heading={title} size={"lg"} bold backgroundColor={colors.white} /> */}
            </div>
            <Row className='mb-5 pb-3'>
                {
                    data ? data.length > 0 ? data.map((item, index) => (
                        <div key={index} className="p-0 px-3 py-2 py-lg-0" onMouseOver={() => onHover(index)} onMouseLeave={onLeave}>
                            {
                                index > 0 &&
                                <hr className="mx-2 my-0 py-2 py-lg-0" style={{ color: currentHovered === index || currentHovered != null && currentHovered + 1 === index ? 'white' : 'lightgray', borderWidth: 2 }} />
                            }
                            <QuestionListItem
                                title={i18n.language === locales.AR ? item.title_ar : item.title}
                                onClick={() => onClick(item.id, title, titleAr)}
                                icon={currentHovered === index}
                            />
                        </div>
                    )) : <Heading size="md" bold nomargin heading={t("noResultFound!")} />
                        : <Loader type='full-width-min' />
                }
            </Row>
        </Container>
    )
});

export default QuestionList;