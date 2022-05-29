import React,{useEffect, useState} from 'react'
import { Button, Modal, Form, Input } from 'antd';
import 'antd/dist/antd.css';
import { ConnectingAirportsOutlined } from '@mui/icons-material';
import {inClientData,readData} from "../functions/function"

const ClientModal = (props) => {
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

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
    
  };
  
  const onFinish = (values) => {
    console.log('Success:', values);
    inClientData(values);
    setTimeout(() => {
      const DATA =  readData();
      DATA.then(value => {
        props.setData(value.data.Clients)
      });
    },1000)
    console.log('data sent to hasura')
    setIsModalVisible(false);
    
  };

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
            label="Name"
            name="name"
            rules={[
              {
                required: true,
                message: 'Please input your name!',
              },
            ]}
          >
            <Input placeholder='ex : Nitesh'/>
          </Form.Item>

          <Form.Item
            label="Email"
            name="email"
            rules={[
              {
                required: true,
                message: 'Please input your email!',
              },
            ]}
          >
            <Input placeholder='ex : abc@gmail.com'/>
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
            <Input placeholder='ex : active or Inactive'/>
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
            <Input placeholder='ex : edit or delete'/>
          </Form.Item>

          <Form.Item
            label="Key"
            name="key"
            rules={[
              {
                required: true,
                message: 'Please input unique key!',
              },
            ]}
          >
            <Input placeholder='ex : unique value like: 1234'/>
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

export default ClientModal;