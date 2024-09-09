import React, { memo } from "react";
import { Col, Container, Row } from "react-bootstrap";
import Heading from "../../../elements/Heading";
import Table from "../../../elements/Table";

const Tabs = memo((props) => {

    const { data, selected, loading } = props;

    return (
        <Container fluid>
            <Row>
                <Col>
                    <div className="py-4 d-flex justify-content-center flex-wrap">
                        {
                            data && data.length > 0 && data.map((item, index) => (
                                <div key={index} className='mx-2' onClick={() => !loading ? item.onClick(item.title) : ""} style={{ cursor: 'pointer' }}>
                                    <div className={`d-flex px-4 my-2 pointer justify-content-center align-items-center`} style={{ height: 40, borderRadius: 8, backgroundColor: item.title !== selected ? '#e8e4ff' : "#712DF4", color: item.title !== selected ? '#712DF4' : "white" }}>
                                        <Heading nomargin size="xxs" heading={item.title} />
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                </Col>
            </Row>
        </Container>
    )
});

export default Tabs;