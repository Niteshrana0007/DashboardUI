import React,{useState,useContext,createContext} from 'react'
import { Button, Modal, Form, Input } from 'antd';
import 'antd/dist/antd.css';
import { ConnectingAirportsOutlined } from '@mui/icons-material';
import { insertInvoiceData } from '../functions/function';

const InvoiceModal = (props) => {
  
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
    insertInvoiceData(values);
    console.log('data sent to hasura');
    setIsModalVisible(false);
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
    
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
            label="InvoiceID"
            name="InvoiceID"
            rules={[
              {
                required: true,
                message: 'Please input your InvoiceID!',
              },
            ]}
          >
            <Input placeholder='ex : #INV-0001'/>
          </Form.Item>

          <Form.Item
            label="client"
            name="client"
            rules={[
              {
                required: true,
                message: 'Please input your client!',
              },
            ]}
          >
            <Input placeholder='ex : John Brown'/>
          </Form.Item>

          <Form.Item
            label="duedate"
            name="duedate"
            rules={[
              {
                required: true,
                message: 'Please input your duedate!',
              },
            ]}
          >
            <Input placeholder='ex : 2022-05-25'/>
          </Form.Item>
          <Form.Item
            label="total"
            name="total"
            rules={[
              {
                required: true,
                message: 'Please input your total!',
              },
            ]}
          >
            <Input placeholder='ex : total amount'/>
          </Form.Item>

          <Form.Item
            label="status"
            name="status"
            rules={[
              {
                required: true,
                message: 'Please input your status!',
              },
            ]}
          >
            <Input placeholder='ex : true or false'/>
          </Form.Item>
          <Form.Item
            wrapperCol={{
              // offset: 8,
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

export default InvoiceModal;