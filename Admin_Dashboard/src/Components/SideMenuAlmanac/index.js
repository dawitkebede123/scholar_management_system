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

function SideMenuAlmanac() {
  const location = useLocation();
  const [selectedKeys, setSelectedKeys] = useState("/");

  useEffect(() => {
    const pathName = location.pathname;
    setSelectedKeys(pathName);
  }, [location.pathname]);

  const navigate = useNavigate();
  return (
    <div className="SideMenuAlmanac">
      <Menu
        className="SideMenuAlmanacVertical"
        mode="vertical"
        // onClick={(item) => {
        //   //item.key
        //   navigate('/');
        // }}
        selectedKeys={[selectedKeys]}
        items={[
       
          {
            label: "Almanac",
            key: "/admin/almanac",
            icon: <BankTwoTone />,
          },
         
        ]}
      ></Menu>
    </div>
  );
}
export default SideMenuAlmanac;
