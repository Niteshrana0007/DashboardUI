import { Form, Input, Button, Checkbox } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { useAuth } from '../../config/authContext';
import Link from 'next/link';
import { useRouter } from 'next/router';

const NormalLoginForm = () => {
  const router = useRouter();
  const {user , login} = useAuth();
  
  console.log({user});

  const handleLogin = async (data) => {
    try {
      await login(data.email ,data.password)
      router.push('/')
    } catch (err) {
      console.log(err)
    }
  }
  const onFinish = (values) => {
    handleLogin(values);
    
    console.log('Received values of form: ', values.email,values.password,values);
  };

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
        name="email"
        rules={[
          {
            required: true,
            message: 'Please input your email!',
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
          Log in
        </Button>
        Or <Link href="/register">register now!</Link>
      </Form.Item>
    </Form>
  );
};

export default () => <NormalLoginForm />;