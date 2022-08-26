import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { Button, Dropdown, Menu, message, Space, Select , Form, Switch, Modal } from 'antd';
import {ToTopOutlined, DownOutlined, EditOutlined , DeleteOutlined} from '@ant-design/icons'
import axios from 'axios';
import { Link, useNavigate, useParams } from 'react-router-dom';
type Props = {}
const { Option } = Select;

const ListProduct = styled.div`
  padding: 20px 20px;
`

const Header = styled.div`
  display: flex;
  justify-content: space-between;
`

const Image = styled.img`
  width: 46%;
  float: left;
  margin-right: 10px;
`;
const Category = styled.div`
display: flex;
align-items: center;
padding-bottom: 20px;
`

const Block = styled.div`
  margin-right: 30px;
`


const Users = (props: Props) => {
   const navigate = useNavigate()
  const [user, setUser] = useState<any>([])
 console.log(user);
  useEffect(() => {
    const getProduct = async () => {
      const  { data} = await axios.get("https://json-server-phanducmanh.herokuapp.com/users") 
      setUser(data)
    };
    getProduct()
  },[])
  
  const onHanlderCategory = async (category: any) =>{
    const result = await user.filter((product:any) => product.categories === category)
    return setUser(result)
  }
  const onHanlderRemove = async (user: any) => {
    if (user.role === 1) {
      alert('khong the xoa admin')
      return user
    }else{
      Modal.confirm({
         title: "Are you sure delete",
         okText: "Yes",
         okType: "danger",
         onOk: () =>{
           axios.delete('https://json-server-phanducmanh.herokuapp.com/users/' +user.id);
           setUser(user.filter((item:any) => item.id !== user.id));
           navigate('/admin/user')
         }
       })
    }
  }
  return (
    <>
      <ListProduct>
        <Header >
         <div> <span style={{fontSize:'19px',fontWeight: 'bold', color: '#6d6d6d'}}>Điện thoại</span></div>
         <Link to="/admin/category/add"><Image style={{width: '50px'}} src={`http://localhost:4000/images/Add.png`} alt="" /></Link>
        </Header>
        <Category>
            <Block style={{fontWeight: 'bold', color: '#605f5f'}}>Bộ lọc:</Block>
             <div >
             <div style={{padding: '18px 0'}}> 
              <span >Danh mục sản phẩm</span>
             </div>
              <Select style={{ width: '300px' }} size="large" onChange={onHanlderCategory}>
                  <Option value="SmartPhone" >Điện thoại</Option>
                  <Option  value="Laptop">Laptop</Option>
                  <Option  value="HeadPhone">  Phụ kiện  </Option>
                  <Option  value="Ipad" disabled>Máy tính bảng</Option> 
              </Select>
             </div>
        </Category>
        <table style={{width: '100%'}}>
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Edit</th>
          </tr>
        </thead>
        <tbody>
            <>
            {user?.map((user:any, index:any) => (
               <tr  style={{borderTop: '0.5px solid #8d8d8d'}} >
               <td key={index} style={{ width: '5%'}} >{index + 1} </td>
                <td style={{ width: '20%', padding: '20px 0',wordBreak: 'break-word'}}>{user.email}</td>
                <td style={{ width: '10%', padding: '20px 0'}}>
                  <Link to={`/edit/${user.id}`}><EditOutlined style={{color: '#3bd630', fontSize: '20px' }} /></Link>
                  <button style={{border: 'none'}}><DeleteOutlined  onClick={() => onHanlderRemove(user)} style={{color: 'red', fontSize: '20px' }} /></button>
                </td>
              </tr>
            ))}
            </>
        </tbody>
        </table>
      </ListProduct>
    </>
  )
}

export default Users