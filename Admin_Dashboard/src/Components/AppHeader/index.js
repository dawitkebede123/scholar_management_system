import { BellFilled, MailOutlined, UserOutlined } from "@ant-design/icons";
import { Badge, Drawer, Image, List, Space, Typography } from "antd";
import { useEffect, useState,useContext } from "react";
// import { doSignOut } from "./auth";
// import { useAuth } from "./authContext";
import Login_Admin from "../../Login_Admin"
// import { doSignOut } from "../../firebase/auth"
import { getComments, getOrders,getNotification } from "../../API";
import { json, useNavigate,Link } from 'react-router-dom';
import { doSignOut } from "../../firebase/auth";
import { AdminLogin, AlmanacLogin, BusinessLogin } from '../../context';
// import { useAuth } from "../../contexts/authContext"

function AppHeader() {
  
  const navigate = useNavigate();
  // const { userLoggedIn } = useAuth()
  const {adminLogin, setadminLogin} = useContext(AdminLogin);
  const {almanacLogin, setalmanacLogin} = useContext(AlmanacLogin);
  const {businessLogin, setbusinessLogin} = useContext(BusinessLogin);

  const [comments, setComments] = useState([]);
  const [orders, setOrders] = useState([]);
  const [commentsOpen, setCommentsOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
const Logout = ()=>{
  // doSignOut().then(() => { navigate('/login') })
  navigate('../')
  setadminLogin(false)
  setalmanacLogin(false)
  setbusinessLogin(false)
}
  useEffect(() => {
    getNotification().then((res) => {
      const convertedArray = Object.values(res);
      setComments(convertedArray);
    });
    getOrders().then((res) => {
      setOrders(res.products);
    });
  }, []);

  return (
    <div className="AppHeader">
      
      <Image
        width={50}
      
        src="./logo192.png" 
        // src="./logo_edited.png"
      ></Image>
       {/* <Typography.Title ></Typography.Title> */}
      {/* <Typography.Title >Admin Dashboard</Typography.Title> */}
      <Space>
        {/* <Badge count={comments.length} dot>
          <MailOutlined
            style={{ fontSize: 24 }}
            onClick={() => {
              setCommentsOpen(true);
            }}
          />
        </Badge> */}
        <UserOutlined
         style={{ fontSize: 24 }}
         onClick={() => {
            Logout()
         }}
        ></UserOutlined>
         {/* <Image
        width={40}
        src="https://yt3.ggpht.com/ytc/AMLnZu83ghQ28n1SqADR-RbI2BGYTrqqThAtJbfv9jcq=s176-c-k-c0x00ffffff-no-rj"
      ></Image> */}
        <Badge count={comments.length}>
          <BellFilled
            style={{ fontSize: 24 }}
            onClick={() => {
              setNotificationsOpen(true);
            }}
          />
        </Badge>
      </Space>
     
      <Drawer
        title="Notifications"
        open={notificationsOpen}
        onClose={() => {
          setNotificationsOpen(false);
        }}
        maskClosable
      >
        <List
          dataSource={comments}
          renderItem={(item) => {
            return (
              <List.Item>
                <Typography.Text strong>{item.title+" "}</Typography.Text>{item.description}
              </List.Item>
            );
          }}
        ></List>
      </Drawer>
    </div>
  );
}
export default AppHeader;
