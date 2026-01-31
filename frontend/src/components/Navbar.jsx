import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X, Search, LogOut, PlusCircle, User } from 'lucide-react';
import { motion } from 'framer-motion';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
    const navigate = useNavigate();
    const isAuthenticated = !!localStorage.getItem('token');
    const username = localStorage.getItem('username');

    const handleLogout = () => {
        localStorage.clear();
        setShowLogoutConfirm(false);
        navigate('/login');
    };

    return (
        <nav className="bg-surface shadow-md sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    <div className="flex items-center">
                        <Link to="/" className="flex-shrink-0 flex items-center hover:opacity-90 transition-opacity">
                            <div className="w-9 h-9 bg-primary rounded-xl flex items-center justify-center shadow-blue-200 shadow-lg">
                                <span className="text-white font-bold text-2xl pb-0.5">O</span>
                            </div>
                            <span className="font-bold text-2xl text-gray-800 tracking-tight ml-1">rbit</span>
                        </Link>
                    </div>

                    <div className="hidden md:flex items-center space-x-8">
                        <Link to="/" className="text-gray-600 hover:text-primary px-3 py-2 font-medium transition-colors">Home</Link>
                        <Link to="/search" className="text-gray-600 hover:text-primary px-3 py-2 font-medium transition-colors">Search</Link>
                        <Link to="/about" className="text-gray-600 hover:text-primary px-3 py-2 font-medium transition-colors">About</Link>

                        {isAuthenticated ? (
                            <>
                                <Link
                                    to="/report"
                                    className="group relative px-5 py-2.5 rounded-xl font-bold text-primary transition-all hover:text-white"
                                >
                                    <div className="absolute inset-0 w-full h-full rounded-xl border-2 border-primary group-hover:bg-primary transition-all duration-300"></div>
                                    <div className="relative flex items-center gap-2">
                                        <PlusCircle size={18} className="transition-transform group-hover:rotate-90" />
                                        <span>Post Item</span>
                                    </div>
                                </Link>
                                <div className="flex items-center gap-4 border-l border-gray-200 pl-6 ml-2">
                                    <span className="text-sm font-medium text-gray-700 flex items-center gap-2">
                                        <User size={16} />
                                        {username}
                                    </span>
                                    <button onClick={() => setShowLogoutConfirm(true)} className="text-gray-500 hover:text-red-500 transition-colors">
                                        <LogOut size={20} />
                                    </button>
                                </div>
                            </>
                        ) : (
                            <Link to="/login" className="text-primary font-bold hover:text-blue-700 px-3 py-2 transition-colors">
                                Login
                            </Link>
                        )}
                    </div>

                    <div className="flex items-center md:hidden">
                        <button onClick={() => setIsOpen(!isOpen)} className="text-gray-500 hover:text-gray-700 focus:outline-none">
                            {isOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile menu */}
            {isOpen && (
                <div className="md:hidden bg-white border-t">
                    <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                        <Link to="/" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-primary hover:bg-gray-50">Home</Link>
                        <Link to="/search" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-primary hover:bg-gray-50">Search</Link>
                        <Link to="/about" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-primary hover:bg-gray-50">About</Link>
                        {isAuthenticated ? (
                            <>
                                <Link to="/report" className="block px-3 py-2 rounded-md text-base font-medium text-primary hover:bg-blue-50">Report Item</Link>
                                <button onClick={() => setShowLogoutConfirm(true)} className="w-full text-left block px-3 py-2 rounded-md text-base font-medium text-red-600 hover:bg-red-50">Logout</button>
                            </>
                        ) : (
                            <Link to="/login" className="block px-3 py-2 rounded-md text-base font-medium text-primary hover:bg-blue-50">Login</Link>
                        )}
                    </div>
                </div>
            )}

            {/* Logout Confirmation Modal */}
            {showLogoutConfirm && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="bg-white rounded-2xl shadow-xl p-6 max-w-sm w-full"
                    >
                        <div className="text-center">
                            <div className="w-12 h-12 bg-red-100 text-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
                                <LogOut size={24} />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-2">Sign Out?</h3>
                            <p className="text-sm text-gray-500 mb-6">
                                Are you sure you want to sign out of your account?
                            </p>
                            <div className="flex gap-3">
                                <button
                                    onClick={() => setShowLogoutConfirm(false)}
                                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition-colors"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={handleLogout}
                                    className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700 transition-colors"
                                >
                                    Sign Out
                                </button>
                            </div>
                        </div>
                    </motion.div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
