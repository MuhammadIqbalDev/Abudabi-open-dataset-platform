import './style.css';
import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { memo } from 'react';
import { Spinner } from 'react-bootstrap';
import { AiOutlineClose } from "react-icons/ai";
import { useNavigate } from 'react-router-dom';
import Heading from '../Heading';
import i18next from 'i18next';
import { locales } from '../../../i18n/helper';
import { routes } from '../../../router/helper';

const ModalEelment = memo((props) => {

  const { size, backdrop, loading, title, description, isOpen,
    setIsOpen, height, width, descriptionHeight, isPublisherModal } = props;

  const navigate = useNavigate();

  const style = {
    position: 'absolute',
    borderRadius: "30px",
    overflow: "hidden",
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: width ? width : 800,
    // height: "100%",
    bgcolor: 'white',
    boxShadow: 24,
    color: 'black',
    border: 0,
    minHeight: "400px",
    p: 4,
    zIndex: 999
  };

  const handleClose = () => {
    setIsOpen(false)
    !isPublisherModal && navigate(-1);
  };

  return (
    <div>
      {window.innerWidth >= 992 ?
        <Modal
          open={isOpen}
          //onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
          //slots = {{backdrop:false}}
          //scroll="body"
          hideBackdrop
          disableEnforceFocus
          style={{ position: 'initial', outline: 0 }}
          disableBackdropClick
        >
          <Box sx={style}>
            {
              loading ? (
                <div className="d-flex align-items-center justify-content-center">
                  <Spinner />
                </div>
              ) : (
                <>
                  <div className='d-flex align-items-start justify-content-between'>
                    <Typography className='pb-4' id="modal-modal-title" variant="h6" component="h2">
                      {/* <Heading heading={title} nomargin bold size={"lg"} /> */}
                      <p className={`fs-kilo ${i18next.language === locales.AR ? "ar-font-bold" : "en-font-bold"}`}>{title}</p>
                    </Typography>
                    <div>
                      <AiOutlineClose style={{ cursor: "pointer" }} size={23} onClick={handleClose} />
                    </div>
                  </div>
                  {/* <Typography id="modal-modal-description modal-body" sx={{ mt: 2, overflowY: "scroll", height: "350px" }}>
                  {description}
                </Typography> */}
                  <div className='custom-scrollbar' style={{ height: descriptionHeight ? descriptionHeight : "350px" }}>
                    <div className='scroll-content'>
                      <p className={`${i18next.language === locales.AR ? "ar-font" : "fs-xs en-font"}`} dangerouslySetInnerHTML={{ __html: description }} />
                    </div>
                  </div>
                </>
              )}
          </Box>
        </Modal>
        :
        <div className={`w-100 p-3 ${!isOpen && "d-none"}`}>
          {
            loading ? (
              <div className="d-flex align-items-center justify-content-center">
                <Spinner />
              </div>
            ) : (
              <>
                <div style={{ overflow: "hidden" }} className='d-flex align-items-start justify-content-between'>
                  <Typography className='pb-4' id="modal-modal-title" variant="h6" component="h2">
                    <p className='fs-kilo en-font-bold'>{title}</p>
                  </Typography>
                  <div className=''>
                    <AiOutlineClose size={25} onClick={handleClose} />
                  </div>
                </div>
                {/* <Typography id="modal-modal-description modal-body" sx={{ mt: 2, overflowY: "scroll", height: "350px" }}>
                  {description}
                </Typography> */}
                <div style={{ height: window.innerWidth >= 992 ? "400px" : "100%" }}>
                  <p className='fs-xs' dangerouslySetInnerHTML={{ __html: description }} />
                </div>
              </>
            )}
        </div>
      }
    </div>
  );
})

export default ModalEelment;



