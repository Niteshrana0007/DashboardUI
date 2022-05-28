import { useState } from 'react'
import { useRouter } from 'next/router';
import { useAuth } from '../../config/authContext';
import { Form, Input, Button, Checkbox } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { getAuth , signInWithPopup , GoogleAuthProvider } from 'firebase/auth';
import { app } from '../../config/firebase';
import Link from 'next/link';
import { SocialDistanceOutlined } from '@mui/icons-material';

import { collection, addDoc ,serverTimestamp} from "firebase/firestore";
import { getDatabase, ref, set,onValue ,child, get} from "firebase/database";
import { db } from "../../config/firebase";

const RegisterForm = () => {
    const router = useRouter()
    const {user , signup} = useAuth();
    console.log(user)

    //google signup
    const GoogleSignup = async () => {
      const firebaseAuth = getAuth(app);
      const provider = new GoogleAuthProvider();
      const {user} = await signInWithPopup(firebaseAuth,provider);
      const {refreshToken ,providerData} = user;
      
      localStorage.setItem('user',JSON.stringify(providerData));
      localStorage.setItem('accessToken',JSON.stringify(refreshToken));
      sendGoogleData(user)

      router.push('/')

      console.log({user},{refreshToken},{providerData});
      console.log("click google")
    }

    //email password signup
    const handleSignup = async (data) => {
      try {
        await signup(data.Email ,data.password)
        sendData(data);
        writeUserData(data);
       
      } catch (err) {
        console.log(err)
      }
    }
    const onFinish = (values) => {
        handleSignup(values);
        
        router.push('/')
        console.log('Received values of singup: ', values);
    };

    //send data to firestore
    const myCollection = collection(db,'myCollection')
    const sendData = async (data) => {
      try {
        
            await addDoc( myCollection,{
              
              email: data.Email,
              // data.email
              //data.displayName
              //data.photoURL
              password: data.password,
              timestamp: serverTimestamp()
                  
          })
          .then(console.log('Data was successfully sent to cloud firestore!'))
      } catch (error) {
          console.log(error)
          alert(error)
      }
    }

    //send google data to firestore
    const sendGoogleData = async (data) => {
      try {
        
            await addDoc( myCollection,{
              // data:data,
              email: data.email,
              name: data.displayName,
              photo: data.photoURL,
              timestamp: serverTimestamp()
                  
          })
          .then(console.log('Data was successfully sent to cloud firestore!'))
      } catch (error) {
          console.log(error)
          alert(error)
      }
    }

    //send data to realtime database
    function writeUserData(data) {
      const db = getDatabase();
      const userId = data.Email.split('.')[0];
      set(ref(db, 'users/' + `${userId}`), {
        // username: 'me',
        email: data.Email,
        password : data.password
      });
      console.log("data sent to realtime")
    }

  return (
    <Form
      name="normal_login"
      className="login-form"
      initialValues={{
        remember: true,
      }}
      onFinish={onFinish}
    >
      <Form.Item
        name="Email"
        rules={[
          {
            required: true,
            message: 'Please input your Email!',
          },
        ]}
      >
        <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Email" />
      </Form.Item>
      <Form.Item
        name="password"
        rules={[
          {
            required: true,
            message: 'Please input your Password!',
          },
        ]}
      >
        <Input
          prefix={<LockOutlined className="site-form-item-icon" />}
          type="password"
          placeholder="Password"
        />
      </Form.Item>
      <Form.Item
        name="confirmPassword"
        rules={[
          {
            required: true,
            message: 'Please input your confirm Password!',
          },
        ]}
      >
        <Input
          prefix={<LockOutlined className="site-form-item-icon" />}
          type="confirm password"
          placeholder="confirm Password"
        />
      </Form.Item>
      <Form.Item>
        <Form.Item name="remember" valuePropName="checked" noStyle>
          <Checkbox>Remember me</Checkbox>
        </Form.Item>

        <a className="login-form-forgot" href="">
          Forgot password
        </a>
      </Form.Item>
  
      <Form.Item>
        <Button type="primary" htmlType="submit" className="login-form-button">
          Register
        </Button>
        Or <Link href="/login">Log In</Link>
      </Form.Item>
      <button className='Gbutton' onClick={GoogleSignup}>
          sigup with Google
        </button>
    </Form>
  );
};

export default () => <RegisterForm />;