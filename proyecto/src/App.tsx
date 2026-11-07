import { Route, Routes } from 'react-router';
import AppLayout from './components/layout/AppLayout';
import Home from './pages/Home';
import TypeExplorer from './pages/TypeExplorer';
import TypeDetails from './pages/TypeDetails';
import Collection from './pages/Collection';
import Contact from './pages/Contact';
import NotFound from './pages/NotFound';

function App() {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route index element={<Home />} />
        <Route path="types" element={<TypeExplorer />} />
        <Route path="types/:id" element={<TypeDetails />} />
        <Route path="collection" element={<Collection />} />
        <Route path="contact" element={<Contact />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default App;
