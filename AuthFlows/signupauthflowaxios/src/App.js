import React from 'react';
import { Routes, Route } from 'react-router-dom';
// COMPONENTS
import Register from './components/Register';
import Login from './components/Login';
import Admin from './components/Admin';
import Lounge from './components/Lounge';
import Unauthorized from './components/Unauthorized';
import Missing from './components/Missing';
import Editor from './components/Editor';
import Layout from './components/Layout';
import LinkPage from './components/LinkPage';
import Home from './components/Home';
import RequireAuth from './components/RequireAuth';
import PersistLogin from './components/PersistLogin';


const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {/* PUBLIC ROUTES */}
        <Route path='login' element={<Login />} />
        <Route path='register' element={<Register />} />
        <Route path='linkpage' element={<LinkPage />} />
        <Route path='unauthorized' element={<Unauthorized />} />
        {/* PRIVATE ROUTES */}
        <Route element={<PersistLogin />}>
          <Route element={<RequireAuth allowedRoles={[2000]} />}>
            <Route index element={<Home />} />
          </Route>
          <Route element={<RequireAuth allowedRoles={[4000]} />}>
            <Route path='admin' element={<Admin />} />
          </Route>
          <Route element={<RequireAuth allowedRoles={[6000]} />}>
            <Route path='editor' element={<Editor />} />
          </Route>
          <Route element={<RequireAuth allowedRoles={[4000, 6000]} />}>
            <Route path='lounge' element={<Lounge />} />
          </Route>
        </Route>
        {/* MISSING ROUTE */}
        <Route path='*' element={<Missing />} />
      </Route>
    </Routes >
  );
}

export default App;
