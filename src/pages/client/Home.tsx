import React, { useEffect, useState } from 'react'
import { Layout, Input, Select } from 'antd';
import styled from 'styled-components'
import {
  SearchOutlined, LaptopOutlined, EnvironmentOutlined
} from '@ant-design/icons';
import vanchuyen from '../../lib/img/Vanchuyen.png'
import vitri from '../../lib/img/Vỉtri.png'
import giohang from '../../lib/img/Giohang.png'
import banner from '../../lib/img/banner.png'
import axios from 'axios';
import styles from '../../components/client/style.module.css'
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { useRouter } from 'next/router';
import { useRef } from 'react';
import banerchil from '../../lib/img/banerchildre.png'
import { money } from '../../money';
import { useDispatch, useSelector } from 'react-redux';
import dienthoai from '../../lib/img/dienthoaivui.png'

const { Option } = Select

const Home = () => {
  const [products, setProducts] = useState<any>([])
  const [category, setCategory] = useState([])
  const [sories, setSories] = useState([])
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const amount = useSelector((store:any) => store.cart.amount)
  const searchTerm = searchParams.get("name") || '';
  const handleSearch = (event:any) => {
    const name = event.target.value;
    if (name) {
      setSearchParams({ name });
    }
  }
  const  user  = JSON.parse(localStorage?.getItem('user') as string)
  
  const logout = async () =>{
    localStorage.removeItem('user');
    navigate('/');
  }
  useEffect(() => {
    const getCategory = async () => {
      const { data } = await axios.get('https://json-server-phanducmanh.herokuapp.com/category')
      setCategory(data)
    };
    getCategory()
  }, [])
  useEffect(() => {
    const getProducts = async () => {
      const { data } = await axios.get('https://json-server-phanducmanh.herokuapp.com/products')
      setProducts(data)
    };
    getProducts()
  }, [])
  useEffect(() => {
    const getProducts = async () => {
      const { data } = await axios.get('https://json-server-phanducmanh.herokuapp.com/sories')
      setSories(data)
    };
    getProducts()
  }, [])

  return (
    <><div style={{ fontSize: '12px' }}>
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
          <div style={{ marginRight: '6px'}}>
            <Link to={'/checkoder'}><img style={{ width: 20 }} src={vitri} alt="" /></Link>
          </div>
          <div>
            <div>Tra cứu</div>
            <div>đơn hàng</div>
          </div>
        </Hotels>
        <Hotels style={{ display: 'flex' }}>
            <div>
              <Link to={`/cart`}><img style={{ width: 20 }} src={giohang} /></Link>
            </div>
          <Mount style={{ marginLeft: 6, marginTop: 5,position: 'absolute'  }}>{amount}</Mount>
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
                <Content>
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
      <Banner>
        <Category className={styles.category}>
          <ul style={{ listStyle: 'none', padding: '0', paddingLeft: '12px' }}>
            {category?.map((category: any) => (
              <li style={{ display: 'flex', minHeight: '31.3px', cursor: 'pointer', alignItems: 'center' }}>
                <img style={{ width: '25px' }} src={category.image} alt="" />
                <Link to={`/categories/${category.id}`} > <CateName style={{ width: '100%', marginLeft: 7, color: 'black', fontSize: 12 }} >{category.name}</CateName></Link>
              </li>
            ))}
          </ul>
        </Category>
        <Category style={{ padding: '0 15px' }}>
          <img style={{ width: '1038px', height: '390px' }} className={styles.boder} src={banner} alt="" />
        </Category>
      </Banner>
      <BanerChilder>
        <img style={{ width: '1234px' }} className={styles.bannerchildren} src={banerchil} alt="" />
      </BanerChilder>
      <h2 style={{ fontWeight: 600, color: '#444', padding: '5px 10px' }}>SmartPhone</h2>
      <Section>
        {products
          .filter((product:any) => product.name.toString().toLowerCase().includes(searchTerm.toLowerCase()))
          .filter((item: any) => item.isDelete == false)
          .filter((item: any) => item.categories == 1)
          .map((product: any) => (
            <ProductList style={{ padding: '20px 10px' }}>
              <div className={styles.image}>
                <img style={{ width: '160px', margin: '10px 0' }} src={product.image} alt="3123123" />
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
      <h2 style={{ fontWeight: 600, color: '#444', padding: '5px 10px' }}>Laptop</h2>
      <Section>
        {products
          .filter((product:any) => product.name.toString().toLowerCase().includes(searchTerm.toLowerCase()))
          .filter((item: any) => item.isDelete == false)
          .filter((item: any) => item.categories == 2)
          .map((product: any) => (
            <ProductList style={{ padding: '20px 10px' }}>
              <div className={styles.image}>
                <img style={{ width: '160px', margin: '10px 0' }} src={product.image} alt="3123123" />
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

      <h2 style={{ fontWeight: 600, color: '#444', padding: '5px 10px' }}>Phụ kiện</h2>
      <Sories>
        {sories?.map((product: any, index) => (
          <img style={{ padding: '2px', width: '112px' }} src={product.image} alt="" />
        ))}

      </Sories>
      <Foter>
      <Top>
            <Colums>
               <Colum>
                  <div className={styles.link}>
                     <div className={styles.hotel}> <p style={{fontSize: 16, fontWeight: 600}}>Tìm của hàng</p></div>
                     <ul style={{listStyle: 'none', padding: 0}}>
                        <li><a href="">Tìm cửa hàng gần nhất</a></li>
                        <li><a href="">Mua hàng từ xa</a></li>
                        <li><a href="">Gặp trực tiếp cửa hàng gần nhất (Zalo hoặc gọi điện) </a></li>
                     </ul>
                  </div>
                  <div className={styles.link}>
                     <p>Phương thức thanh toán</p>
                     <ul style={{display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr 1fr ', gridGap: '3px'}}>
                        <li><img src="https://image.cellphones.com.vn/x35/media/logo/payment/alepay-logo.png" alt="" /></li>
                        <li><img src="https://image.cellphones.com.vn/x35/media/logo/payment/zalopay-logo.png" alt="" /></li>
                        <li><img src="	https://image.cellphones.com.vn/x35/media/logo/payment/vnpay-logo.png" alt="" /></li>
                        <li><img src="https://image.cellphones.com.vn/x35/media/logo/payment/moca-logo.png" alt="" /></li>
                        <li><img src="https://image.cellphones.com.vn/x35/media/logo/payment/onepay-logo.png" alt="" /></li>
                        <li><img src="https://image.cellphones.com.vn/x35/media/logo/payment/kredivo-logo.png" alt="" /></li>
                        <li><img src="	https://image.cellphones.com.vn/x35/media/logo/payment/mpos-logo.png" alt="" /></li>
                     </ul>
                  </div>
               </Colum>
               <Colum>
                  <div className={styles.link}>
                     <div className={styles.hotel}>
                        <ul>
                           <li><a href="">Gọi mua hàng <strong>1800.2097</strong> (8h00 - 22h00)</a></li>
                           <li><a href="">Gọi bảo hành <strong>1800.2064</strong> (8h00 - 21h00)</a></li>
                           <li><a href="">Gọi khiếu nại <strong>1800.2063</strong> (8h00 - 21h30)</a></li>
                        </ul>
                     </div>
                  </div>
                     <img className={styles.happy} src={dienthoai} alt="" />
                     <img className={styles.happy} src={dienthoai} alt="" />
               </Colum>
               <Colum>
                  <div className={styles.link}>
                     <ul style={{listStyle: 'none', padding: 0}}>
                        <li><a href="">Mua hàng và thanh toán Online</a></li>
                        <li><a href="">Mua hàng trả góp Online</a></li>
                        <li><a href="">Tra thông tin đơn hàng</a></li>
                        <li><a href="">Tra điểm Smember</a></li>
                        <li><a href="">Tra thông tin bảo hành</a></li>
                        <li><a href="">Tra cứu hoá đơn điện tử</a></li>
                        <li><a href="">Trung tâm bảo hành chính hãng</a></li>
                        <li><a href="">Quy định về việc sao lưu dữ liệu</a></li>
                        <li><a href="">Dịch vụ bảo hành điện thoại</a></li>
                     </ul>
                  </div>
               </Colum>
               <Colum>
                  <div className={styles.link}>
                     <ul style={{listStyle: 'none', padding: 0}}>
                        <li><a href=""> Khách hàng doanh nghiệp (B2B)</a></li>
                        <li><a href="">Ưu đãi thanh toán</a></li>
                        <li><a href="">Quy chế hoạt động</a></li>
                        <li><a href="">Chính sách Bảo hành</a></li>
                        <li><a href="">Liên hệ hợp tác kinh doanh</a></li>
                        <li><a href="">Tuyển dụng</a></li>
                     </ul>
                  </div>
               </Colum>
            </Colums>
      </Top>
      <Bottom>
         <Colums>
            <Colum className={styles.iphone}>
              <div> <span>Điện thoại iPhone</span></div>
              <div> <span>Điện thoại iPhone 13  – Điện thoại iPhone 13 Pro Max</span></div>
               <div><span>Điện thoại iPhone 12  – Điện thoại iPhone 11</span></div>
               <div><span>iPhone cũ giá rẻ  – iPhone 13 cũ  – iPhone 12 cũ</span></div>
            </Colum>
            <Colum className={styles.iphone}>
              <div> <span>Điện thoại Samsung</span></div>
              <div> <span>Điện thoại Samsung S22  – Điện thoại Samsung A73</span></div>
               <div><span>Điện thoại Samsung A53  – Điện thoại Samsung A23</span></div>
               <div><span>Điện thoại OPPO  – Điện thoại Xiaomi  – Điện thoại Nokia</span></div>
            </Colum>
            <Colum className={styles.iphone}>
            <div> <span>Máy tính Laptop</span></div>
              <div> <span>Laptop HP  – Laptop Dell  – Laptop Microsoft Surface</span></div>
               <div><span>Laptop Acer  – Laptop Lenovo  – Laptop ASUS </span></div>
               <div><span>Máy tính để bàn  – Màn hình máy tính</span></div>
            </Colum>
            <Colum className={styles.iphone}>
            <div> <span>Phụ kiện - Nhà thông minh</span></div>
              <div> <span>Camera  – Camera hành trình</span></div>
               <div><span>Bàn ghế công thái học</span></div>
            </Colum>
         </Colums>
         <FooterBottom>
            <div className={styles.vovankiet}>
               <p>
                Công ty TNHH Thương mại và dịch vụ kỹ thuật DIỆU PHÚC - GPĐKKD:
                0316172372 do sở KH & ĐT TP. HCM cấp ngày 02/03/2020. Địa chỉ:
                350-352 Võ Văn Kiệt, Phường Cô Giang, Quận 1, Thành phố Hồ Chí
                Minh, Việt Nam. Điện thoại: 028.7108.9666.
              </p>
            </div>
            <div className={styles.bocongthuong}>
                  <img src="https://cdn2.cellphones.com.vn/80x/media/logo/logoSaleNoti.png" alt="" />
                  <img height="20" width="96" src="https://images.dmca.com/Badges/dmca_copyright_protected150c.png?ID=158f5667-cce3-4a18-b2d1-826225e6b022" alt="" />
            </div>
         </FooterBottom>
      </Bottom>
    </Foter>
    </>
  )
}
const Mount = styled.div`
  position: relative;

`

const BanerChilder = styled.div`
      margin-bottom: 15px;
      display: flex;
    /* width: 1200px; */
    justify-content: space-evenly;
`
const Sories = styled.div`
padding: 0 15px;
display: flex;
      position: relative;
    justify-content: flex-start;
    flex-wrap: wrap;
`
const CateName = styled.div`
  flex: 1 1 0%;
    font-weight: 700;
    color: rgb(52, 58, 64);
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    overflow: hidden;
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
  padding: 10px 15px;
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


const Colum = styled.div`
padding: 0.75rem;
flex: none;
    width: 25%;
`
const Colums = styled.div`
display: flex;
      margin-left: -0.75rem;
    margin-right: -0.75rem;
    margin-top: -0.75rem;
`
const FooterBottom = styled.div`

`
const Bottom = styled.div`
    background: #f8f8f8!important;
    padding: 15px;
`
const Top = styled.div`
    
    min-height: 100px;
    padding: 15px;
`
const Foter = styled.div`
    margin-top: 20px;
    width: 100%;
    box-shadow: 0 1px 2px 0 rgb(60 64 67 / 10%), 0 2px 6px 2px rgb(60 64 67 / 15%);
    position: relative;
    overflow-x: hidden;
`

export default Home