import React, { memo } from "react";
import Form from "react-bootstrap/Form";
import './style.css';

const CheckBox = memo((props) => {

  const { checked, borderColor, callBack } = props

  return (
    <Form.Check.Input
      checked={checked}
      onChange={(e) => callBack(e.target.checked)}
      type="checkbox"
      className=""
      style={{
        minWidth: "16px",
        maxWidth: "16px",
        borderColor: borderColor,
      }}
    />
  );
});

export default CheckBox;
