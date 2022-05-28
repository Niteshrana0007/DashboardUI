import React, { useEffect, useState } from 'react'
import { Row, Col, Card} from "antd";
import {HourglassOutlined} from "@ant-design/icons";
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import CorporateFareIcon from '@mui/icons-material/CorporateFare';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import HourglassEmptyIcon from '@mui/icons-material/HourglassEmpty';
import classes from "./emp.module.css";
import {fetchUser} from '../../config/authContext';

const cards = [
    {
        icon:<HourglassOutlined/>,
        text:'Richard Miles is off sick today',
        color:'#f62d51',
    },
    {
        icon:<BusinessCenterIcon/>,
        text:'You are away today',
        color:'#575757',
    },
    {
        icon:<CorporateFareIcon/>,
        text:'You are working from home today',
        color:'#575757',
    },
];

const cards2 = [
    {
        icon:<HourglassEmptyIcon/>,
        text:'2 people are going to be away',
        color:'#575757', 
    },
    {
        icon:<PersonAddAltIcon/>,
        text:'Your first day is going to be on Thursday',
        color:'#575757', 
    },
    {
        icon:<CalendarMonthIcon/>,
        text:'Its Spring Bank Holiday on Monday',
        color:'#575757', 
    },
    
    
];

const h4 = {
    textAlign:'center',
    fontWeight:900,
    color:'#1f1f1f',
    fontSize:'21px'
};

function Employee() {
    const [user , setUser] = useState({});
    useEffect(() => {

        if(localStorage.getItem('user')){
            const [userInfo] = fetchUser();
            console.log(userInfo)
            setUser(userInfo);
        }
        else{
            setUser({
                displayName:'John Doe',
                photoURL:'https://dreamguys.co.in/smarthr/maroon/assets/img/profiles/avatar-02.jpg'
            })
        }
       

    },[])
  return (
    <>
        <Row>
            <Col span={24}>
                <Card style={{marginBottom:'30px'}}>
                    <div style={{display:'flex'}}>
                        <img width='60px' height='60px' src={user.photoURL}/>
                        &nbsp;  &nbsp;
                        <div>
                            <h3 style={{fontSize:'1.2rem',fontWeight:'600'}}>Welcome, {user.displayName}</h3>
                            <p style={{fontSize:'16px',color:'#777',marginBottom:'0px'}}>Monday, 20 May 2019</p>
                        </div>
                    </div>
                </Card>
            </Col>
        </Row>

        <Row>
            <Col  xs={24} sm={24} md={24} lg={16} xl={16}>
                <section style={{marginBottom:'30px'}}>
                    <h1 className={classes.h1}>TODAY</h1>
                    {cards.map(e => (
                        <div style={{marginBottom:'10px'}}>
                            <a>
                                <Card>
                                    <div style={{display:'flex'}} >
                                        <div className={classes.icon}>{e.icon}</div>
                                        <div >
                                            <p style={{color: e.color}} className={classes.p}>{e.text}</p>
                                        </div>
                                        <div className={classes.img}>
                                            <div>
                                                <img width={39} height={39} src='https://dreamguys.co.in/smarthr/maroon/assets/img/profiles/avatar-09.jpg' />
                                            </div>
                                        </div>
                                    </div>
                                </Card>
                            </a>
                        </div>
                    ))} 
                </section>       
                <section style={{marginBottom:'30px'}}>
                    <h1 className={classes.h1}>TOMORROW</h1>
                        <div style={{marginBottom:'10px'}}>
                            <a>
                                <Card>
                                    <div style={{display:'flex'}} >
                                        <div style={{color: ''}} className={classes.icon}><BusinessCenterIcon/></div>
                                        <div >
                                            <p style={{color: ''}} className={classes.p}>2 people will be away tomorrow</p>
                                        </div>
                                        <div className={classes.img}>
                                            <div>
                                                <img width={39} height={39} src='https://dreamguys.co.in/smarthr/maroon/assets/img/profiles/avatar-09.jpg' />
                                            </div>
                                        </div>
                                    </div>
                                </Card>
                            </a>
                        </div>
                </section>  
                <section style={{marginBottom:'30px'}}>
                    <h1 className={classes.h1}>TODAY</h1>
                    {cards2.map(e => (
                        <div style={{marginBottom:'10px'}}>
                            <a>
                                <Card>
                                    <div style={{display:'flex'}} >
                                        <div style={{color: '#575757 !important'}} className={classes.icon}>{e.icon}</div>
                                        <div >
                                            <p style={{color: e.color}} className={classes.p}>{e.text}</p>
                                        </div>
                                        <div className={classes.img}>
                                            <div>
                                                <img width={39} height={39} src='https://dreamguys.co.in/smarthr/maroon/assets/img/profiles/avatar-09.jpg' />
                                            </div>
                                        </div>
                                    </div>
                                </Card>
                            </a>
                        </div>
                    ))} 
                </section>                         
            </Col>
            <Col xs={24} sm={24} md={24} lg={8} xl={8}>
                <div style={{padding:'10px'}}>
                    <div>                        
                        <section style={{padding:'10px'}}>
                            <h5 className={classes.h5}>Projects</h5>
                            <Card>
                                <div style={{display:'flex',justifyContent:'space-around'}}>
                                    <div>
                                        <h4 style={h4}>71</h4>
                                        <p className={classes.text}>Total Tasks</p>
                                    </div>
                                    <div>
                                        <h4 style={h4}>14</h4>
                                        <p className={classes.text}>Pending Tasks</p>
                                    </div>
                                </div>
                                <div>
                                    <h4 style={h4}>2</h4>
                                    <p className={classes.text} style={{textAlign:'center'}}>Total Projects</p>
                                </div>
                            </Card>
                        </section>
                        <section style={{padding:'10px'}}>
                            <h5 className={classes.h5}>YOUR LEAVE</h5>
                            <Card>
                                <div style={{display:'flex',justifyContent:'space-around',marginBottom:'8px'}}>
                                    <div>
                                        <h4 style={h4}>71</h4>
                                        <p className={classes.text}>Leave Taken</p>
                                    </div>
                                    <div>
                                        <h4 style={h4}>14</h4>
                                        <p className={classes.text}>REMAINING</p>
                                    </div>
                                </div>
                                <div>
                                    <div style={{textAlign:'center'}}>
                                        <a className={classes.apply_leave}>Apply Leave</a>
                                    </div>
                                </div>
                            </Card>
                        </section>
                        <section style={{padding:'10px'}}>
                            <h5 className={classes.h5}>YOUR TIME OFF ALLOWANCE</h5>
                            <Card>
                                <div style={{display:'flex',justifyContent:'space-around',marginBottom:'8px'}}>
                                    <div>
                                        <h4 style={h4}>5.0 Hours</h4>
                                        <p className={classes.text}>APPROVED</p>
                                    </div>
                                    <div>
                                        <h4 style={h4}>15 Hours</h4>
                                        <p className={classes.text}>REMAINING</p>
                                    </div>
                                </div>
                                <div>
                                    <div style={{textAlign:'center'}}>
                                        <a className={classes.apply_leave}>Apply Time Off</a>
                                    </div>
                                </div>
                            </Card>
                        </section>
                    </div>
                </div>
            </Col>
            
        </Row>
    </>
  )
}

export default Employee;