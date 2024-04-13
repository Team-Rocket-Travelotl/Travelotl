import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './components/Header';
import Main from './components/Main';

export default function App() {
  return (
    <div>
      <Header />
      <Main >
        <Outlet />
      </Main>
    </div>
  );
}