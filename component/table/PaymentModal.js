import React,{useState} from 'react'
import { Button, Modal, Form, Input ,DatePicker} from 'antd';
import 'antd/dist/antd.css';
import { ConnectingAirportsOutlined } from '@mui/icons-material';
import moment from 'moment';

const PaymentModal = () => {
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
    inData(values)
    // client: "nitesh"
    // date: Moment {_isAMomentObject: true, _isUTC: false, _pf: {…}, _locale: Locale, _d: Wed May 25 2022 17:48:52 GMT+0530 (India Standard Time), …}
    // invoice_id: "1234"
    // status: "true"
    // total: "3534"
    let birthday = moment(values.birthday).format("YYYY-MM-DD");
    console.log(birthday);
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
            query: `mutation MyMutation {
                insert_Payments(objects: {client: "${values.client}", date: "${moment(values.birthday).format("YYYY-MM-DD")}", invoice: "${values.invoice_id}", status: "${values.status}", total: "${values.total}"}) {
                  returning {
                    client
                    date
                    invoice
                    status
                    total
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
          setData(data.data.Payments)
          console.log("sent Payment data")
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