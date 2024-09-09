import React, { memo } from "react";
import { Skeleton } from "@mui/material";
import { colors } from "../../../utils/colors";
import ShimmerLoader from "../../../assets/images/Shimmer-loader.png"

const Shimmer = memo((props) => {

    const { backgroundColor, rounded, backgroundImage } = props;

    let theme = '', radius = '';

    if (backgroundColor === colors.black) {
        theme = "gray"
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
        <>
            {
                backgroundImage ?

                    <div className="position-relative">
                        <Skeleton
                            style={{
                                borderRadius: radius,
                                backgroundColor: theme,
                            }}
                            animation="wave"
                            variant="rectangular"
                            {...props}
                        />
                        <div className="h-100 w-100 opacity-class" style={{ position: "absolute", top: 0,overflow:'hidden' }}>
                            <img
                                src={ShimmerLoader}
                                height={"100%"}
                                width={"100%"}
                            />
                        </div>
                    </div>

                    :
                    <Skeleton
                        style={{
                            borderRadius: radius,
                            backgroundColor: theme
                        }}
                        animation="wave"
                        variant="rectangular"
                        {...props}
                    />
            }
        </>
    )

});


export default Shimmer;