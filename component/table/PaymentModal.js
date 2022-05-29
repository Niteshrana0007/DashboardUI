import React,{useState} from 'react'
import { Button, Modal, Form, Input ,DatePicker} from 'antd';
import 'antd/dist/antd.css';
import { ConnectingAirportsOutlined } from '@mui/icons-material';
import moment from 'moment';
import { insertPaymentData,inPaymentData } from '../functions/function';

const PaymentModal = (props) => {
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
    insertPaymentData(values)
    setTimeout(() => {
      const DATA =  inPaymentData();
      DATA.then(value => {
      props.setdata(value.data.Payments)
      console.log(value.data.Payments,"after insertion")
    });
    },1000)
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
            name="invoice_id"
            rules={[
              {
                required: true,
                message: 'Please input your InvoiceID!',
              },
            ]}
          >
            <Input placeholder='ex : #INV-0001 ' />
          </Form.Item>

          <Form.Item
            label="Client Name"
            name="client"
            rules={[
              {
                required: true,
                message: 'Please input your client name!',
              },
            ]}
          >
            <Input placeholder='John Brown'/>
          </Form.Item>
          <Form.Item
            label="Date"
            name="date"
            rules={[
              {
                required: true,
                message: 'Please input your date!',
              },
            ]}
          >
            <DatePicker />
          </Form.Item>

          <Form.Item
            label="Total"
            name="total"
            rules={[
              {
                required: true,
                message: 'Please input your total amount!',
              },
            ]}
          >
            <Input placeholder='ex : 2322'/>
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

export default PaymentModal;