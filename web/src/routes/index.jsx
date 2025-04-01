import { BrowserRouter } from 'react-router-dom';

import { useAuth } from "../hooks/auth";
import { USER_ROLES } from '../utils/roles'

import { CustomerRoutes } from './customer.routes';
import { AdminRoutes } from './admin.routes';
import { SaleRoutes } from './sale.routes';
import { AuthRoutes } from './auth.routes';
import { useEffect } from 'react';
import { api } from '../services/api';

export function Routes() {
  const { user, signOut } = useAuth();

  useEffect(() => {
    api.get('/users/validated').catch((error) => {
        if(error.response?.status === 401) {
          signOut()
        }})
      }, [])

  function GetRoutes() {
    switch (user.role) {
      case USER_ROLES.ADMIN:
        return <AdminRoutes />;
      case USER_ROLES.CUSTOMER:
        return <CustomerRoutes />;
      case USER_ROLES.SALE:
        return <SaleRoutes />;
      default:
        return <CustomerRoutes />;
    }

  }

  return (
    <BrowserRouter>
      {user ? <GetRoutes /> : <AuthRoutes />}
    </BrowserRouter>
  );
}