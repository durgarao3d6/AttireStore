import { Routes, Route, Outlet } from 'react-router-dom';
import './categories.styles.scss';
import Dashboard from './components/admin/dashboard/dashboard.component';
import Directory from './components/directory-menu/directory.component';
import Layout from './routes/AdminLayout/layout.component';
import Authentication from './routes/Authentication/authentication.component';
import Checkout from './routes/checkout/checkout.component';
import Home from './routes/home/home.component';
import Navigation from './routes/navigation/navigation.component';
import Shop from './routes/shop/shop.component';



const App = () => {
  return (
    <Routes>
      <Route path='/admin' element={<Layout />}>
        <Route index element={<Dashboard />} />
      </Route>
      <Route path='/' element={<Navigation />}>
        <Route index element={<Home />} />
        <Route path='shop/*' element={<Shop />} />
        <Route path='auth' element={<Authentication />} />
        <Route path='checkout' element={<Checkout />} />
      </Route>
    </Routes>
  )
}

export default App;
