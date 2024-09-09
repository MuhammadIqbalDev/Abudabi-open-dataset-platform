import React, { Fragment } from "react";
import Card from "react-bootstrap/Card";
import View from "../../../components/modules/View";
import { useTranslation } from "react-i18next";
import Main from "../../../components/modules/ChatGPT/Main";
import { locales } from "../../../i18n/helper";
import i18next from "i18next";
import { Col, Row } from "react-bootstrap";
import AIBall from "../../../assets/images/AI ball.png";
import { BiArrowToRight, BiBulb, BiUser } from "react-icons/bi";
import { BsHandIndexFill, BsHandbag } from "react-icons/bs";
import { IoMdHand } from "react-icons/io";
import CustomButton from "../../../components/elements/CustomButton";
import { Link, Router } from "react-router-dom";
import { routes } from "../../../router/helper";
function IntroductionPage() {
  const { t } = useTranslation();
  const dummyData = [
    {
      title: "Examples",
      icon: <BiBulb />,
      suggestions: [
        "Got any creative ideas for a 10 year old's birthday",
        "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
        "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
      ],
    },
    {
      title: "Capabilities",
      icon: <BiUser />,
      suggestions: [
        "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
        "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
        "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
      ],
    },
    {
      title: "Limitations",
      icon: <IoMdHand />,
      suggestions: [
        "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
        "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
        "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
      ],
    },
  ];
  return (
    <View
      sticky
      theme="dark"
      footerTitle={t("GetMore")}
      footerButton={t("explorepublisher")}
    >
      <div style={{ maxWidth: "1800px", margin: "auto" }}>
        <div className="my-5 px-md-5 px-3">
          <div>
            <Fragment>
              <Row md={12}>
                <Col
                  md={7}
                  className="my-5 order-xs-2 order-sm-2 order-md-1 order-lg-1"
                >
                  <p
                    className={`m-0 fs-md mt-5 ${
                      i18next.language === locales.AR
                        ? "ar-font-bold"
                        : "en-font-bold"
                    }`}
                  >
                    {/* {t("chatWithOpenData")} */}
                    Introducing{" "}
                    <span className="masked-color-span">"Rashid"</span> the new
                    AI powered Chatbot
                  </p>
                  <p className=" mt-5 en-font-default">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Placeat similique unde aliquam excepturi repellendus magni
                    reprehenderit ad aliquid odio, alias eaque illo veritatis
                    ipsam odit quasi reiciendis dicta a consequuntur?
                  </p>
                  <Row>
                    <Col md={12}>
                      <div className="d-flex suggestions-box ">
                        {dummyData.map((item) => (
                          <SuggestionsCard {...item} />
                        ))}
                        {/* <SuggestionsCard /> */}
                      </div>
                    </Col>
                  </Row>
                  <div className="d-flex justify-content-around flex-wrap gap-3">
                    <InformationCard
                      link={routes.CHATGPT}
                      title={"Descriptive Data"}
                    />
                    <InformationCard link={""} title={"Geospatial Data"} />
                  </div>
                </Col>
                <Col
                  md={5}
                  className="text-center order-xs-1 order-md-2 order-sm-1 order-lg-1 my-5"
                  style={{}}
                >
                  <img id="ai-ball" src={AIBall} className="img-fluid" alt="" />
                </Col>
              </Row>
            </Fragment>
            {/* <div
              className="container-fuild-sm container-md overflow-hidden py-3 px-md-5 pb-5 mb-5"
              style={{ height: "500px" }}
            ></div> */}
          </div>
        </div>
      </div>
    </View>
  );
}

export default IntroductionPage;

const SuggestionsCard = ({ title, icon, suggestions }) => {
  return (
    <Card
      className="suggestion-card"
      style={{ maxWidth: "18rem", height: "18rem", border: "0px" }}
    >
      <Card.Body>
        <Card.Title>
          {icon}
          {title}
        </Card.Title>
        {/* <Card.Subtitle className="mb-2 text-muted">Card Subtitle</Card.Subtitle> */}
        <Card.Text>
          {suggestions?.map((item) => (
            <p className="font-bold">
              {item} <BiArrowToRight />{" "}
            </p>
          ))}
        </Card.Text>
      </Card.Body>
    </Card>
  );
};

const InformationCard = ({ link }) => {
  return (
    <div className="info-cards" style={{}}>
      <h4>Descriptive Data</h4>
      <p>Lorem ipsum dolor sit</p>
      <Link to={link}>
        <CustomButton title={"Explore"} buttonClass="contained-white" />
      </Link>
    </div>
  );
};
