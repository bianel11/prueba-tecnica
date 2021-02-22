import React, { useContext, } from "react";
import { AppContext } from "../context/AppContext";
import { blue } from "@ant-design/colors";
import { Layout, Menu, Button, Typography, Avatar } from "antd";
import ModalLogin from "../components/ModalLogin/ModalLogin";
import { UserOutlined } from "@ant-design/icons";
const { Header, Content, Footer } = Layout;
const { Title } = Typography; 

export default function LayoutApp(props) {
  const { children } = props;
  const { balance, isLogin, logout, userName } = useContext(AppContext);

  return (
    <Layout className="layout">
      <Header>
        <div className="logo">
          <Title
            level={3}
            className="text-logo"
            style={{ color: blue.primary }}
          >
            Game 💰
          </Title>
        </div>
        <Menu theme="dark" mode="horizontal" defaultSelectedKeys={["2"]}>
          <div style={{ float: "right" }}>
            <span style={{ marginRight: "5px" }}>
              {balance} - {userName || "Invitado"}{" "}
              {userName ? (
                <Avatar
                  src={`https://avatars.dicebear.com/4.5/api/male/${userName}.svg`}
                />
              ) : (
                <Avatar icon={<UserOutlined />} />
              )}
            </span>

            {isLogin === true ? (
              <Button onClick={logout} type="danger">
                Cerrar sesión
              </Button>
            ) : (
              <ModalLogin />
            )}
          </div>
        </Menu>
      </Header>
      <Content style={{ padding: "0 50px" }}>
        <div className="site-layout-content">{children}</div>
      </Content>
      <Footer
        theme="dark"
        style={{
          textAlign: "center",
          position: "fixed",
          bottom: 0,
          width: "100%",
          backgroundColor: "#002329",
          color: "white",
        }}
      >
        Slot Machine ©2021 Creado por Bianel Rodríguez
      </Footer>
    </Layout>
  );
}
