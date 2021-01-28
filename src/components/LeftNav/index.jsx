import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'
import logo from '../../assets/images/logo.png'
import { Menu } from 'antd';
import './index.less'
import menuList from '../../config/menuConfig'

const { SubMenu } = Menu;

class LeftNav extends Component {
    constructor(props) {
        super(props);
        this.menuNodes = this.getMenuNodesReduce(menuList)
    }

    getMenuNodes = (menuList) => {
        return menuList.map((item) => {
            if (item.children) {
                return (
                    <SubMenu key={item.key} title={item.title} icon={item.icon}>
                        {this.getMenuNodes(item.children)}
                    </SubMenu>
                )
            } else {
                return <Menu.Item key={item.key} icon={item.icon}><Link to={item.key}>{item.title}</Link></Menu.Item>
            }
        })
    }


    getMenuNodesReduce = (menuList) => {
        return menuList.reduce((pre, item) => {
            if (item.children) {
                if (item.children.find(citem => citem.key === this.props.location.pathname)) {
                    this.openSubKey = item.key
                }
                pre.push(
                    <SubMenu key={item.key} title={item.title} icon={item.icon}>
                        {this.getMenuNodesReduce(item.children)}
                    </SubMenu>
                )
            } else {
                pre.push(
                    <Menu.Item key={item.key} icon={item.icon}>
                        <Link to={item.key}>{item.title}</Link>
                    </Menu.Item>
                )
            }
            return pre
        }, [])
    }



    render() {
        return (
            <div className="left-nav">
                <Link className="left-nav-header" to='/'>
                    <img src={logo} alt="logo" />
                    <h1>LINKMedicine</h1>
                </Link>
                <Menu mode="inline" theme="dark" selectedKeys={[this.props.location.pathname]} defaultOpenKeys={[this.openSubKey]}>
                    {this.menuNodes}
                </Menu>
            </div>
        )
    }
}

export default withRouter(LeftNav)
