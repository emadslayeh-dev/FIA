import DashboardNavigation from "../header/DashboardNavigation";
import BusinessDetails from "./BusinessDetails";

export default function BusinessSettingsInfo() {
  return (
    <div className='dashboard__content hover-bgc-color'>
      <div className='row pb40'>
        <div className='col-lg-12'>
          <DashboardNavigation />
        </div>
        <div className='col-lg-9'>
          <div className='dashboard_title_area'>
            <h2>הגדרות עסק</h2>
            <p className='text'></p>
          </div>
        </div>
      </div>
      <div className='row'>
        <div className='col-xl-12'>
          <BusinessDetails />
        </div>
      </div>
    </div>
  );
}
