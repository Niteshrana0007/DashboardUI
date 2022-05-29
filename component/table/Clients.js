import React,{useEffect,useState} from 'react';
import 'antd/dist/antd.css';
import { Table, Menu ,Tag,Dropdown,Button,Space,Popconfirm} from 'antd';
import {UserOutlined,DownOutlined} from "@ant-design/icons";
import AdjustIcon from '@mui/icons-material/Adjust';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import { readData } from '../functions/function';
import { Delete  } from "../functions/function";
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import ClientModal from "./ClientModal";

const today_absent = {
  display: 'flex',
  justifyContent:' space-between',
  marginTop: '0',
  marginBottom: '0.5em',
  color: 'rgba(0, 0, 0, 0.85)',
  fontWeight: 600,
  color: '#1f1f1f',
  fontSize: '20px',
  /* font-weight: 500; */
  marginBottom: '20px',

}

const datas = [
    {
        key: '1',
        name: 'John Brown',
        email: 'John@gmail.com',
        action: ['A'],
        status: ['Active'],
    },
    {
        key: '2',
        name: 'Barry Coda',
        email: 'coda@gmail.com',
        action: ['A'],
        status: ['Inactive'],
    },
    {
        key: '3',
        name: 'Ruby Bartlett',
        email: 'John@gmail.com',
        action: ['A'],
        status: ['Active'],
    },
    {
        key: '4',
        name: 'Misty Tison',
        email: 'coda@gmail.com',
        action: ['A'],
        status: ['Active'],
    },
];

function Clients() {
  const [data , setData] = useState(null);

  const menu = (
    <Menu
      items={[
        {
          label: 'Active',
          key: '1',
          icon: <AdjustIcon />,
        },
        {
          label: 'Inactive',
          key: '2',
          icon: <AdjustIcon />,
        },
      ]}
    />
  );
  const actionMenu =(record) => (
    <Menu
      items={[
        {
          label: 'Edit',
          key: '1',
          icon: <ModeEditIcon />,
        },
        {
          label: 'Delete',
          key: '2',
          icon: <Popconfirm 
                  title="Sure to delete?" 
                  onConfirm={() => {
                    Delete(record);
                    setTimeout(() => {
                      const DATA =  readData();
                      DATA.then(value => {
                        setData(value.data.Clients)
                      });
                    },1000)

                  }}
                  >
                    <DeleteOutlineIcon/>
                </Popconfirm>,
        },
      ]}
    />
  );

  const columns = [
    {
        title: 'Name',
        dataIndex: 'name',
        key: 'Name',
        
    },
    {
        title: 'Email',
        dataIndex: 'email',
        key: 'Email',
    },
    {
        title: 'Status',
        dataIndex: 'status',
        key: 'Status',
        render: (status) => (
            <>
              {status.map(tag => {
                let color = tag.length > 6 ? 'red' : 'green';
                if (tag === 'loser') {
                  color = 'volcano';
                }
                return (
                    <Dropdown overlay={menu} key={1}>
                    <Button>
                      <Space>
                        <AdjustIcon style={{color:color}}/>
                        {tag}
                        <DownOutlined />
                      </Space>
                    </Button>
                  </Dropdown>
                );
              })}
            </>
          ),
    },
    {
        title: 'Action',
        key: 'Action',
        dataIndex: 'action',
        render: (action,record) => (
            <>
              {action.map(tag => {
                
                return (
                    <Dropdown overlay={actionMenu(record)} key={tag}>
                        <MoreVertIcon/>
                    </Dropdown>
                );
              })}
            </>
          ),
    }    
  ];

  useEffect(() => {
    
      const DATA =  readData();
      DATA.then(value => {
        setData(value.data.Clients)
      });
      
  },[])
    return (
        <>
            
          {
            data ?
            <>
              <h3 style={today_absent}>Clients <ClientModal setData={(val) => setData(val)} /></h3>
              <Table
                  columns={columns}
                  dataSource={data}
                  pagination={false}
                  scroll={{
                      x:900,
                      y:200
                  }}
              />
            </> : 
            <Backdrop
              sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1,width:'690.667',height:'355',position:'absolute' }}
              open
            >
              <CircularProgress color="inherit" />
            </Backdrop>
          }
      
         
        </>
    );
}

export default Clients;

