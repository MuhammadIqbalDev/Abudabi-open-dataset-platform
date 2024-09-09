import React from "react";
import { memo } from "react";
import SwaggerUi from "swagger-ui-react"
import "swagger-ui-react/swagger-ui.css"

const SwaggerUI = memo((props) => {

    const { url } = props

    return (
        <SwaggerUi url={url} />
    )
});

export default SwaggerUI;