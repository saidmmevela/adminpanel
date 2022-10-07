/**
=========================================================
* Soft UI Dashboard React - v3.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/soft-ui-dashboard-react
* Copyright 2022 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/
import { useState, useEffect } from "react";

// @mui material components
import Grid from "@mui/material/Grid";
// import Icon from "@mui/material/Icon";

// Soft UI Dashboard React components
import SuiBox from "components/SuiBox";
// import SuiTypography from "components/SuiTypography";

// Soft UI Dashboard React examples
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import MiniStatisticsCard from "examples/Cards/StatisticsCards/MiniStatisticsCard";
// import ReportsBarChart from "examples/Charts/BarCharts/ReportsBarChart";
// import GradientLineChart from "examples/Charts/LineCharts/GradientLineChart";

// Soft UI Dashboard React base styles
// import typography from "assets/theme/base/typography";

// Dashboard layout components
// import BuildByDevelopers from "layouts/dashboard/components/BuildByDevelopers";
// import WorkWithTheRockets from "layouts/dashboard/components/WorkWithTheRockets";
import Projects from "layouts/dashboard/components/Projects";
import OrderOverview from "layouts/dashboard/components/OrderOverview";
import $ from "jquery";
// Data
// import reportsBarChartData from "layouts/dashboard/data/reportsBarChartData";
// import gradientLineChartData from "layouts/dashboard/data/gradientLineChartData";
import { getSessionCookie } from "../../session";

function Dashboard() {
  // const { size } = typography;
  // const { chart, items } = reportsBarChartData;
  const [docdata, setDoc] = useState([]);
  const [appoint, setAppoint] = useState([]);

  const getdoctor = async () => {
    // const email = getSessionCookie().email;
    const log = {
      email: getSessionCookie().email,
    };
    $.ajax({
      type: "POST",
      enctype: "multipart/form-data",
      url: "https://bizzynapp.herokuapp.com/api/userbyrole",
      data: log,
      cache: false,
      success: (data) => {
        // const data = await response.json();
        console.log("data", data);
        if (data.data === "no user") {
          // alert("Wrong email/password");
          // setLoad(false);
        } else {
          console.log("datfetch", data.data);
          setDoc(data.data);
          // const dat = data.data;
          console.log("data", docdata);
          // alert("success login");
        }
      },
      error: (xhr, status, err) => {
        // alert(err);
        console.log("err", err);
      },
    });
  };
  const getappointment = async () => {
    // const email = getSessionCookie().email;
    const log = {
      email: getSessionCookie().email,
    };
    $.ajax({
      type: "POST",
      enctype: "multipart/form-data",
      url: "http://localhost:5000/api/doctorappointment",
      data: log,
      cache: false,
      success: (data) => {
        // const data = await response.json();
        console.log("dataapp", data);
        if (data.data === "no appointment") {
          // alert("Wrong email/password");
          // setLoad(false);
          setAppoint([]);
        } else {
          console.log("datafetchp", data.data);
          setAppoint(data.data);
          // const dat = data.data;
          console.log("app", appoint);
          // alert("success login");
        }
      },
      error: (xhr, status, err) => {
        // alert(err);
        console.log("err", err);
      },
    });
  };
  useEffect(() => {
    getdoctor();
    getappointment();
  }, []);

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <SuiBox py={3}>
        <SuiBox mb={3}>
          <Grid container spacing={3}>
            {getSessionCookie().status === "patient" && (
              <Grid item xs={12} sm={6} xl={3}>
                <MiniStatisticsCard
                  title={{
                    text: "total doctors",
                  }}
                  count={docdata.length}
                  // percentage={{ color: "success", text: "+3%" }}
                  icon={{ color: "info", component: "public" }}
                />
              </Grid>
            )}
            {getSessionCookie().status === "admin" && (
              <Grid item xs={12} sm={6} xl={3}>
                <MiniStatisticsCard
                  title={{
                    text: "total users",
                  }}
                  count={docdata.length}
                  // percentage={{ color: "success", text: "+3%" }}
                  icon={{ color: "info", component: "public" }}
                />
              </Grid>
            )}
            <Grid item xs={12} sm={6} xl={3}>
              <MiniStatisticsCard
                title={{ text: "Appointment" }}
                count={appoint.length}
                // percentage={{ color: "success", text: "+5%" }}
                icon={{
                  color: "info",
                  component: "shopping_cart",
                }}
              />
            </Grid>
          </Grid>
        </SuiBox>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6} lg={8}>
            <Projects />
          </Grid>
          <Grid item xs={12} md={6} lg={4}>
            <OrderOverview />
          </Grid>
        </Grid>
      </SuiBox>
      <Footer />
    </DashboardLayout>
  );
}

export default Dashboard;
