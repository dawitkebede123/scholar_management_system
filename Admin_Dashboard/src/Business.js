import { Space } from "antd";
import "./App.css";
import AppFooter from "./Components/AppFooter";
import AppHeader from "./Components/AppHeader";
import PageContentBusiness from "./Components/PageContentBusiness";
import SideMenuBusiness from "./Components/SideMenuBusiness";

function Business() {
  return (
    <div className="App">
      <AppHeader />
      <div className="SideMenuAndPageContent">
        <SideMenuBusiness></SideMenuBusiness>
        <PageContentBusiness></PageContentBusiness>
      </div>
      <AppFooter />
    </div>
  );
}
export default Business;
