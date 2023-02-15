import { Link } from '@umijs/max';
import React from 'react'

const NotAccessible = () => {
  return (
    <div style={{ color: 'black', paddingLeft: 80 }}>
      <svg
        width="36"
        height="5"
        viewBox="0 0 36 5"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect width="36" height="4.5" fill="#FF000F" />
      </svg>
      <div style={{ fontSize: 36 }}>权限错误</div>
      抱歉，您没有权限访问期望的资源，请尝试其他的链接地址，或回到
      <Link to="/">首页</Link>.
      <li>
        若您认为这是一个系统问题，请联系系统管理员并描述您遇到的问题详情
        <a href="mailto:tiffany-ting.zhang@cnabb.com">
          tiffany-ting.zhang@cnabb.com
        </a>
        <a href="mailto:mary-haomin.wu@cnabb.com">
          mary-haomin.wu@cnabb.com
        </a>
      </li>
    </div>
  )
}

export default NotAccessible;
