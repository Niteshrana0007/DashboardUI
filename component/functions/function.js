
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
    console.log(result,"holo")
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


