import React, { memo, useState } from "react";
import { Col, Container, Nav, Row, Tab } from "react-bootstrap";
import './style.css';
import { colors } from "../../../utils/colors";
import { routes } from "../../../router/helper";
import Heading from "../../elements/Heading";

const Tabs = memo((props) => {

    const { data, staticComponentOnRight } = props;

    const [active, setActive] = useState(0);

    return (
        <Container fluid>
            <Tab.Container defaultActiveKey={0} activeKey={active}>
                <div>
                    <Col sm={12} style={{ borderBottom: '1px solid #CFCFCF' }}>
                        <Nav>
                            {
                                data.map((item, index) => (
                                    <div key={index} className={`${index === 1 && "mx-4"}`}>
                                        <Nav.Item className={`m-0 ${active == index && "tab-underline"}`} onClick={() => setActive(index)}>
                                            <p className={`mb-2 ${index === 1 && "mx-2"}  ${item.name === "API Documentation" && "px-1"}`} style={{ color: active == index ? colors.black : colors.gray, cursor: "pointer" }} >{item.name}</p>
                                        </Nav.Item>
                                    </div>
                                ))
                            }
                        </Nav>
                    </Col>
                </div>
                <Row className="d-flex py-4" style={{ borderBottom: '1px solid #CFCFCF' }}>
                    <Col xs={12} sm={12} lg={8}>
                        <Tab.Content>
                            {
                                data.map((item, index) => (
                                    <Tab.Pane eventKey={index}>
                                        {item.component}
                                    </Tab.Pane>
                                ))
                            }
                        </Tab.Content>
                    </Col>
                    <div className="mb-3 w-100 d-block d-lg-none" style={{ border: '1px solid #CFCFCF' }} />
                    {
                        staticComponentOnRight &&
                        <Col xs={12} sm={12} lg={4} className="d-flex ">
                            <div className="mx-4 d-none d-lg-block" style={{ border: '0.5px solid #CFCFCF' }} />
                            {staticComponentOnRight}
                        </Col>
                    }
                </Row>
            </Tab.Container>
        </Container>
    )
});

export default Tabs;