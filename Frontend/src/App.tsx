import { Route, Routes } from "react-router";
import Layout from "./components/layout";
import DashboardPage from "./pages/Dashboard";
import ProductsPage from "./pages/ProductsPage";
import ProvidersPage from "./pages/proveedoresPage";
import ReceptionsPage from "./pages/recepcionesPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="/" element={<DashboardPage />} />
        <Route path="products" element={<ProductsPage />} />
        <Route path="/providers" element={<ProvidersPage />} />
        <Route path="/receptions" element={<ReceptionsPage />} />
      </Route>
    </Routes>
  );
}

export default App;
