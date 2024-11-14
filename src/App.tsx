import * as React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import PublicNavbar from './components/shared/PublicNavbar';
import PublicFooter from './components/shared/PublicFooter';
import HomePage from './pages/HomePage';

function App(): React.ReactElement {
  return (
    <BrowserRouter>
      <div className="min-h-screen flex flex-col">
        <PublicNavbar />
        <main className="flex-grow pt-16">
          <Routes>
            <Route path="/" element={<HomePage />} />
          </Routes>
        </main>
        <PublicFooter />
      </div>
    </BrowserRouter>
  );
}

export default App;
