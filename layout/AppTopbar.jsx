/* eslint-disable @next/next/no-img-element */
import Link from 'next/link'
import { classNames } from 'primereact/utils'
import React, { forwardRef, useContext, useImperativeHandle, useRef, useState } from 'react'
import { LayoutContext } from './context/LayoutContext'
import { Dialog } from 'primereact/dialog'
import { Button } from 'primereact/button'
import { connect } from 'react-redux'

import { signOut } from 'actions/auth/auth'

const AppTopbar = forwardRef((props, ref) => {
  const { layoutConfig, layoutState, onMenuToggle, showProfileSidebar } = useContext(LayoutContext)
  const menubuttonRef = useRef(null)
  const topbarmenuRef = useRef(null)
  const topbarmenubuttonRef = useRef(null)
  const [confirmSignOut, setConfirmSignOut] = useState(false)

  useImperativeHandle(ref, () => ({
    menubutton: menubuttonRef.current,
    topbarmenu: topbarmenuRef.current,
    topbarmenubutton: topbarmenubuttonRef.current,
  }))

  const handleLogOut = () => {
    signOut().then((res) => {
      if (res && res.status === 200) {
        props.setUser({})
        localStorage.removeItem('user')
        localStorage.removeItem('access_token')
      }
    })
  }

  return (
    <div className="layout-topbar">
      <Link href="/" className="layout-topbar-logo">
        <div className="logo-container">
          <img
            // src={`/layout/images/logo-${layoutConfig.colorScheme !== 'light' ? 'white' : 'dark'}.svg`}
            src={`/layout/images/logo.png`}
            // width="47.22px"
            // height={'35px'}
            alt="logo"
          />
        </div>
      </Link>

      <button
        ref={menubuttonRef}
        type="button"
        className="p-link layout-menu-button layout-topbar-button"
        onClick={onMenuToggle}
      >
        <i className="pi pi-bars" />
      </button>

      <button
        ref={topbarmenubuttonRef}
        type="button"
        className="p-link layout-topbar-menu-button layout-topbar-button"
        onClick={showProfileSidebar}
      >
        <i className="pi pi-ellipsis-v" />
      </button>

      <div
        ref={topbarmenuRef}
        className={classNames('layout-topbar-menu', {
          'layout-topbar-menu-mobile-active': layoutState.profileSidebarVisible,
        })}
      >
        <Link href="/documentation">
          <button type="button" className="p-link layout-topbar-button">
            <i className="pi pi-cog"></i>
            <span>Settings</span>
          </button>
        </Link>
        <Link href="/thong-tin-tai-khoan">
          <button type="button" className="p-link layout-topbar-button">
            <i className="pi pi-user"></i>
            <span>Profile</span>
          </button>
        </Link>
        <Dialog
          header="Đăng xuất"
          visible={confirmSignOut}
          onHide={() => setConfirmSignOut(false)}
          style={{ width: '350px' }}
          modal
        >
          <div className="flex align-items-center justify-content-center">
            <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
            <span>Bạn có chắc muốn đăng xuất?</span>
          </div>
          <div className="flex justify-content-center mt-4">
            <Button
              label="Hủy bỏ"
              outlined
              className="mr-3"
              onClick={() => setConfirmSignOut(false)}
            />
            <Link href="/auth/login">
              <Button label="Đồng ý" onClick={() => handleLogOut()} />
            </Link>
          </div>
        </Dialog>
        <button
          type="button"
          className="p-link layout-topbar-button"
          onClick={() => setConfirmSignOut(true)}
        >
          <i className="pi pi-sign-out"></i>
          <span>Sign out</span>
        </button>
      </div>
    </div>
  )
})

AppTopbar.displayName = 'AppTopbar'

const mapDispatchToProps = (dispatch) => {
  return {
    setUser: (user) => dispatch({ type: 'SET_USER', payload: user }),
  }
}

export default connect(null, mapDispatchToProps)(AppTopbar)
