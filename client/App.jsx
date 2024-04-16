import React from 'react';
import { Outlet } from 'react-router-dom';
import Main from './components/Main';

export default function App() {
  return (
    <div>
      <Main>
        <Outlet />
      </Main>
    </div>
  );
}