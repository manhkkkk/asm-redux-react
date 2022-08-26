export type OrderType = {
   id?: number,
   userOrder:{
       name?:string,
       phone?:number,
       address?: string,
       email?:string
   },
   listOrder?:[
       {
           key?:number,
           id?:number,
           image?:string,
           itemTotal?: number,
           price?: number,
           quatity?: number,
           name?:string,
           feature?:string,
           description?:string,
           categories?: number
       }
   ],
   cartTotal: number,
   status: string,
}