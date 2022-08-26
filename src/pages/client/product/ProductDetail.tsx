import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { getProduct } from '../../../redux/actions';
import { useParams, useSearchParams, Link, useNavigate } from 'react-router-dom';
import { Typography, Row, Col, Button, message } from "antd";
import { ShoppingCartOutlined } from "@ant-design/icons";
import cartSlice from "../../../components/client/Cart/cartSlice";
import "animate.css/animate.min.css";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast, cssTransition } from "react-toastify";
import imgDetail from '../../../lib/img/detailProduct1.png'
import noibat from '../../../lib/img/Rectangle.png'
import axios from 'axios';
import { useState } from 'react';
import styles from '../../../components/client/style.module.css'
import { currency } from "../../../helper";
import { money } from '../../../money';
import { AnyAction } from 'redux';

const ProductDetail = () => {
  const dispatch = useDispatch();
  const {id} = useParams();
  const navigate = useNavigate()
  const [products, setProducts] = useState([]);
  const product = useSelector((store:any) => store.product?.product?.getProduct)
  const [list, setList] = useState([]);
  const addToCart = (product:any) => {
      dispatch(cartSlice.actions.add(product));
      toast('🦄 Wow so easy!', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
  }
  useEffect(()=>{
    const cate = products?.filter((p:any) => p.categories == product?.categories)
    setList(cate)
  },[product, products])
  useEffect(() => {
    const getProducts = async () => {
      const {data} = await axios.get('https://json-server-phanducmanh.herokuapp.com/products')
      setProducts(data)
    };
    getProducts()
  },[])
  useEffect(() => {
    getProduct(id, dispatch)
  },[id])
  return (
    <>
      <Page style={{ padding: '5px 0' }}><span style={{ padding: '0px 35px'}}>Trang chủ   &gt;   Chi tiết sản phẩm</span></Page>
      <div style={{ padding: '0px 35px' }}>
          {product && (
            <>
            <div style={{display: 'flex',  padding: '10px 0', alignItems: 'baseline'}}>
            <H2 style={{ }}>{product.name}</H2>
            <div style={{ paddingTop: '10px',display: 'flex',alignItems: 'center',justifyContent: 'center'}}>
                <span style={{ color: 'orange' }} className="fa fa-star checked"></span>
                <span style={{ color: 'orange' }} className="fa fa-star checked"></span>
                <span style={{ color: 'orange' }} className="fa fa-star checked"></span>
                <span style={{ color: 'orange' }} className="fa fa-star checked"></span>
                <span style={{ color: 'orange' }} className="fa fa-star checked"></span>
                <span style={{ marginLeft: '10px', fontSize: 14 }}>11 đánh giá</span>
            </div>
            </div>
            <hr style={{    border:' none',display:' block',     backgroundColor: '#f5f5f5',
            height: '2px',
            margin: '0.2rem 0'}} />
            <Add style={{ padding:' 35px 0'}}>
                <div style={{ marginLeft: 60}}>
                  <img src={product.image} alt="loi" />
                </div>
                <div style={{ marginLeft: 75}}>
                  <div style={{display: 'flex' , alignItems: 'center'}}>
                    <div style={{marginRight: 20,fontSize: 20, color: 'red', fontWeight: '600' }}>{money(product.saleOffPrice)} ₫</div>
                    <div style={{color: '#838080'}}>{money(product.originalPrice)} ₫</div>
                  </div>
                  <Sales>
                    <Create>Ưu đãi thêm</Create>
                    <ul className={styles.create}>
                      <li><a href="">Giảm thêm tới 1% cho thành viên Smember</a></li>
                      <li><a href="">Giảm thêm 5% tối đa 1 triệu khi thanh toán qua Kredivo</a></li>
                      <li><a href="">Mở thẻ tín dụng Citibank - Nhận e-voucher tới 2 triệu</a></li>
                      <li><a href=""> Mở thẻ tín dụng TPBank EVO - Nhận ưu đãi đến 6.6 triệu</a></li>
                      <li><a href=""> Giảm thêm 5% (tối đa 200.000đ) qua ví Moca cho đơn hàng từ 500.000đ</a></li>
                      <li><a href=""> Nhập QRCPS giảm đến 300.000đ áp dụng các đơn hàng từ 4 triệu trở lên khi thanh toán qua VNPAY tại cửa hàng</a></li>
                      <li><a href="">Giảm thêm 500.000đ khi thanh toán qua thẻ tín dụng VP Bank cho đơn hàng từ 10 triệu</a></li>
                      <li><a href="">Thu cũ đổi mới: Giá thu cao - Thủ tục nhanh chóng - Trợ giá tốt nhất</a></li>
                    </ul>
                  </Sales>
                  <div style={{fontSize: 12, color: '#000'}}>{product.description}</div>
                </div>
            </Add>
                <div style={{display:"flex", alignItems: 'center'}}>
                  <div style={{display:"flex"}}>
                    <div style={{border: '1px solid #c9c9c9', padding: '7px', borderRadius: 5, margin: '0 5px', textAlign: 'center'}}><img src={noibat} alt="" /><div>Thêm vào</div><div> nổi bật</div></div>
                    <div style={{border: '1px solid #c9c9c9', padding: '7px', borderRadius: 5, margin: '0 5px'}}><img src={imgDetail} alt="" /></div>
                    <div style={{border: '1px solid #c9c9c9', padding: '7px', borderRadius: 5, margin: '0 5px'}}><img src={imgDetail} alt="" /></div>
                    <div style={{border: '1px solid #c9c9c9', padding: '7px', borderRadius: 5, margin: '0 5px'}}><img src={imgDetail} alt="" /></div>
                    <div style={{border: '1px solid #c9c9c9', padding: '7px', borderRadius: 5, margin: '0 5px'}}><img src={imgDetail} alt="" /></div>
                  </div>
                 <div style={{display:"flex", marginLeft: '20px'}}>
                  <div> <Button style={{backgroundColor: '#ff5757', color: 'white', padding: '5px 40px',display: 'inline-block', fontWeight: '600'}}>Mua ngay</Button></div>
                  <div style={{marginLeft: '10px'}}><Button onClick={() => addToCart(product)} type="primary" danger icon={<ShoppingCartOutlined />} /></div>
                  <div style={{marginLeft: '10px'}}> 
                  </div>
                 </div>
                </div>
      <h2 style={{ fontWeight: 600, color: '#444', padding: '20px 0px' }}>Sản phẩm cùng loại</h2>
      <Section>
        {list
          .filter((item: any) => item.isDelete == false)
          .map((product: any, index) => (
            <ProductList style={{ padding: '20px 10px' }}>
              <div className={styles.image}>
              <Link to={`/product/detail/${product.id}`}><img style={{ width: '160px', margin: '10px 0' }} src={product.image} alt="3123123" /></Link>
              </div>
              <Link to={`/product/detail/${product.id}`}><Namepro style={{ paddingTop: '10px', color: 'black' }}>{product.name}</Namepro></Link>
              <Price style={{ paddingTop: '10px' }}>
                <PriceSale style={{ color: 'red', fontWeight: '600', fontSize: '15px', marginRight: '15px' }}>{money(product.saleOffPrice)} ₫</PriceSale>
                <PriceOrigin style={{ fontSize: '13px' }}>{money(product.originalPrice)} ₫</PriceOrigin>
              </Price >
              <Upto>
                <p style={{ margin: 0, padding: 0 }}>Trả góp 0% khi thanh toán bằng thẻ tín dụng</p>
              </Upto>
              <div style={{ paddingTop: '10px' }}>
                <span style={{ color: 'orange' }} className="fa fa-star checked"></span>
                <span style={{ color: 'orange' }} className="fa fa-star checked"></span>
                <span style={{ color: 'orange' }} className="fa fa-star checked"></span>
                <span style={{ color: 'orange' }} className="fa fa-star checked"></span>
                <span style={{ color: 'orange' }} className="fa fa-star checked"></span>
                <span style={{ marginLeft: '10px' }}>11 đánh giá</span>
              </div>
            </ProductList>
          ))}
      </Section>
            </>
          )}
          
      </div>
    </>
  )
}

const Add = styled.div`
  display: flex;
`
const Sales = styled.div`
margin: 20px 0;
  border-radius: 10px;
  overflow: hidden;
  border: 1px solid #d1d5db;
`

const Create = styled.div`
  font-size: 14px;
    width: 100%;
    padding: 10px;
    background-color: #d1d5db;
`
const Page = styled.div`
width: 100%;
    height: 30px;
    display: flex;
    align-items: center;
    background: #fff;
    box-shadow: 0 1px 2px 0 rgb(60 64 67 / 10%), 0 2px 6px 2px rgb(60 64 67 / 15%);
    z-index: 1;
    overflow-x: auto;
    position: relative;
        margin-right: 10px;
    margin-bottom: 0;
    font-size: 12px;
    text-decoration: none;
    color: #707070;
    white-space: nowrap;
`


const ProductList = styled.div`
  width: auto;
    height: auto;
    min-height: 202px;
    position: relative;
    border-radius: 15px;
    padding: 10px;
    margin-bottom: 10px;
    background-color: #fff;
    box-shadow: 0 1px 2px 0 rgb(60 64 67 / 10%), 0 2px 6px 2px rgb(60 64 67 / 15%);
    transition-property: transform;
`
const Section = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
  grid-gap: 10px;
`
const Upto = styled.div`
  width: auto;
    display: flex;
    padding: 5px;
    border-radius: 5px;
    border: 1px solid #e5e7eb;
    background: #f3f4f6;
    align-items: flex-start;
    margin-left: 0;
    font-size: 12px;
    line-height: 1.5;
    text-transform: none;
    overflow: hidden;
`
const Banner = styled.div`
  display: grid;
  grid-template-columns: 15% 85%;
  padding: 15px 15px;
`
const Category = styled.div`
  align-items: center;
 `
const PriceOrigin = styled.div`
      display: inline-block;
    margin: 0 0 10px 10px;
    font-size: 14px;
    font-weight: 600;
    text-decoration: line-through;
    color: #707070;
    position: relative;
    top: 2px;
`
const Price = styled.div`
  color: #444;
    line-height: 1.4;
    align-items: flex-end;
    font-family: sans-serif;
    display: flex;
    font-weight: 700;
`
const PriceSale = styled.div`
  display: inline-block;
    margin-bottom: 10px!important;
    font-size: 18px;
    font-weight: 700;
    line-height: 1.1;
    font-size: 16px;
    color: #d70018;
`
const Namepro = styled.div`
 -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    display: -webkit-box;
    overflow: hidden;
    font-size: 14px;
    height: 65px;
    font-weight: 600;
    position: relative;
    z-index: 10;
 `
const H2 = styled.div`
color: #0a263c;
    margin: 0 10px 0 0;
    font-size: 18px;
    font-weight: 700;
    line-height: 2;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
`
export default ProductDetail