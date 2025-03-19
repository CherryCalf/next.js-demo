import React from 'react';
import GLayout from '@/components/GLayout';


const Layout: React.FC = ({ children }) => {
  return (
    <GLayout>
      {children}
    </GLayout>
  );
};

export default Layout;