import React, { useEffect, useState } from "react";
import { Row, Col, Card, Progress } from "antd";
import classes from "./admin.module.css";
import { DollarCircleFilled } from "@ant-design/icons";
import Chart from "../Chart/Charts.tsx";
import Invoice from "../table/Invoice";
import Payment from "../table/Payments";
import { LineChart } from "../Chart/Line.tsx";
import AdjustIcon from '@mui/icons-material/Adjust';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import {data,Statistics,cardData} from "../../data/Data"
import Clients from "../table/Clients";
import RecentProject from '../table/RecentProject';
import { useAuth } from "../../config/authContext";
import InvoiceModal from "../table/InvoiceModal";
import PaymentModal from "../table/PaymentModal";
import ClientModal from "../table/ClientModal";
import ProjectModal from "../table/ProjectModal";
// import { getDatabase, ref, set,onValue ,child, get} from "firebase/database";

const cardStyle = {
  boxShadow: "0 1px 1px 0 rgb(0 0 0 / 20%)",
  border: "1px solid #ededed"
};

const cardminStyle = {
  minHeight: "213.234px",
  maxHeight: "213.234px",
  boxShadow: "0 1px 1px 0 rgb(0 0 0 / 20%)",
  border: "1px solid #ededed"
}

const TaskStyle = {
  boxShadow: "0 1px 1px 0 rgb(0 0 0 / 20%)",
  border: "1px solid #ededed",
  minHeight: "469.422px",
  maxHeight: "469.422px"
};

function Admin() {
  const [DATA ,SETDATA] = useState(['hello'])
  console.log(DATA)
  const {user} = useAuth();
  console.log({user})
  
  // useEffect(() => {
  //   writeUserData(user);
  //   function writeUserData(data) {
  //     const db = getDatabase();
  //     const userId = data.uid;
  //     set(ref(db, 'users/' + `${userId}`), {
  //       // username: 'me',
  //       email: data.email
  //     });
  //     console.log("data sent to realtime")
  //   }
  // },[])

  function writeUserData(data) {
    const db = getDatabase();
    const userId = data.Email.split('.')[0];
    set(ref(db, 'users/' + `${userId}`), {
      // username: 'me',
      email: data.Email,
      password : data.password
    });
    console.log("data sent to realtime")
  }
  return (
    <>
      {/* heading section */}
      <Row>
        <Col style={{ marginBottom: "1.875rem" }} xs={24}>
          <h3 className={classes.page_title}>Welcome {user ? (user.email.replace(/@.*/, "")) : "null"}!</h3>
          <ul className={classes.breadcrumb}>Dashboard</ul>
        </Col>
      </Row>
      {/* upper cards */}
      <div className={classes.cards}>
        <Row
          gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}
          style={{ justifyContent: "space-around" }}
        >
          {data.Cards.items.map((e) => (
            <Col className="gutter-row" xs={24} sm={10} md={10} lg={10} xl={6}>
              <div className={classes.card}>
                <Card bordered={true} style={{ height: "108px" }}>
                  <div>
                    <div>
                      <span className={classes.icon}>
                        <DollarCircleFilled />
                      </span>
                      <div style={{ textAlign: "right" }}>
                        <h3 className={classes.h3}>{e.n}</h3>
                        <span className={classes.span}>{e.t}</span>
                      </div>
                    </div>
                  </div>
                </Card>
              </div>
            </Col>
          ))}
        </Row>
      </div>
      {/* charts */}
      <Row
        gutter={{ xs: 34, sm: 24, md: 24, lg: 32 }}
        style={{ rowGap: "25px", marginBottom: "30px" }}
      >
        <Col xs={24} sm={24} md={24} lg={12} xl={12}>
          <Card style={cardStyle}>
            <Chart />
          </Card>
        </Col>
        <Col xs={24} sm={24} md={24} lg={12} xl={12}>
          <Card style={cardStyle}>
            <LineChart />
          </Card>
        </Col>
      </Row>
      {/* joined cards */}
      <Row style={{ rowGap: "25px", marginBottom: "30px" }}>
        {cardData.map((e) => (
          <Col xs={24} sm={24} md={12} lg={12} xl={6}>
            <Card style={cardminStyle}>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span>
                  <h3>{e.title}</h3>{" "}
                </span>
                <span>
                  <h4 style={{ color: e.color }}> {e.successvalue}</h4>
                </span>
              </div>

              <h3 style={{ fontSize: "1.5rem" }}> {e.num} </h3>
              <Progress
                trailColor={"#e9ecef"}
                strokeColor={"#e65046"}
                percent={70}
                showInfo={false}
              />
              <h3>
                {e.prevMonth}{" "}
                <span style={{ color: "grey" }}>{e.prevdata}</span>
              </h3>
            </Card>
          </Col>
        ))}
      </Row>
      {/* Statistic cards */}

      <Row gutter={20}  style={{ rowGap: "25px", marginBottom: "30px" }}>
        <Col xs={24} sm={24} md={24} lg={24} xl={8}>
          <Card style={cardStyle}>
            <h5 className={classes.h5}>Statistics</h5>
            {Statistics.map((e) => (
              <div className={classes.statistic_card}>
                <p style={{ display: "flex", justifyContent: "space-between" }}>
                  {e.text}{" "}
                  <strong>
                    {e.num.y} <small>/ {e.num.t}</small>
                  </strong>
                </p>
                <div>
                  <Progress
                    strokeColor={e.color}
                    percent={e.percent}
                    showInfo={false}
                  />
                </div>
              </div>
            ))}
          </Card>
        </Col>

        <Col xs={24} sm={24} md={24} lg={24} xl={8}>
          <Card style={TaskStyle}>
            <Col span={24}>
              <h4 className={classes.Task_Statistics}>Task Statistics</h4>
            </Col>
            <Col span={24}>
              <Row gutter={4}>
                <Col span={12}>
                  <Card>
                    <div class={classes.statistic_cards}>
                      <p>Total Tasks</p>
                      <h3 style={{ fontWeight: "600" }}>385</h3>
                    </div>
                  </Card>
                </Col>
                <Col span={12}>
                  <Card>
                    <div class={classes.statistic_cards}>
                      <p>Overdue Tasks</p>
                      <h3 style={{ fontWeight: "600" }}>19</h3>
                    </div>
                  </Card>
                </Col>
              </Row>
            </Col>
            <Col span={24}>
              <Progress trailColor={"red"} strokeColor={"yellow"} percent={40} success={{ percent: 30 }} showInfo={false} />
            </Col>
            <Col style={{display:"flex" ,flexDirection:'column'}} span={24}>
                {Statistics.map(e => (
                    <div style={{display:"flex",justifyContent:'space-between'}}>
                        <div style={{display:"flex"}}>
                            <AdjustIcon style={{color: e.color}} ></AdjustIcon> &nbsp; &nbsp;
                            <p>{e.text}</p>
                        </div> 
                        <span >{e.num.t}</span>
                    </div>
                ))}
            </Col>
          </Card>
        </Col>

        <Col xs={24} sm={24} md={24} lg={24} xl={8}>
          <Card style={TaskStyle}>
                <Col span={24}><h4 className={classes.today_absent} >Today Absent <span style={{backgroundColor:'rgba(242, 17, 54,0.12)',color:'#e63c3c'}} >5</span></h4></Col>
                <Col span={24}>
                    <Card>
                        <Col style={{display:"flex",marginBottom:'10px'}} span={24}>
                            <AccountCircleIcon className={classes.profile_logo}></AccountCircleIcon>
                            <div>Martin Lewis</div>
                        </Col>
                        <Col span={24}>
                            <div style={{display:'flex',justifyContent:'space-between'}}>
                                <div>
                                    <span>4 Sep 2019</span>
                                    <h6>Leave Date</h6>
                                </div>
                                <div><span style={{backgroundColor:'rgba(242, 17, 54,0.12)',color:'#e63c3c '}}>Pending</span></div>
                            </div>
                        </Col>
                    </Card>
                </Col>
                <Col style={{marginTop:"10px"}} span={24}>
                    <Card>
                        <Col style={{display:"flex",marginBottom:'10px'}} span={24}>
                            <AccountCircleIcon className={classes.profile_logo} ></AccountCircleIcon>
                            <div>Martin Lewis</div>
                        </Col>
                        <Col span={24}>
                            <div style={{display:'flex',justifyContent:'space-between'}}>
                                <div>
                                    <span>4 Sep 2019</span>
                                    <h6>Leave Date</h6>
                                </div>
                                <div><span style={{backgroundColor:'rgba(15, 183, 107,0.12)',color:'#26af48'}}>Approved</span></div>
                            </div>
                        </Col>
                     </Card>
                </Col>
                <Col style={{marginTop:"10px"}} span={24}>
                    <div style={{textAlign:'center'}}>
                        <a className={classes.load_more}>Load More</a>
                    </div>
                </Col>
          </Card>
        </Col>
      </Row>
    {/* table cards */}
    <Row gutter={15}  style={{ rowGap: "25px", marginBottom: "30px" }}>
        <Col style={{boxShadow: "0 1px 1px 0 rgb(0 0 0 / 20%)"}} xs={24} sm={24} md={24} lg={24} xl={12}>
            <Col>
                <Card>
                
                    <h3 className={classes.today_absent}>Invoices <InvoiceModal DATA={DATA}/></h3>
                    <Invoice/>
                
                </Card>
            </Col>
        </Col>
        <Col style={{boxShadow: "0 1px 1px 0 rgb(0 0 0 / 20%)"}} xs={24} sm={24} md={24} lg={24} xl={12}>
            <Col>
                <Card>
                    <h3 className={classes.today_absent}>Payments <PaymentModal/></h3>
                    <Payment/>
                </Card>
            </Col>
        </Col>
    </Row>
    {/* table cards */}
    <Row gutter={15}  style={{ rowGap: "25px", marginBottom: "30px" }}>
        <Col style={{boxShadow: "0 1px 1px 0 rgb(0 0 0 / 20%)"}} xs={24} sm={24} md={24} lg={24} xl={12}>
            <Col>
                <Card>
                    <h3 className={classes.today_absent}>Clients <ClientModal/></h3>
                    <Clients/>
                </Card>
            </Col>
        </Col>
        <Col style={{boxShadow: "0 1px 1px 0 rgb(0 0 0 / 20%)"}} xs={24} sm={24} md={24} lg={24} xl={12}>
            <Col>
                <Card>
                    <h3 className={classes.today_absent}>Recent Projects <ProjectModal/></h3>
                    <RecentProject/>
                </Card>
            </Col>
        </Col>
    </Row>
    </>
  );
}

export default Admin;
