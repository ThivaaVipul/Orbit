import React, { useState } from 'react';
import { useNavigate, useSearchParams, useLocation } from 'react-router-dom';
import api from '../services/api';
import { Upload, MapPin, Tag, Calendar, Loader, FileText, Phone, Type, AlertCircle, X, Check, Search, HelpCircle, CheckCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const ReportItemPage = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const location = useLocation();
    const isEditing = !!location.state?.item;
    const editingItem = location.state?.item;

    React.useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            navigate('/login', { state: { message: 'Please login to report an item.' } });
        }
    }, [navigate]);

    const initialType = searchParams.get('type') || 'LOST';

    const [formData, setFormData] = useState({
        title: editingItem?.title || '',
        description: editingItem?.description || '',
        type: editingItem?.type || initialType,
        category: editingItem?.category || '',
        location: editingItem?.location || '',
        date: editingItem?.date || '',
        contactInfo: editingItem?.contactInfo || ''
    });

    const [image, setImage] = useState(null);
    const [preview, setPreview] = useState(editingItem ? `http://localhost:8081/api/items/${editingItem.id}/image` : null);
    const [loading, setLoading] = useState(false);

    const [toast, setToast] = useState({ show: false, message: '', type: '' });

    const showToast = (message, type = 'error') => {
        setToast({ show: true, message, type });
        setTimeout(() => setToast({ show: false, message: '', type: '' }), 4000);
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImage(file);
            setPreview(URL.createObjectURL(file));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.title.trim()) {
            showToast('Please enter a title for the item.', 'error');
            return;
        }

        setLoading(true);


        const data = new FormData();
        Object.keys(formData).forEach(key => {
            data.append(key, formData[key]);
        });
        if (image) {
            data.append('image', image);
        }

        try {
            if (isEditing) {
                await api.put(`/items/${editingItem.id}`, data, {
                    headers: { 'Content-Type': 'multipart/form-data' }
                });
            } else {
                await api.post('/items', data, {
                    headers: { 'Content-Type': 'multipart/form-data' }
                });
            }
            navigate('/search?new=true');
        } catch (err) {
            showToast('Failed to report item. Please try again.', 'error');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 font-sans" >
            <div className="max-w-5xl mx-auto">

                <div className="mb-8 text-center">
                    <h1 className="text-3xl font-bold text-gray-900 tracking-tight">
                        {isEditing ? 'Edit Item' : 'New Report'}
                    </h1>
                    <p className="text-gray-500 mt-2">Help us track items across the campus.</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                    {/* Left Column: Main Details */}
                    <div className="lg:col-span-2 space-y-6">
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8 h-full min-h-[600px]"
                        >
                            <h2 className="text-lg font-bold text-gray-900 mb-6">
                                Item Details
                            </h2>

                            <div className="space-y-5">
                                {/* Type Selector Cards */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Classification</label>
                                    <div className="grid grid-cols-2 gap-4">
                                        <button
                                            type="button"
                                            onClick={() => setFormData({ ...formData, type: 'LOST' })}
                                            className={`py-4 px-4 rounded-xl border-2 transition-all flex flex-col items-center justify-center gap-2 ${formData.type === 'LOST'
                                                ? 'border-red-500 bg-red-50 text-red-700 shadow-sm ring-2 ring-red-500/20'
                                                : 'border-gray-100 bg-gray-50 text-gray-400 hover:border-gray-200 hover:bg-gray-100'
                                                }`}
                                        >
                                            <div className={`p-2 rounded-full ${formData.type === 'LOST' ? 'bg-white shadow-sm' : 'bg-transparent'}`}>
                                                <HelpCircle size={24} className={formData.type === 'LOST' ? 'text-red-500' : 'text-gray-400'} />
                                            </div>
                                            <span className="font-bold text-sm">I Lost Something</span>
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => setFormData({ ...formData, type: 'FOUND' })}
                                            className={`py-4 px-4 rounded-xl border-2 transition-all flex flex-col items-center justify-center gap-2 ${formData.type === 'FOUND'
                                                ? 'border-emerald-500 bg-emerald-50 text-emerald-700 shadow-sm ring-2 ring-emerald-500/20'
                                                : 'border-gray-100 bg-gray-50 text-gray-400 hover:border-gray-200 hover:bg-gray-100'
                                                }`}
                                        >
                                            <div className={`p-2 rounded-full ${formData.type === 'FOUND' ? 'bg-white shadow-sm' : 'bg-transparent'}`}>
                                                <Search size={24} className={formData.type === 'FOUND' ? 'text-emerald-500' : 'text-gray-400'} />
                                            </div>
                                            <span className="font-bold text-sm">I Found Something</span>
                                        </button>
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Title</label>
                                    <div className="relative">
                                        <Type className="absolute left-3.5 top-3.5 h-5 w-5 text-gray-400" />
                                        <input
                                            type="text"
                                            name="title"
                                            required
                                            value={formData.title}
                                            onChange={handleChange}
                                            className="block w-full pl-11 pr-4 py-3 rounded-xl border border-gray-200 focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all outline-none"
                                            placeholder="e.g. Blue Wallet"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Description</label>
                                    <textarea
                                        name="description"
                                        rows="4"
                                        required
                                        value={formData.description}
                                        onChange={handleChange}
                                        className="block w-full p-4 rounded-xl border border-gray-200 focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all outline-none resize-none"
                                        placeholder="Describe the item clearly..."
                                    ></textarea>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1.5">Category</label>
                                        <div className="relative">
                                            <Tag className="absolute left-3.5 top-3.5 h-5 w-5 text-gray-400" />
                                            <input
                                                type="text"
                                                name="category"
                                                required
                                                value={formData.category}
                                                onChange={handleChange}
                                                className="block w-full pl-11 pr-4 py-3 rounded-xl border border-gray-200 focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all outline-none"
                                                placeholder="e.g. Electronics"
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1.5">Date</label>
                                        <div className="relative">
                                            <Calendar className="absolute left-3.5 top-3.5 h-5 w-5 text-gray-400" />
                                            <input
                                                type="date"
                                                name="date"
                                                required
                                                value={formData.date}
                                                onChange={handleChange}
                                                className="block w-full pl-11 pr-4 py-3 rounded-xl border border-gray-200 focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all outline-none text-gray-600"
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Location</label>
                                    <div className="relative">
                                        <MapPin className="absolute left-3.5 top-3.5 h-5 w-5 text-gray-400" />
                                        <input
                                            type="text"
                                            name="location"
                                            required
                                            value={formData.location}
                                            onChange={handleChange}
                                            className="block w-full pl-11 pr-4 py-3 rounded-xl border border-gray-200 focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all outline-none"
                                            placeholder="e.g. Library 2nd Floor"
                                        />
                                    </div>
                                </div>
                            </div>
                        </motion.div>

                        <div className="flex justify-end">
                        </div>
                    </div>

                    {/* Right Column: Image & Contact */}
                    <div className="space-y-6 lg:sticky lg:top-6 h-fit">
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8"
                        >
                            <h2 className="text-lg font-bold text-gray-900 mb-6">
                                Photo Proof
                            </h2>

                            <div className="relative group">
                                <label className={`flex flex-col items-center justify-center w-full aspect-square border-2 border-dashed rounded-2xl cursor-pointer transition-all duration-300 relative overflow-hidden ${image || preview ? 'border-primary/20 bg-blue-50/10' : 'border-gray-200 hover:border-primary/50 hover:bg-gray-50'}`}>
                                    {preview ? (
                                        <>
                                            <img src={preview} alt="Preview" className="w-full h-full object-cover" />
                                            <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-sm">
                                                <span className="text-white text-sm font-bold bg-black/50 px-4 py-2 rounded-full">Change</span>
                                            </div>
                                        </>
                                    ) : (
                                        <div className="flex flex-col items-center justify-center p-6 text-center text-gray-400">
                                            <div className="w-12 h-12 bg-gray-50 rounded-full flex items-center justify-center mb-3">
                                                <Upload className="w-6 h-6" />
                                            </div>
                                            <p className="text-sm font-medium text-gray-600">Upload Image</p>
                                            <p className="text-xs mt-1">PNG, JPG up to 5MB</p>
                                        </div>
                                    )}
                                    <input type="file" className="hidden" accept="image/*" onChange={handleImageChange} />
                                </label>

                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8"
                        >
                            <h2 className="text-lg font-bold text-gray-900 mb-4">
                                Contact Information
                            </h2>
                            <div className="relative">
                                <Phone className="absolute left-3.5 top-3.5 h-5 w-5 text-gray-400" />
                                <input
                                    type="text"
                                    name="contactInfo"
                                    value={formData.contactInfo}
                                    onChange={handleChange}
                                    className="block w-full pl-11 pr-4 py-3 rounded-xl border border-gray-200 focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all outline-none"
                                    placeholder="e.g. +94 77 123 4567"
                                />
                            </div>
                            <div className="mt-3 p-3 bg-blue-50 rounded-lg border border-blue-100">
                                <p className="text-xs text-blue-700 leading-relaxed">
                                    <strong>Note:</strong> Your registered email is visible to others by default. Providing a mobile number helps speed up recovery.
                                </p>
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                        >
                            <button
                                onClick={handleSubmit}
                                disabled={loading}
                                className="w-full bg-primary text-white py-4 px-6 rounded-xl font-bold text-lg hover:bg-blue-700 shadow-lg shadow-blue-200/50 hover:shadow-xl hover:-translate-y-1 transition-all flex justify-center items-center gap-2 active:scale-[0.98]"
                            >
                                {loading ? <Loader className="animate-spin" /> : (
                                    <>
                                        {isEditing ? 'Save Changes' : 'Submit Report'}
                                    </>
                                )}
                            </button>
                        </motion.div>
                    </div>

                </div>

                <AnimatePresence>
                    {toast.show && (
                        <motion.div
                            initial={{ opacity: 0, y: 100, x: '-50%', scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, x: '-50%', scale: 1 }}
                            exit={{ opacity: 0, y: 20, x: '-50%', scale: 0.95 }}
                            transition={{ type: "spring", stiffness: 400, damping: 30 }}
                            className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-50 min-w-[320px] max-w-md"
                        >
                            <div className={`flex items-center gap-4 px-5 py-4 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] border backdrop-blur-md ${toast.type === 'error'
                                ? 'bg-white/95 border-red-100'
                                : 'bg-white/95 border-emerald-100'
                                }`}>

                                <div className={`flex-shrink-0 p-2.5 rounded-full ${toast.type === 'error' ? 'bg-red-50 text-red-500' : 'bg-emerald-50 text-emerald-500'
                                    }`}>
                                    {toast.type === 'error' ? <AlertCircle size={22} strokeWidth={2.5} /> : <CheckCircle size={22} strokeWidth={2.5} />}
                                </div>

                                <div className="flex-1 min-w-0">
                                    <p className={`text-sm font-bold ${toast.type === 'error' ? 'text-red-600' : 'text-emerald-700'}`}>
                                        {toast.type === 'error' ? 'Action Required' : 'Success'}
                                    </p>
                                    <p className="text-sm font-medium text-gray-600 mt-0.5 truncate">
                                        {toast.message}
                                    </p>
                                </div>

                                <button
                                    onClick={() => setToast({ ...toast, show: false })}
                                    className="p-1 rounded-full text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors"
                                >
                                    <X size={18} />
                                </button>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};

export default ReportItemPage;
