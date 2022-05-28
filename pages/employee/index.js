import React,{createContext,useContext,useState} from 'react';
import Header from "../../component/Header/Header";
import Side from "../../component/Sider/Sider";
// import Admin from '../../component/Admin/Admin.js';
import Employee from '../../component/Emp/Emp';
import { Layout ,Menu } from 'antd';
const {Content,Sider} = Layout;
const contentStyle = {          
    padding:'30px',
    background:'#f7f7f7',
}
const layoutStyle = {
  minHeight: '100vh',
}
export const SiderContext = createContext();


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
                  <Employee/>
              </Content>
          </Layout>
      </Layout>
      </SiderContext.Provider>
    </>
  )
}
