import React,{useState,useEffect} from 'react';
import 'antd/dist/antd.css';
import { Table, Menu ,Tag,Dropdown,Button,Space,Progress,Popconfirm} from 'antd';
import {UserOutlined,DownOutlined} from "@ant-design/icons";
import AdjustIcon from '@mui/icons-material/Adjust';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import ModeEditIcon from '@mui/icons-material/ModeEdit';

const Delete = (record) => {
  
  console.log({record},"this data deleted.")
  deleteData(record)

  function deleteData(record){
    const requestOptions = {
        method: 'POST',
        headers: {
          'x-hasura-admin-secret': 'kymdKDF2bPeCjaXhSzySVwL17Ph1qT3bxhs1Ga36LVxJ7NmKZiqBDBKsoJMqonAx'
        },
        body: JSON.stringify({
          query: `mutation MyMutation {
            delete_RecentProjects(where: {key: {_eq: ${record.key}}}) {
              affected_rows
            }
          }
          `,
          operationName: "MyMutation"
    
        })
      }
    fetch('https://alive-alpaca-82.hasura.app/v1/graphql',requestOptions)
    .then(async response => {
        console.log("row deleted from clients")
    })
    .catch(error => {
        console.log(error)
    });
}
}

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
          icon: <Popconfirm title="Sure to delete?" onConfirm={() => Delete(record)}><DeleteOutlineIcon/></Popconfirm>,
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
                    <Dropdown overlay={actionMenu(record)}>
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
    
  const inData = () => {
      const requestOptions = {
          method: 'POST',
          headers: {
            'x-hasura-admin-secret': 'kymdKDF2bPeCjaXhSzySVwL17Ph1qT3bxhs1Ga36LVxJ7NmKZiqBDBKsoJMqonAx'
          },
          body: JSON.stringify({
            query: `query MyQuery {
              RecentProjects {
                action
                key
                name
                progress
                status
              }
            }
            
            `,
            operationName: "MyQuery"
      
          })
        }
      fetch('https://alive-alpaca-82.hasura.app/v1/graphql',requestOptions)
      .then(async response => {
         
          const data = await response.json();
          setData(data.data.RecentProjects)
          console.log("from recenrprojects",data.data.RecentProjects)
      })
      .catch(error => {
          console.log(error)
      });
  }

  useEffect(() => {
      
      inData()
      
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
