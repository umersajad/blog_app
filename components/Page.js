import { useEffect, useState } from "react";
import Link from "next/link";

import Router, { useRouter } from "next/router";

import { FileTextOutlined, UserOutlined } from "@ant-design/icons";
import { ConfigProvider, Layout, Menu, Dropdown } from "antd";

const { Header, Sider, Content } = Layout;

import NProgress from "nprogress";

Router.onRouteChangeStart = () => {
  NProgress.start();
};

Router.onRouteChangeComplete = () => {
  NProgress.done();
};

const sidebarMenuItems = [
  {
    key: "1",
    icon: <FileTextOutlined />,
    label: <Link href="/">Posts</Link>,
  },
  {
    key: "2",
    icon: <UserOutlined />,
    label: <Link href="/users">Users</Link>,
  },
];

const Page = (props) => {
  const [collapsed, setCollapsed] = useState(false);
  const [selectedKeys, setSelectedKeys] = useState(["1"]);

  const router = useRouter();

  useEffect(() => {
    if (router.pathname.includes("users")) {
      setSelectedKeys(["2"]);
    }
  }, [router.pathname]);

  return (
    <ConfigProvider
      theme={{
        token: {
          fontFamily: "Poppins",
          colorPrimary: "#39B54A",
        },
      }}
    >
      <Layout className="min-h-screen">
        <Header className="fixed w-full z-10 !h-[4.375rem] !px-4 !bg-white">
          <nav className="flex h-full justify-between select-none">
            <div className="flex items-center space-x-4 mr-1">
              {collapsed ? (
                <svg
                  onClick={() => setCollapsed(false)}
                  className="w-6 h-6 cursor-pointer fill-[#1e293b]"
                >
                  <use xlinkHref="/svg/sprites.svg#icon-bars" />
                </svg>
              ) : (
                <svg
                  onClick={() => setCollapsed(true)}
                  className="w-6 h-6 cursor-pointer fill-[#1e293b]"
                >
                  <use xlinkHref="/svg/sprites.svg#icon-bars-collapse" />
                </svg>
              )}
              <span className="text-xl font-bold text-[#1e293b]">LOGO</span>
            </div>
          </nav>
        </Header>

        <Sider
          className="!bg-white"
          trigger={null}
          collapsible
          collapsed={collapsed}
        >
          <div className="flex flex-col max-h-screen">
            <div className="pt-[4.375rem] overflow-y-auto flex-1">
              <Menu
                className="bg-white"
                mode="inline"
                selectedKeys={selectedKeys}
                onSelect={(item) => {
                  setSelectedKeys(item.selectedKeys);
                }}
                items={sidebarMenuItems}
              />
            </div>
          </div>
        </Sider>
        <Layout className="site-layout">
          <Content className="min-h-screen max-h-screen pt-[4.375rem] bg-primaryLight overflow-y-auto">
            <div className="container mx-auto text-mainTextLight px-10 pb-12">
              {props.children}
            </div>
          </Content>
        </Layout>
      </Layout>
    </ConfigProvider>
  );
};

export default Page;
