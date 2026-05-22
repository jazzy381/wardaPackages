'use client';
import React, { useEffect, useState } from 'react';
import { db, handleFirestoreError, OperationType } from '@/lib/firebase';
import { collection, onSnapshot, doc, setDoc, deleteDoc, query, updateDoc } from 'firebase/firestore';

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loadingContext, setLoadingContext] = useState(true);
  const [loginUsername, setLoginUsername] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  
  const [products, setProducts] = useState<any[]>([]);
  const [orders, setOrders] = useState<any[]>([]);
  const [activeTab, setActiveTab] = useState<'products' | 'orders'>('orders');
  
  // product form
  const [editingId, setEditingId] = useState<string | null>(null);
  const [title, setTitle] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [image, setImage] = useState('');
  const [btnText, setBtnText] = useState('Shop Now');
  const [category, setCategory] = useState('');
  const [price, setPrice] = useState('0');
  
  // settings form
  const [logoUrl, setLogoUrl] = useState('');
  const [currency, setCurrency] = useState('Rs');
  const [paymentMethods, setPaymentMethods] = useState('Cash on Delivery, Bank Transfer');

  // Check if user is already logged in (from localStorage)
  useEffect(() => {
    const savedAuth = localStorage.getItem('adminAuth');
    if (savedAuth === 'true') {
      setIsAuthenticated(true);
    }
    setLoadingContext(false);
  }, []);

  // Load data from Firestore when authenticated
  useEffect(() => {
    if (!isAuthenticated) return;
    
    const qProds = query(collection(db, 'products'));
    const unsubProds = onSnapshot(qProds, (snapshot) => {
      const prods: any[] = [];
      snapshot.forEach(doc => {
        prods.push({ id: doc.id, ...doc.data() });
      });
      setProducts(prods);
    }, (error) => {
      handleFirestoreError(error, OperationType.LIST, 'products');
    });

    const qOrders = query(collection(db, 'orders'));
    const unsubOrders = onSnapshot(qOrders, (snapshot) => {
      const ords: any[] = [];
      snapshot.forEach(doc => {
        ords.push({ id: doc.id, ...doc.data() });
      });
      setOrders(ords);
    }, (error) => {
      handleFirestoreError(error, OperationType.LIST, 'orders');
    });

    const unsubSettings = onSnapshot(doc(db, 'settings', 'logoUrl'), (docSnap) => {
      if (docSnap.exists()) {
        setLogoUrl(docSnap.data().value);
      }
    }, (error) => {
      handleFirestoreError(error, OperationType.GET, 'settings/logoUrl');
    });

    const unsubCurrency = onSnapshot(doc(db, 'settings', 'currency'), (docSnap) => {
      if (docSnap.exists()) setCurrency(docSnap.data().value);
    });

    const unsubPayments = onSnapshot(doc(db, 'settings', 'paymentMethods'), (docSnap) => {
      if (docSnap.exists()) setPaymentMethods(docSnap.data().value);
    });

    return () => { unsubProds(); unsubOrders(); unsubSettings(); unsubCurrency(); unsubPayments(); };
  }, [isAuthenticated]);

  // Handle login with username and password
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');

    // Check credentials against environment variables
    const adminUsername = process.env.NEXT_PUBLIC_ADMIN_USERNAME || 'admin';
    const adminPassword = process.env.NEXT_PUBLIC_ADMIN_PASSWORD || 'admin123';

    if (loginUsername === adminUsername && loginPassword === adminPassword) {
      setIsAuthenticated(true);
      localStorage.setItem('adminAuth', 'true');
      setLoginUsername('');
      setLoginPassword('');
    } else {
      setLoginError('Invalid username or password');
    }
  };

  // Handle logout
  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('adminAuth');
  };

  const handleSave = async () => {
    try {
      
      const docId = editingId || Date.now().toString(36) + Math.random().toString(36).substring(2, 6);
      await setDoc(doc(db, 'products', docId), {
        title, subtitle, image, btnText, category, price: parseFloat(price) || 0
      });
      resetForm();
    } catch (err) {
      handleFirestoreError(err, OperationType.WRITE, 'products');
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteDoc(doc(db, 'products', id));
    } catch (err) {
      handleFirestoreError(err, OperationType.DELETE, 'products');
    }
  };

  const updateOrderStatus = async (id: string, currentStatus: string, items: any[]) => {
    // Only allowing 'status' updates based on rules
    // However rules dictate: incoming().diff(existing()).affectedKeys().hasOnly(['status'])
    // We must pass all the existing fields that are NOT affected if we use updateDoc? No, updateDoc just sends the change. 
    // And "affectedKeys" refers to the changed keys!
    let newStatus = 'Pending';
    if (currentStatus === 'Pending') newStatus = 'Accepted';
    else if (currentStatus === 'Accepted') newStatus = 'Shipped';
    else if (currentStatus === 'Shipped') newStatus = 'Completed';
    else newStatus = 'Pending';
    try {
      await updateDoc(doc(db, 'orders', id), {
        status: newStatus
      });
    } catch(err) {
      handleFirestoreError(err, OperationType.UPDATE, 'orders');
    }
  }

  const resetForm = () => {
    setEditingId(null);
    setTitle('');
    setSubtitle('');
    setImage('');
    setBtnText('Shop Now');
    setCategory('');
    setPrice('0');
  };

  const handleSaveSettings = async () => {
    try {
      await setDoc(doc(db, 'settings', 'logoUrl'), { value: logoUrl });
      await setDoc(doc(db, 'settings', 'currency'), { value: currency });
      await setDoc(doc(db, 'settings', 'paymentMethods'), { value: paymentMethods });
      alert("Settings saved!");
    } catch (err) {
      handleFirestoreError(err, OperationType.WRITE, 'settings');
    }
  };

  if (loadingContext) return <div className="p-10 text-center text-gray-800">Loading...</div>;

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 text-gray-900">
        <div className="bg-white p-8 rounded-2xl shadow-sm max-w-sm w-full">
           <h1 className="text-3xl font-bold mb-2">Super Admin</h1>
           <p className="text-sm text-gray-500 mb-8">Enter your credentials to access the admin panel</p>
           
           <form onSubmit={handleLogin} className="flex flex-col gap-4">
              <div>
                <label className="text-sm font-semibold text-gray-700 block mb-2">Username</label>
                <input 
                  type="text" 
                  placeholder="Enter username" 
                  value={loginUsername} 
                  onChange={e => setLoginUsername(e.target.value)}
                  className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:border-[#581c87]"
                />
              </div>
              
              <div>
                <label className="text-sm font-semibold text-gray-700 block mb-2">Password</label>
                <input 
                  type="password" 
                  placeholder="Enter password" 
                  value={loginPassword} 
                  onChange={e => setLoginPassword(e.target.value)}
                  className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:border-[#581c87]"
                />
              </div>

              {loginError && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-2 rounded-lg text-sm">
                  {loginError}
                </div>
              )}
              
              <button 
                type="submit" 
                className="w-full bg-[#581c87] text-white py-3 rounded-xl font-medium hover:bg-[#7e22ce] transition-colors mt-2"
              >
                Sign In
              </button>
           </form>

           <p className="text-xs text-gray-500 mt-6 text-center">
             Default credentials: admin / admin123<br/>
             (Update in environment variables for security)
           </p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 p-8 lg:p-12">
      <div className="max-w-6xl mx-auto">
         <div className="flex justify-between items-center mb-10">
            <h1 className="text-3xl font-bold font-heading">Warda Packages Admin</h1>
            <button onClick={handleLogout} className="bg-gray-200 px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-300">Sign Out</button>
         </div>

         <div className="flex gap-4 mb-8">
            <button 
              onClick={() => setActiveTab('orders')} 
              className={`px-6 py-2 rounded-xl font-medium transition-colors ${activeTab === 'orders' ? 'bg-[#581c87] text-white' : 'bg-white border border-gray-200 text-gray-700 hover:bg-gray-100'}`}
            >
              Manage Orders
            </button>
            <button 
              onClick={() => setActiveTab('products')} 
              className={`px-6 py-2 rounded-xl font-medium transition-colors ${activeTab === 'products' ? 'bg-[#581c87] text-white' : 'bg-white border border-gray-200 text-gray-700 hover:bg-gray-100'}`}
            >
              Manage Products & Settings
            </button>
         </div>

         {activeTab === 'products' && (
           <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-1 flex flex-col gap-8">
                 <div className="bg-white p-6 rounded-2xl shadow-sm">
                    <h2 className="text-xl font-bold mb-6">Website Settings</h2>
                    <div className="flex flex-col gap-4">
                       <div>
                         <label className="text-sm font-semibold text-gray-700">Logo Image URL</label>
                         <input placeholder="Paste your logo URL here" value={logoUrl} onChange={e=>setLogoUrl(e.target.value)} className="w-full border p-2 rounded text-sm mt-1" />
                         <p className="text-xs text-gray-500 mt-1">Upload your logo in the chat and paste the image link here.</p>
                       </div>
                       <div>
                         <label className="text-sm font-semibold text-gray-700">Currency Symbol</label>
                         <input placeholder="e.g. Rs, $, £" value={currency} onChange={e=>setCurrency(e.target.value)} className="w-full border p-2 rounded text-sm mt-1" />
                       </div>
                       <div>
                         <label className="text-sm font-semibold text-gray-700">Payment Methods</label>
                         <input placeholder="Comma separated (e.g. Cash, Card)" value={paymentMethods} onChange={e=>setPaymentMethods(e.target.value)} className="w-full border p-2 rounded text-sm mt-1" />
                       </div>
                       <button onClick={handleSaveSettings} className="bg-[#581c87] text-white py-2 rounded hover:bg-gold transition-colors font-medium mt-2">Save Settings</button>
                    </div>
                 </div>

                 <div className="bg-white p-6 rounded-2xl shadow-sm h-fit">
                    <h2 className="text-xl font-bold mb-6">{editingId ? 'Edit Product' : 'Add New Product'}</h2>
                    <div className="flex flex-col gap-4">
                       <input placeholder="Title" value={title} onChange={e=>setTitle(e.target.value)} className="border p-2 rounded" />
                       <input placeholder="Subtitle" value={subtitle} onChange={e=>setSubtitle(e.target.value)} className="border p-2 rounded" />
                       <input placeholder="Image URL" value={image} onChange={e=>setImage(e.target.value)} className="border p-2 rounded" />
                       <input placeholder="Button Text" value={btnText} onChange={e=>setBtnText(e.target.value)} className="border p-2 rounded" />
                       <input placeholder="Category" value={category} onChange={e=>setCategory(e.target.value)} className="border p-2 rounded" />
                       <input type="number" placeholder="Price" value={price} onChange={e=>setPrice(e.target.value)} className="border p-2 rounded" />
                       <div className="flex gap-2 mt-4">
                          <button onClick={handleSave} className="flex-1 bg-[#581c87] text-white py-2 rounded hover:bg-gold transition-colors font-medium">Save</button>
                          {editingId && <button onClick={resetForm} className="flex-1 bg-gray-200 py-2 rounded hover:bg-gray-300 font-medium">Cancel</button>}
                       </div>
                    </div>
                 </div>
              </div>

              <div className="lg:col-span-2 bg-white p-6 rounded-2xl shadow-sm">
                 <h2 className="text-xl font-bold mb-6">Manage Products</h2>
                 <div className="space-y-4">
                   {products.map(p => (
                     <div key={p.id} className="flex justify-between items-center p-4 border rounded-xl hover:bg-gray-50">
                        <div className="flex items-center gap-4">
                           {/* eslint-disable-next-line @next/next/no-img-element */}
                           {p.image && <img src={p.image} alt={p.title} className="w-12 h-12 rounded object-cover" />}
                           <div>
                             <div className="font-bold">{p.title}</div>
                             <div className="text-sm text-gray-500">{p.subtitle} • {currency}{p.price}</div>
                           </div>
                        </div>
                        <div className="flex gap-2">
                          <button onClick={() => {
                            setEditingId(p.id);
                            setTitle(p.title);
                            setSubtitle(p.subtitle || '');
                            setImage(p.image);
                            setBtnText(p.btnText || 'Shop Now');
                            setCategory(p.category || '');
                            setPrice(p.price?.toString() || '0');
                          }} className="px-3 py-1 bg-blue-100 text-blue-800 rounded text-sm hover:bg-blue-200">Edit</button>
                          <button onClick={() => handleDelete(p.id)} className="px-3 py-1 bg-red-100 text-red-800 rounded text-sm hover:bg-red-200">Delete</button>
                        </div>
                     </div>
                   ))}
                   {products.length === 0 && <div className="text-gray-500 py-8 text-center border border-dashed rounded-xl">No products found.</div>}
                 </div>
              </div>
           </div>
         )}

         {activeTab === 'orders' && (
           <div className="bg-white p-6 rounded-2xl shadow-sm">
              <h2 className="text-xl font-bold mb-6">Customer Orders</h2>
              <div className="overflow-x-auto">
                 <table className="w-full text-left border-collapse">
                    <thead>
                       <tr className="border-b border-gray-200 text-sm text-gray-500">
                          <th className="py-3 px-4 font-medium">Customer</th>
                          <th className="py-3 px-4 font-medium">Contact</th>
                          <th className="py-3 px-4 font-medium max-w-[200px]">Address</th>
                          <th className="py-3 px-4 font-medium">Items</th>
                          <th className="py-3 px-4 font-medium">Total</th>
                          <th className="py-3 px-4 font-medium">Status</th>
                          <th className="py-3 px-4 font-medium text-right">Actions</th>
                       </tr>
                    </thead>
                    <tbody>
                       {orders.map(o => (
                          <tr key={o.id} className="border-b border-gray-100 hover:bg-gray-50">
                             <td className="py-4 px-4 font-medium">{o.customerName}</td>
                             <td className="py-4 px-4 text-sm">{o.phone}</td>
                             <td className="py-4 px-4 text-sm text-gray-600 truncate max-w-[200px]">{o.address}</td>
                             <td className="py-4 px-4 text-sm text-gray-500">
                                <ul className="list-disc pl-4">
                                  {o.items?.map((item: any, i: number) => (
                                      <li key={i}>{item.quantity}x {item.title}</li>
                                  ))}
                                </ul>
                             </td>
                             <td className="py-4 px-4 font-medium">{currency}{o.total?.toFixed(2)}</td>
                             <td className="py-4 px-4">
                                <span className={`px-2 py-1 rounded text-xs font-bold ${
                                  o.status === 'Pending' ? 'bg-orange-100 text-orange-800' : 
                                  o.status === 'Accepted' ? 'bg-blue-100 text-blue-800' :
                                  o.status === 'Shipped' ? 'bg-purple-100 text-purple-800' :
                                  'bg-green-100 text-green-800'
                                }`}>
                                   {o.status}
                                </span>
                             </td>
                             <td className="py-4 px-4 text-right">
                                <button 
                                  onClick={() => updateOrderStatus(o.id, o.status, o.items)} 
                                  className="text-sm bg-gray-100 hover:bg-gray-200 text-gray-800 px-3 py-1.5 rounded transition-colors"
                                >
                                  {o.status === 'Pending' ? 'Accept Order' : 
                                   o.status === 'Accepted' ? 'Mark Shipped' :
                                   o.status === 'Shipped' ? 'Mark Completed' : 'Completed'}
                                </button>
                             </td>
                          </tr>
                       ))}
                       {orders.length === 0 && (
                          <tr>
                             <td colSpan={7} className="py-8 text-center border-dashed border rounded-xl text-gray-500">No orders found.</td>
                          </tr>
                       )}
                    </tbody>
                 </table>
              </div>
           </div>
         )}
      </div>
    </div>
  );
}
