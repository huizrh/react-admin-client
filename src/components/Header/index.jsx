import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import './index.less'
import { formateDate } from "../../utils/dateUtils";
import memoryUtils from '../../utils/memoryUtils'
import menuList from '../../config/menuConfig'
import { Modal, Button } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import storageUtils from '../../utils/storageUtils'
const { confirm } = Modal;

class Header extends Component {

    state = {
        curTime: formateDate(Date.now()),
        username: memoryUtils.user.username,
    }
    componentDidMount() {
        this.ctd = setInterval(() => {
            this.setState({
                curTime: formateDate(Date.now())
            })
        }, 1000)
    }

    componentWillUnmount() {
        clearInterval(this.ctd)
    }

    preparePageTitle = () => {
        let items = [...menuList]
        while (items.length > 0) {
            let item = items.shift()
            if (item.key === this.props.location.pathname) {
                return item.title
            }
            if (item.children) {
                items = items.concat(item.children)
            }
        }
    }

    logout = () => {
        confirm({
            title: 'Do you want to logout?',
            icon: <ExclamationCircleOutlined />,
            onOk: () => {
                memoryUtils.user = {}
                storageUtils.removeUser()
                this.props.history.replace('/login')
            },
            onCancel() {
            },
        });
    }

    render() {
        const { curTime, username } = this.state
        const pagetitle = this.preparePageTitle()
        return (
            <div className="header">
                <div className="header-top">
                    <span>Hi, {username} </span>
                    <Button type="link" onClick={this.logout}>Logout</Button>
                </div>
                <div className="header-bottom">
                    <div className="header-bottom-left">{pagetitle}</div>
                    <div className="header-bottom-right">
                        <span>{curTime}</span>
                    </div>
                </div>
            </div>
        )
    }
}

export default withRouter(Header)