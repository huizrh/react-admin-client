import React, { Component } from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'
import memoryUtils from '../../utils/memoryUtils'
import { Layout } from 'antd';

import AdminHeader from '../../components/Header'
import LeftNav from '../../components/LeftNav'

//routers
import Home from '../Home'
import CategoryManage from '../CategoryManage'
import ProductManage from '../ProductManage'
import RoleManage from '../RoleManage'
import UserManage from '../UserManage'
import BarChart from '../Charts/BarChart'
import PieChart from '../Charts/PieChart'
import LineChart from '../Charts/LineChart'
import OrderManage from '../OrderManage'

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
                    <AdminHeader />
                    <Content style={{ backgroundColor: 'white', margin: 20 }}>
                        <Switch>
                            <Route path='/home' component={Home} />
                            <Route path='/category' component={CategoryManage} />
                            <Route path='/product' component={ProductManage} />
                            <Route path='/role' component={RoleManage} />
                            <Route path='/user' component={UserManage} />
                            <Route path='/charts/bar' component={BarChart} />
                            <Route path='/charts/pie' component={PieChart} />
                            <Route path='/charts/line' component={LineChart} />
                            <Route path='/order' component={OrderManage} />
                            <Redirect to='/home' />
                        </Switch>
                    </Content>
                    <Footer style={{ textAlign: 'center', color: 'grey' }}>LINKMedicine</Footer>
                </Layout>
            </Layout>
        )
    }
}
