import { AppProvider } from './app/providers';
import { router } from './app/router/routes';
import './styles/App.css';
import { RouterProvider } from 'react-router';

function App() {
  return (
    <AppProvider>
      <RouterProvider router={router} />
    </AppProvider>
  );
}

export default App;
