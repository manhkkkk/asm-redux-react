import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Typography, Button, Table, Switch, message,Modal  } from 'antd';
import { Link, useNavigate } from 'react-router-dom'
import { SearchOutlined, PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';
import { getAll, updateProduct } from "../../api/Product";
import useProduct from "./useProduct";
import {mutate} from 'swr'
import {currency} from './ultilities'
import axios from "axios";



interface DataType {
  name: string,
  originalPrice: number,
  saleOffPrice: string,
  categories: string
  feature: string
  description: string
  image: string,
  isDelete: boolean
  id: number
};



const Product = () => {
  const [dataTable, setDataTable] = useState([])
  const navigate = useNavigate()
  useEffect(() => {
    const fetchData = async () => {
      const {data} = await axios.get('https://json-server-phanducmanh.herokuapp.com/products')
      setDataTable(data)
  };
  fetchData()
  }, [])


  const handleDelelePrduct = async (isDelete: boolean, record: any) => {
      const { id } = record
      record.isDelete = isDelete
      const res = await axios.put(`https://json-server-phanducmanh.herokuapp.com/products/${id}`, record)
      message.success("Cập nhật thành công")
      navigate('/admin')
  }
  const onHanlderRemove = async (id: any) => {
    Modal.confirm({
      title: "Are you sure delete",
      okText: "Yes",
      okType: "danger",
      onOk: () =>{
        axios.delete(`https://json-server-phanducmanh.herokuapp.com/products/${id}`);
        navigate('/admin')
      }
    })
  }

  const columns: ColumnsType<any> = [
    {
        title: 'Tên sản phẩm',
        dataIndex: 'name',
        key: 'name',
        width: '30%',
        render: text => <a>{text}</a>,
    },
    {
        title: 'Đặc điểm',
        dataIndex: 'description',
        key: 'description',
        width: '30%',
    },
    {
        title: 'Giá khuyến mãi',
        dataIndex: 'saleOffPrice',
        key: 'saleOffPrice',
        width: '20%',
        render: (_) => currency(_)
    },
    {
        title: "Ẩn/hiện",
        dataIndex: 'isDelete',
        key: 'isDelete',
        width: '10%',
        render: (_, record) => <Switch checked={_} onChange={(isDelete) => handleDelelePrduct(isDelete, record)} />
    },
    {
        title: "Thao tác",
        key: 'action',
        dataIndex: 'id',
        width: '10%',
        render: (_, record) => 
        <>
          <Link to={`/admin/product/edit/${record.id}`}><EditOutlined style={{ fontSize: '20px', color: '#08c' }} /></Link>
          <DeleteOutlined checked={_}  onClick={() => onHanlderRemove(record.id)} style={{color: 'red', fontSize: '20px' }} />
        </>
        
      }
  ];
  return (
      <>
          <Breadcrumb>
              <Typography.Title level={2} style={{ margin: 0 }}>
                  Điện thoại
              </Typography.Title>
              <Link to="/admin/product/add">
                  <Button type="dashed" shape="circle" icon={<PlusOutlined />} />
              </Link>
          </Breadcrumb>
          <Table columns={columns} dataSource={dataTable} rowKey="id" />
      </>
  )
}

const Breadcrumb = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
`

export default Product



