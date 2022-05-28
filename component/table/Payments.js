import React, { useState, useEffect } from "react";
import "antd/dist/antd.css";
import {
  Table,
  Card,
  Form,
  InputNumber,
  Popconfirm,
  Typography,
  Input,
} from "antd";
import { inPaymentData } from "../functions/function";
import { upDatePaymentData} from "../functions/function";

const EditableCell = ({
  editing,
  dataIndex,
  title,
  inputType,
  record,
  index,
  children,
  ...restProps
}) => {
  const inputNode = inputType === "number" ? <InputNumber /> : <Input />;
  return (
    <td {...restProps}>
      {editing ? (
        <Form.Item
          name={dataIndex}
          style={{
            margin: 0,
          }}
          rules={[
            {
              required: true,
              message: `Please Input ${title}!`,
            },
          ]}
        >
          {inputNode}
        </Form.Item>
      ) : (
        children
      )}
    </td>
  );
};

const originData = [
  {
    key: "1",
    Invoice: "#INV-0001",
    client: "John Brown",
    date: "Paypal",
    total: "$150",
    status: "True",
  },
  {
    key: "2",
    Invoice: "#INV-0001",
    client: "John Brown",
    date: "Paypal",
    total: "$150",
    status: "True",
  },
  {
    key: "3",
    Invoice: "#INV-0001",
    client: "John Brown",
    date: "Paypal",
    total: "$150",
    status: "True",
  },
];

function Payment() {
  const [Data, setdata] = useState();
  const [form] = Form.useForm();
  const [data, setData] = useState(Data);
  const [editingKey, setEditingKey] = useState("");

  const isEditing = (record) => record.key === editingKey;

  const edit = (record) => {
    form.setFieldsValue({
      client: "",
      // client: '',
      address: "",
      total: "",
      date: "",
      status: "",
      ...record,
    });
    setEditingKey(record.key);
  };

  const cancel = () => {
    setEditingKey("");
  };

  const save = async (key) => {
    // console.log(key, "from save function");
    try {
      const row = await form.validateFields();
      console.log(row);
      console.table(row);

      //API to update data in hasura
      
      upDatePaymentData(row)
      window.setTimeout (() => {  inPaymentData() }, 1000);
      // inData();
      setData(Data);
      
      const newData = [...data];
      const index = newData.findIndex((item) => key === item.key);
      
      if (index > -1) {
        const item = newData[index];
        newData.splice(index, 1, { ...item, ...row });
        setData(newData);
        setEditingKey("");
      } else {
        newData.push(row);
        setData(newData);
        setEditingKey("");
      }
    } catch (errInfo) {
      console.log("Validate Failed:", errInfo);
    }
  };

  //update data in hasura table
  
  const columns = [
    {
      title: "Invoice ID",
      dataIndex: "invoice",
      editable: true,
      key: "1",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Client",
      dataIndex: "client",
      editable: true,
      key: "2",
    },
    {
      title: "Payment",
      dataIndex: "total",
      editable: true,
      key: "3",
    },
    {
      title: "Paid Date",
      editable: true,
      key: "4",
      dataIndex: "date",
    },
    {
      title: "Status",
      editable: true,
      key: "5",
      dataIndex: "status",
      render: (text) => (
        <a
          style={{
            color: text === "true" ? "green" : "#e63c3c",
            backgroundColor:
              text === "true"
                ? "rgba(15, 183, 107,0.12)"
                : "rgba(242, 17, 54,0.12)",
          }}
        >
          {text}
        </a>
      ),
    },
    {
      title: "operation",
      dataIndex: "operation",
      render: (_, record) => {
        const editable = isEditing(record);
        return editable ? (
          <span>
            <Typography.Link
              onClick={() => save(record.key)}
              style={{
                marginRight: 8,
              }}
            >
              Save
            </Typography.Link>
            <Popconfirm title="Sure to cancel?" onConfirm={cancel}>
              <a>Cancel</a>
            </Popconfirm>
          </span>
        ) : (
          <Typography.Link
            disabled={editingKey !== ""}
            onClick={() => edit(record)}
          >
            Edit
          </Typography.Link>
        );
      },
    },
  ];
  const mergedColumns = columns.map((col) => {
    if (!col.editable) {
      return col;
    }

    return {
      ...col,
      onCell: (record) => ({
        record,
        inputType: col.dataIndex === "total" ? "number" : "text",
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    };
  });
  useEffect(() => {
    
    const DATA =  inPaymentData();
      DATA.then(value => {
        setdata(value.data.Payments)
      });
  }, []);
  return (
    <>
      <Form form={form} component={false}>
        <Table
          // columns={columns}
          dataSource={Data}
          pagination={false}
          columns={mergedColumns}
          components={{
            body: {
              cell: EditableCell,
            },
          }}
          scroll={{
            x: 900,
            y: 200,
          }}
        />
      </Form>
    </>
  );
}

export default Payment;
