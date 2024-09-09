import React, { memo, useCallback, useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import Heading from "../../../elements/Heading";
import TextInput from '../../../elements/TextInput'
import TextArea from "../../../elements/TextArea";
import { colors } from "../../../../utils/colors";
import Button from "../../../elements/Button";
import Dropdown from "../../../elements/DropDown";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import { routes } from "../../../../router/helper";
import { validateEmail } from "../../../../utils/generic";
import { useNavigate } from "react-router-dom";
import { contactUs } from "../../../../axios/api";
import i18n from "../../../../i18n/i18n";
import CustomButton from "../../../elements/CustomButton";
import i18next from "i18next";
import { locales } from "../../../../i18n/helper";

const FormComponent = memo(() => {

    const { t } = useTranslation();
    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [selectedValue, setSelectedValue] = useState();
    const [message, setMessage] = useState("");
    const [disable, setDisable] = useState(true);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setSelectedValue(t("selectsubject"))
    }, [i18n.language])

    const isClicked = useCallback((value) => { setSelectedValue(value) });

    const onSubmitHandler = useCallback(() => {

        if (name === '' || email === '' || selectedValue == t("selectsubject") || message === '') {
            toast("All fields are required.", { type: "error" })
        } else if (validateEmail(email) === false) {
            toast("Please provide a valid email address.", { type: "error" })
        }

        else {
            contactUs(navigate, routes.CONFIRMATION, setLoading, { name, email, selectedValue, message })
        }

    });

    const options = [
        {
            title: t("technicalIssues"),
            onClick: isClicked,
        },
        {
            title: t("datasets"),
            onClick: isClicked,
        },
        {
            title: t("generalInquiry"),
            onClick: isClicked,
        }
    ]

    return (
        <Container className="my-5 py-5" fluid>
            <Row className="d-flex justify-content-center d-lg-none zindex-modal">
                <Col md={10}>
                    {/* <Heading heading={t("contactUs")} size="xxxl" /> */}
                    <p className={`${i18next.language === locales.AR ? "ar-font-bold" : "en-font-bold"} fs-lg-static`}>{t("contactUs")}</p>
                </Col>
                <Col md={10}>
                    <Heading nomargin heading={t("footerPartText")} size="xxs" color={colors.gray} />
                </Col>
            </Row>
            <Row className="d-flex justify-content-center py-3">
                <Col md={10}>
                    <TextInput value={name} placeholder={t("fieldFullName")} type="text" onChange={(value) => setName(value)} />
                </Col>
            </Row>

            <Row className="d-flex justify-content-center py-3">
                <Col md={10}>
                    <TextInput placeholder={t("fieldEmail")} value={email} type="text" onChange={(value) => setEmail(value)} />
                </Col>
            </Row>

            <Row className="d-flex justify-content-center py-3">
                <Col md={10}>
                    <div className="">
                        <Heading heading={t("subjectquery")} size={"xxs"} color={colors.gray} nomargin />
                    </div>
                    <Dropdown
                        iconColor={"#404040"}
                        borderColor={selectedValue != t("selectsubject") && "1px solid black"}
                        autoClose={true}
                        dropdownWidth={"100%"}
                        options={options}
                        textColor={selectedValue === t("selectsubject") ? "#707070" : "black"}
                        selectedValue={selectedValue}
                        placeholderColor={colors.gray}
                        shadow={"shadow"}
                    />
                </Col>
            </Row>
            <Row className="d-flex justify-content-center my-4">
                <Col md={10}>
                    <Heading heading={t("message")} size="xxs" nomargin color={colors.gray} />
                </Col>
                <Col md={10} className="mt-1">
                    <TextArea value={message} label={t("typeMessage")} onChange={(value) => setMessage(value)} />
                </Col>
            </Row>
            <Row className="d-flex justify-content-center">
                <Col md={10} className="d-flex justify-content-start justify-content-md-end pt-2">
                    {/* <Button
                        onClick={onSubmitHandler}
                        title={t("submit")}
                        backgroundColor={name && email && selectedValue != t("selectsubject") && message ? colors.black : colors.lighter_gray}
                        textColor={name && email && selectedValue != t("selectsubject") && message ? colors.white : colors.gray} /> */}
                    <CustomButton 
                    onClick={onSubmitHandler}
                    title={t("submit")}
                    buttonClass= {`${name && email && selectedValue != t("selectsubject") && message ? 'contained-black' : 'disabled'}`} />
                </Col>
            </Row>
        </Container>
    )
})

export default FormComponent;