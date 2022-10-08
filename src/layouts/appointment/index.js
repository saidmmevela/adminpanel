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
import Card from "@mui/material/Card";

// uuid is a library for generating unique id
import { v4 as uuidv4 } from "uuid";

// Soft UI Dashboard React components
import SuiBox from "components/SuiBox";
import SuiTypography from "components/SuiTypography";
import SuiAvatar from "components/SuiAvatar";
import SuiBadge from "components/SuiBadge";
import SuiButton from "components/SuiButton";

// Images
import team2 from "assets/images/team-2.jpg";

// Soft UI Dashboard React base styles
import colors from "assets/theme/base/colors";
import typography from "assets/theme/base/typography";
import borders from "assets/theme/base/borders";

// @mui material components
import { Table as MuiTable } from "@mui/material";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";

// Soft UI Dashboard React examples
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import $ from "jquery";
import { getSessionCookie } from "../../session";
// import Table from "examples/Tables/Table";

// Data
// import authorsTableData from "layouts/appointment/data/authorsTableData";
// import projectsTableData from "layouts/appointment/data/projectsTableData";

function Appointment() {
  const [rowsa, setRosa] = useState([[]]);
  const [docdata, setDoc] = useState([]);
  const deleteAppoint = async (dat) => {
    console.log("id: ", dat);
    $.ajax({
      type: "POST",
      enctype: "multipart/form-data",
      url: "https://bizzynapp.herokuapp.com/api/Removeappointment",
      data: dat,
      cache: false,
      success: (data) => {
        // const data = await response.json();
        console.log("data", data);
        if (data.data === "no appointment") {
          // alert("Wrong email/password");
          // setLoad(false);
        } else {
          console.log("datafetch", data.data);
          setDoc(data.data);
          // const dato = data.data;
          console.log("data", docdata);
          alert("Success Delete");
          window.location.reload();
        }
      },
      error: (xhr, status, err) => {
        alert(err);
      },
    });
  };
  const acceptAppoint = async (dat) => {
    console.log("id: ", dat);
    $.ajax({
      type: "POST",
      enctype: "multipart/form-data",
      url: "https://bizzynapp.herokuapp.com/api/acceptappointment",
      data: dat,
      cache: false,
      success: (data) => {
        // const data = await response.json();
        console.log("data", data);
        if (data.data === "no appointment") {
          // alert("Wrong email/password");
          // setLoad(false);
        } else {
          console.log("datafetch", data.data);
          setDoc(data.data);
          // const dato = data.data;
          console.log("data", docdata);
          alert("Appointment accepted");
          window.location.reload();
        }
      },
      error: (xhr, status, err) => {
        alert(err);
      },
    });
  };
  const rejectAppoint = async (dat) => {
    console.log("id: ", dat);
    $.ajax({
      type: "POST",
      enctype: "multipart/form-data",
      url: "https://bizzynapp.herokuapp.com/api/rejectappointment",
      data: dat,
      cache: false,
      success: (data) => {
        // const data = await response.json();
        console.log("data", data);
        if (data.data === "no appointment") {
          // alert("Wrong email/password");
          // setLoad(false);
        } else {
          console.log("datafetch", data.data);
          setDoc(data.data);
          // const dato = data.data;
          console.log("data", docdata);
          alert("Appointment rejected");
          window.location.reload();
        }
      },
      error: (xhr, status, err) => {
        alert(err);
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
      url: "https://bizzynapp.herokuapp.com/api/doctorappointment",
      data: log,
      cache: false,
      success: (data) => {
        // const data = await response.json();
        console.log("data", data);
        if (data.data === "no appointment") {
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
                  {(getSessionCookie().status === "patient" && (
                    <SuiBox display="flex" flexDirection="column">
                      <SuiTypography variant="button" fontWeight="medium">
                        {dats.userDetails[0].full_name}(Doctor)
                        {getSessionCookie().status === "patient" ? "" : "(Doctor)"}
                      </SuiTypography>
                      <SuiTypography variant="caption" color="secondary">
                        {dats.userDetails[0].email}
                        {getSessionCookie().status === "patient" ? "" : "(Patient)"}
                      </SuiTypography>
                    </SuiBox>
                  )) ||
                    (getSessionCookie().status === "doctor" && (
                      <SuiBox display="flex" flexDirection="column">
                        <SuiTypography variant="button" fontWeight="medium">
                          {dats.userDetails[0].full_name}
                        </SuiTypography>
                        <SuiTypography variant="caption" color="secondary">
                          {dats.userDetails[0].email}
                        </SuiTypography>
                      </SuiBox>
                    )) ||
                    (getSessionCookie().status === "admin" && (
                      <SuiBox display="flex" flexDirection="column">
                        <SuiTypography variant="button" fontWeight="medium">
                          {dats.doc[0].full_name}(Doctor)
                        </SuiTypography>
                        <SuiTypography variant="caption" color="secondary">
                          {/* {getSessionCookie().status === "patient"
                            ? dats.userDetails[0].email
                            : dats.pat[0].full_name}
                          {getSessionCookie().status === "patient" ? "" : "(Patient)"} */}
                        </SuiTypography>
                      </SuiBox>
                    ))}
                </SuiBox>
              ),
              time: (
                <SuiBox display="flex" flexDirection="column">
                  <SuiTypography variant="caption" fontWeight="medium" color="text">
                    {dats.date}
                  </SuiTypography>
                  <SuiTypography variant="caption" color="secondary">
                    {dats.time}
                  </SuiTypography>
                </SuiBox>
              ),
              status:
                (getSessionCookie().status === "patient" && (
                  <SuiBadge
                    variant="gradient"
                    badgeContent={dats.response === "" ? "waiting" : dats.response}
                    color="info"
                    size="xs"
                    container
                  />
                )) ||
                (getSessionCookie().status === "admin" && (
                  <SuiButton
                    variant="gradient"
                    color="warning"
                    onClick={() => deleteAppoint(dats)}
                    // fullWidth
                  >
                    Delete
                  </SuiButton>
                )) ||
                (getSessionCookie().status === "doctor" && dats.response === "" && (
                  <SuiBox display="flex" flexDirection="column">
                    <SuiButton
                      variant="gradient"
                      color="info"
                      onClick={() => acceptAppoint(dats)}
                      // fullWidth
                    >
                      accept
                    </SuiButton>
                    <SuiButton
                      variant="gradient"
                      color="warning"
                      onClick={() => rejectAppoint(dats)}
                      // fullWidth
                    >
                      reject
                    </SuiButton>
                  </SuiBox>
                )) ||
                (getSessionCookie().status === "doctor" && dats.response !== "" && (
                  <SuiBadge
                    variant="gradient"
                    badgeContent={dats.response}
                    color="info"
                    size="xs"
                    container
                  />
                )),
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
    getappointment();
  }, []);
  const fullnamesTableData = {
    columns: [
      { name: "fullname", align: "left" },
      { name: "time", align: "left" },
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
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <SuiBox py={3}>
        <SuiBox mb={3}>
          <Card>
            <SuiBox display="flex" justifyContent="space-between" alignItems="center" p={3}>
              <SuiTypography variant="h6">Appointment</SuiTypography>
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
        </SuiBox>
      </SuiBox>
      <Footer />
    </DashboardLayout>
  );
}

export default Appointment;
