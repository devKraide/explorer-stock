import { BrowserRouter } from 'react-router-dom';

import { useAuth } from "../hooks/auth";
import { USER_ROLES } from '../utils/roles'

import { CustomerRoutes } from './customer.routes';
import { AdminRoutes } from './admin.routes';
import { SaleRoutes } from './sale.routes';
import { AuthRoutes } from './auth.routes';

export function Routes() {
  const { user } = useAuth();

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