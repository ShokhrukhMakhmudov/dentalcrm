import { useState } from "react";
import {
  AntDesignOutlined,
  AppstoreOutlined,
  BellOutlined,
  CheckOutlined,
  CustomerServiceOutlined,
  ExperimentOutlined,
  LogoutOutlined,
  MedicineBoxOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  SettingOutlined,
  TeamOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";
import {
  Avatar,
  Badge,
  // Breadcrumb,
  Button,
  ConfigProvider,
  Dropdown,
  Layout,
  Menu,
  MenuProps,
  theme,
} from "antd";
import { Link, Outlet, useLocation } from "@tanstack/react-router";
import { useAuthContext } from "../../context";

const { Header, Sider, Content } = Layout;

export default function DashboardLayout() {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const {
    state: { user },
    logOut,
  } = useAuthContext();

  const pathname = useLocation().pathname;

  const items: MenuProps["items"] = [
    {
      key: "1",
      label: user?.name,
      disabled: true,
      style: { color: "black" },
    },
    {
      type: "divider",
    },
    {
      key: "2",
      label: <Link to="/dashboard/profile">Profile</Link>,
      icon: <UserOutlined />,
    },
    {
      key: "3",
      label: <Link to="/dashboard/billing">Billing</Link>,
      icon: <UploadOutlined />,
    },
    {
      key: "4",
      label: (
        <button
          onClick={() => {
            logOut();
            window.location.reload();
          }}>
          Logout
        </button>
      ),
      icon: <LogoutOutlined />,
    },
  ];

  return (
    <ConfigProvider
      theme={{ components: { Menu: { itemDisabledColor: "black" } } }}>
      <Layout>
        <Sider trigger={null} collapsible collapsed={collapsed} theme="light">
          <Menu
            className="demo-logo-vertical h-16 flex items-center justify-center disabled:text-black "
            mode="inline"
            items={[
              {
                key: "0",
                icon: <AntDesignOutlined />,
                label: <h2 className="text-primary font-bold">Dental CRM</h2>,
                disabled: true,
              },
            ]}
          />
          <Menu
            mode="inline"
            defaultSelectedKeys={[pathname]}
            items={[
              {
                key: "/dashboard",
                icon: <AppstoreOutlined />,
                label: <Link to="/dashboard">Dashboard</Link>,
              },
              // {
              //   key: "2",
              //   icon: <UserOutlined />,
              //   label: <Link to="/dashboard/profile">Profile</Link>,
              // },
              {
                key: "/dashboard/patients",
                icon: <TeamOutlined />, //<ExperimentOutlined />
                label: <Link to="/dashboard/patients">Patients</Link>,
              },
              // {
              //   key: "3",
              //   icon: <MedicineBoxOutlined />, //<ExperimentOutlined />
              //   label: <Link to="/dashboard/checkup">Checkups</Link>,
              // },
              {
                key: "/dashboard/services",
                icon: <ExperimentOutlined />, //<ExperimentOutlined />
                label: <Link to="/dashboard/services">Services</Link>,
              },
            ]}
          />
        </Sider>
        <Layout>
          <Header
            className="ps-0 flex items-center justify-between"
            style={{ background: colorBgContainer }}>
            <Button
              type="text"
              icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
              onClick={() => setCollapsed(!collapsed)}
              style={{
                fontSize: "16px",
                width: 64,
                height: 64,
              }}
            />

            <div className="flex items-center gap-3">
              <Badge count={1}>
                <Avatar
                  size={30}
                  className="text-black bg-transparent border-gray-400"
                  shape="square"
                  icon={<BellOutlined />}
                />
              </Badge>
              <Dropdown
                menu={{ items }}
                placement="bottomRight"
                overlayClassName="w-36"
                trigger={["click"]}>
                <Avatar
                  className="cursor-pointer"
                  shape="circle"
                  size={36}
                  icon={<UserOutlined />}
                />
              </Dropdown>
            </div>
          </Header>
          <Content
            style={{
              margin: "24px 16px",
              padding: "0 24px 24px 24px",
              minHeight: 280,
              background: "transparent",
            }}>
            {/* <Breadcrumb items={[{ title: path }]} /> */}
            <Outlet />
          </Content>
        </Layout>
      </Layout>
    </ConfigProvider>
  );
}
