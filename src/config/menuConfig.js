import {
    PieChartOutlined,
    LineChartOutlined,
    BarChartOutlined,
    AreaChartOutlined,
    UserOutlined,
    UsergroupAddOutlined,
    HomeOutlined,
    AppstoreOutlined,
    AppstoreAddOutlined,
    DatabaseOutlined,
    WindowsOutlined
} from '@ant-design/icons';

const menuList = [
    {
        title: 'Home', // 菜单标题名称
        key: '/home', // 对应的path
        icon: <HomeOutlined />, // 图标名称
        isPublic: true, // 公开的
    },
    {
        title: 'Products',
        key: '/products',
        icon: <AppstoreOutlined />,
        children: [ // 子菜单列表
            {
                title: 'Category',
                key: '/category',
                icon: <DatabaseOutlined />
            },
            {
                title: 'Product',
                key: '/product',
                icon: <AppstoreAddOutlined />
            },
        ]
    },

    {
        title: 'User',
        key: '/user',
        icon: <UsergroupAddOutlined />
    },
    {
        title: 'Role',
        key: '/role',
        icon: <UserOutlined />,
    },

    {
        title: 'Charts',
        key: '/charts',
        icon: <AreaChartOutlined />,
        children: [
            {
                title: 'Bar Chart',
                key: '/charts/bar',
                icon: <BarChartOutlined />
            },
            {
                title: 'Line Chart',
                key: '/charts/line',
                icon: <LineChartOutlined />
            },
            {
                title: 'Pie Chart',
                key: '/charts/pie',
                icon: <PieChartOutlined />
            },
        ]
    },

    {
        title: 'Orders',
        key: '/order',
        icon: <WindowsOutlined />,
    },
]

export default menuList