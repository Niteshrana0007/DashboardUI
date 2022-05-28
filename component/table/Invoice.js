import React, { useState, useEffect } from "react";
import "antd/dist/antd.css";
import { Table, Card } from "antd";
import { inInvoiceData } from "../functions/function";

const columns = [
  {
    title: "Invoice ID",
    dataIndex: "invoice_id",
    key: "Invoice",
    render: (text) => <a>{text}</a>,
  },
  {
    title: "Client",
    dataIndex: "client",
    key: "client",
  },
  {
    title: "Due Date",
    dataIndex: "due_data",
    key: "date",
  },
  {
    title: "Total",
    key: "total",
    dataIndex: "total",
  },
  {
    title: "Status",
    dataIndex: "status",
    key: "status",
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
    title: "Operation",
    dataIndex: "operation",
    key: "op",
    render: (text,record) => <a onClick={()=>{console.log(record)}}>Delete</a>,
  },
];
const datas = [
  {
    key: "1",
    Invoice: "#INV-0001",
    client: "John Brown",
    date: "11 Mar 2019",
    total: "$150",
    status: "True",
  },
  {
    key: "2",
    Invoice: "#INV-0001",
    client: "John Brown",
    date: "11 Mar 2019",
    total: "$150",
    status: "True",
  },
  {
    key: "3",
    Invoice: "#INV-0001",
    client: "John Brown",
    date: "11 Mar 2019",
    total: "$150",
    status: "True",
  },
];

function Invoice() {
  const [data, setData] = useState();

  useEffect(() => {
    const DATA =  inInvoiceData();
      DATA.then(value => {
        setData(value.data.Invoice)
      });
  }, []);
  return (
    <>
      <Table
        columns={columns}
        dataSource={data}
        pagination={false}
        scroll={{
          x: 900,
          y: 200,
        }}
      />
    </>
  );
}

export default Invoice;
