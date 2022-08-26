import React from 'react'
import styled from 'styled-components'
import styles from '../../components/client/style.module.css'
import dienthoai from '../../lib/img/dienthoaivui.png'

type Props = {}

const Footer = (props: Props) => {
  return (
    <Foter>
      <Top>
            <Colums>
               <Colum>
                  <div className={styles.link}>
                     <div className={styles.hotel}> <p style={{fontSize: 16, fontWeight: 600}}>Tìm của hàng</p></div>
                     <ul style={{listStyle: 'none', padding: 0}}>
                        <li><a href="">Tìm cửa hàng gần nhất</a></li>
                        <li><a href="">Mua hàng từ xa</a></li>
                        <li><a href="">Gặp trực tiếp cửa hàng gần nhất (Zalo hoặc gọi điện) </a></li>
                     </ul>
                  </div>
                  <div className={styles.link}>
                     <p>Phương thức thanh toán</p>
                     <ul style={{display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr 1fr ', gridGap: '3px'}}>
                        <li><img src="https://image.cellphones.com.vn/x35/media/logo/payment/alepay-logo.png" alt="" /></li>
                        <li><img src="https://image.cellphones.com.vn/x35/media/logo/payment/zalopay-logo.png" alt="" /></li>
                        <li><img src="	https://image.cellphones.com.vn/x35/media/logo/payment/vnpay-logo.png" alt="" /></li>
                        <li><img src="https://image.cellphones.com.vn/x35/media/logo/payment/moca-logo.png" alt="" /></li>
                        <li><img src="https://image.cellphones.com.vn/x35/media/logo/payment/onepay-logo.png" alt="" /></li>
                        <li><img src="https://image.cellphones.com.vn/x35/media/logo/payment/kredivo-logo.png" alt="" /></li>
                        <li><img src="	https://image.cellphones.com.vn/x35/media/logo/payment/mpos-logo.png" alt="" /></li>
                     </ul>
                  </div>
               </Colum>
               <Colum>
                  <div className={styles.link}>
                     <div className={styles.hotel}>
                        <ul>
                           <li><a href="">Gọi mua hàng <strong>1800.2097</strong> (8h00 - 22h00)</a></li>
                           <li><a href="">Gọi bảo hành <strong>1800.2064</strong> (8h00 - 21h00)</a></li>
                           <li><a href="">Gọi khiếu nại <strong>1800.2063</strong> (8h00 - 21h30)</a></li>
                        </ul>
                     </div>
                  </div>
                     <img className={styles.happy} src={dienthoai} alt="" />
                     <img className={styles.happy} src={dienthoai} alt="" />
               </Colum>
               <Colum>
                  <div className={styles.link}>
                     <ul style={{listStyle: 'none', padding: 0}}>
                        <li><a href="">Mua hàng và thanh toán Online</a></li>
                        <li><a href="">Mua hàng trả góp Online</a></li>
                        <li><a href="">Tra thông tin đơn hàng</a></li>
                        <li><a href="">Tra điểm Smember</a></li>
                        <li><a href="">Tra thông tin bảo hành</a></li>
                        <li><a href="">Tra cứu hoá đơn điện tử</a></li>
                        <li><a href="">Trung tâm bảo hành chính hãng</a></li>
                        <li><a href="">Quy định về việc sao lưu dữ liệu</a></li>
                        <li><a href="">Dịch vụ bảo hành điện thoại</a></li>
                     </ul>
                  </div>
               </Colum>
               <Colum>
                  <div className={styles.link}>
                     <ul style={{listStyle: 'none', padding: 0}}>
                        <li><a href=""> Khách hàng doanh nghiệp (B2B)</a></li>
                        <li><a href="">Ưu đãi thanh toán</a></li>
                        <li><a href="">Quy chế hoạt động</a></li>
                        <li><a href="">Chính sách Bảo hành</a></li>
                        <li><a href="">Liên hệ hợp tác kinh doanh</a></li>
                        <li><a href="">Tuyển dụng</a></li>
                     </ul>
                  </div>
               </Colum>
            </Colums>
      </Top>
      <Bottom>
         <Colums>
            <Colum className={styles.iphone}>
              <div> <span>Điện thoại iPhone</span></div>
              <div> <span>Điện thoại iPhone 13  – Điện thoại iPhone 13 Pro Max</span></div>
               <div><span>Điện thoại iPhone 12  – Điện thoại iPhone 11</span></div>
               <div><span>iPhone cũ giá rẻ  – iPhone 13 cũ  – iPhone 12 cũ</span></div>
            </Colum>
            <Colum className={styles.iphone}>
              <div> <span>Điện thoại Samsung</span></div>
              <div> <span>Điện thoại Samsung S22  – Điện thoại Samsung A73</span></div>
               <div><span>Điện thoại Samsung A53  – Điện thoại Samsung A23</span></div>
               <div><span>Điện thoại OPPO  – Điện thoại Xiaomi  – Điện thoại Nokia</span></div>
            </Colum>
            <Colum className={styles.iphone}>
            <div> <span>Máy tính Laptop</span></div>
              <div> <span>Laptop HP  – Laptop Dell  – Laptop Microsoft Surface</span></div>
               <div><span>Laptop Acer  – Laptop Lenovo  – Laptop ASUS </span></div>
               <div><span>Máy tính để bàn  – Màn hình máy tính</span></div>
            </Colum>
            <Colum className={styles.iphone}>
            <div> <span>Phụ kiện - Nhà thông minh</span></div>
              <div> <span>Camera  – Camera hành trình</span></div>
               <div><span>Bàn ghế công thái học</span></div>
            </Colum>
         </Colums>
         <FooterBottom>
            <div className={styles.vovankiet}>
               <p>
                Công ty TNHH Thương mại và dịch vụ kỹ thuật DIỆU PHÚC - GPĐKKD:
                0316172372 do sở KH & ĐT TP. HCM cấp ngày 02/03/2020. Địa chỉ:
                350-352 Võ Văn Kiệt, Phường Cô Giang, Quận 1, Thành phố Hồ Chí
                Minh, Việt Nam. Điện thoại: 028.7108.9666.
              </p>
            </div>
            <div className={styles.bocongthuong}>
                  <img src="https://cdn2.cellphones.com.vn/80x/media/logo/logoSaleNoti.png" alt="" />
                  <img height="20" width="96" src="https://images.dmca.com/Badges/dmca_copyright_protected150c.png?ID=158f5667-cce3-4a18-b2d1-826225e6b022" alt="" />
            </div>
         </FooterBottom>
      </Bottom>
    </Foter>
  )
}
const Colum = styled.div`
padding: 0.75rem;
flex: none;
    width: 25%;
`
const Colums = styled.div`
display: flex;
      margin-left: -0.75rem;
    margin-right: -0.75rem;
    margin-top: -0.75rem;
`
const FooterBottom = styled.div`

`
const Bottom = styled.div`
    background: #f8f8f8!important;
    padding: 15px;
`
const Top = styled.div`
    
    min-height: 100px;
    padding: 15px;
`
const Foter = styled.div`
    margin-top: 20px;
    width: 100%;
    box-shadow: 0 1px 2px 0 rgb(60 64 67 / 10%), 0 2px 6px 2px rgb(60 64 67 / 15%);
    position: relative;
    overflow-x: hidden;
`
export default Footer