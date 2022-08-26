import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Typography, Col, Row, Button, Checkbox, Form, Input, InputNumber, Select, message } from 'antd'
import { useNavigate } from "react-router-dom";
import { PlusCircleOutlined } from '@ant-design/icons';
import { upload } from "../../api/images";
import { createProduct } from "../../api/Product";
const { TextArea } = Input
const { Option } = Select;

const AddProductPage = () =>{
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
			await createProduct(values)
			message.success("Tạo mới thành công")
			navigate(-1)
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
						<Label>Mô tả ngắn</Label>
						<TextArea rows={4} placeholder="Mô tả ngắn" />
					</Container>
				</Col>
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
							name="name"
							labelCol={{ span: 24 }}
							label="Tên sản phẩm"
							rules={[{ required: true, message: 'Tên sản phẩm không được trống' }]}
						>
							<Input size="large" />
						</Form.Item>

						<Row gutter={16}>
							<Col span={12}>
								<Form.Item
									name="originalPrice"
									label="Giá gốc"
									labelCol={{ span: 24 }}
									rules={[{ required: true, message: 'Gía sản phẩm' }]}
									>
									<InputNumber style={{ width: '100%' }} size="large" />
								</Form.Item>
							</Col>
							<Col span={12}>
								<Form.Item
									name="saleOffPrice"
									label="Giá giảm"
									labelCol={{ span: 24 }}
									rules={[{ required: true, message: 'Gía sản phẩm' }, ({ getFieldValue }) => ({
										validator(_, value) {
											if (value > getFieldValue('originalPrice')) {
												return Promise.reject('Giá khuyến mãi phải bé hơn giá gốc')
											}
											return Promise.resolve();
										}
									})]}
								>
									<InputNumber style={{ width: '100%' }} size="large" />
								</Form.Item>
							</Col>
							<Col span={12}>
								<Form.Item
									label="Phân loại"
									name="categories"
									rules={[{ required: true }]}
								>
									<Select style={{ width: '100%' }} size="large">
										<Option value="SmartPhone">Điện thoại</Option>
										<Option value="Laptop">Laptop</Option>
										<Option value="HeadPhone" >
											Phụ kiện
										</Option>
										<Option value="Ipad">Máy tính bảng</Option>
									</Select>
								</Form.Item>
							</Col>
						</Row>

						<Form.Item
							name="feature"
							labelCol={{ span: 24 }}
							label="Đặc điểm nổi bật"
							rules={[{ required: true, message: 'Đặc điểm sản phẩm' }]}
						>
							<TextArea name="feature" />
						</Form.Item>
						<Form.Item
							name="description"
							labelCol={{ span: 24 }}
							label="Mô tả sản phẩm"
							rules={[{ required: true, message: 'Mô tả sản phẩm' }]}
						>
							<TextArea name="description" />
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

export default AddProductPage