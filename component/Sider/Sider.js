import React,{useState,useContext} from 'react';
import { Layout } from 'antd';
import classes from "./sider.module.css";
import MenuItems from '../Menu/MenuItems';
const {Sider} = Layout;

export default function Side(props) {
  const [collapsed , uncollapsed] = useState(false);
  const toggle = () => uncollapsed(value => !value);
  return (
    <>
      <div className={classes.sider}>
        <Sider width={229} collapsible collapsed={props.val} onCollapse={toggle}>
        
          <MenuItems/>
        </Sider>
      </div>
    </>
  )
}