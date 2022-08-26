import React from 'react'
import { useForm, SubmitHandler } from 'react-hook-form';
import { useNavigate, Link } from 'react-router-dom';
import { useState } from 'react';
import "toastr/build/toastr.min.css";
import { useParams } from 'react-router-dom';
import axios from 'axios'
import { useEffect } from 'react';

type Props = {}

const Check = (props: Props) => {
   const { register, handleSubmit, formState: { errors } } = useForm<any>();
   const [order, setOder] = useState<any>([])
   console.log(order);
   
   
	const onSubmit: SubmitHandler<any> = async (id) => {
		const { data: {userOders : {phone}} } = await axios.get('http://localhost:4000/orders');
      setOder(phone);
	}
  return (
   <form onSubmit={handleSubmit(onSubmit)}>
   <div className="relative w-full mb-3">
      <button>Sign In</button>
      <input type="phone" {...register('phone', { required: true })} className="mt-6 border-0 p-4 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full" placeholder="Email" />
      {errors.email && <small className="p-2 text-red-500">* Email</small>}
   </div>
      <div className="w-1/2 text-right">
         <button>submit</button>
      </div>
</form>
  )
}

export default Check