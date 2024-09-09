import React, { Fragment, memo } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import FooterImage from '../../../../assets/images/FooterImage.jpg';
import FooterImageMobile from '../../../../assets/images/FooterImageMobile.jpg';
import FooterImage_ar from '../../../../assets/images/FooterImage-ar.png';
import Button from '../../../elements/Button';
import Heading from '../../../elements/Heading';
import i18n from '../../../../i18n/i18n';
import { locales } from '../../../../i18n/helper';
import { routes } from '../../../../router/helper';
import { useNavigate } from 'react-router';
import { colors } from '../../../../utils/colors';
import CustomButton from '../../../elements/CustomButton';

const UpperFooter = memo((props) => {

    const navigate = useNavigate();
    const { title, description, button, navigateTo, image, mobImage } = props;

    const renderImage = (viewport) => (
        <Container fluid className={`px-0 py-lg-3 py-1 ${viewport == "lg" && "max-width"}`}>
            <Row>
                <Col xs={10} md={6} lg={6} xl={4}>
                    <p className={`text-white ${i18n.language === locales.AR ? "ar-font-bold" : "en-font-bold"} fs-lg`}>{title}</p>
                    {/* <Heading color='white' heading={title} bold size="xxl" /> */}
                </Col>
            </Row>
            {
                description &&
                <Row>
                    <Col xs={12} md={6}>
                        <p className='text-white fs-xs en-font-default'>{description}</p>
                        {/* <Heading size='xxs' color='white' heading={description} /> */}
                    </Col>
                </Row>
            }
            <Row className='my-3'>
                <Col xs={8} md={4} className={i18n.language === locales.AR && "py-3"}>
                    {/* <Button onClick={() => navigate(navigateTo ? navigateTo : routes.REGISTER)} title={button} /> */}
                    <CustomButton onClick={() => navigate(navigateTo ? navigateTo : routes.PUBLISHER)} title={button} buttonClass='contained' />
                </Col>
            </Row>
        </Container>
    )

    return (
        <Fragment>
            {/* desktop */}
            <div className="d-none d-md-flex align-items-end flex-lg-column py-0 py-lg-5  img-upper-footer"
                style={{
                    backgroundImage: `${i18n.language === locales.EN ? image ? image : `url(${FooterImage})` : image ? image : `url(${FooterImage_ar})`}`,
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: 'cover',
                    backgroundPosition: '100%'
                }}>
                {renderImage("lg")}
            </div>
            {/* mobile */}
            <div className="d-flex align-items-end d-md-none py-0 py-lg-5 img-upper-footer"
                style={{
                    backgroundImage: `${i18n.language === locales.EN ? mobImage ? mobImage : `url(${FooterImageMobile})` : mobImage ? mobImage : `url(${FooterImage_ar})`}`,
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: 'cover',
                    backgroundPosition: "center"
                }}>
                {renderImage("sm")}
            </div>
        </Fragment>
    )
});

export default UpperFooter;