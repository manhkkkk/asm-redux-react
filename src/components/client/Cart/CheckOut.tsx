import { yupResolver } from '@hookform/resolvers/yup'
import { Form, Input, message } from 'antd'
import React from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { useCart } from 'react-use-cart'
import styled from 'styled-components'
import { addOrder } from '../../../api/OderAPI'
import * as yup from "yup"
import { money } from '../../../money'
import { useSelector } from 'react-redux';

const fromSchema = yup.object().shape({
    phone: yup
        .string()
        .required("Không được để trống")
        .min(10, "Ít nhất 10 ký tự"),
    name: yup
        .string()
        .required("Không được để trống")
        .min(3, "Ít nhất 3 ký tự"),
    email: yup.string().required("Không được để trống").email("Đây không phải định dạng email").min(8, "Ít nhất 8 ký tự"),
    address: yup
        .string()
        .required("Không được để trống")
        .min(3, "Ít nhất 3 ký tự"),

});
const validation = { resolver: yupResolver(fromSchema) };

const Checkout = () => {
   const { items, cartTotal, updateItemQuantity, removeItem } = useCart();
   const { register, handleSubmit, formState, reset } = useForm<any>(validation);
   const navigator = useNavigate()
   const {cart} = useSelector((store:any) => store)
   console.log(cart);
   
    console.log(cart);
    const onSubmit: SubmitHandler<any> = async (user) => {
        const {data} = await addOrder({
            userOrder: user,
            listOrder: cart.cart,
            cartTotal: cart.cartTotal,
            status: 0
        });
        message.success('tao don hang thanh cong')
    }

    return (
        <div>
            <Cart>
                <h1>Thanh toán</h1>
                <Form onFinish={onSubmit}>

                    <Info>
                        <h2>Thông tin người dùng</h2>
                        <Form.Item
							name="name"
							labelCol={{ span: 24 }}
							label="Họ và tên"
							rules={[{ required: true, message: 'Họ và tên không được trống' },{min:3, message: 'Ít nhất 3 ký tự'}]}
						>
							<Input size="large" />
						</Form.Item>
                        <Form.Item
							name="email"
							labelCol={{ span: 24 }}
							label="Email"
							rules={[{ required: true, message: 'Email không được trống' }]}
						>
							<Input size="large" />
						</Form.Item>
                        <Form.Item
							name="phone"
							labelCol={{ span: 24 }}
							label="Số điện thoại"
							rules={[{ required: true, message: 'Số điện thoại không được trống' }]}
						>
							<Input size="large" />
						</Form.Item>
                        <Form.Item
							name="address"
							labelCol={{ span: 24 }}
							label="Địa chỉ"
							rules={[{ required: true, message: 'Địa chỉ phẩm không được trống' }]}
						>
							<Input size="large" />
						</Form.Item>

                    </Info>
                    <div style={{ boxShadow: '5px 5px 10px  #888888', padding: '20px', borderRadius: '10px' }}>
                        <TongTien>
                            <p>Tổng tiền tạm tính:</p>
                            <p style={{ color: "red" }}>{money(cart.total)} ₫</p>
                        </TongTien>
                        <div>
                            <DatHang>Đặt hàng</DatHang>
                        </div>
                        <div>
                            <Link to='/'> <ThemSanPhamKhac>Chọn thêm sản phẩm khác</ThemSanPhamKhac></Link>
                        </div>
                    </div>
                </Form>

            </Cart>
        </div>
    )
}
const Cart = styled.div`
  width: 50%;
  margin: auto;
`
const Btn = styled.button`
    width: 100%;
    background-color: #FF424E;
    color: #fff;
    padding: 5px;
    border: 1px solid #FF424E;
    margin-top: 20px;
`
const TongTien = styled.div`
  display: flex;
  justify-content: space-between;
  font-weight: 600;
`
const DatHang = styled.button`
  width: 100%;
  background-color: red;
  color:#fff;
  padding: 10px 5px;
  margin: 10px 0;
  border: none;
  border-radius: 4px;
  text-transform: uppercase;
  cursor: pointer;
`
const ThemSanPhamKhac = styled.button`
  width: 100%;
  color:red;
  padding: 10px 5px;
  border: 1px solid red;
  border-radius: 4px;
  transition: all ease-in-out 0.2s;
  text-transform: uppercase;
  cursor: pointer;
  /* :hover{
    transition: all ease-in-out 0.2s;
    background-color: red;
    color:#fff;
  } */
`
const Info = styled.div`
box-shadow: 5px 5px 10px #888888;
padding: 30px;
margin-top: 20px;
margin-bottom: 30px;
border-radius: 10px;
`
const Error = styled.div`
    color: red;
    margin-bottom: 10px;
	`

export default Checkout