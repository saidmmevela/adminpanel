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
// import SuiTypography from "components/SuiTypographvy";

// @mui material components
import Card from "@mui/material/Card";

// uuid is a library for generating unique id
import { v4 as uuidv4 } from "uuid";

// Soft UI Dashboard React components
// import SuiBox from "components/SuiBox";
import SuiTypography from "components/SuiTypography";
// import SuiInput from "components/SuiInput";
// import SuiButton from "components/SuiButton";
import SuiAvatar from "components/SuiAvatar";
import SuiBadge from "components/SuiBadge";

// Soft UI Dashboard React examples
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import MiniStatisticsCard from "examples/Cards/StatisticsCards/MiniStatisticsCard";
// import ReportsBarChart from "examples/Charts/BarCharts/ReportsBarChart";
// import GradientLineChart from "examples/Charts/LineCharts/GradientLineChart";

// Soft UI Dashboard React base styles
import colors from "assets/theme/base/colors";
import typography from "assets/theme/base/typography";
import borders from "assets/theme/base/borders";

// @mui material components
import { Table as MuiTable } from "@mui/material";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
// Soft UI Dashboard React base styles
// import typography from "assets/theme/base/typography";

// Dashboard layout components
// import BuildByDevelopers from "layouts/dashboard/components/BuildByDevelopers";
// import WorkWithTheRockets from "layouts/dashboard/components/WorkWithTheRockets";
// import Projects from "layouts/dashboard/components/Projects";
// import OrderOverview from "layouts/dashboard/components/OrderOverview";
import $ from "jquery";

// Images
import team2 from "assets/images/team-2.jpg";
// Data
// import reportsBarChartData from "layouts/dashboard/data/reportsBarChartData";
// import gradientLineChartData from "layouts/dashboard/data/gradientLineChartData";
import { getSessionCookie } from "../../session";

function Dashboard() {
  // const { size } = typography;
  // const { chart, items } = reportsBarChartData;
  const [docdata, setDoc] = useState([]);
  const [appoint, setAppoint] = useState([]);
  const [rowsa, setRosa] = useState([[]]);
  // const colum = [
  //   { full_name: "fullname", phone: "left" },
  //   { full_name: "fullnames", phone: "left" },
  //   { full_name: "fullnameg", phone: "left" },
  //   { full_name: "fullnamel", phone: "left" },
  // ];
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
          console.log("datafetch", data.data);
          setDoc(data.data);
          const dat = data.data;
          console.log("data", docdata);
          // alert("success login");
          setRosa([
            dat.map((dats) => ({
              fullname: (
                <SuiBox display="flex" alignItems="center" px={1} py={0.5}>
                  <SuiBox mr={2}>
                    <SuiAvatar src={team2} alt="name" size="sm" variant="rounded" />
                  </SuiBox>
                  <SuiBox display="flex" flexDirection="column">
                    <SuiTypography variant="button" fontWeight="medium">
                      {dats.full_name}
                    </SuiTypography>
                    <SuiTypography variant="caption" color="secondary">
                      {dats.email}
                    </SuiTypography>
                  </SuiBox>
                </SuiBox>
              ),
              phone: (
                <SuiBox display="flex" flexDirection="column">
                  <SuiTypography variant="caption" fontWeight="medium" color="text">
                    {dats.phone_no}
                  </SuiTypography>
                </SuiBox>
              ),
              status: (
                <SuiBadge
                  variant="gradient"
                  badgeContent={dats.status}
                  color="success"
                  size="xs"
                  container
                />
              ),
            })),
          ]);
        }
      },
      error: (xhr, status, err) => {
        // alert(err);
        console.log("err", err);
      },
    });
  };
  useEffect(() => {
    if (getSessionCookie().status === "admin" || getSessionCookie().status === "patient") {
      getdoctor();
    }
  }, []);
  const fullnamesTableData = {
    columns: [
      { name: "fullname", align: "left" },
      { name: "phone", align: "left" },
      { name: "status", align: "center" },
    ],
  };
  // console.log("rowsa", rowsa);

  const { columns } = fullnamesTableData;
  // const { columns: prCols, rows: prRows } = projectsTableData;

  const { light } = colors;
  const { size, fontWeightBold } = typography;
  const { borderWidth } = borders;

  const renderColumns = columns.map(({ name, align, width }, key) => {
    let pl;
    let pr;

    if (key === 0) {
      pl = 3;
      pr = 3;
    } else if (key === columns.length - 1) {
      pl = 3;
      pr = 3;
    } else {
      pl = 1;
      pr = 1;
    }

    return (
      <SuiBox
        key={name}
        component="th"
        width={width || "auto"}
        pt={1.5}
        pb={1.25}
        pl={align === "left" ? pl : 3}
        pr={align === "right" ? pr : 3}
        textAlign={align}
        fontSize={size.xxs}
        fontWeight={fontWeightBold}
        color="secondary"
        opacity={0.7}
        borderBottom={`${borderWidth[1]} solid ${light.main}`}
      >
        {name.toUpperCase()}
      </SuiBox>
    );
  });

  const renderRows = rowsa[0].map((row, key) => {
    const rowKey = `row-${key}`;

    const tableRow = columns.map(({ name, align }) => {
      let template;

      if (Array.isArray(row[name])) {
        template = (
          <SuiBox
            key={uuidv4()}
            component="td"
            p={1}
            borderBottom={row.hasBorder ? `${borderWidth[1]} solid ${light.main}` : null}
          >
            <SuiBox display="flex" alignItems="center" py={0.5} px={1}>
              <SuiBox mr={2}>
                <SuiAvatar src={row[name][0]} name={row[name][1]} variant="rounded" size="sm" />
              </SuiBox>
              <SuiTypography variant="button" fontWeight="medium" sx={{ width: "max-content" }}>
                {row[name][1]}
              </SuiTypography>
            </SuiBox>
          </SuiBox>
        );
      } else {
        template = (
          <SuiBox
            key={uuidv4()}
            component="td"
            p={1}
            textAlign={align}
            borderBottom={row.hasBorder ? `${borderWidth[1]} solid ${light.main}` : null}
          >
            <SuiTypography
              variant="button"
              fontWeight="regular"
              color="secondary"
              sx={{ display: "inline-block", width: "max-content" }}
            >
              {row[name]}
            </SuiTypography>
          </SuiBox>
        );
      }

      return template;
    });

    return <TableRow key={rowKey}>{tableRow}</TableRow>;
  });
  const getappointment = async () => {
    // const email = getSessionCookie().email;
    const log = {
      email: getSessionCookie().email,
    };
    $.ajax({
      type: "POST",
      enctype: "multipart/form-data",
      url: "https://bizzynapp.herokuapp.com/api/doctorappointment",
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
            {getSessionCookie().status === "patient" && (
              <Card>
                <SuiBox display="flex" justifyContent="space-between" alignItems="center" p={3}>
                  <SuiTypography variant="h6">Doctors</SuiTypography>
                </SuiBox>
                <SuiBox
                  sx={{
                    "& .MuiTableRow-root:not(:last-child)": {
                      "& td": {
                        borderBottom: ({ borders: { borderColor } }) =>
                          `${borderWidth[1]} solid ${borderColor}`,
                      },
                    },
                  }}
                >
                  <TableContainer>
                    <MuiTable>
                      <SuiBox component="thead">
                        <TableRow>{renderColumns}</TableRow>
                      </SuiBox>
                      <TableBody>{renderRows}</TableBody>
                    </MuiTable>
                  </TableContainer>
                </SuiBox>
              </Card>
            )}
            {getSessionCookie().status === "admin" && (
              <Card>
                <SuiBox display="flex" justifyContent="space-between" alignItems="center" p={3}>
                  <SuiTypography variant="h6">Users</SuiTypography>
                </SuiBox>
                <SuiBox
                  sx={{
                    "& .MuiTableRow-root:not(:last-child)": {
                      "& td": {
                        borderBottom: ({ borders: { borderColor } }) =>
                          `${borderWidth[1]} solid ${borderColor}`,
                      },
                    },
                  }}
                >
                  <TableContainer>
                    <MuiTable>
                      <SuiBox component="thead">
                        <TableRow>{renderColumns}</TableRow>
                      </SuiBox>
                      <TableBody>{renderRows}</TableBody>
                    </MuiTable>
                  </TableContainer>
                </SuiBox>
              </Card>
            )}
          </Grid>
        </Grid>
      </SuiBox>
      <Footer />
    </DashboardLayout>
  );
}

export default Dashboard;
