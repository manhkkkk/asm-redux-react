import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from '../../components/client/Header'
import Footer from './../../components/client/Footer';

type Props = {
  
}

const WebsiteLayout = ({}) => {
  return (
    <div style={{fontSize: '12px'}}>
      <Header />
      <Outlet/>
      <Footer/>
    </div>
  )
}

export default WebsiteLayout