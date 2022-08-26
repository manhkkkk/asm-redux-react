import instance from "./instance";

export const listorder = () => {
   const url = `/orders`;
   return instance.get(url);
}
export const removeOrder = (id: number) => {
   const url = `/orders/${id}`;
   return instance.delete(url);
}
export const addOrder = (order: any) => {
   const url = `/orders/`;
   return instance.post(url, order);   
}
export const listbyIdorder = (id: number) => {
   const url = `/orders/${id}`;
   return instance.get(url);
}
export const updateOrder = (order: any) =>{
   const url = `/orders/${order.id}`;
   return instance.put(url, order)
}