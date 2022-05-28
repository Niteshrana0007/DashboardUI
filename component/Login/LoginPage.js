import React from 'react'
import classes from './login.module.css'
import NormalLoginForm from './Form';
import Link from 'next/link';
function LoginPage() {
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
                                <h3 className={classes.account_title}>Login</h3>
                                <p className={classes.account_subtitle}>Access to our dashboard</p>
                                <NormalLoginForm/>
                             </div>
                         </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default LoginPage;