import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Typography, Col, Row, Button, Checkbox, Form, Input, InputNumber, Select, message } from 'antd'
import { useNavigate } from "react-router-dom";
import { PlusCircleOutlined } from '@ant-design/icons';
import { upload } from "../../api/images";
import { createProduct } from "../../api/Product";
import axios from "axios";
const { TextArea } = Input
const { Option } = Select;

const Addtes = () =>{
	const navigate = useNavigate()
	const [base64Image, setBase64Image] = useState<any>()
	const uploadImage = async (base64Image: any) => {
		try {
			const { data } = await upload(base64Image)
			return data.url;
		} catch (err) {
			console.log(err)
		}
	}
	const onFinish = async (values: any) => {
		try {
			if (base64Image) {
				const imageUrl = await uploadImage(base64Image)
				console.log(imageUrl)
				values.image = imageUrl;
			}
			await axios.post('https://json-server-phanducmanh.herokuapp.com/sories',values)
			message.success("Tạo mới thành công")
			navigate('/admin/add')
		} catch (err) {
			message.error("Có lỗi xảy ra")
		}
	};

	const onFinishFailed = (errorInfo: any) => {
		console.log('Failed:', errorInfo);
	};

	const handleChangeImage = (event: any) => {
		const file = event.target.files[0]
		if (file.size > 1024 * 1024 * 2) {
			message.error('Ảnh không được lớn hơn 2MB');
			return;
		 }
		const reader = new FileReader()
		reader.readAsDataURL(file)
		reader.onloadend = () => {
			 setBase64Image(reader?.result);
		}
	}

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
                  		<Col span={10}>
					<Container>
						<UploadWrapper>
							<UploadIcon>
								<PlusCircleOutlined style={{ fontSize: 30 }} />
								<input
									type="file"
									accept="image/png, image/jpg, image/jpeg, image/gif"
									name="image" onChange={handleChangeImage} />
							</UploadIcon>
							{base64Image && (
								<ImagePreview src={base64Image}/>
							)}
						
						</UploadWrapper>
					</Container>
				</Col>
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

export default Addtes;