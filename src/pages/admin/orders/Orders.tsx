import React, { useEffect, useState } from 'react'
import styled from "styled-components";
import { Typography, Breadcrumb, Table, Space, Popconfirm, message, Modal, Form, Input, Layout, Tag, Button } from 'antd';
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { SearchOutlined, PlusOutlined } from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';
import { Content } from 'antd/lib/layout/layout';
import axios from 'axios';
const { Paragraph } = Typography


interface DataType {
    name: string;

}
const { Title } = Typography;


const Order = () => {
    const [orders, setOrders] = useState<any[]>();
    const [confirmLoading, setConfirmLoading] = useState(false);

    useEffect(() => {
        const getProducts = async () => {
            const { data } = await axios.get('https://json-server-phanducmanh.herokuapp.com/orders');
            setOrders(data);
        }
        getProducts();
    }, [])
    const onRemoveProduct = (id: any) => {
        setConfirmLoading(true);
        axios.delete(`https://json-server-phanducmanh.herokuapp.com/orders/${id}`);
        setConfirmLoading(false);
        message.success({ content: 'Xóa Thành Công!', duration: 2 });
        return setOrders(orders?.filter(item => item.id != id))

    }
    const navigate = useNavigate()
    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };
    const onUpdate = (record: any) => {

    }
    const columns = [
        { title: 'STT', dataIndex: 'stt', key: 'stt' },
        { title: 'Tên khách hàng', dataIndex: 'name', key: 'name' },
        { title: 'Email', dataIndex: 'email', key: 'email' },
        { title: 'Số điện thoại', dataIndex: 'phone', key: 'phone' },
        { title: 'Địa chỉ', dataIndex: 'address', key: 'address' },
        { title: 'Trạng thái', dataIndex: 'status', key: 'status' },

        {
            title: 'Action',
            dataIndex: '',
            key: 'action',
            render: (recore: any) => (
                <Space size="middle">
                    <NavLink className={"btn btn-info"} to={'/admin/order/edit/'+recore.id}>Xem chi tiết</NavLink>
                    <Popconfirm
                        placement="topRight"
                        title="Bạn Có Muốn Xóa?"
                        okText="Có"
                        cancelText="Không"
                        onConfirm={() => { onRemoveProduct(recore.id) }}
                        okButtonProps={{ loading: confirmLoading }}
                    >
                        <Button type="primary" danger >
                            Xóa
                        </Button>
                    </Popconfirm>                </Space>
            )
        },
    ];
    const data = orders?.map((order, index) => {
        return {
            stt: index + 1,
            name: order.userOrder.name,
            email: order.userOrder.email,
            phone: order.userOrder.phone,
            address: order.userOrder.address,
            status: order.status == '0' ? <Tag color={"geekblue"}>Chờ xác nhận</Tag>: order.status == '1'? <Tag color={"green"}>Đã xác nhận</Tag>: order.status == '2'? <Tag color={"green"}>Giao hàng thành công</Tag>: <Tag color={"volcano"}>Đã hủy</Tag>,
            id: order.id
        }
    })

    return (
        <div>
            <Layout style={{ padding: '0 24px 24px' }}>
                <Content
                    className="site-layout-background"
                    style={{
                        padding: 24,
                        margin: 0,
                        minHeight: 280,
                    }}>
                    <div style={{ minHeight: 460, padding: 24 }}>
                        <Title level={2}>Danh sách Đơn Hàng</Title>
                        <Table columns={columns} dataSource={data} />
                    </div>
                </Content>
            </Layout>
        </div>
    )
}


export default Order;