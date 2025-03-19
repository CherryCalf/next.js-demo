import { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import Layout from '../components/GLayout';

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();

  // 判断当前路径是否为登录页
  const isLoginPage = router.pathname === '/login';

  return (
    <>
      {isLoginPage ? (
        <Component {...pageProps} />
      ) : (
        <Layout>
          <Component {...pageProps} />
        </Layout>
      )}
    </>
  );
}

export default MyApp;