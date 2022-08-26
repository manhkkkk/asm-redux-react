import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Typography, Col, Row, Button, Checkbox, Form, Input, InputNumber, Select, message } from 'antd'
import { useNavigate } from "react-router-dom";
import { PlusCircleOutlined } from '@ant-design/icons';
import { upload } from "../../../api/images";
import { createProduct } from "../../../api/Product";
import axios from "axios";
const { TextArea } = Input
const { Option } = Select;

const AddUser = () =>{
	const navigate = useNavigate()
	const onFinish = async (values: any) => {
		try {
			await axios.post('https://json-server-phanducmanh.herokuapp.com/users',values)
			message.success("Tạo mới thành công")
			navigate(-1)
		} catch (err) {
			message.error("Có lỗi xảy ra")
		}
	};

	const onFinishFailed = (errorInfo: any) => {
		console.log('Failed:', errorInfo);
	};


	return (
		<>
			<Breadcrumb>
				<Typography.Title level={2} style={{ margin: 0 }}>
					Thêm mới
				</Typography.Title>
			</Breadcrumb>
			<Row gutter={16}>
				<Col span={14}>
					<Typography.Title level={5}>Thông tin sản phẩm</Typography.Title>
					<Form
						initialValues={{}}
						onFinish={onFinish}
						onFinishFailed={onFinishFailed}
						autoComplete="on"
						labelCol={{ span: 24 }}
					>
						<Form.Item
							name="username"
							labelCol={{ span: 24 }}
							label="username"
							rules={[{ required: true, message: 'Tên không được trống' }]}
						>
							<Input size="large" />
						</Form.Item>
                  <Form.Item
							name="email"
							labelCol={{ span: 24 }}
							label="email"
							rules={[{ required: true, message: 'Tên không được trống' }]}
						>
							<Input size="large" />
						</Form.Item>
                  <Form.Item
							name="password"
							labelCol={{ span: 24 }}
							label="password"
							rules={[{ required: true, message: 'Tên không được trống' }]}
						>
							<Input size="large" />
						</Form.Item>
                  <Form.Item
							name="phone"
							labelCol={{ span: 24 }}
							label="phone"
							rules={[{ required: true, message: 'Tên không được trống' }]}
						>
							<Input size="large" />
						</Form.Item>

                  <Form.Item>
							<Button type="primary" htmlType="submit">
								Tạo mới sản phẩm
							</Button>
						</Form.Item>
					</Form>
				</Col>
			</Row>
		</>
	)
}

const Breadcrumb = styled.div`
    display: flex;
    justify-content: space-between;
    margin-top: 20px;
`


const Container = styled.div`
    
`

const Label = styled.div`
    font-weight: bold;
    font-size: 13px;
    text-align: left;
`

const UploadWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-height: 200px;
    border: 1px dashed gray;
`

const UploadIcon = styled.label`
    input {
        display: none;
    }
`

const ImagePreview = styled.img`
    width: 100%;
`

export default AddUser;