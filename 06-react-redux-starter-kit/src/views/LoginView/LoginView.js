import React, { Component } from 'react'

export default class LoginView extends Component {
  render () {
    return (
      <div className='box'>
        <ul className='accordion-tabs-minimal'>
          <li className='tab-header-and-content'>
            <a href='#' className='tab-link is-active'>Login</a>
            <div className='tab-content is-open'>
              <form>
                <input type='text'>
                </input>

                <input type='password'>
                </input>

                <button type='submit'>Entrar</button>
              </form>
            </div>
          </li>
          <li className='tab-header-and-content'>
            <a href='#' className='tab-link'>Registre-se</a>
            <div className='tab-content'>
              <p>
                Ut laoreet augue et neque pretium non sagittis nibh pulvinar.
                Etiam ornare tincidunt orci quis ultrices. Pellentesque ac
                sapien ac purus gravida ullamcorper. Duis rhoncus sodales
                lacus, vitae adipiscing tellus pharetra sed. Praesent bibendum
                lacus quis metus condimentum ac accumsan orci vulputate.
                Aenean fringilla massa vitae metus facilisis congue. Morbi
                placerat eros ac sapien semper pulvinar. Vestibulum facilisis,
                ligula a molestie venenatis, metus justo ullamcorper ipsum,
                congue aliquet dolor tortor eu neque. Sed imperdiet, nibh ut
                vestibulum tempor, nibh dui volutpat lacus, vel gravida magna
                justo sit amet quam. Quisque tincidunt ligula at nisl imperdiet
                sagittis. Morbi rutrum tempor arcu, non ultrices sem semper a.
                Aliquam quis sem mi.
              </p>
            </div>
          </li>
        </ul>
      </div>
    )
  }
}
