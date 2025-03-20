"use client"
import { Geist, Geist_Mono } from "next/font/google";
import "@/app/globals.css";
import React, { useEffect, useState } from 'react';
import { DesktopOutlined, PieChartOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Breadcrumb, Layout, Menu, theme } from 'antd';
import { usePathname, useRouter } from 'next/navigation';
import { useLayoutStore } from '@/store/layoutStore';
const { Content, Footer, Sider } = Layout;
import { axiosPost } from "@/public/AxiosUtil";
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

type MenuItem = Required<MenuProps>['items'][number];
const items: MenuItem[] = [
  {
    key: '1',
    icon: <PieChartOutlined />,
    label: '文件上传',
  },
  {
    key: '2',
    icon: <DesktopOutlined />,
    label: '计划工时',
  }, {
    key: '3',
    icon: <DesktopOutlined />,
    label: '数据筛选项',
  }, {
    key: '4',
    icon: <DesktopOutlined />,
    label: '案件别合计',
  }, {
    key: '5',
    icon: <DesktopOutlined />,
    label: '按分后合计',
  },
];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
): MenuItem {
  return {
    key,
    icon,
    label,
  } as MenuItem;
}
type GlobalLayoutProps = {
  children: React.ReactNode;
};
export default function GlobalLayout({ children }: GlobalLayoutProps) {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const router = useRouter();
  const pathName = usePathname()

  const [selectedKeys, setselectedKeys] = useState<string[] | undefined>()
  useEffect(() => {
    // login()u2
    // console.log(pathName)
    // if (pathName === '/filesUpload') {
    //   setselectedKeys(['1'])
    // } else if (pathName === '/plannedWork') {
    //   setselectedKeys(['2'])
    // } else if (pathName === '/pass') {
    //   setselectedKeys(['3'])
    // } else if (pathName === '/total') {
    //   setselectedKeys(['4'])
    // } else if (pathName === '/totalPro') {
    //   setselectedKeys(['5'])
    // }
  }, []);
  const login = function () {

    axiosPost('/user/fuck',).then(res => {
      if (res.data.code === 200) {
        router.push("/filesUpload")
        setselectedKeys(['1'])
      }
    }).catch
    {
      router.push("/login")
    }
  }
  const handleMenuClick: MenuProps['onClick'] = (e) => {
    ;
    if (e.key === '1') {
      router.push('/filesUpload'); // 替换为目标页面的路径
      setselectedKeys(['1'])
    }
    if (e.key === '2') {
      router.push('/plannedWork'); // 替换为目标页面的路径
      setselectedKeys(['2'])
    }
    if (e.key === '3') {
      router.push('/pass')
      setselectedKeys(['3'])
    }
    if (e.key === '4') {
      router.push('/total')
      setselectedKeys(['4'])
    }
    if (e.key === '5') {
      router.push('/totalPro')
      setselectedKeys(['5'])
    }
  };
  const skipGlobalLayout = useLayoutStore((state) => state.skipGlobalLayout);
  return skipGlobalLayout ? <>{children}</> : (
    <html lang="en">
      <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no,minimum-scale=1.0,maximum-scale=1.0,user-scalable=no"></meta>
      <body className={`${geistSans.variable} ${geistMono.variable}`} style={{ overflow: "hidden" }}>
        <Layout style={{ minHeight: '100vh' }}>
          <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
            <Menu theme="dark" defaultSelectedKeys={['1']} selectedKeys={selectedKeys} mode="inline" items={items} onClick={handleMenuClick} />
          </Sider>
          <Layout>
            <Content style={{ margin: '8px 16px' }}>
              {children}
            </Content>
          </Layout>
        </Layout>
      </body>
    </html >
  );
}
