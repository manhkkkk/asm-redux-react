import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Select } from "antd";
import styled from "styled-components";
import styles from "../../components/client/style.module.css";
import banner from "../../lib/img/banner.png";
import banerchil from '../../lib/img/banerchildre.png'
import { money } from "../../money";
type Props = {};

const Categories = (props: Props) => {
  const { id } = useParams();
  console.log(id);
  const [listCategory, setListCategory] = useState([]);
  const [category, setCategory] = useState<any>([]);
  const [products, setProducts] = useState<any>([]);
  console.log(category);
  
  useEffect(() => {
    const getCT = async () => {
      const { data } = await axios.get("https://json-server-phanducmanh.herokuapp.com/category");
      setListCategory(data);
    };
    getCT();
  }, []);
  useEffect(() => {
    const getCT = async () => {
      const { data } = await axios.get("https://json-server-phanducmanh.herokuapp.com/products");
      setProducts(data);
      
    };
    getCT();
  }, []);
  useEffect(() => {
    const getCT = async () => {
      const { data } = await axios.get("https://json-server-phanducmanh.herokuapp.com/category/" + id);
      setCategory(products.filter((x: any) => x.categories === data.id));
    };
    getCT();
  }, [id,products]);

  return (
    <>
      <Banner>
        <Category className={styles.category}>
          <ul style={{ listStyle: 'none', padding: '0', paddingLeft: '12px' }}>
            {listCategory?.map((category: any) => (
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
      <h2 style={{ fontWeight: 600, color: '#444', padding: '5px 10px' }}>Danh mục sản phẩm</h2>
      <Section>
        {category
          ?.filter((item: any) => item.isDelete == false)
          ?.map((product: any, index:any) => (
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
    </>
  );
};

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
export default Categories;
