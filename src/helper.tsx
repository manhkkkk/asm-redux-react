export function currency(x:any) {
  console.log('123');
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + "đ";
}