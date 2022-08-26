import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '../../components/admin/Navbar'

type Props = {}

const AdminLayout = (props: Props) => {
  return (
    <>
      <Navbar/>
    </>
  )
}

export default AdminLayout