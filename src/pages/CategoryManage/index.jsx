import React, { Component } from 'react'
import { Button, Card, Table, Space, message, Modal, Form, Select, Input } from 'antd'
import { reqCategoryList, reqAddCategory, reqUpdateCategory } from '../../api'
import {
    PlusOutlined,
    CaretRightOutlined
} from '@ant-design/icons';

const { Column } = Table;
const { Option } = Select;

export default class CategoryManage extends Component {

    state = {
        currentPage: 1,
        currentCatId: '0',
        currentCatName: '',
        loading: false,
        tableData: [],
        allCategories: [],

        addCategoryVisiable: false,
        confirmAddCategoryLoading: false,
        updateCategoryVisiable: false,
        confirmUpdateCategoryLoading: false
    }

    formAddCategory = React.createRef()
    formUpdateCategory = React.createRef()

    componentDidMount() {
        this.loadCatList(this.state.currentCatId)
        this.reloadAllCategoriesOptions()
    }

    reloadAllCategoriesOptions = async () => {
        const result = await reqCategoryList(0)
        if (result.status === 0) {
            this.setState({
                allCategories: [
                    {
                        _id: '0',
                        name: 'Level 1 Category'
                    }, ...result.data
                ]
            })
        } else {
            message.error('Failure: get all categories.')
        }
    }

    loadCatList = async (catId, catName) => {
        this.setState({ loading: true })
        const result = await reqCategoryList(catId)
        if (result.status === 0) {
            this.setState({
                currentPage: 1,
                tableData: result.data,
                currentCatId: catId,
                currentCatName: catName,
                loading: false
            })
        } else {
            message.error('Failure: get category list.')
        }
    }


    addCategory = async (parentSelect, categoryName) => {
        const result = await reqAddCategory(parentSelect.value, categoryName)
        if (result.status === 0) {
            // close the modal and set the loading button to normal button
            this.setState({ confirmAddCategoryLoading: false, addCategoryVisiable: false }, () => {
                //load category list that contains the new item 
                this.loadCatList(parentSelect.value, parentSelect.label)
            })
        } else {
            message.error('Failure: add category')
        }
    }

    updateCategory = async (categoryId, categoryName) => {
        const result = await reqUpdateCategory(categoryId, categoryName)
        if (result.status === 0) {
            // close the modal and set the loading button to normal button
            this.setState({ confirmUpdateCategoryLoading: false, updateCategoryVisiable: false }, () => {
                //load category list that contains the new item
                this.loadCatList(this.state.currentCatId, this.state.currentCatName)
            })
        } else {
            message.error('Failure: update category')
        }
    }

    /**
     * Show the Add Category Modal
     */
    showAddCategoryModal = () => {
        this.reloadAllCategoriesOptions()
        // init form values
        if (this.formAddCategory.current) {
            this.formAddCategory.current.setFieldsValue({ parentId: { value: this.state.currentCatId, label: this.state.currentCatName }, categoryName: '' })
        }
        this.setState({ addCategoryVisiable: true })
    }

    /**
     * Show the Update Category Modal
     */
    showUpdateCategoryModal = (categoryId, categoryName) => {
        this.setState({ updateCategoryVisiable: true }, () => {
            // init form values
            if (this.formUpdateCategory.current) {
                this.formUpdateCategory.current.setFieldsValue({ categoryName, categoryId })
            }
        })
    }


    /**
     * Close the Add Category Modal
     */
    handleAddCategoryCancel = () => {
        this.setState({ addCategoryVisiable: false })
    }

    /**
     * Close the Update Category Modal
     */
    handleUpdateCategoryCancel = () => {
        this.setState({ updateCategoryVisiable: false })
    }

    /**
     * Click add button, validate the fields and then submit
     */
    handleAddCategoryOk = () => {
        this.setState({ confirmAddCategoryLoading: true })
        this.formAddCategory.current.validateFields()
            .then(values => {
                this.addCategory(values.parentId, values.categoryName)
            })
            .catch(errorInfo => {
                console.log(errorInfo);
            });
    }

    /**
     * Click update button, validate the fields and then submit
     */
    handleUpdateCategoryOk = () => {
        this.setState({ confirmUpdateCategoryLoading: true })
        this.formUpdateCategory.current.validateFields()
            .then(values => {
                this.updateCategory(values.categoryId, values.categoryName)
            })
            .catch(errorInfo => {
                console.log(errorInfo);
            });
    }

    render() {
        const { tableData, loading } = this.state;
        return (
            <>
                <Card
                    title={<>
                        <Button type="link" style={{ padding: 0 }} onClick={() => { this.loadCatList('0', 'Level 1 Category') }}>Level 1 Category</Button>
                        {this.state.currentCatId !== '0' ?
                            <>
                                <CaretRightOutlined style={{ color: '#1EB0BC', margin: '0 5px' }} /><Button type="link" style={{ padding: 0 }}>{this.state.currentCatName}</Button>
                            </> : null}
                    </>}
                    extra={<Button type="primary" icon={<PlusOutlined />} onClick={this.showAddCategoryModal} >Add</Button>}
                    style={{ width: '100%' }} >
                    <Table dataSource={tableData} bordered rowKey="_id" loading={loading} pagination={{
                        pageSize: 5, current: this.state.currentPage, onChange: currentPage => this.setState({ currentPage })

                    }}>
                        <Column title="Category Name" dataIndex="name" key="_id" width="75%" />
                        <Column
                            title="Action"
                            key="action"
                            render={(text, record) => (
                                <Space size="middle">
                                    <Button type="link" style={{ padding: 0 }} onClick={() => { this.showUpdateCategoryModal(record._id, record.name) }}>Edit</Button>
                                    {this.state.currentCatId === '0' ? <Button type="link" style={{ padding: 0 }} onClick={() => { this.loadCatList(record._id, record.name) }}>View</Button> : null}
                                </Space>
                            )}
                        />
                    </Table>
                </Card>

                <Modal
                    title="Add Category"
                    visible={this.state.addCategoryVisiable}
                    onOk={this.handleAddCategoryOk}
                    confirmLoading={this.state.confirmAddCategoryLoading}
                    onCancel={this.handleAddCategoryCancel}
                >
                    <Form labelCol={{ span: 6 }} ref={this.formAddCategory} initialValues={{ parentId: { value: this.state.currentCatId }, categoryName: '' }}>
                        <Form.Item name="parentId" label="Parent Category" rules={[{ required: true }]}>
                            <Select labelInValue >
                                {
                                    this.state.allCategories.map((item) => {
                                        return <Option value={item._id} key={item._id}>{item.name}</Option>
                                    })
                                }
                            </Select>
                        </Form.Item>
                        <Form.Item name="categoryName" label="Category Name" rules={[{ required: true, message: 'Please input a category name.' }]}>
                            <Input />
                        </Form.Item>
                    </Form>
                </Modal>


                <Modal
                    title="Update Category"
                    visible={this.state.updateCategoryVisiable}
                    onOk={this.handleUpdateCategoryOk}
                    confirmLoading={this.state.confirmUpdateCategoryLoading}
                    onCancel={this.handleUpdateCategoryCancel}
                >
                    <Form labelCol={{ span: 6 }} ref={this.formUpdateCategory} initialValues={{ categoryName: '' }}>
                        <Form.Item name="categoryName" label="Category Name" rules={[{ required: true, message: 'Please input a category name.' }]}>
                            <Input />
                        </Form.Item>
                        <Form.Item name="categoryId" hidden >
                            <Input />
                        </Form.Item>
                    </Form>
                </Modal>

            </>
        )
    }
}
