import React from "react";
import { Col, Divider, Row, Typography, Button, InputNumber } from 'antd'
import { useDispatch, useSelector } from "react-redux";
import { currency } from "../../../helper";
import cartSlice from "./cartSlice";
import { money } from "../../../money";
import { useCart } from 'react-use-cart'
import { CloseOutlined, PlusSquareFilled, MinusSquareFilled } from '@ant-design/icons';
import { Modal } from 'antd';
import styled from 'styled-components'
import { Link } from "react-router-dom";
import styles from '../../client/style.module.css'
const { Title } = Typography

const Cart = () => {
    const {cart} = useSelector((store:any) => store)
    console.log(cart);
    const dispatch = useDispatch()
    const increaseProduct = (id:any) => {
        dispatch(cartSlice.actions.increase(id))
    }
    const decreaseProduct = (id:any) => {
        dispatch(cartSlice.actions.decrease(id))
    }
    return (
        <CartList>
            <CartMenu>
                <p style={{fontWeight:600, fontSize:18, paddingTop: 20, color: 'red', marginBottom: 0}}>Giỏ hàng</p>
            </CartMenu>
            {cart?.cart?.map((item:any) =>(
            <Box className="cart">
                <ProductInfo>
                    <>
                    <Img>
                    <img style={{width: '100%', padding: 10}} src={item.image}/>
                    </Img>
                    <ProductDetail>
                        <p style={{fontSize: 15, paddingRight: 15, fontWeight: 700}}>{item.name}</p>
                        <div style={{display: 'flex'}}>
                        <p style={{fontSize: 15, color: 'red', fontWeight: 700}}>{money(item.saleOffPrice)} đ</p>
                        <p style={{fontSize: 14, marginLeft: 5, color: '#777', textDecoration: 'line-through'}}>{money(item.originalPrice)} đ</p>
                        </div>
                        <Quantity>
                            <div style={{ display: 'flex'}}>
                            <p style={{marginRight: 5}}>Chọn số lượng: </p>
                            <Col ><Button  style={{borderRight: 0}} onClick={() => decreaseProduct(item.id)}>-</Button></Col>
                            <input type="number" value={item.amount ? item.amount : 1} style={{display: 'flex',border: '1px solid transparent',borderColor: '#d9d9d9', textAlign: 'center', borderRight: '0px', borderLeft: '0px', width: '40px'}}/>
                            <Col><Button style={{ borderLeft: 0}}  onClick={() => increaseProduct(item.id)}>+</Button></Col>
                            </div>
                        </Quantity>
                    </ProductDetail>
                    </>
                </ProductInfo>
            </Box>
            ))}
            <Total>
                <div style={{display: 'flex', justifyContent: "space-between"}}>
                    <p style={{fontWeight: 600, margin: 0}}>Tổng tiền tạm tính</p>
                    <div style={{fontWeight: 700, color: 'red'}}>{money(cart?.total)} đ</div>
                </div>
                <div>
                    <Link to="/checkout"><Buttons >Tiến hành đặt hàng</Buttons></Link>
                    <Link to="/"><Chon className={styles.naviget}>Chọn thêm sản phẩm khác</Chon></Link>
                </div>
            </Total>
        </CartList>
    )
}
const Chon =styled.div`
    color: #dc3545;
    border: 1px solid #dc3545;
    display: inline-block;
    padding: 0.375rem 0.75rem;
    line-height: 1.5;
    border-radius: 0.25rem;
    transition: color .15s ease-in-out,background-color .15s ease-in-out,border-color .15s ease-in-out,box-shadow .15s ease-in-out;
    width: 100%!important;
    font-weight: 600;
    text-transform: uppercase;
    height: 60px;
    display: flex;
    align-items: center;
    justify-content: center;
`
const Buttons = styled.div`
    color: white;
    background-color: #d70018;
    display: flex!important;
    text-align: center;
    height: 60px;
    display: inline-block;
    font-weight: 600;
    text-transform: uppercase;
    text-align: center;
    user-select: none;
    justify-content: space-around;
    border: 1px solid transparent;
    padding: 0.375rem 0.75rem;
    align-items: center!important;
    border-radius: 0.25rem;
    transition: color .15s ease-in-out,background-color .15s ease-in-out,border-color .15s ease-in-out,box-shadow .15s ease-in-out;
    margin: 10px 0;
  
`
const Cong = styled.div`
        height: 25px;
    width: 30px;
    text-align: center;
    font-size: 14px;
    border: 1px solid #ddd;
    border-left: 0;
    border-right: 0;
    border-radius: 0;
    padding: 0;
`
const Tru = styled.div`
    width: 25px;
    height: 25px;
    background: #fff;
    padding: 8px 5px;
    border: 1px solid #ddd;
    border-right: 0;
    border-radius: 4px 0 0 4px;
`
const ProductDetail = styled.div`
    width: 65%;
    `

const Img = styled.div`
width: 35%;
`
const ProductInfo = styled.div`
    display: flex!important;`
const CartMenu = styled.div`
    display: flex;
    background: #fff;
    min-height: auto;
    max-width: 600px;
    margin: auto;
    position: relative;
    color: var(--main-color);
    align-items: center;
    justify-content: center;
`
const Total = styled.div`
    background: #fff;
    max-width: 600px;
        border-radius: 15px;
    box-shadow: 0 1px 2px 0 rgb(60 64 67 / 10%), 0 2px 6px 2px rgb(60 64 67 / 15%);
    padding: 10px;
    position: relative;
`
const CartList = styled.div`
    max-width: 600px;
    align-items: center;
    margin: auto;
`
const Box = styled.div`
    background: #fff;
    border-radius: 15px;
    box-shadow: 0 1px 2px 0 rgb(60 64 67 / 10%), 0 2px 6px 2px rgb(60 64 67 / 15%);
    padding: 10px ;
    position: relative;
    margin: 20px 0;
`
const Quantity = styled.div`
`
export default Cart;