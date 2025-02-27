import React from 'react'
import facebook from '../assests/facebook.png'
import twitter from '../assests/twitter.png'
import google from '../assests/search (1).png'
import './footer.css'

export default function Footer() {
  return (
      <div className='stylefooter'>
          <div className='iconstyle1'>
              <div><img src={facebook} alt='facebook' style={{width: '20px'}}/></div>
              <div><img src={google} alt='google' style={{width: '20px'}}/></div>
              <div><img src={twitter} alt='twitter' style={{width: '20px'}}/></div>
          </div>
          <div className='footerstyle'>
          <div className='style1'>
              <div>Audio description</div>
              <div>Investor Relations</div>
              <div>Legal Notices</div>
              </div>
              <div className='style2'>
                  <div>Help center</div>
                  <div>cookies preferences</div>
                  <div>jobs</div>
              </div>
              <div className='style3'>
                  <div>Gift cards</div>
                  <div>Terms and conditions</div>
                  <div>Coorporative information</div>
              </div>
              <div className='style4'>
                  <div>Media center</div>
                  <div>privacy</div>
                  <div>Contact us</div>
              </div>
          </div>
          <div>2025@Netflix</div>
    </div>
  )
}
