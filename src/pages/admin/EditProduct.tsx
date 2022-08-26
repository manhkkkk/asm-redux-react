import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { Typography, Col, Row, Button, Checkbox, Form, Input, InputNumber, Select, message, Modal } from 'antd'
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { PlusCircleOutlined } from '@ant-design/icons';
import { upload } from "../../api/images";
import { createProduct, updateProduct } from "../../api/Product";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { ProductType } from "../../types/ProductType";

const { TextArea } = Input
const { Option } = Select;
type InputForm = {
   name: string,
   originalPrice: number,
   saleOffPrice: number,
   categories: string,
   feature: string,
   description: string,
   image: string,
}

const EditProductPage = () => {
   const {id} = useParams()
	const navigate = useNavigate()
	const [base64Image, setBase64Image] = React.useState<any>('')
	const [uploadedImage, setUploadedImage] = React.useState<any>('')
   const { handleSubmit, formState: { errors }, control, reset, setValue } = useForm<InputForm>();
   useEffect(() => {
      const getProduct= async () => {
         const {data} = await axios.get(`https://json-server-phanducmanh.herokuapp.com/products/` +id)  
			setUploadedImage(data)
         reset(data);
      }
      getProduct()
   },[])
	const uploadImage = async (base64Image: any) => {
		try {
			const { data } = await upload(base64Image)
			return data.url;
		} catch (err) {
			console.log(err)
		}
	}
	const onFinish: SubmitHandler<InputForm> = async ( product: any) => {
		console.log('success', product);
		try {
			if (base64Image) {
				const imageUrl = await uploadImage(base64Image)
				product.image = imageUrl;
			}
			const {data} = await axios.put(`https://json-server-phanducmanh.herokuapp.com/products/${product.id}`,product)
			message.success("Sửa thành công")
			navigate('/admin')
		} catch (err) {
			message.error("Có lỗi xảy ra")
		}
	};

	const onFinishFailed = (errorInfo: any) => {
		console.log('Failed:', errorInfo);
	};

	const handleChangeImage = (event: any) => {
		const file = event.target.files[0]
		// previewFile(file)
		const reader = new FileReader()
		reader.readAsDataURL(file)
		reader.onloadend = () => {
			setBase64Image(reader?.result);
		}
	}

	return (
		<div>
			<Typography.Title level={3}>Thêm mới sản phẩm</Typography.Title>
         <Row gutter={16}>
			<Col span={10}>
						<Controller
						name="image"
						control={control}
						render={({ field }) =>
						<Form.Item
							labelCol={{ span: 24 }}
							label="Đặc điểm nổi bật"
						>
						<UploadWrapper>
							<UploadIcon>
								<PlusCircleOutlined style={{ fontSize: 30 }} />
								<input
									type="file"
									accept="image/png, image/jpg, image/jpeg, image/gif"
									onChange={handleChangeImage} />
							</UploadIcon>
							{base64Image && (
								<ImagePreview src={base64Image}/>
							)}
							
							{!base64Image && (
								<ImagePreview src={uploadedImage.image}/>
							)}
						</UploadWrapper>
						</Form.Item>
							}
								/>
							<Label>Mô tả ngắn</Label>
							<TextArea rows={4} placeholder="Mô tả ngắn" />
				</Col>
            <Col span={14}>
               <Typography.Title level={5}>Thông tin sản phẩm</Typography.Title>
               <Form
                  autoComplete="on"
                  onFinish={handleSubmit(onFinish)}
                  onFinishFailed={onFinishFailed}
               >
                  <Controller
                     name='name'
                     control={control}
                     rules={{ required: true }}
                     render={({ field }) =>
                        <Form.Item
                           labelCol={{ span: 24 }}
                           label="Tên sản phẩm"
                        >
                           <Input size="large" {...field} />
                        </Form.Item>
                     } />
                  {errors.name && <Typography.Text type='danger'>Bạn cần nhập tên sản phẩm</Typography.Text>}

                  <Row gutter={16}>
                     <Col span={12}>
                        <Controller
                           name="originalPrice"
                           control={control}
                           rules={{ required: true }}
                           render={({ field }) =>
                              <Form.Item
                                 label="Giá gốc"
                                 labelCol={{ span: 24 }}
                              >
                                 <InputNumber {...field} style={{ width: '100%' }} size="large" />
                              </Form.Item>
                           }
                        />
                        {errors.originalPrice && <Typography.Text type='danger'>Bạn cần nhập giá sản phẩm</Typography.Text>}
                     </Col>

                     <Col span={12}>
                        <Controller
                           name="saleOffPrice"
                           control={control}
									rules={{ required: true}}
                           render={({ field }) =>
                              <Form.Item
                                 label="Giá giảm"
                                 labelCol={{ span: 24 }}
                              >
                                 <InputNumber style={{ width: '100%' }} size="large" {...field} />
                              </Form.Item>
                           }
                        />
                        {errors.saleOffPrice && <Typography.Text type='danger'>Bạn cần nhập giá khuyến mãi</Typography.Text>}
                     </Col>
                  </Row>

                  <Controller
                     name="feature"
                     control={control}
                     rules={{ required: true }}
                     render={({ field }) =>
                        <Form.Item
                           labelCol={{ span: 24 }}
                           label="Đặc điểm nổi bật"
                        >
                           <TextArea {...field} />
                        </Form.Item>

                     } />
                  {errors.feature && <Typography.Text type='danger'>Bạn cần nhập đặc điểm</Typography.Text>}

                  <Controller
                     name="description"
                     control={control}
                     rules={{ required: true }}
                     render={({ field }) =>
                        <Form.Item
                           labelCol={{ span: 24 }}
                           label="Mô tả sản phẩm"
                        >
                           <TextArea {...field} />
                        </Form.Item>
                     } />
                  {errors.description && <Typography.Text type='danger'>Bạn cần nhập mô tả</Typography.Text>}

                  <Form.Item>
                     <Button type="primary" htmlType="submit">
                        Sửa sản phẩm
                     </Button>
                  </Form.Item>
               </Form>
            </Col>
         </Row>
		</div>
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

export default EditProductPage