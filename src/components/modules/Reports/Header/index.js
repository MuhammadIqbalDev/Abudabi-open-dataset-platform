import React, { memo } from "react";
import { Col, Row } from "react-bootstrap";
import { MdDownloadForOffline, MdOutlineFilterAlt } from "react-icons/md";
import pdfImage from '../../../../assets/images/pdf_img.png';
import excelImage from '../../../../assets/images/excel_img.png';
import csvImage from '../../../../assets/images/csv_img.png';
import { colors } from "../../../../utils/colors";
import Dropdown from "../../../elements/DropDown";
import Heading from "../../../elements/Heading";
import { useTranslation } from "react-i18next";
import CustomButton from "../../../elements/CustomButton";

const Header = memo((props) => {

    const { title, onClickFilter, datatypeCallback } = props;

    const { t } = useTranslation();

    return (
        <Row className="d-flex justify-content-between py-5">
            <Col>
                <Heading
                    bold
                    nomargin
                    size="xl"
                    heading={title}
                />
            </Col>
            <Col md={3} className=" m-0 p-0 d-flex justify-content-end align-items-center">
                <div className="mx-1">
                    <CustomButton buttonClass='outlined' icon={<MdOutlineFilterAlt size={20} />} borderColor={colors.black} onClick={onClickFilter} />
                </div>
                <div className="mx-1">
                    <Dropdown
                        options={
                            [
                                {
                                    title: "PDF",
                                    icon: <img src={pdfImage} />,
                                    onClick: () => { datatypeCallback("pdf") }
                                },
                                {
                                    title: "CSV",
                                    icon: <img src={csvImage} height={20} width={20} />,
                                    onClick: () => { datatypeCallback("csv") }
                                },
                                {
                                    title: "Excel",
                                    icon: <img src={excelImage} />,
                                    onClick: () => { datatypeCallback("excel") }
                                }
                            ]
                        }
                        headerComponent={<CustomButton buttonClass='contained-black' width={"12rem"} icon={<MdDownloadForOffline className="mx-1" size={20} />} title={t("download")} backgroundColor={colors.black} textColor={colors.white} />} />
                </div>
            </Col >
        </Row >
    )
});

export default Header;