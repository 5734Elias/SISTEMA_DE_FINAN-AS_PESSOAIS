import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Sidebar, Header } from '../components/layout';
import './AppLayout.scss';

export const AppLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => setIsSidebarOpen((prev) => !prev);
  const closeSidebar = () => setIsSidebarOpen(false);

  return (
    <div className="app-layout">
      <Sidebar isOpen={isSidebarOpen} onClose={closeSidebar} />
      
      <div className="app-layout__main">
        <Header onMenuClick={toggleSidebar} />
        
        <main className="app-layout__content">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

