import React, { memo, useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { getAllApplications } from "../../axios/api";
import Pagination from "../../components/elements/Pagination";
import Main from "../../components/modules/Applications/Main";
import Cards from "../../components/modules/Cards";
import Navbar from '../../components/modules/Navbar';
import UpperFooter from "../../components/modules/Footer/UpperFooter";
import MiddleFooter from "../../components/modules/Footer/MiddleFooter";
import LowerFooter from '../../components/modules/Footer/LowerFooter';
import { useSelector } from "react-redux";
import View from "../../components/modules/View";

const Applications = memo(() => {

    const { t } = useTranslation()
    const applications = useSelector(state => state.application.applications)
    const cardsDiv = document.getElementById("cards");

    const [displayApplications, setDisplayApplications] = useState();


    const [totalCount, setTotalCount] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(9);

    console.log("APPPAPAPPAPA",applications);

    useEffect(() => {
        if (applications) {
            let arr = [...applications]
            let x = arr.slice(0, rowsPerPage)
            setDisplayApplications(x)
        }
    }, [applications])

    const onChangePage = useCallback((page) => {

        if (page) {
            let start = (page - 1) * rowsPerPage
            let end = (start + rowsPerPage)

            let arr = [...applications]
            let x = arr.slice(start, end);
            setDisplayApplications(x);
            setCurrentPage(page)
        }

    }, [currentPage, displayApplications])

    const onClickCard = useCallback((id) => {

        if (id) {

            let app = applications.find(item => item.id === id)

            window.open(app.applicationURL, '_blank')

        }

    })

    return (
        <div>
            <View theme="dark" footerTitle={t("GetMore")} footerButton={t("explorepublisher")}>
                <div className="my-5 pt-5 max-width">
                    <Main />
                    <div className="my-5" id="cards">
                        <Cards type="image-outer-text" data={displayApplications} onClick={onClickCard} />
                    </div>
                    <Pagination
                        currentPage={currentPage}
                        totalCount={Math.ceil(applications?.length / rowsPerPage)}
                        onChange={(page) => {
                            cardsDiv.scrollIntoView(true)
                            onChangePage(page)
                        }}
                    />
                </div>
            </View>
        </div>
    )
})

export default Applications;