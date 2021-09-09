import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Form, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../components/Loader'
import Message from '../components/Message'
import FormContainer from '../components/FormContainer'
import { register } from '../actions/userActions'

const RegisterScreen = ({location, history}) => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [message, setMessage] = useState('')
    const dispatch = useDispatch()

    const redirect = location.search ? location.search.split('=')[1] : '/'

    const userRegister = useSelector(state => state.userRegister)
    const {error, loading, userInfo} = userRegister

    useEffect(() => {
        if(userInfo){
            history.push(redirect)
        }
    }, [history, userInfo, redirect])

    const submitHandler = e => {
        e.preventDefault()
        if(password != confirmPassword){
            setMessage('Passwords do not match')
            console.log(`Error Registering: ${name} ${email} ${password} ${confirmPassword}`);
        } else {
            dispatch(register(name, email, password))
            console.log(`Registered: ${name} ${email} ${password}`);
        }
    }
    return (
    <FormContainer>
        <h1>Register</h1>
        {message && <Message variant='danger'>{message}</Message>}
        {error && <Message variant='danger'>{error}</Message>}
        {loading && <Loader />}

        <Form onSubmit={submitHandler}>
        <Form.Group controlId='email'>
            <Form.Label>
                Name
            </Form.Label>
            <Form.Control
                required
                type='name'
                placeholder='Enter Name'
                value={name}
                onChange={(e) => setName(e.target.value)}
                >
                </Form.Control>
            </Form.Group>
            <Form.Group controlId='email'>
                <Form.Label>
                    Email Address
                </Form.Label>
                <Form.Control
                required
                type='email'
                placeholder='Email Address'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                >
                </Form.Control>
            </Form.Group>
            <Form.Group controlId='password'>
                <Form.Label>
                    Password
                </Form.Label>
                <Form.Control
                required
                type='password'
                placeholder='Enter Password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                >
                </Form.Control>
            </Form.Group>
            <Form.Group controlId='passwordConfirm'>
                <Form.Label>
                    Confirm Password
                </Form.Label>
                <Form.Control
                required
                type='password'
                placeholder='Confirm Password'
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                >
                </Form.Control>
            </Form.Group>
            <Button type='submit' variant='primary'>Register</Button>
            <Row className='py-3'>
                <Col>
                    Registered? <Link to={redirect ? `/login?redirect=${redirect}` : '/login'}> Login</Link>
                </Col>
            </Row>
        </Form>
    </FormContainer>
    )
}

export default RegisterScreen
