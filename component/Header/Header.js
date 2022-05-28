import React,{createContext,useContext} from 'react';
import { useAuth } from '../../config/authContext';
import 'antd/dist/antd.css';
import classes from './Header.module.css';
import SearchIcon from '@mui/icons-material/Search';
import { MailOutlined,DownOutlined,BellOutlined,MessageOutlined,UpOutlined ,UserAddOutlined} from '@ant-design/icons';
import Badge from '@mui/material/Badge';
import MenuSharpIcon from '@mui/icons-material/MenuSharp';
import { Row, Col,Menu ,Dropdown,Drawer} from 'antd';
import { useState } from "react";
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined
} from '@ant-design/icons';
import MenuItems from '../Menu/MenuItems';
import Link from 'next/link';
import { useRouter } from 'next/router';

const Logout =()=> {
  const router = useRouter();
  const {user,logout} = useAuth();
  return(
    <>
      <a onClick={() => {
        logout()
        localStorage.clear();
        router.push('/login')
      }}>
        Logout
      </a>
    </>
  )
}
const Arrow =()=> {
  
  const [cut , uncut] = useState(true);
    const toggle = () => uncut(value => !value);
  return (
    <>
      {(cut)? <DownOutlined onClick={toggle} style={{fontSize:'20px'}}/>:<Dropdown overlay={language} arrow><UpOutlined onClick={toggle} style={{fontSize:'20px'}}/></Dropdown>}
    </>
  )
}

const app = (
  <Menu
    drawer_items={[
      {
        label: (
          <a target="_blank" rel="noopener noreferrer" href="https://www.antgroup.com">
            1st menu item
          </a>
        ),
      },
      {
        label: (
          <a target="_blank" rel="noopener noreferrer" href="https://www.aliyun.com">
            2nd menu item
          </a>
        ),
      },
      {
        label: (
          <a target="_blank" rel="noopener noreferrer" href="https://www.luohanacademy.com">
            3rd menu item
          </a>
        ),
      },
    ]}
  />
);

const user = (
  <Menu
    items={[
      {
        label: (
          <a target="_blank" rel="noopener noreferrer" href="https://www.antgroup.com">
            My Profile
          </a>
        ),
      },
      {
        label: (
          <a target="_blank" rel="noopener noreferrer" href="https://www.aliyun.com">
            Settings
          </a>
        ),
      },
      {
        label: (
          <Logout/>
        ),
      },
    ]}
  />
);

const language = (
  <Menu
    items={[
      {
        label: (
          <a target="_blank" rel="noopener noreferrer" href="https://www.antgroup.com">
            English
          </a>
        ),
      },
      {
        label: (
          <a target="_blank" rel="noopener noreferrer" href="https://www.aliyun.com">
            French
          </a>
        ),
      },
      {
        label: (
          <a target="_blank" rel="noopener noreferrer" href="https://www.luohanacademy.com">
            Spanish
          </a>
        ),
      },
    ]}
  />
);

const items = [
    {
      label: 'English',
      key: 'mail',
      icon: <Arrow />,
    },
    {
     
      key: 'notification',
      icon: <Badge badgeContent={3} color="primary" ><Dropdown overlay={app} placement="bottom" arrow><BellOutlined style={{fontSize:'20px'}} /></Dropdown></Badge>,
     
    },
    {
      icon: <Badge badgeContent={8} color="primary"><MessageOutlined style={{fontSize:'20px'}} /></Badge>,
      key:'message'
    },
    {
      label:'admin',
      icon:<Dropdown overlay={user} placement="bottom" arrow><UserAddOutlined style={{fontSize:'20px'}} /></Dropdown>,
      key: 'alipay',
    },
  ];

const contentStyle = {
  position:'sticky',
  top:'0px',
  zIndex:'100',
  background : "linear-gradient( to right ,#f43b48 0%, #453a94 100%)",
  height: '60px'
}
const MenuStyle = {
    backgroundColor: 'inherit',
    borderBottom : 'none',
};

const onSearch = value => console.log(value);


const Nav = (props) => {

    const [current, setCurrent] = useState('mail');
    const onClick = (e) => {
        console.log('click ', e);
        setCurrent(e.key);
    };

    const [collapsed , uncollapsed] = useState(true);
    const toggle = () => {
      uncollapsed(value => !value);
    };

    const [visible, setVisible] = useState(false);
    const showDrawer = () => {
      setVisible(true);
    };
    const onClose = () => {
      setVisible(false);
    };
  return  (
   
    <>
       <Row style={contentStyle}>
          <Col xl={1} lg={1} xs={1}>
            <div className={classes.drawer} onClick={showDrawer}><MenuSharpIcon/></div>
          </Col>
          <Col xl={3} lg={3}  xs={23} >
            <a className={classes.logo}><img src='https://dreamguys.co.in/smarthr/maroon/assets/img/logo.png' alt='logo' /></a>
          </Col>
          <Col xl={1} lg={1}  xs={0}>
            <div className={classes.hamburger}>
              {
                collapsed ? <div onClick={() => props.changeWord(collapsed)}><MenuUnfoldOutlined/></div> : <div onClick={toggle}><MenuFoldOutlined/></div>
              }
            </div>
          </Col>
          <Col xl={7} lg={7}  xs={0}>
            <div className={classes.title}>
              
              <h3 className={classes.logoText}>Dreamguy's Technologies</h3>
            </div>
          </Col>
          <Col xl={12} lg={12}  xs={0} >
            <div className={classes.nav}>
                <div className={classes.search}>
                    <div>Search here</div>
                    <SearchIcon/>
                </div>
                <Menu className={classes.li} style={MenuStyle}  onClick={onClick} mode="horizontal" items={items} />
            </div>
          </Col>
      </Row>
      <div>
        <Drawer
            width='229px'
            placement="left" onClose={onClose} visible={visible}
            className={classes.drawer_elements}
          >
            <MenuItems />
          </Drawer>
      </div>
    </>
  )
}
export default Nav ;
