import React, { memo } from "react";
import { Col, Row, Spinner } from "react-bootstrap";
// import DataTable from "react-data-table-component";
import Pagination from "../Pagination";

// // const columns = (data) => {

// //     let entries = Object.entries(data)

// //     let filtered = entries.map(item => {

// //         let key = item[0]

// //         return (
// //             {
// //                 name: key.replace("_", " "),
// //                 selector: row => row[key]
// //             }
// //         )

// //     })

// //     return filtered;
// // }

// const customStyles = {
//     rows: {
//         style: {
//             minHeight: '50px', // override the row height
//             backgroundColor: '#F6F6F6',
//             fontSize: "16px",
//         },
//     },
//     headCells: {
//         style: {
//             color: 'white',
//             backgroundColor: "black",
//             fontSize: "18px",
//             paddingLeft: '8px', // override the cell padding for head cells
//             paddingRight: '8px',
//             textTransform: "capitalize"
//         },
//     },
//     tableWrapper: {
//         style: {
//             display: 'table',
//         },
//     },
//     cells: {
//         style: {
//             padding: '12px', // override the cell padding for data cells
//             // paddingRight: '8px',
//         },
//     },
// };

// const Table = memo((props) => {

//     let { data, column, loading, currentPage, totalCount, onChange } = props;

//     let rowsPerPage = 10;

//     return (
//         loading ? (
//             <div className="d-flex align-items-center justify-content-center" >
//                 <Spinner />
//             </div>
//         ) : (
//             <div className="en-font-default">
//                 <Row>
//                     <Col>
//                         <p style={{ fontSize: '16px' }}>
//                             Showing&nbsp;
//                             {(rowsPerPage * currentPage) - (rowsPerPage - (data && data.length)) > 0 ? (rowsPerPage * currentPage) - (rowsPerPage - (data && data.length)) - (data && data.length) + 1 : '0'}
//                             &nbsp;-&nbsp;
//                             {(rowsPerPage * currentPage) - (rowsPerPage - (data && data.length))}
//                             &nbsp;out of&nbsp;
//                             {totalCount}
//                         </p>
//                     </Col>
//                 </Row>
//                 {/* <DataTable
//                     columns={data && column}
//                     data={data && data}
//                     customStyles={customStyles}
//                     striped
//                     responsive
//                 /> */}
//                 {
//                     currentPage && totalCount && onChange && data && data?.length > 0 ?
//                         <Pagination
//                             currentPage={currentPage}
//                             totalCount={totalCount}
//                             onChange={onChange}
//                         /> : null
//                 }
//             </div>
//         )
//     )
// });

// import * as React from 'react';
import { styled } from '@mui/material/styles';
import MuiTable from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

const Table = memo((props) => {

    let { data, loading, currentPage, totalCount, onChange } = props;

    console.log("DATA", data);

    const StyledTableCell = styled(TableCell)(({ theme }) => ({
        [`&.${tableCellClasses.head}`]: {
            backgroundColor: theme.palette.common.black,
            color: theme.palette.common.white,
        },
        [`&.${tableCellClasses.body}`]: {
            fontSize: 15,
        },
    }));

    const StyledTableRow = styled(TableRow)(({ theme }) => ({
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.action.hover,
        },
        // hide last border
        '&:last-child td, &:last-child th': {
            border: 0,
        },
    }));

    return (
        loading ? (
            <div className="d-flex align-items-center justify-content-center" >
                <Spinner />
            </div>
        ) : (
            <TableContainer component={Paper}>
                <MuiTable sx={{ minWidth: 700 }} aria-label="customized table">
                    <TableHead>
                        <TableRow>
                            {
                                data && data.length > 0 && Object.keys(data[0]).map((item) => (
                                    <StyledTableCell className="text-capitalize">{item.replace("_", " ")}</StyledTableCell>
                                ))
                            }
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            data && data.length > 0 && data.map((row) => {
                                return (
                                    <StyledTableRow key={row.name}>
                                        {
                                            Object.keys(row).map(item => (
                                                <>
                                                    {console.log("TABLEEE==>",row.resource)}
                                                    <StyledTableCell>{row[item]}</StyledTableCell>
                                                </>
                                            ))
                                        }
                                    </StyledTableRow>
                                )
                            })
                        }
                    </TableBody>
                </MuiTable>
                {
                    currentPage && totalCount && onChange && data && data?.length > 0 ?
                        <Pagination
                            currentPage={currentPage}
                            totalCount={totalCount}
                            onChange={onChange}
                        /> : null
                }
            </TableContainer>
        )
    );
});

export default Table;