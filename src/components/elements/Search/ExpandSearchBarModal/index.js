import React, { useCallback, useEffect, useRef, useState } from "react";
import { memo } from "react"
import { Col } from "react-bootstrap";
import { colors } from "../../../../utils/colors";
import { useTranslation } from "react-i18next";
import { IoIosSearch } from 'react-icons/io';
import Modal from 'react-bootstrap/Modal';
import Heading from "../../Heading";
import "./style.css";

const ExpandSearchBarModal = memo((props) => {

    const { show, setShow, searchData, value, placeholder, onChangeSearch, onKeyDown, setExpandedSearchbar } = props;
    const { t } = useTranslation();

    const emailInput = useRef(null);

    useEffect(() => {
        if (emailInput.current) {
            emailInput.current.focus();
        }
    }, []);

    // const onKeyDown = useCallback((e) => e.key === "Enter" && onPressEnter && onPressEnter(e.target.value));

    return (
        <Modal show={show} fullscreen={true} onHide={setShow}>
            <Modal.Header>
                <Modal.Title className="d-flex align-items-center justify-content-around w-100">
                    <Col xs={9} className='p-0 d-flex align-items-center'>
                        <input
                            ref={emailInput}
                            value={value}
                            onChange={onChangeSearch}
                            type="text"
                            className='input-field shadow-none py-2 px-4 bg-transparent w-100 fs-xs'
                            placeholder={placeholder}
                            onKeyDown={onKeyDown}
                        />
                    </Col>
                    <Col xs={2}>
                        <p className="m-0 fs-xs-sm-only"
                            style={{ color: colors.gray }}
                            onClick={() => {
                                setExpandedSearchbar(false)
                                setShow()
                                onChangeSearch({ target: { value: null } })
                            }}>{t("cancel")}</p>
                        {/* <Heading
                            nomargin heading={t("cancel")} size={"xxs"} color={colors.gray}
                            onClick={() => {
                                setExpandedSearchbar(false)
                                setShow()
                                onChangeSearch({ target: { value: null } })
                            }}
                        /> */}
                    </Col>
                </Modal.Title>
            </Modal.Header>
            <Modal.Body className="px-4">
                <div>
                    <p className="fs-mini" style={{ color: colors.gray }}>{t("popularsearches")}</p>
                    {/* <Heading nomargin heading={t("popularsearches")} size={"xxs"} color={colors.gray} /> */}
                </div>
                <div>
                    {
                        searchData?.map((item, index) => {
                            return (
                                <div key={index} className="row d-flex py-3 align-items-start">
                                    <div className="col-2">
                                        <IoIosSearch color={colors.gray} size={25} />
                                    </div>
                                    <div className="p-0 col-10">
                                        <Heading heading={item} size="xs" nomargin onClick={() => {
                                            setShow()
                                            onChangeSearch({ target: { value: item } })
                                        }} />
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            </Modal.Body>
        </Modal>
    )
})

export default ExpandSearchBarModal;