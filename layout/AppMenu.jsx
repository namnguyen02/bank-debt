/* eslint-disable @next/next/no-img-element */

import React, { useContext } from 'react'
import AppMenuItem from './AppMenuItem'
import { LayoutContext } from './context/LayoutContext'
import { MenuProvider } from './context/MenuContext'
import Link from 'next/link'

const AppMenu = () => {
  const { layoutConfig } = useContext(LayoutContext)

  const model = [
    {
      label: 'Home',
      items: [{ label: 'Dashboard', icon: 'pi pi-fw pi-home', to: '/' }],
    },
    {
      label: 'Danh mục',
      items: [
        {
          label: 'Hành động thu hồi',
          icon: 'pi pi-fw pi-box',
        },
        {
          label: 'Kết quả thu hồi',
          icon: 'pi pi-fw pi-inbox',
        },
        {
          label: 'Biểu mẫu',
          icon: 'pi pi-fw pi-paperclip',
        },
        {
          label: 'Nhân viên',
          icon: 'pi pi-fw pi-users',
          to: '/nhan-vien',
        },
      ],
    },
    {
      label: 'Danh sách',
      items: [
        {
          label: 'Khách hàng',
          icon: 'pi pi-fw pi-users',
          to: '/khach-hang',
        },
        {
          label: 'Hành động thu hồi nợ',
          icon: 'pi pi-fw pi-list',
          to: '/hanh-dong-thu-hoi-no',
        },
        {
          label: 'Tờ trình',
          icon: 'pi pi-fw pi-file-edit',
          items: [
            { label: 'Khởi kiện', icon: 'pi pi-fw pi-file', to: '/to-trinh-khoi-kien' },
            { label: 'Miễn giảm', icon: 'pi pi-fw pi-file' },
          ],
        },
      ],
    },
    {
      label: 'Khởi kiện và thi hành án',
      items: [
        {
          label: 'Quản lý khởi kiện',
          icon: 'pi pi-fw pi-users',
          to: '/khoi-kien',
        },
        {
          label: 'Quản lý lịch hẹn',
          icon: 'pi pi-fw pi-list',
          to: '/lich-hen',
        },
        {
          label: 'Quản lý tạm ứng án phí',
          icon: 'pi pi-fw pi-file-edit',
          to: '/tam-ung-an-phi',
        },
        {
          label: 'Quản lý thi hành án',
          icon: 'pi pi-fw pi-file-edit',
          to: '/thi-hanh-an',
        },
      ],
    },
    {
      label: 'UI Components',
      items: [
        {
          label: 'Form Layout',
          icon: 'pi pi-fw pi-id-card',
          to: '/uikit/formlayout',
        },
        {
          label: 'Input',
          icon: 'pi pi-fw pi-check-square',
          to: '/uikit/input',
        },
        {
          label: 'Float Label',
          icon: 'pi pi-fw pi-bookmark',
          to: '/uikit/floatlabel',
        },
        {
          label: 'Invalid State',
          icon: 'pi pi-fw pi-exclamation-circle',
          to: '/uikit/invalidstate',
        },
        {
          label: 'Button',
          icon: 'pi pi-fw pi-mobile',
          to: '/uikit/button',
          class: 'rotated-icon',
        },
        { label: 'Table', icon: 'pi pi-fw pi-table', to: '/uikit/table' },
        { label: 'List', icon: 'pi pi-fw pi-list', to: '/uikit/list' },
        { label: 'Tree', icon: 'pi pi-fw pi-share-alt', to: '/uikit/tree' },
        { label: 'Panel', icon: 'pi pi-fw pi-tablet', to: '/uikit/panel' },
        { label: 'Overlay', icon: 'pi pi-fw pi-clone', to: '/uikit/overlay' },
        { label: 'Media', icon: 'pi pi-fw pi-image', to: '/uikit/media' },
        {
          label: 'Menu',
          icon: 'pi pi-fw pi-bars',
          to: '/uikit/menu',
          preventExact: true,
        },
        { label: 'Message', icon: 'pi pi-fw pi-comment', to: '/uikit/message' },
        { label: 'File', icon: 'pi pi-fw pi-file', to: '/uikit/file' },
        { label: 'Chart', icon: 'pi pi-fw pi-chart-bar', to: '/uikit/charts' },
        { label: 'Misc', icon: 'pi pi-fw pi-circle', to: '/uikit/misc' },
      ],
    },
    {
      label: 'Prime Blocks',
      items: [
        {
          label: 'Free Blocks',
          icon: 'pi pi-fw pi-eye',
          to: '/blocks',
          badge: 'NEW',
        },
        {
          label: 'All Blocks',
          icon: 'pi pi-fw pi-globe',
          url: 'https://blocks.primereact.org',
          target: '_blank',
        },
      ],
    },
    {
      label: 'Utilities',
      items: [
        {
          label: 'PrimeIcons',
          icon: 'pi pi-fw pi-prime',
          to: '/utilities/icons',
        },
        {
          label: 'PrimeFlex',
          icon: 'pi pi-fw pi-desktop',
          url: 'https://primeflex.org/',
          target: '_blank',
        },
      ],
    },
    {
      label: 'Pages',
      icon: 'pi pi-fw pi-briefcase',
      to: '/pages',
      items: [
        {
          label: 'Landing',
          icon: 'pi pi-fw pi-globe',
          to: '/landing',
        },
        {
          label: 'Auth',
          icon: 'pi pi-fw pi-user',
          items: [
            {
              label: 'Login',
              icon: 'pi pi-fw pi-sign-in',
              to: '/auth/login',
            },
            {
              label: 'Error',
              icon: 'pi pi-fw pi-times-circle',
              to: '/auth/error',
            },
            {
              label: 'Access Denied',
              icon: 'pi pi-fw pi-lock',
              to: '/auth/access',
            },
          ],
        },
        {
          label: 'Crud',
          icon: 'pi pi-fw pi-pencil',
          to: '/pages/crud',
        },
        {
          label: 'Timeline',
          icon: 'pi pi-fw pi-calendar',
          to: '/pages/timeline',
        },
        {
          label: 'Not Found',
          icon: 'pi pi-fw pi-exclamation-circle',
          to: '/pages/notfound',
        },
        {
          label: 'Empty',
          icon: 'pi pi-fw pi-circle-off',
          to: '/pages/empty',
        },
      ],
    },
    {
      label: 'Hierarchy',
      items: [
        {
          label: 'Submenu 1',
          icon: 'pi pi-fw pi-bookmark',
          items: [
            {
              label: 'Submenu 1.1',
              icon: 'pi pi-fw pi-bookmark',
              items: [
                { label: 'Submenu 1.1.1', icon: 'pi pi-fw pi-bookmark' },
                { label: 'Submenu 1.1.2', icon: 'pi pi-fw pi-bookmark' },
                { label: 'Submenu 1.1.3', icon: 'pi pi-fw pi-bookmark' },
              ],
            },
            {
              label: 'Submenu 1.2',
              icon: 'pi pi-fw pi-bookmark',
              items: [{ label: 'Submenu 1.2.1', icon: 'pi pi-fw pi-bookmark' }],
            },
          ],
        },
        {
          label: 'Submenu 2',
          icon: 'pi pi-fw pi-bookmark',
          items: [
            {
              label: 'Submenu 2.1',
              icon: 'pi pi-fw pi-bookmark',
              items: [
                { label: 'Submenu 2.1.1', icon: 'pi pi-fw pi-bookmark' },
                { label: 'Submenu 2.1.2', icon: 'pi pi-fw pi-bookmark' },
              ],
            },
            {
              label: 'Submenu 2.2',
              icon: 'pi pi-fw pi-bookmark',
              items: [{ label: 'Submenu 2.2.1', icon: 'pi pi-fw pi-bookmark' }],
            },
          ],
        },
      ],
    },
    {
      label: 'Get Started',
      items: [
        {
          label: 'Documentation',
          icon: 'pi pi-fw pi-question',
          to: '/documentation',
        },
        {
          label: 'View Source',
          icon: 'pi pi-fw pi-search',
          url: 'https://github.com/primefaces/sakai-react',
          target: '_blank',
        },
      ],
    },
  ]

  return (
    <MenuProvider>
      <ul className="layout-menu">
        {model.map((item, i) => {
          return !item?.seperator ? (
            <AppMenuItem item={item} root={true} index={i} key={item.label} />
          ) : (
            <li className="menu-separator"></li>
          )
        })}

        <Link href="https://blocks.primereact.org" target="_blank" style={{ cursor: 'pointer' }}>
          <img
            alt="Prime Blocks"
            className="w-full mt-3"
            src={`/layout/images/banner-primeblocks${
              layoutConfig.colorScheme === 'light' ? '' : '-dark'
            }.png`}
          />
        </Link>
      </ul>
    </MenuProvider>
  )
}

export default AppMenu
