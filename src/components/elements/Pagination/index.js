import React, { memo } from "react";
import { Col, Container, Row } from "react-bootstrap";
import MUIPagination from '@mui/material/Pagination';
import MUIPaginationItem from '@mui/material/PaginationItem';
import { useTranslation } from 'react-i18next';
import {HiOutlineChevronDoubleLeft,HiOutlineChevronDoubleRight,HiOutlineChevronLeft,HiOutlineChevronRight} from 'react-icons/hi'

import { createTheme, ThemeProvider } from '@mui/material/styles';
import './style.css';
import { locales } from "../../../i18n/helper";
import { getBreakpoint } from "../../../utils/generic";
import { grey } from "@mui/material/colors";

const theme = createTheme(
    {
        palette: {
            neutral: {
                main: 'black',
                contrastText: '#fff',
            },
        },
        typography: {
        fontFamily: 'CircularStd-Regular'
  }
        
    }
);
const Pagination = memo((props) => {

    const { i18n } = useTranslation();

    const { currentPage, totalCount, onChange } = props;

    return (
        <Container className="d-flex justify-content-center py-5">
            <ThemeProvider theme={theme}>
                <Row>
                    <Col md={12} xl={12} sm={12} lg={12} xs={12}>
                        <MUIPagination
                           
                            showFirstButton
                            showLastButton
                            page={currentPage || 1}
                            size={window.innerWidth >= 768 ? "large" : "small"}
                            siblingCount={window.innerWidth >= 768 ? 1 : 0}
                            count={totalCount || 1}
                            color="neutral"
                            onChange={(_, value) => {
                                onChange(value);
                            }}
                            renderItem={(item) => (
                                <MUIPaginationItem
                                
                                    slots={{
                                        previous: i18n.language === locales.EN ? HiOutlineChevronLeft : HiOutlineChevronRight,
                                        next: i18n.language === locales.EN ? HiOutlineChevronRight : HiOutlineChevronLeft,
                                        first: i18n.language === locales.EN ? HiOutlineChevronDoubleLeft : HiOutlineChevronDoubleRight,
                                        last: i18n.language === locales.EN ? HiOutlineChevronDoubleRight : HiOutlineChevronDoubleLeft
                                    }}
                                    {...item}
                                />
                            )}
                        />
                    </Col>
                </Row>
            </ThemeProvider>
        </Container>
    )
});

export default Pagination;