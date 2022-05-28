import { async } from "@firebase/util";
import moment from 'moment';

export const readData = async () => {
    let result;
    const requestOptions = {
        method: 'POST',
        headers: {
          'x-hasura-admin-secret': 'kymdKDF2bPeCjaXhSzySVwL17Ph1qT3bxhs1Ga36LVxJ7NmKZiqBDBKsoJMqonAx'
        },
        body: JSON.stringify({
          query: `query MyQuery {
            Clients {
              action
              email
              key
              name
              status
            }
          }
          `,
          operationName: "MyQuery"
    
        })
      }

    await fetch('https://alive-alpaca-82.hasura.app/v1/graphql', requestOptions)
        .then(response => response.json())
        .then(response => result = response)
        .catch(error => console.error('Error:', error))
    // console.log(result,"holo")
    return result;

}
export const Delete = (record) => {
  
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
            delete_Clients(where: {email: {_eq: "${record.email}"}}) {
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

export const inClientData = (values) => {
  const requestOptions = {
      method: 'POST',
      headers: {
        'x-hasura-admin-secret': 'kymdKDF2bPeCjaXhSzySVwL17Ph1qT3bxhs1Ga36LVxJ7NmKZiqBDBKsoJMqonAx'
      },
      body: JSON.stringify({
        query: 
        `mutation MyMutation {
                insert_Clients(objects: {action: ["${values.action}"], email: "${values.email}", key: ${Number(values.key)}, name: "${values.name}", status: ["${values.status}"]}) {
                  returning {
                  action
                      email
                      key
                      name
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




export const inPaymentData = async () => {
  let result;
  const requestOptions = {
    method: "POST",
    headers: {
      "x-hasura-admin-secret":
        "kymdKDF2bPeCjaXhSzySVwL17Ph1qT3bxhs1Ga36LVxJ7NmKZiqBDBKsoJMqonAx",
    },
    body: JSON.stringify({
      query: `query MyQuery {
              Payments {
                  key
                  client
                  date
                  invoice
                  total
                  status
                }
            }
            `,
      operationName: "MyQuery",
    }),
  };
  await fetch('https://alive-alpaca-82.hasura.app/v1/graphql', requestOptions)
        .then(response => response.json())
        .then(response => result = response)
        .catch(error => console.error('Error:', error))
    // console.log(result,"holo")
    return result;
};

export const upDatePaymentData = (row) => {
  // console.log({ row }, "from api");
  const requestOptions = {
    method: "POST",
    headers: {
      "x-hasura-admin-secret":
        "kymdKDF2bPeCjaXhSzySVwL17Ph1qT3bxhs1Ga36LVxJ7NmKZiqBDBKsoJMqonAx",
    },
    body: JSON.stringify({
      query: `mutation MyMutation {
            update_Payments(where: {invoice: {_eq: "${row.invoice}"}}, _set: {client: "${row.client}", date: "${row.date}", invoice: "${row.invoice}", status: "${row.status}", total: "${row.total}"}) {
              affected_rows
            }
          }            
          `,
      operationName: "MyMutation",
    }),
  };
  fetch("https://alive-alpaca-82.hasura.app/v1/graphql", requestOptions)
    .then(async (response) => {
      console.log("data updated successfully");
    })
    .catch((error) => {
      console.log(error);
    });
};

export const inInvoiceData = async () => {
  let result;
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
  await fetch('https://alive-alpaca-82.hasura.app/v1/graphql', requestOptions)
        .then(response => response.json())
        .then(response => result = response)
        .catch(error => console.error('Error:', error))
    // console.log(result,"holo")
    return result;
};

export const inProjectData = async () => {
  let result;
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
    await fetch('https://alive-alpaca-82.hasura.app/v1/graphql', requestOptions)
    .then(response => response.json())
    .then(response => result = response)
    .catch(error => console.error('Error:', error))
// console.log(result,"holo")
return result;
}

export const deleteProjectData = (record) => {
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

export const inProjectModalData = (values) => {
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
      console.log("sent invoice data")
  })
  .catch(error => {
      console.log(error)
  });
}

export const insertInvoiceData = (values) => {
  const requestOptions = {
      method: 'POST',
      headers: {
        'x-hasura-admin-secret': 'kymdKDF2bPeCjaXhSzySVwL17Ph1qT3bxhs1Ga36LVxJ7NmKZiqBDBKsoJMqonAx'
      },
      body: JSON.stringify({
        query: `mutation MyMutation {
          insert_Invoice(objects: {client: "${values.client}", due_data: "${values.duedate}", invoice_id: "${values.InvoiceID}", status: "${values.status}", total: ${values.total}}) {
            returning {
              client
              due_data
              invoice_id
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
      console.log("sent invoice data")
  })
  .catch(error => {
      console.log(error)
  });
}

export const insertPaymentData = (values) => {
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
      console.log("sent Payment data")
  })
  .catch(error => {
      console.log(error)
  });
}



