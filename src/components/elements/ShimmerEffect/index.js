import "./index.css"
import React, { memo } from "react";
import { colors } from "../../../utils/colors";

const ShimmerEffect = memo((props) => {

    const { backgroundColor, rounded, height } = props;

    let theme = '', radius = '';

    if (backgroundColor) {
        theme = backgroundColor
    }

    if (rounded === 'xs') {
        radius = "4px"
    } else if (rounded === 'sm') {
        radius = "15px"
    } else if (rounded === 'md') {
        radius = "20px"
    } else if (rounded === 'lg') {
        radius = "30px"
    }

    return (
        <div
            style={{
                borderRadius: radius,
                backgroundColor: theme,
                width: '100%',
                height: height,
                overflow: "hidden",
                display:'flex',
                justifyContent:'center',
                alignItems:'center'
            }}
        >
            <div
              style={{
                borderRadius: "50%",
                backgroundColor: colors.white,
                width: '70%',
                height: height+height+height+height,
                transform: "rotate(70deg)",
                marginLeft:'50px',
                // animation:"rotation 2s infinite linear"
            }}
            className="rotate-div"
            >
            </div>
        </div>
    )

});


export default ShimmerEffect;