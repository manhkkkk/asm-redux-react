import React from 'react'
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

type PrivateRouterProps = {
   children: JSX.Element
}

export const PrivateRouter = (props: PrivateRouterProps) => {
   const user = JSON.parse(localStorage.getItem('user') as string)
   if(user[0]?.role == 1){
      return props.children
   }
   return <Navigate to="/login" />
}