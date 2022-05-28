import React,{createContext,useContext,useState} from 'react';
import Side from "../component/Sider/Sider";
import Admin from '../component/Admin/Admin.js';
import Header from '../component/Header/Header';
import { Layout ,Menu } from 'antd';

import fire from '../config/firebase';
import {db} from '../config/firebase';
// console.log(fire)
// console.log("================>",db)

export const SiderContext = createContext();

const {Content,Sider} = Layout;
const contentStyle = {          
    padding:'30px',
    background:'#f7f7f7',
}
const layoutStyle = {
  minHeight: '100vh',
}
export default function Home() {
  const [word ,setWord] = useState(false)
  const [collapse , uncollapse] = useState(false);
  const toggle = () => setWord(value => !value);
  return (
    <>
    <SiderContext.Provider value={collapse}>
      <Layout style={layoutStyle} >
          <Header changeWord={() => setWord(toggle)}/>
          <Layout className="site-layout">
              <Side val={word}/>
              <Content style={contentStyle} >
                  <Admin/>
              </Content>
          </Layout>
      </Layout>
      </SiderContext.Provider>
    </>
  )
}
