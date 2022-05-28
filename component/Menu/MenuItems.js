import Link from 'next/link';
import { Menu } from 'antd';
import {
    AppstoreOutlined,
    PieChartOutlined,
    DesktopOutlined,
    ContainerOutlined,
    DashboardOutlined,
  } from '@ant-design/icons';

const drawer_items = [
  
    getItem('Dashboard', 'sub1', <DashboardOutlined />, [
      getItem('', '1',<Link href='/'>Admin Dashboard</Link>),
      getItem('', '2',<Link href='/employee'>Employee Dashboard</Link>)
    ]),
    getItem('Apps', 'sub2', <AppstoreOutlined />, [
      getItem('Chat', '3'),
      
      getItem('Calls', 'sub3', null, [getItem('Voice Call', '26'), getItem('Video Call', '27')]),
      getItem('Calender', '4'),
      getItem('Contacts', '5'),
      getItem('Email', '6'),
      getItem('File Manager', '7')
    ]),
    getItem('Employess', '8', <PieChartOutlined />),
    getItem('Clients', '9', <DesktopOutlined />),
    getItem('Projects', '10', <ContainerOutlined />),
    getItem('Leads', '11', <PieChartOutlined />),
    getItem('Tickets', '12', <DesktopOutlined />),
    getItem('Account', '13', <ContainerOutlined />),
    getItem('Payroll', '14', <PieChartOutlined />),
    getItem('Policies', '15', <DesktopOutlined />),
    getItem('Reports', '16', <ContainerOutlined />),
    getItem('Goals', '17', <PieChartOutlined />),
    getItem('Promotion', '18', <DesktopOutlined />),
    getItem('Resignation', '19', <ContainerOutlined />),
    getItem('Termination', '20', <PieChartOutlined />),
    getItem('Assets', '21', <DesktopOutlined />),
    getItem('Jobs', '22', <ContainerOutlined />),
    getItem('Activites', '23', <PieChartOutlined />),
    getItem('Users', '24', <DesktopOutlined />),
    getItem('Settings', '25', <ContainerOutlined />),
    
  ];
  function getItem(label, key, icon, children, type) {
    return {
      key,
      icon,
      children,
      label,
      type,
    };
  }

 
  function MenuItems() {
    return (
      <>
        <Menu    
            defaultSelectedKeys={['1']}
            defaultOpenKeys={['sub1']}
            mode="inline"
            theme="dark"
            inlineCollapsed={false}
            items={drawer_items}
        />
      </>
    )
  }
  
  export default MenuItems