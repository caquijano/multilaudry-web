import React from 'react';

const Confederacion = React.lazy(() => import('./views/dashboard/Confederacion'));
const ClientList = React.lazy(() => import('./views/Clients/ClientList'));
const ClientForm = React.lazy(() => import('./views/Clients/ClientForm'));

const EquipmentList = React.lazy(() => import('./views/Equipment/EquipmentList'));
const EquipmentForm = React.lazy(() => import('./views/Equipment/EquipmentForm'));


const Prueba = React.lazy(() => import('./views/dashboard/Prueba'));
const CoreUIIcons = React.lazy(() => import('./views/icons/CoreUIIcons'));
const Flags = React.lazy(() => import('./views/icons/Flags'));
const Brands = React.lazy(() => import('./views/icons/Brands'));
const Users = React.lazy(() => import('./views/users/Users'));
const User = React.lazy(() => import('./views/users/User'));

const routes = [
  { path: '/', exact: true, name: 'Home' },
  //{ path: '/dashboard', name: 'Dashboard', component: Dashboard },
  { path: '/confederacion', name: 'Confederacion', component: Confederacion },
  { path: '/clientform', name: 'Cliente-Formulario', component: ClientForm },
  { path: '/clientlist', name: 'Clientes', component: ClientList },
{ path: '/equipmentform', name: 'Equipo-Formulario', component: EquipmentForm },
  { path: '/equipmentlist', name: 'Equipos', component: EquipmentList },
  
   { path: '/prueba', name: 'Prueba', component: Prueba },
  { path: '/icons', exact: true, name: 'Icons', component: CoreUIIcons },
  { path: '/icons/coreui-icons', name: 'CoreUI Icons', component: CoreUIIcons },
  { path: '/icons/flags', name: 'Flags', component: Flags },
  { path: '/icons/brands', name: 'Brands', component: Brands },
  { path: '/users', exact: true,  name: 'Users', component: Users },
  { path: '/users/:id', exact: true, name: 'User Details', component: User }
];

export default routes;
