import React, { useEffect, useState } from 'react'
import { Layout, Input, Select } from 'antd';
import styled from 'styled-components'
import {
  SearchOutlined, LaptopOutlined, EnvironmentOutlined, UserOutlined
} from '@ant-design/icons';
import vanchuyen from '../../lib/img/Vanchuyen.png'
import vitri from '../../lib/img/Vỉtri.png'
import giohang from '../../lib/img/Giohang.png'
import { Link, Outlet, useLocation, useSearchParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logoutSuccess } from '../../pages/client/auth/authSlice';
import axios  from 'axios';

type Props = {}
const { Option } = Select;

const Header = (props: Props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [products , setProduct] = useState([])
  const [searchParams, setSearchParams] = useSearchParams();
  const amount = useSelector((store:any) => store.cart.amount)
  const searchTerm = searchParams.get("name") || '';
  useEffect(() => {
    const filter = async () =>{
      const {data} = await axios.get(`https://json-server-phanducmanh.herokuapp.com/products`)
      setProduct(data);
    };
    filter()
  },[])

  const handleSearch = (event:any) => {
    const name = event.target.value;
    if (name) {
      setSearchParams({ name });
    }
  }
  const user = JSON.parse(localStorage.getItem('user') as string);

  const logout = async () =>{
    localStorage.removeItem('user');
    navigate('/');
  }
  return (
    <div style={{ fontSize: '12px' }}>
      <Container>
        <Logo>
          <Link to='/'><img style={{ width: 128, height: 102, margin: '-49px 20px', position: 'absolute' }} src="https://www.apple.com/ac/globalnav/7/en_VN/images/be15095f-5a20-57d0-ad14-cf4c638e223a/globalnav_apple_image__b5er5ngrzxqq_large.svg" alt="loi" /></Link>
        </Logo>
        <Search>
          <Input onChange={handleSearch}  style={{ borderRadius: '20px', height: '35px' }} size="large" prefix={<SearchOutlined />} />
        </Search>
        {searchTerm && (
          <Row >
          {products
          ?.filter((product:any) => product.name.toString().toLowerCase().includes(searchTerm.toLowerCase()))
          ?.map((item:any) => (
            <div style={{display: 'flex', margin: '20px 0', alignItems: 'center', textAlign: 'center', padding: '5px 20px'}}> 
              <div><img style={{ width: '40px', height: '40px', margin: '0 20'}}src={item.image} alt="" /></div>
              <div><Link to={`/product/detail/${item.id}`}>{item.name}</Link></div>
            </div>
          ))}
        </Row>
        )}
        <Info>
          <Hotels style={{ display: 'flex' }}>
            <div style={{ marginRight: '6px' }}>
             <i className="fa fa-phone" style={{fontSize: 18}}></i>
            </div>
            <div>
              <div>Gọi mua hàng</div>
              <div>1800.2097</div>
            </div>
          </Hotels>
          <Hotels style={{ display: 'flex' }}>
            <div style={{ marginRight: '6px' }}>
              <Link to={'/product'}><img style={{ width: 30 }} src={vanchuyen} alt="" /></Link>
            </div>
            <div>
              <div>Cửa hàng</div>
              <div>gần bạn</div>
            </div>
          </Hotels>
          <Hotels style={{ display: 'flex' }}>
            <div style={{ marginRight: '6px' }}>
              <Link to={'/checkoder'}><img style={{ width: 20 }} src={vitri} alt="" /></Link>
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
          <Mount style={{ marginLeft: 7, marginTop: 5, position: 'absolute' }}>{amount}</Mount>
          <div style={{ marginLeft: '20px' }}>
            <div>Gio</div>
            <div>hàng</div>
          </div>
          </Hotels>
          {user && (
            <>
              <Hotels style={{ display: 'flex' }}>
                <Dropdown style={{ marginRight: '6px' }}>
                <Link to="/login"><i className='far fa-user-circle' style={{ color: 'white', fontSize: 25 }}></i></Link>
                 <div> <Link to="/admin" style={{color: 'white'}}>{`${user[0]?.role == 1 ? `Admin` : `User`}`}</Link></div>
                  <Content >
                    <div>{user[0]?.name}</div>
                    <button className="unique" style={{border: 'none'}} onClick={() => logout()}>Logout</button>
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
  )
}
const Mount = styled.div`
  position: relative;

`
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

export default Header