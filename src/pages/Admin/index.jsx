import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import memoryUtils from '../../utils/memoryUtils'
import { Layout } from 'antd';

import AdminHeader from '../../components/Header'
import LeftNav from '../../components/LeftNav'

const { Footer, Sider, Content } = Layout;
export default class Admin extends Component {
    render() {
        const user = memoryUtils.user
        if (!user || !user._id) {
            //to login
            return <Redirect to='/login' />
        }
        return (
            <Layout style={{ height: '100%' }}>
                <Sider><LeftNav /></Sider>
                <Layout>
                    <AdminHeader>hi , {user.username}</AdminHeader>
                    <Content style={{ backgroundColor: 'white' }}>Content</Content>
                    <Footer style={{ textAlign: 'center', color: 'grey' }}>LINKMedicine</Footer>
                </Layout>
            </Layout>
        )
    }
}
