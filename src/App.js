import logo from './logo.svg';
import './App.css';
import { RouterProvider } from 'react-router-dom';
import router from './Routes/Routes';
import { Toaster } from 'react-hot-toast';
import AOS from 'aos';
import 'aos/dist/aos.css'; // You can also use <link> for styles
// ..
AOS.init();
function App() {
  return (
    <div className="App">
      <RouterProvider router={router}>
      
      </RouterProvider>
      <Toaster></Toaster>
    </div>
  );
}

export default App;
