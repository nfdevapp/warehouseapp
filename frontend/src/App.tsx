import {Route, Routes} from "react-router-dom";
import Layout from "./components/Layout.tsx";
import WarehousePage from "./pages/WarehousePage.tsx";
import PoductPage from "./pages/ProductPage.tsx";
import ProductDetailPage from "./pages/ProductDetailPage.tsx";

import './App.css'

function App() {

  return (
      <>
          <Layout>
              <Routes>
                  <Route path="/" element={<WarehousePage/>}/>
                  <Route path="/product" element={<PoductPage/>}/>
                  <Route path="/productdetails/:id" element={<ProductDetailPage/>}/>
               </Routes>
           </Layout>
      </>
  )
}

export default App
