import { Typography, Col, Button, message } from "antd";
import { ShoppingCartOutlined } from "@ant-design/icons";
import cartSlice from "../Cart/cartSlice.js";
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useRef, useState } from "react";
import styles from "../style.module.css"
import "animate.css/animate.min.css";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast, cssTransition } from "react-toastify";
import axios from "axios";
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Layout, Input, Select } from 'antd';
import styled from 'styled-components'
import {
  SearchOutlined,LaptopOutlined, EnvironmentOutlined 
} from '@ant-design/icons';
import vanchuyen from '../../../lib/img/Vanchuyen.png'
import vitri from '../../../lib/img/Vỉtri.png'
import giohang from '../../../lib/img/Giohang.png'
import banner from '../../../lib/img/banner.png'
import { Link } from 'react-router-dom';
import { logoutSuccess } from '../../../pages/client/auth/authSlice';
const { Title } = Typography;

const AddCart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [products , setProduct] = useState([])
  const [searchParams, setSearchParams] = useSearchParams();
  const searchTerm = searchParams.get('name') || '';
  const [category, setCategory] = useState([]);
  useEffect(() => {
    const getCategory = async () => {
      const {data} = await axios.get('https://json-server-phanducmanh.herokuapp.com/category')
      setCategory(data)
    };
    getCategory()
  }, [])
  useEffect(() => {
    const filter = async () =>{
      const {data} = await axios.get(`https://json-server-phanducmanh.herokuapp.com/products`)
      setProduct(data);
    };
    filter()
  },[])
  const handleSearch = (event) => {
    const name = event.target.value;
    console.log(name);
    if (name) {
      setSearchParams({ name });
    }
  }
  const user = useSelector((state) => state.auth.login.currentUser);
  const cart = useSelector((state) => state);
  console.log(cart);
  const addToCart = (product) => {
    dispatch(cartSlice.actions.add(product))
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
  return  (
    <>
      <div style={{ fontSize: '12px' }}>
      <Container>
        <Logo>
          <Link to='/'><img style={{ width: '40px', height: '40px', margin: '0 20px' }} src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSGEYEpW1vU6CUR0j02DyPoWtcoapc34tkhkMSgWG7kHw&s" alt="loi" /></Link>
        </Logo>
        <Search>
          <Input onChange={handleSearch} style={{ borderRadius: '20px', height: '35px' }} size="large" prefix={<SearchOutlined />} />
        </Search>
        {searchTerm && (
          <Row >
          {products
          .filter((product) => product.name.toString().toLowerCase().includes(searchTerm.toLowerCase()))
          .map((item) => (
            <div style={{display: 'flex', margin: '20px 0', alignItems: 'center', textAlign: 'center', padding: '5px 20px'}}> 
              <div><img style={{ width: '40px', height: '40px', margin: '0 20'}}src={item.image} alt="" /></div>
              <div><Link to={`/product/detail/${item.id}`}>{item.name}</Link></div>
            </div>
          ))}
        </Row>
        )}
        <Info>
          <Hotels>
            <div>Gọi mua hàng</div>
            <div>1800.2097</div>
          </Hotels>
          <Hotels style={{ display: 'flex' }}>
            <div style={{ marginRight: '6px' }}>
              <img style={{ width: 30 }} src={vanchuyen} alt="" />
            </div>
            <div>
              <div>Cửa hàng</div>
              <div>gần bạn</div>
            </div>
          </Hotels>
          <Hotels style={{ display: 'flex' }}>
            <div style={{ marginRight: '6px' }}>
              <img style={{ width: 20 }} src={vitri} alt="" />
            </div>
            <div>
              <div>Tra cứu</div>
              <div>đơn hàng</div>
            </div>
          </Hotels>
          <Hotels style={{ display: 'flex' }}>
            <div style={{ marginRight: '6px' }}>
              <Link to={`/cart`}><img style={{ width: 20 }} src={giohang} alt="" /></Link>
            </div>
            <div>
              <div>Gio</div>
              <div>hàng</div>
            </div>
          </Hotels>
          {user && (
            <>
              <Hotels style={{ display: 'flex' }}>
                <Dropdown style={{ marginRight: '6px' }}>
                <Link to="/login"><i className='far fa-user-circle' style={{ color: 'white', fontSize: 25 }}></i></Link>
                 <div> <Link to="/admin" style={{color: 'white'}}>{`${user?.user?.role == 1 ? `Admin` : `User`}`}</Link></div>
                  <Content>
                    <div>{user?.user?.username}</div>
                    <button className="unique" style={{border: 'none'}} onClick={() => dispatch(logoutSuccess())}>Logout</button>
                  </Content>
                </Dropdown>
              </Hotels>

            </>
          )}
          {!user && (
            <Hotels style={{ display: 'flex' }}>
              <div style={{ marginRight: '6px' }}>
                <Link to="/login"><i className='far fa-user-circle' style={{ color: 'white', fontSize: 25 }}></i></Link>
              </div>
            </Hotels>
          )}
        </Info>
      </Container>
      </div>
      <Banner>
    <Category >
      <ul className={styles.boder} style={{ listStyle: 'none', padding: '0', paddingLeft: '12px'}}>
         {category?.map((category) => (
          <li style={{display: 'flex', margin: '10px 0', alignItems: 'center'}}>
          <img style={{width: '25px'}} src="https://cdn.cellphones.com.vn/media/icons/menu/icon-cps-380.svg" alt="" />
          <Link to={`/categories/${category.id}`} > <div style={{ width: '100%', marginLeft: 7, color: 'black', fontSize: 14 }} >{category.name}</div></Link>
          </li>
         ))}
        {/* <li style={{display: 'flex', marginTop: '5px'}}>
          <img style={{width: '25px'}} src="https://cdn.cellphones.com.vn/media/icons/menu/icon-cps-4.svg" alt="" /> 
          <Select style={{ width: '100%' }} bordered={false} value="SmartPhone" ></Select>
        </li>
        <li style={{display: 'flex', marginTop: '5px'}}>
          <img style={{width: '25px'}} src="https://cdn.cellphones.com.vn/media/icons/menu/icon-cps-220.svg" alt="" /> 
          <Select style={{ width: '100%' }} bordered={false} value="SmartPhone" ></Select>
        </li>
        <li style={{display: 'flex', marginTop: '5px'}}>
          <img style={{width: '25px'}} src="https://cdn.cellphones.com.vn/media/icons/menu/icon-cps-610.svg" alt="" /> 
          <Select style={{ width: '100%' }} bordered={false} value="SmartPhone" ></Select>
        </li>
        <li style={{display: 'flex', marginTop: '5px'}}>
          <img style={{width: '25px'}} src="https://cdn.cellphones.com.vn/media/icons/menu/icon-cps-1124.svg" alt="" /> 
          <Select style={{ width: '100%' }} bordered={false} value="SmartPhone" ></Select>
        </li> */}
      </ul>
    </Category>
    <Category style={{padding: '0 15px'}}>
        <img style={{width: '975px', height: '370px'}} className={styles.boder} src={banner} alt="" />
    </Category>
  </Banner>
  <Section>
        {products
          .filter((product) => product.name.toString().toLowerCase().includes(searchTerm.toLowerCase()))
          .filter((item) => item.isDelete == false)
          .map((product, index) =>(
           <div style={{padding: '20px 10px'}} className={styles.boder} >
              <div className={styles.image}>
                <img style={{width: '50%', height: '170px'}} src={product.image} alt="3123123" />
              </div>
              <Link to={`/product/detail/${product.id}`}><div style={{paddingTop: '10px', fontWeight: '500',color: 'black', fontSize: '18px'}}>{product.name}</div></Link>
              <div style={{paddingTop: '10px'}}>
                <span style={{color: 'red', fontWeight: '600', fontSize: '15px', marginRight: '15px'}}>{product.saleOffPrice}$</span>
                <span style={{ fontSize: '13px'}}>{product.originalPrice}$</span>
              </div >
             <div style={{paddingTop: '10px'}}>
             <span style={{ color: 'orange'}} className="fa fa-star checked"></span>
              <span style={{ color: 'orange'}} className="fa fa-star checked"></span>
              <span style={{ color: 'orange'}} className="fa fa-star checked"></span>
              <span style={{ color: 'orange'}} className="fa fa-star checked"></span>
              <span style={{ color: 'orange'}} className="fa fa-star checked"></span>
              <Button style={{float: 'right'}} onClick={() => addToCart(product)} type="primary" danger icon={<ShoppingCartOutlined />} />
              <span style={{ marginLeft: '10px'}}>11 đánh giá</span>
             </div>
           </div>
        ))}
       
  </Section>
    
    </>
  );
};

const Container = styled.div`
  background: red;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #ffffff;
  padding:  10px 15px;
`
const Logo = styled.div`
  
`
const Search = styled.div`
  width: 30%;
`
const Info = styled.div`
  display: flex;
  align-items: center;
  `

const Hotels = styled.div`
  align-items: center;
  margin: 0 10px; 
`
const Content = styled.div`
 display: none;
 &:hover .unique {
  background: #779b97;
  color: #ffffff;
  border: none;
    box-shadow: 0 8px 24px rgb(0 0 0 / 20%);
    cursor: pointer;
    overflow: hidden;
    position: relative;
    text-align: center;
    -webkit-transform: rotateY(0deg);
    transform: rotateY(0deg);
    -webkit-transform-style: preserve-3d;
    transform-style: preserve-3d;
    transition: all 1s ease-out;
 }
`
const Section = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
  grid-gap: 20px;
`
const Banner = styled.div`
  display: grid;
  grid-template-columns: 20% 80%;
  padding: 15px 15px;
`
const Category = styled.div`
  align-items: center;
 `
const Row = styled.div`
    width: 29%;
    color: black;
    padding: 10px 0 0;
    border-radius: 10px;
    background: #fff;
    position: absolute;
    top: 44px;
    left: 272px;
    z-index: 31;
`
const Dropdown = styled.div`
  position: relative;
  &:hover ${Content}  {
    font-size: 12px;
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
    display: block;
    width: 60px;
    height: 40px;
    color: black;
    background-color: #f2f7f7;
    overflow: hidden;
    position: absolute;
    border: none;
    box-shadow: 0 8px 24px rgb(0 0 0 / 20%);
    cursor: pointer;
    text-align: center;
    -webkit-transform: rotateY(0deg);
    transform: rotateY(0deg);
    -webkit-transform-style: preserve-3d;
    transform-style: preserve-3d;
    transition: all 1s ease-out;
    z-index: 1;
  }
  `
export default AddCart;