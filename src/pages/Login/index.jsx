import React, { Component } from 'react'
import './login.less'
import logo from '../../assets/images/logo.png'
import { Form, Input, Button, message } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { reqLogin } from '../../api';
import memoryUtils from '../../utils/memoryUtils'
import storageUtils from '../../utils/storageUtils'
import { Redirect } from 'react-router-dom';

export default class Login extends Component {

    static useNameRules = [
        { required: true, message: 'Please input your Username!' },
        { min: 5, message: 'Username must be minimum 5 characters.' },
        { max: 12, message: 'Username must be maximum 12 characters.' },
        { pattern: /^[a-zA-Z0-9_]+$/, message: 'Username must be letter, number or _.' },
    ]

    onFinish = async (values) => {
        //console.log('Received values of form: ', values);
        const { username, password } = values
        //await使用
        const result = await reqLogin(username, password);

        const { status, data, msg } = result
        if (status === 0) {
            message.success('Welcome, ' + data.username)
            memoryUtils.user = data
            storageUtils.saveUser(data)
            //不需要回退，否则用push            
            this.props.history.replace('/')
        } else {
            message.error(msg)
        }
    }

    onFinishFailed = (error) => {
        console.log(error);
    }

    render() {
        const user = memoryUtils.user
        if (user && user._id) {
            //to login
            return <Redirect to='/' />
        }
        return (
            <div className="login">
                <header className="login-header">
                    <img src={logo} alt="logo" />
                    <div>
                        <h2>LINKMedicine</h2>
                        <h5>Where the world gets well</h5>
                    </div>
                </header>
                <div className="login-div">
                    <section className="login-content">
                        <h2>User login</h2>
                        <Form name="normal_login" className="login-form" onFinish={this.onFinish} onFinishFailed={this.onFinishFailed}>
                            <Form.Item name="username" rules={Login.useNameRules}>
                                <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
                            </Form.Item>
                            <Form.Item name="password" rules={[
                                {
                                    validator: (_, value) => {
                                        if (value === undefined || value.length === 0) {
                                            return Promise.reject('Please input your Password!')
                                        }
                                        if (value.length < 5) {
                                            return Promise.reject('Password must be minimum 5 characters.')
                                        }
                                        if (value.length > 12) {
                                            return Promise.reject('Password must be maximum 12 characters.')
                                        }
                                        if (!/^[a-zA-Z0-9_]+$/.test(value)) {
                                            return Promise.reject('Password must be letter, number or _.')
                                        }
                                        return Promise.resolve()
                                    }
                                }]}>
                                <Input prefix={<LockOutlined className="site-form-item-icon" />} type="password" placeholder="Password" />
                            </Form.Item>
                            <Form.Item>
                                <Button type="primary" htmlType="submit" className="login-form-button">
                                    Log in
                        </Button>
                            </Form.Item>
                        </Form>
                    </section>
                </div>
            </div >
        )
    }
}
