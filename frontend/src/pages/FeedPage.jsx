import React, { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import api from '../services/api';
import { Search, MapPin, Calendar, Tag, Trash2, Edit, AlertCircle, SearchX, Lock, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';

const FeedPage = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const navigate = useNavigate();
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [query, setQuery] = useState('');
    const filterType = searchParams.get('type');
    const currentUsername = localStorage.getItem('username');
    const currentUserRole = localStorage.getItem('role');
    const isAuthenticated = !!localStorage.getItem('token');

    // UI States
    const [deleteItem, setDeleteItem] = useState(null);
    const [errorModal, setErrorModal] = useState(null);

    useEffect(() => {
        fetchItems();
    }, [filterType]);

    const fetchItems = async () => {
        setLoading(true);
        try {
            const url = filterType ? `/items?type=${filterType}` : '/items';
            const response = await api.get(url);
            setItems(response.data);
        } catch (error) {
            console.error("Error fetching items:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleSearch = async (e, overrideQuery = null) => {
        if (e) e.preventDefault();
        const searchQuery = overrideQuery !== null ? overrideQuery : query;
        if (overrideQuery !== null) setQuery(searchQuery);

        if (!searchQuery.trim()) {
            fetchItems();
            return;
        }
        setLoading(true);
        try {
            let url = `/items/search?q=${searchQuery}`;
            if (filterType) {
                url += `&type=${filterType}`;
            }
            const response = await api.get(url);
            setItems(response.data);
        } catch (error) {
            console.error("Search failed", error);
        } finally {
            setLoading(false);
        }
    };

    const confirmDelete = async () => {
        if (!deleteItem) return;
        try {
            await api.delete(`/items/${deleteItem}`);
            setItems(items.filter(item => item.id !== deleteItem));
            setDeleteItem(null);
        } catch (error) {
            console.error("Delete failed", error);
            setErrorModal("Failed to delete item. You may not be authorized.");
            setDeleteItem(null);
        }
    };

    const handleDeleteClick = (id) => {
        setDeleteItem(id);
    };

    const handleResolve = async (id) => {
        const formData = new FormData();
        formData.append('status', 'RESOLVED');
        try {
            await api.put(`/items/${id}`, formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            setItems(items.map(item => item.id === id ? { ...item, status: 'RESOLVED' } : item));
        } catch (error) {
            console.error("Failed to resolve", error);
        }
    };

    // Helper to format Base64 image
    const getImageSrc = (item) => {
        return `http://localhost:8081/api/items/${item.id}/image`;
    };

    const [selectedContact, setSelectedContact] = useState(null);

    return (
        <div className="w-full px-6 py-8 bg-gray-50 min-h-screen">
            {/* Header & Search Section */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-8 max-w-full mx-auto">

                <div className="flex flex-col md:flex-row gap-6 items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900 tracking-tight">
                            {filterType ? `${filterType === 'LOST' ? 'Lost' : 'Found'} Items` : 'Recent Posts'}
                        </h1>
                        <p className="text-sm text-gray-500 mt-1">
                            Browse and find reported items
                        </p>
                    </div>

                    <form onSubmit={handleSearch} className="flex w-full md:w-auto gap-3">
                        <div className="relative flex-1 md:w-96 group">
                            <Search className="absolute left-3.5 top-3 h-5 w-5 text-gray-400 group-focus-within:text-primary transition-colors" />
                            <input
                                type="text"
                                placeholder="Search items..."
                                className="w-full pl-11 pr-4 py-3 bg-gray-50 border-2 border-transparent focus:bg-white focus:border-primary/20 focus:ring-4 focus:ring-primary/10 rounded-xl transition-all outline-none font-medium placeholder:text-gray-400 text-gray-900"
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                            />
                        </div>
                        <button
                            type="submit"
                            className="bg-primary hover:bg-blue-700 text-white px-6 py-2.5 rounded-xl font-semibold transition-all shadow-lg shadow-blue-200 active:transform active:scale-95"
                        >
                            Search
                        </button>
                    </form>
                </div>

                {/* Filters */}
                <div className="flex gap-3 mt-8 overflow-x-auto pb-2 scrollbar-hide border-b border-gray-100 pb-6">
                    <button
                        onClick={() => setSearchParams({})}
                        className={`px-5 py-2.5 rounded-xl text-sm font-semibold transition-all ${!filterType
                            ? 'bg-gray-900 text-white shadow-lg shadow-gray-200'
                            : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
                            }`}
                    >
                        All Items
                    </button>
                    <button
                        onClick={() => setSearchParams({ type: 'LOST' })}
                        className={`px-5 py-2.5 rounded-xl text-sm font-semibold transition-all ${filterType === 'LOST'
                            ? 'bg-red-500 text-white shadow-lg shadow-red-200'
                            : 'bg-gray-50 text-gray-600 hover:bg-red-50 hover:text-red-600'
                            }`}
                    >
                        Lost Items
                    </button>
                    <button
                        onClick={() => setSearchParams({ type: 'FOUND' })}
                        className={`px-5 py-2.5 rounded-xl text-sm font-semibold transition-all ${filterType === 'FOUND'
                            ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-200'
                            : 'bg-gray-50 text-gray-600 hover:bg-emerald-50 hover:text-emerald-600'
                            }`}
                    >
                        Found Items
                    </button>
                </div>
            </div>

            {isAuthenticated ? (
                loading ? (
                    <div className="text-center py-20">
                        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-primary mx-auto"></div>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6 items-start">
                        {items.map((item) => (
                            <motion.div
                                key={item.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="group bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100 overflow-hidden flex flex-col"
                            >
                                {/* Image Section - More Compact */}
                                <div className="h-44 bg-slate-50 relative overflow-hidden group-hover:bg-white transition-colors">
                                    <img
                                        src={getImageSrc(item)}
                                        alt={item.title}
                                        className={`w-full h-full object-contain p-4 group-hover:scale-105 transition-transform duration-500 mix-blend-multiply ${item.status === 'RESOLVED' ? 'grayscale opacity-50' : ''}`}
                                        onError={(e) => {
                                            e.target.onerror = null;
                                            e.target.src = 'https://placehold.co/600x400?text=No+Image';
                                        }}
                                    />
                                    {item.status === 'RESOLVED' ? (
                                        <div className="absolute top-3 right-3 px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider shadow-sm bg-gray-600 text-white border border-gray-500">
                                            RESOLVED
                                        </div>
                                    ) : (
                                        <div className={`absolute top-3 right-3 px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider shadow-sm ${item.type === 'LOST'
                                            ? 'bg-red-50 text-red-600 border border-red-100'
                                            : 'bg-emerald-50 text-emerald-600 border border-emerald-100'
                                            }`}>
                                            {item.type}
                                        </div>
                                    )}
                                </div>

                                {/* Content Section - Compact */}
                                <div className="p-4 flex-1 flex flex-col">
                                    <div className="mb-3">
                                        <h3 className="text-base font-bold text-gray-900 line-clamp-1 mb-1 group-hover:text-primary transition-colors">
                                            {item.title}
                                        </h3>
                                        <p className="text-gray-500 text-xs line-clamp-2 h-8 leading-relaxed">
                                            {item.description}
                                        </p>
                                    </div>

                                    {/* Metadata - Compact Pills */}
                                    <div className="flex flex-wrap gap-1.5 mb-4">
                                        <button
                                            onClick={(e) => { e.stopPropagation(); handleSearch(null, item.category); }}
                                            className="inline-flex items-center px-1.5 py-0.5 rounded bg-gray-50 text-gray-500 text-[10px] font-medium border border-gray-100 hover:bg-blue-50 hover:text-primary hover:border-blue-100 transition-colors cursor-pointer"
                                        >
                                            <Tag size={10} className="mr-1" />
                                            {item.category}
                                        </button>
                                        <button
                                            onClick={(e) => { e.stopPropagation(); handleSearch(null, item.location); }}
                                            className="inline-flex items-center px-1.5 py-0.5 rounded bg-gray-50 text-gray-500 text-[10px] font-medium border border-gray-100 hover:bg-blue-50 hover:text-primary hover:border-blue-100 transition-colors cursor-pointer"
                                        >
                                            <MapPin size={10} className="mr-1" />
                                            {item.location}
                                        </button>
                                        <div className="inline-flex items-center px-1.5 py-0.5 rounded bg-gray-50 text-gray-500 text-[10px] font-medium border border-gray-100">
                                            <Calendar size={10} className="mr-1" />
                                            {item.date}
                                        </div>
                                    </div>

                                    {/* Footer - Compact */}
                                    <div className="mt-auto pt-3 border-t border-gray-50 flex items-center justify-between">
                                        <div className="flex items-center gap-1.5">
                                            <div className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 text-[10px] font-bold">
                                                {item.user.username.charAt(0).toUpperCase()}
                                            </div>
                                            <span className="text-[10px] font-medium text-gray-500 truncate max-w-[80px]">
                                                {item.user.username}
                                            </span>
                                        </div>

                                        <div className="flex items-center gap-2">
                                            <div className="flex gap-1">
                                                {item.user.username === currentUsername && (
                                                    <>
                                                        {item.status !== 'RESOLVED' && (
                                                            <button
                                                                onClick={() => handleResolve(item.id)}
                                                                className="p-1 text-gray-400 hover:text-emerald-500 transition-colors"
                                                                title="Mark as Resolved"
                                                            >
                                                                <CheckCircle size={13} />
                                                            </button>
                                                        )}
                                                        <button
                                                            onClick={() => navigate('/report', { state: { item } })}
                                                            className="p-1 text-gray-400 hover:text-blue-600 transition-colors"
                                                            title="Edit"
                                                        >
                                                            <Edit size={13} />
                                                        </button>
                                                        <button
                                                            onClick={() => handleDeleteClick(item.id)}
                                                            className="p-1 text-gray-400 hover:text-red-500 transition-colors"
                                                            title="Delete"
                                                        >
                                                            <Trash2 size={13} />
                                                        </button>
                                                    </>
                                                )}
                                                {currentUserRole === 'ADMIN' && item.user.username !== currentUsername && (
                                                    <button
                                                        onClick={() => handleDeleteClick(item.id)}
                                                        className="p-1 text-gray-400 hover:text-red-500 transition-colors"
                                                        title="Delete (Admin)"
                                                    >
                                                        <Trash2 size={13} />
                                                    </button>
                                                )}
                                            </div>

                                            {item.status !== 'RESOLVED' && (
                                                <button
                                                    onClick={() => setSelectedContact({
                                                        title: item.title,
                                                        info: item.contactInfo || item.user.email || 'No contact info provided'
                                                    })}
                                                    className="text-primary text-xs font-semibold hover:underline px-2 py-1"
                                                >
                                                    Contact
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}

                        {items.length === 0 && (
                            <div className="col-span-full flex flex-col items-center justify-center py-32 text-center">
                                <div className="bg-gray-50 p-6 rounded-full mb-4 ring-1 ring-gray-100">
                                    <SearchX className="w-12 h-12 text-gray-400" />
                                </div>
                                <h3 className="text-lg font-bold text-gray-900 mb-1">No items found</h3>
                                <p className="text-gray-500 text-sm mb-6 max-w-xs mx-auto">
                                    We couldn't find anything matching your criteria. Try adjusting your filters.
                                </p>
                                {(query || filterType) && (
                                    <button
                                        onClick={() => {
                                            setSearchParams({});
                                            setQuery('');
                                        }}
                                        className="px-5 py-2 bg-white border border-gray-200 text-gray-700 text-sm font-semibold rounded-lg hover:bg-gray-50 hover:border-gray-300 transition-all shadow-sm"
                                    >
                                        Clear all filters
                                    </button>
                                )}
                            </div>
                        )}
                    </div>
                )
            ) : (
                <div className="flex flex-col items-center justify-center py-32 text-center">
                    <div className="bg-blue-50 p-6 rounded-full mb-6 ring-4 ring-blue-50/50">
                        <Lock className="w-16 h-16 text-primary" />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-3">Login to View Items</h2>
                    <p className="text-gray-500 max-w-md mx-auto mb-8 text-lg">
                        Join our community to see lost and found items, report something you've found, or search for what you've lost.
                    </p>
                    <div className="flex gap-4">
                        <button
                            onClick={() => navigate('/login')}
                            className="bg-primary hover:bg-blue-700 text-white px-8 py-3 rounded-xl font-bold transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5"
                        >
                            Log In
                        </button>
                        <button
                            onClick={() => navigate('/register')}
                            className="bg-white border-2 border-gray-200 hover:border-primary/30 text-gray-700 hover:text-primary px-8 py-3 rounded-xl font-bold transition-all"
                        >
                            Sign Up
                        </button>
                    </div>
                </div>
            )}

            {/* Contact Modal */}
            {selectedContact && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="bg-white rounded-2xl shadow-xl p-6 max-w-sm w-full relative"
                    >
                        <button
                            onClick={() => setSelectedContact(null)}
                            className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
                        >
                            ✕
                        </button>

                        <div className="text-center">
                            <div className="w-12 h-12 bg-blue-100 text-primary rounded-full flex items-center justify-center mx-auto mb-4">
                                <Search size={24} />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-2">Contact Owner</h3>
                            <p className="text-sm text-gray-500 mb-6">
                                Reach out to discuss returning <strong>{selectedContact.title}</strong>
                            </p>

                            <div className="bg-gray-50 p-4 rounded-xl border border-gray-100 mb-6 break-all">
                                <p className="text-lg font-mono font-semibold text-gray-800 select-all">
                                    {selectedContact.info}
                                </p>
                            </div>

                            <button
                                onClick={() => setSelectedContact(null)}
                                className="w-full bg-primary text-white py-2.5 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                            >
                                Close
                            </button>
                        </div>
                    </motion.div>
                </div>
            )}

            {/* Delete Confirmation Modal */}
            {deleteItem && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="bg-white rounded-2xl shadow-xl p-6 max-w-sm w-full"
                    >
                        <div className="text-center">
                            <div className="w-12 h-12 bg-red-100 text-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Trash2 size={24} />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-2">Delete Item?</h3>
                            <p className="text-sm text-gray-500 mb-6">
                                Are you sure you want to delete this item? This action cannot be undone.
                            </p>
                            <div className="flex gap-3">
                                <button
                                    onClick={() => setDeleteItem(null)}
                                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition-colors"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={confirmDelete}
                                    className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700 transition-colors"
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    </motion.div>
                </div>
            )}

            {/* Error Message Modal */}
            {errorModal && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="bg-white rounded-2xl shadow-xl p-6 max-w-sm w-full"
                    >
                        <div className="text-center">
                            <div className="w-12 h-12 bg-red-100 text-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
                                <AlertCircle size={24} />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-2">Error</h3>
                            <p className="text-sm text-gray-500 mb-6">
                                {errorModal}
                            </p>
                            <button
                                onClick={() => setErrorModal(null)}
                                className="w-full bg-gray-900 text-white py-2.5 rounded-lg font-medium hover:bg-gray-800 transition-colors"
                            >
                                Close
                            </button>
                        </div>
                    </motion.div>
                </div>
            )}
        </div>
    );
};

export default FeedPage;
