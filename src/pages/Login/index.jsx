import React, { Component } from 'react'
import './login.less'
import logo from './images/logo.png'
import { Form, Input, Button } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { } from '../../api/ajax'
import { reqLogin } from '../../api';



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
        /*reqLogin(username, password).then(
            response => {
                console.log('success, data: ', response.data);
            }).catch(err => {
                console.log('Failed: ', err);
            });*/

        //await使用
        try {
            const response = await reqLogin(username, password);
            console.log('success, data: ', response.data);
        } catch (error) {
            console.log('Failed, error: ', error);
        }


    }

    onFinishFailed = (error) => {
        console.log(error);
    }

    render() {
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
