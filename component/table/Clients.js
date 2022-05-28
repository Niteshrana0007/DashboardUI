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
          icon: <Popconfirm title="Sure to delete?" onConfirm={() => Delete(record)}><DeleteOutlineIcon/></Popconfirm>,
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
  const [data , setData] = useState();
  useEffect(() => {
    
      const DATA =  readData();
      DATA.then(value => {
        setData(value.data.Clients)
      });
      
  },[])
    return (
        <>
            
          <Table
              columns={columns}
              dataSource={data}
              pagination={false}
              scroll={{
                  x:900,
                  y:200
              }}
          />
         
        </>
    );
}

export default Clients;

