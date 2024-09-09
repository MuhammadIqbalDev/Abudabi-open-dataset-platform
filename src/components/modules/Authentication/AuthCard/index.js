import React, { memo, useCallback, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { colors } from "../../../../utils/colors";
import Heading from "../../../elements/Heading";
import Button from "../../../elements/Button";
import TextInput from "../../../elements/TextInput";
import StraigthLine from "../../../elements/StraigthLine";
import CheckBox from "../../../elements/checkBox";
import { useTranslation } from "react-i18next";
import Recaptcha from "../../../elements/Recaptcha";
import OtpInput from "react18-input-otp";
import { locales } from "../../../../i18n/helper";
import i18next from "i18next";
import CustomButton from '../../../elements/CustomButton';
import { AiOutlineInfoCircle } from "react-icons/ai";

const AuthCard = memo((props) => {


  const { t } = useTranslation()

  const { view, userName, title, subtitle, linktext, inputFields, button, checkbox, recaptcha, onClickForgetPassword, hasOtp, otp, setOtp, password } = props;

  // const [otp, setOtp] = useState("");

  const recaptchaCallback = useCallback((value) => recaptcha(value));

  const otpCallbackk = useCallback((val) => setOtp(val))

  return (
    <Container fluid>
      <Row className="py-2">
        <Col>
          <p className={`m-0 ${i18next.language === locales.AR ? "ar-font-bold" : "en-font-bold"} ${view === "desktop" ? "fs-kilo" : "fs-md"}`}>{title}</p>
          {/* <Heading bold nomargin heading={title} /> */}
        </Col>
      </Row>
      <Row className="py-2">
        <Col className="d-flex">
          <div>
            <p className={`m-0 fs-xs`}>{subtitle}</p>
            {/* <Heading nomargin heading={subtitle} size="xxs" /> */}
          </div>
          {
            linktext &&
            <div className="mx-2">
              <Heading
                nomargin
                heading={linktext.display_text}
                size="xxs"
                color={colors.purple}
                underline
                onClick={linktext.onClick}
              />
            </div>
          }
        </Col>
      </Row>
      {
        inputFields &&
        <Row className="py-2">
          {
            inputFields?.length > 0 && inputFields?.map((items, index) => (
              <Col key={index} className="py-2" md={12}>
                <TextInput password={password} title={title} name={userName} index={index} value={items.value} placeholder={items.placeholder} type={items.type} onChange={items.onChange} />
              </Col>
            ))
          }
        </Row>
      }
      {
        hasOtp &&
        <Row className="py-2">
          <Col id="OTP-col">
            <OtpInput id="otp" className="w-100" value={otp} onChange={otpCallbackk} numInputs={6} inputStyle={{ width: '100%', height: '100%', margin: '5px' }} containerStyle={{ width: "auto", height: '50px', margin: '5px' }} />
          </Col>
        </Row>
      }
      {
        onClickForgetPassword &&
        <Row>
          <Col className=" d-flex direction-row justify-content-end">
            <Heading
              nomargin
              heading={t("forgetPassword")}
              size="xxs"
              color={colors.purple}
              underline
              onClick={onClickForgetPassword}
            />
          </Col>
        </Row>
      }
      {
        checkbox &&
        <Row className="py-2">
          <Col className="d-flex">
            <CheckBox borderColor={checkbox.boxColor} callBack={checkbox.onClick} />
            <Col xs={8} className="d-flex mx-2">
              <Heading
                nomargin
                heading={checkbox.label}
                size="xxs"
                color={checkbox.labelColor}
              />
            </Col>
          </Col>
        </Row>
      }
      <Row className="py-2 align-items-center">
        {title === t("register") &&
          <Col className="mb-3 mb-lg-0" sm={8} md={8}>
            <Recaptcha callBack={recaptchaCallback} />
          </Col>
        }
        <Col sm={12} md={title === t("register") ? 4 : 12}>
          {
            button?.map((items, index) => (
              <div key={index} className="d-flex flex-column align-items-center">
                {/* <Button
                  padding={items.title === t("logIn") && "mt-3"}
                  width={title === t("register") ? "auto" : "80%"}
                  disable={items.disable}
                  title={items.title}
                  icon={items.icon}
                  backgroundColor={items.backgroundColor}
                  textColor={items.textColor}
                  borderColor={items.borderColor && items.borderColor}
                  onClick={() => items.onClick()}
                  loading={items.loading}
                  bold={items.bold}
                /> */}
                <CustomButton
                  padding={items.title === t('logIn') && 'mt-3'}
                  width={title === t('register') ? 'auto' : '87%'}
                  title={items.title}
                  icon={items.icon}
                  onClick={() => items.onClick()}
                  loading={items.loading}
                  bold={items.bold}
                  buttonClass={`${items.backgroundColor === '#000000' ? 'contained-black' : 'disabled'}`}
                />
                {
                  button?.length - 1 != index &&
                  <StraigthLine
                    label={t("or")}
                    textColor={colors.gray}
                    lineColor={colors.light_gray}
                  />
                }
                {
                  items.title === t("LoginWithUAE") &&
                  <div className="d-flex mt-3 px-4 justify-content-lg-between justify-content-around">
                    <p style={{ color: colors.dark_gray }} className="m-0 me-2 fs-mini">{t("WhatIsUAEPASS")}</p>
                    <AiOutlineInfoCircle color={colors.dark_gray} />
                  </div>
                }
              </div>
            ))
          }
        </Col>
      </Row>
    </Container >
  );
});

export default AuthCard;
