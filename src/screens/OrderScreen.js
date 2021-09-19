import { useState, useEffect } from 'react'
import { Button, Row, Col, ListGroup, Image, Card } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { getOrderDetails } from '../actions/orderActions'




const OrderScreen = ({ match }) => {
    const orderId = match.params.id
    const dispatch = useDispatch()

    const orderDetails = useSelector(state => state.orderDetails)
    const {order, error, loading } = orderDetails

    if(!loading && !error) {
        order.itemsPrice = order.orderItems.reduce((acc, item) => acc + item.price * item.qty, 0).toFixed(2)
    }

    useEffect(() => {

        if(!order || order._id !== Number(orderId)){
            dispatch(getOrderDetails(orderId))
        }
    },[order, orderId])


    return loading ?  (
        <Loader />
    ) : error ? (
        <Message variant='danger'>{error}</Message>
    ) : (
        <div>
            <h1>Order: {order._id}</h1>
            <Row>
                <Col md={8}>
                    <ListGroup variant='flush'>
                        <ListGroup.Item>
                            <h2>Shipping</h2>
                            <p><strong>Name: {order.user.name}</strong></p>
                            <p><strong>Email: </strong><a href={`mailto:${order.user.email}`}>{order.user.email}</a></p>
                            <p>
                                <strong>Shipping: </strong>
                                {' '} {order.shippingAddress.address}, 
                                {' '} {order.shippingAddress.city}, 
                                {' '} {order.shippingAddress.country}, 
                                {' '} {order.shippingAddress.postalCode}
                            </p>

                            {order.isDelivered ? (
                                <Message variant='success'>Shipped on {order.deliveredAt}</Message>
                            ) : (
                                <Message variant='warning'>Not Shipped</Message>
                            )}
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <h2>Payment Method</h2>
                            <p>
                                <strong>Method:</strong>
                                {' '} {order.paymentMethod}
                            </p>

                            {order.isPaid ? (
                                <Message variant='success'>Paid on {order.paidAt}</Message>
                            ) : (
                                <Message variant='warning'>Not Paid</Message>
                            )}
                        </ListGroup.Item>
 
                        <ListGroup.Item>
                            <h2>Order Items</h2>

                            <strong>Items: </strong>
                            {order.orderItems.length === 0 ? 
                                <Message>Order is empty</Message>
                                : (
                                    <ListGroup variant='flush'>
                                        {order.orderItems.map((item, index) =>
                                            <ListGroup.Item key={index}>
                                                <Row>
                                                    <Col md={1}>
                                                        <Image src={item.image} alt='item.name' fluid rounded></Image>
                                                    </Col>

                                                    <Col md={2}>
                                                        <Link to={`/product/${item.product}`}>{item.name}</Link>
                                                    </Col>

                                                    <Col md={4}>
                                                        {item.qty} x ${item.price} = ${(item.qty * item.price).toFixed(2)}
                                                    </Col>
                                                </Row>
                                            </ListGroup.Item>
                                        )}
                                    </ListGroup>
                                )
                            }

                        </ListGroup.Item>
                    </ListGroup>
                </Col>

                <Col md={4}>

                    <Card>
                        <ListGroup variant='flush'>

                            <ListGroup.Item>
                                <h2>Order Summary</h2>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Items:</Col>
                                    <Col>${order.itemsPrice}</Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Shipping:</Col>
                                    <Col>${order.shippingPrice}</Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Taxes:</Col>
                                    <Col>${order.taxPrice}</Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Total:</Col>
                                    <Col>${order.totalPrice}</Col>
                                </Row>
                            </ListGroup.Item>

                        </ListGroup>
                    </Card>
                </Col>
            </Row>
        </div>
    )
}

export default OrderScreen
