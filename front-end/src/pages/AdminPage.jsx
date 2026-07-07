import { Route, Routes } from "react-router-dom";

export default function AdminPage() {
  return (
    <div className="w-full h-screen bg-purple-500 flex">
      <div className="w-[500px] bg-white flex flex-col">
        <a href="/admin">Orders</a>
        <a href="/admin/products">Products</a>
        <a href="/admin/users">Users</a>
        
      </div>

      <div className="w-[600px] h-full bg-yellow-200 ml-4">
        <Routes>
            <Route path="/" element={<h1>Orders page</h1>} />
            <Route path="/products" element={<h1>Products</h1>} />
            <Route path="/users" element={<h1>Users</h1>} />
            





        </Routes>


        
      </div>
    </div>
  );
}