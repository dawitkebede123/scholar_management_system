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
import { useEffect, useState,useContext } from "react";
import { BsMegaphone } from "react-icons/bs";
import { useLocation, useNavigate } from "react-router-dom";
import { AdminLogin, AlmanacLogin, BusinessLogin } from '../../context';
function SideMenu() {

  const {adminLogin, setadminLogin} = useContext(AdminLogin);
  const {almanacLogin, setalmanacLogin} = useContext(AlmanacLogin);
  const {businessLogin, setbusinessLogin} = useContext(BusinessLogin);

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
          adminLogin?{
            label: "Dashbaord",
            icon: <AppstoreOutlined />,
            key: "/admin",
          }:{},
         almanacLogin || adminLogin? {
            label: "Almanac",
            key: "/admin/almanac",
            icon: <BankTwoTone />,
          }:{},
          businessLogin|| adminLogin?{
            label: "Business",
            key: "/admin/business",
            icon: <BookOutlined />,
          }:{},
         
          adminLogin? {
            label: "Users",
            key: "/admin/user",
            icon: <UserOutlined />,
          }:{},
         adminLogin? {
            label: "Announcement",
            key: "/admin/announcement",
            icon: <BsMegaphone />,
          }:{},
        ]}
      ></Menu>
    </div>
  );
}
export default SideMenu;
