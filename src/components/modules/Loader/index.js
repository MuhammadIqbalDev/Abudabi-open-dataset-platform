import React, { memo } from 'react';
import { Col, Row } from 'react-bootstrap';
import Shimmer from '../../elements/Shimmer';
import ShimmerEffect from '../../elements/ShimmerEffect';
import { colors } from '../../../utils/colors';

let sizes = ['400px', '280px', '340px']

const Loader = memo((props) => {

    const { type, width, backgroundColor, size, numberOfColumns } = props

    return (
        Array(numberOfColumns ? numberOfColumns : 3).fill(null).map((_, index) => (
            type === 'full-width-max' ?
                <Col md={12} className="my-2">
                    <Shimmer backgroundImage height={332} rounded="lg" />
                </Col> :
            //       <Col md={12} className="my-2">
            //       <ShimmerEffect height={332} rounded="lg" backgroundColor={colors.lighter_gray}  />
            //   </Col> :
                type === 'full-width-min' ?
                    <Col md={12} className="my-2">
                        <Shimmer height={60} rounded="sm" />
                    </Col> :
                    <Col md={numberOfColumns === 4 ? 3 : 4} className="py-2">
                        {
                            type === 'image-outer-text' ? (
                                <div>
                                    <Shimmer
                                        backgroundColor={backgroundColor}
                                        rounded="lg"
                                        height={250}
                                    />
                                    <Row>
                                        <Col className="py-3" xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                                            <Shimmer rounded="xs" />
                                        </Col>
                                        <Col xs={12} sm={12} md={10} lg={10} xl={10} xxl={10}>
                                            <Shimmer rounded="xs" />
                                            <Shimmer className="my-1" rounded="xs" width={"50%"} />
                                        </Col>
                                    </Row>
                                </div>
                            ) : type === 'story-cards' ? (
                                <div>
                                    <Shimmer
                                        backgroundColor={backgroundColor}
                                        rounded="lg"
                                        height={sizes[index]}
                                    />
                                    <Row>
                                        <Col className="py-3" xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                                            <Shimmer className="my-1" rounded="xs" />
                                            <Shimmer className="my-1" rounded="xs" width="70%" />
                                        </Col>
                                        <Col xs={12} sm={12} md={10} lg={10} xl={10} xxl={10}>
                                            <Shimmer rounded="xs" />
                                        </Col>
                                        <Col className='d-flex py-3' xs={12} sm={12} md={10} lg={10} xl={10} xxl={10}>
                                            <Shimmer className="mx-1" rounded="lg" height="36px" width="30%" />
                                            <Shimmer className="mx-1" rounded="lg" height="36px" width="40%" />
                                        </Col>
                                    </Row>
                                </div>
                            ) : (
                                <Shimmer
                                    backgroundColor={backgroundColor}
                                    rounded="lg"
                                    width={width}
                                    className={width && "mx-2"}
                                    height={type === 'image-inner-text' ? 250 : (size ? size : 332)}
                                />
                            )
                        }
                    </Col>
        ))
    )
});

export default Loader;