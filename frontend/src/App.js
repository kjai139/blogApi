
import Layout from './components/Layout';
import { UserProvider } from './components/UserContext';

function App({children}) {
  return (
    <UserProvider>
      <Layout>
        {children}
      </Layout>
    </UserProvider>
  );
}

export default App;
