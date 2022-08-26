export const money = (x:any) => {
   return x?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
}