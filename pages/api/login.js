// import { useEffect } from 'react';
// import { useRouter } from 'next/router';
// import { useAuth } from '../../config/authContext'
// import LoginPage from '../../component/Login/LoginPage';


// const LoggedIn = () => {
//   const { authUser, loading } = useAuth();
//   const router = useRouter();
//   console.log(authUser)

//   // Listen for changes on loading and authUser, redirect if needed
//   useEffect(() => {
//     if (!loading && !authUser)
//       router.push('/')
    
//   }, [authUser, loading])

//   return (
//     <>
//         <LoginPage/>
//     </>
//   )
// }

// export default LoggedIn;

import { doc, setDoc, Timestamp, GeoPoint, collection, addDoc } from "firebase/firestore"
import firebase from 'firebase/app'
import 'firebase/firestore'
import { db } from "../../config/firebase";
// import { getDatabase } from "firebase/database";

import { getDatabase, ref, set,onValue ,child, get} from "firebase/database";
const database = getDatabase();


export const WriteToCloudFirestore = () => {
    const myCollection = collection(db,'myCollection')
    
    function writeUserData() {
        const db = getDatabase();
        const userId = 12346;
        set(ref(db, 'users/' + userId), {
          username: 'meet',
          email: 'meet@gmail.com',
          profile_picture : 'me_imageUrl'
        });
        console.log("data sent to realtime")
      }
    
    const read = () => {
        const dbRef = ref(getDatabase());
        // get(child(dbRef, `users/${12346}`)).then((snapshot) => {
        get(child(dbRef, `users/`)).then((snapshot) => {
            if (snapshot.exists()) {
                console.log(snapshot.val());
            } else {
                console.log("No data available");
            }
        }).catch((error) => {
            console.error(error);
        });
    }
    
    const inData = () => {
        // var myHeaders = new Headers();
        // myHeaders.append("Authorization", "Bearer null");

        // var requestOptions = {
        // method: 'GET',
        // headers: myHeaders,
        // redirect: 'follow'
        // };
        const requestOptions = {
            method: 'POST',
            headers: {
              'x-hasura-admin-secret': 'kymdKDF2bPeCjaXhSzySVwL17Ph1qT3bxhs1Ga36LVxJ7NmKZiqBDBKsoJMqonAx'
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
              operationName: "MyQuery"
        
            })
          }
        fetch('https://alive-alpaca-82.hasura.app/v1/graphql',requestOptions)
        .then(async response => {
           
            const data = await response.json();
            console.log(data.data)
        })
        .catch(error => {
            console.log(error)
        });
    }

   

    const sendData = async () => {
        try {
          
              await addDoc( myCollection,{
                // Name: user.displayName,
                // displayName:user.name,
                uid: 123,
                email: 'nitesh',
                    
            })
            .then(alert('Data was successfully sent to cloud firestore!'))
        } catch (error) {
            console.log(error)
            alert(error)
        }
    }
    

    return (
       
        <div style={{ margin: '5px 0' }}>
            <button onClick={writeUserData} style={{ width: '100%' ,marginBottom:'10px'}}>Send Data To Realtime database</button>
            <button onClick={inData} style={{ width: '100%' }}>Read Data To Realtime database</button>
        </div>
       
    )
}

export default WriteToCloudFirestore
