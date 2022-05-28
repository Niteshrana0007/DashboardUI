import { AuthContextProvider } from '../config/authContext';
import { useRouter } from 'next/router';
import '../styles/globals.css'
import ProtectedRoute from '../config/ProtectedRoutes';

const noAuthRequired = ['/', '/login' ,'/register'];

function MyApp({ Component, pageProps }) {
  const router = useRouter()
  return <>

  <AuthContextProvider>
      {noAuthRequired.includes(router.pathname) ? (
          <Component {...pageProps} />
      ) : (
        <ProtectedRoute>
          <Component {...pageProps} />
        </ProtectedRoute>
      )}
  </AuthContextProvider>
  </>
}

export default MyApp
