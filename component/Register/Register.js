import React from 'react'
import classes from './login.module.css'
import RegisterForm from './Form';
import Link from 'next/link';
import { useAuth } from '../../config/authContext';
function Register() {
  return (
    <div style={{background:'#f7f7f7'}}>
        <div className={classes.main}>
            <div className={classes.inner_main}>
                <div className={classes.container}>
                    <div className={classes.logo}>
                        <Link href='/'>
                            <img width={100} height={100} src='https://dreamguys.co.in/smarthr/maroon/assets/img/logo2.png'></img>
                        </Link>
                    </div>
                    <div className={classes.content_wrapper}>
                         <div className={classes.content_box}>
                             <div style={{padding:'30px'}}>
                                <h3 className={classes.account_title}>Register</h3>
                                <p className={classes.account_subtitle}>Access to our dashboard</p>
                                <RegisterForm />
                             </div>
                         </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Register;