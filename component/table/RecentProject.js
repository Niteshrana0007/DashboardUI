import React,{useState,useEffect} from 'react';
import 'antd/dist/antd.css';
import { Table, Menu ,Tag,Dropdown,Button,Space,Progress,Popconfirm} from 'antd';
import {UserOutlined,DownOutlined} from "@ant-design/icons";
import AdjustIcon from '@mui/icons-material/Adjust';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import { inProjectData } from "../functions/function";
import { deleteProjectData } from "../functions/function";

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
  const actionMenu = (record) => (
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
          icon: <Popconfirm title="Sure to delete?" onConfirm={() => deleteProjectData(record)}><DeleteOutlineIcon/></Popconfirm>,
        },
      ]}
    />
  );
const columns = [
    {
        title: 'Project Name',
        dataIndex: 'name',
        key: 'Name',
    },
    {
        title: 'Progress',
        dataIndex: 'progress',
        key: 'progress',
        render: progress => (
            <>
                {progress.map(tag => {
                    return (
                        <> <Progress percent={tag} showInfo={false} /></>
                    )
                })}
            </>
        )
    },
    {
        title: 'Action',
        key: 'Action',
        dataIndex: 'action',
        render: (action,record) => (
            <>
              {action.map(tag => {
                
                return (
                    <Dropdown overlay={actionMenu(record)} key={100}>
                        <MoreVertIcon/>
                    </Dropdown>
                );
              })}
            </>
          ),
    },
    
];
const datas = [
    {
        key: '1',
        name: 'John Brown',
        progress: [65],
        action: ['A'],
        status: ['Active'],
    },
    {
        key: '2',
        name: 'Johnny',
        progress: [15],
        action: ['A'],
        status: ['Inactive'],
    },
    {
        key: '3',
        name: 'Ruby Bartlett',
        progress: [49],
        action: ['A'],
        status: ['Active'],
    },
    {
        key: '4',
        name: 'Misty Tison',
        progress: [5],
        action: ['A'],
        status: ['Active'],
    },
];

function RecentProject() {
  const [data , setData] = useState();
    
  useEffect(() => {
      
    const DATA =  inProjectData();
    DATA.then(value => {
      setData(value.data.RecentProjects)
    });
      
  },[])
    return (
        <>
            
          <Table
              columns={columns}
              // bordered
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

export default RecentProject;
