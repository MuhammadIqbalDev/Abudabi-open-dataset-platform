import React, { memo } from "react";
import { BiMessageSquareDetail, BiMessageSquareDots } from "react-icons/bi";
import i18n from "../../../../i18n/i18n";
import { locales } from "../../../../i18n/helper";

const QNA = memo((props) => {
    const { question, answer } = props;
    return (
        <div>
            <div>
                <div className="d-flex align-items-center">
                    <BiMessageSquareDetail size={25} className="ms-2" />
                    <p className={`m-0 ${i18n.language === locales.AR ? "ar-font-bold" : "en-font-bold"}`}>Request</p>
                </div>
                <div className="border-col py-4 px-4 my-3" style={{borderRadius:25}}>
                    <p className={`m-0 ${i18n.language === locales.AR ? "ar-font-bold" : "en-font-bold"}`}>{question}</p>
                </div>
            </div>
            <div className="my-5">
                <div className="d-flex align-items-center">
                    <BiMessageSquareDots size={25} className="ms-2" />
                    <p className={`m-0 ${i18n.language === locales.AR ? "ar-font-bold" : "en-font-bold"}`}>Answer</p>
                </div>
                <div className="border-col py-4 px-4 my-3" style={{borderRadius:25}}>
                    <p className={`m-0 ${i18n.language === locales.AR ? "ar-font-bold" : "en-font-bold"}`}>{answer}</p>
                </div>
            </div>
        </div>
    )
})

export default QNA;