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

function SideMenuBusiness() {
  const location = useLocation();
  const [selectedKeys, setSelectedKeys] = useState("/");

  useEffect(() => {
    const pathName = location.pathname;
    setSelectedKeys(pathName);
  }, [location.pathname]);

  const navigate = useNavigate();
  return (
    <div className="SideMenuBusiness">
      <Menu
        className="SideMenuBusinessVertical"
        mode="vertical"
        // onClick={(item) => {
        //   //item.key
        //   navigate(item.key);
        // }}
        selectedKeys={[selectedKeys]}
        items={[
         
          {
            label: "Business",
            key: "/admin/business",
            icon: <BookOutlined />,
          }
         
        ]}
      ></Menu>
    </div>
  );
}
export default SideMenuBusiness;
