
import Layout from './components/Layout';
import { UserProvider } from './components/UserContext';

function App() {
  return (
    <UserProvider>
      <Layout>
        <h1>This is the app</h1>
      </Layout>
    </UserProvider>
  );
}

export default App;
