import {
  AppstoreOutlined,
  BankTwoTone,
  BookFilled,
  BookOutlined,
  BorderOuterOutlined,
  ShopOutlined,
  ShoppingCartOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Menu } from "antd";
import { useEffect, useState } from "react";
import { BsMegaphone } from "react-icons/bs";
import { useLocation, useNavigate } from "react-router-dom";

function SideMenu() {
  const location = useLocation();
  const [selectedKeys, setSelectedKeys] = useState("/");

  useEffect(() => {
    const pathName = location.pathname;
    setSelectedKeys(pathName);
  }, [location.pathname]);

  const navigate = useNavigate();
  return (
    <div className="SideMenu">
      <Menu
        className="SideMenuVertical"
        mode="vertical"
        onClick={(item) => {
          //item.key
          navigate(item.key);
        }}
        selectedKeys={[selectedKeys]}
        items={[
          {
            label: "Dashbaord",
            icon: <AppstoreOutlined />,
            key: "/",
          },
          {
            label: "Almanac",
            key: "/almanac",
            icon: <BankTwoTone />,
          },
          {
            label: "Business",
            key: "/business",
            icon: <BookOutlined />,
          },
          {
            label: "Users",
            key: "/user",
            icon: <UserOutlined />,
          },
          {
            label: "Announcement",
            key: "/announcement",
            icon: <BsMegaphone />,
          },
        ]}
      ></Menu>
    </div>
  );
}
export default SideMenu;
