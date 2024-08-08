import { Space } from "antd";
import "./App.css";
import AppFooter from "./Components/AppFooter";
import AppHeader from "./Components/AppHeader";
import PageContentAlmanac from "./Components/PageContentAlmanac";
import SideMenuAlmanac from "./Components/SideMenuAlmanac";

function Almanac() {
  return (
    <div className="App">
    <AppHeader />
    <div className="SideMenuAndPageContent">
      <SideMenuAlmanac></SideMenuAlmanac>
      <PageContentAlmanac></PageContentAlmanac>
    </div>
    <AppFooter />
  </div>
  );
}
export default Almanac;
