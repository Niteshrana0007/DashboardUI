// key in form should be unique

import React,{useState} from 'react'
import { Button, Modal, Form, Input } from 'antd';
import 'antd/dist/antd.css';
import { ConnectingAirportsOutlined } from '@mui/icons-material';

const ProjectModal = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [data , setData] = useState();
  
  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const onFinish = (values) => {
    console.log('Success:', values);
    inData(values);
    console.log('data sent to hasura')
    setIsModalVisible(false);
    
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
    
  };
  
  const inData = (values) => {
      const requestOptions = {
          method: 'POST',
          headers: {
            'x-hasura-admin-secret': 'kymdKDF2bPeCjaXhSzySVwL17Ph1qT3bxhs1Ga36LVxJ7NmKZiqBDBKsoJMqonAx'
          },
          body: JSON.stringify({
            query: 
            `mutation MyMutation {
                insert_RecentProjects(objects: {action: ["${values.action}"], key: ${Number(values.key)}, name: "${values.project_name}", progress: [${Number(values.progress)}], status: ["${values.status}"]}) {
                  returning {
                    action
                    key
                    name
                    progress
                    status
                  }
                }
              }
              
            `,
            operationName: "MyMutation"
      
          })
        }
      fetch('https://alive-alpaca-82.hasura.app/v1/graphql',requestOptions)
      .then(async response => {
        
          const data = await response.json();
          setData(data.data.Invoice)
          console.log("sent invoice data")
      })
      .catch(error => {
          console.log(error)
      });
}


  return (
    <>
      <Button type="primary" onClick={showModal}>
        Add
      </Button>
      <Modal title="Basic Modal"  visible={isModalVisible}  onOk={handleOk} onCancel={handleCancel}>
          <Form
          name="basic"
          labelCol={{
            span: 8,
          }}
          wrapperCol={{
            span: 8,
          }}
      
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            label="Project Name"
            name="project_name"
            rules={[
              {
                required: true,
                message: 'Please input your name!',
              },
            ]}
          >
            <Input placeholder='Project Name'/>
          </Form.Item>

          <Form.Item
            label="Progress"
            name="progress"
            rules={[
              {
                required: true,
                message: 'Please input your email!',
              },
            ]}
          >
            <Input placeholder='eg : 45'/>
          </Form.Item>

          <Form.Item
            label="Action"
            name="action"
            rules={[
              {
                required: true,
                message: 'Please input your action!',
              },
            ]}
          >
            <Input placeholder='eg : Edit or Delete' />
          </Form.Item>

          <Form.Item
            label="KEY"
            name="key"
            rules={[
              {
                required: true,
                message: 'Please input your action!',
              },
            ]}
          >
            <Input placeholder='eg : unique numeric value' />
          </Form.Item>

          <Form.Item
            label="Status"
            name="status"
            rules={[
              {
                required: true,
                message: 'Please input your status!',
              },
            ]}
          >
            <Input placeholder='eg : active and inactive' />
          </Form.Item>

          <Form.Item
            wrapperCol={{
             
              span: 24,
            }}
          >
            <Button size='small' type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
    </Modal>
    </>
  );
};

export default ProjectModal;