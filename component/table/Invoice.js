import React, { useState, useEffect } from "react";
import "antd/dist/antd.css";
import { Table, Card } from "antd";

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

  const inData = () => {
    const requestOptions = {
      method: "POST",
      headers: {
        "x-hasura-admin-secret":
          "kymdKDF2bPeCjaXhSzySVwL17Ph1qT3bxhs1Ga36LVxJ7NmKZiqBDBKsoJMqonAx",
      },
      body: JSON.stringify({
        query: `query MyQuery {
                Invoice {
                  client
                  due_data
                  invoice_id
                  status
                  total
                }
              }
              `,
        operationName: "MyQuery",
      }),
    };
    fetch("https://alive-alpaca-82.hasura.app/v1/graphql", requestOptions)
      .then(async (response) => {
        const data = await response.json();
        setData(data.data.Invoice);
        console.log(data.data.Invoice);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    inData();
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
