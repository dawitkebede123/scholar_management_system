import { Typography } from "antd";
import { FaGooglePlay,FaAppStore } from "react-icons/fa";
function AppFooter() {
  return (
    <div className="AppFooter">

      <Typography.Link href="https://play.google.com/store/apps/details?id=com.ground360.addischamber&hl=en_US">  <FaGooglePlay size={32} color="#4285F4" /></Typography.Link>
      <Typography.Link href="https://www.google.com">  <FaAppStore size={32} color="#4285F4" /></Typography.Link>
      <Typography.Link href="https://addischamber.com/" target={"_blank"}>
        Addis Chamber Website
      </Typography.Link>
      {/* <Typography.Link href="https://www.google.com" target={"_blank"}>
        Terms of Use
      </Typography.Link> */}
    </div>
  );
}
export default AppFooter;
