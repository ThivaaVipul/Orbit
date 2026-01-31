import React from 'react';
import { Link } from 'react-router-dom';
import { Search, MapPin, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

const LandingPage = () => {
    return (
        <div className="flex flex-col min-h-[calc(100vh-64px)] font-sans">
            {/* Hero Section */}
            <section className="relative overflow-hidden bg-white pt-20 pb-24 lg:pt-28 lg:pb-32">
                {/* Subtle Primary Gradient */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-blue-50/50 via-transparent to-transparent"></div>

                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-gray-900 mb-6 leading-tight">
                            University of Vavuniya <br />
                            <span className="text-primary">
                                Lost & Found
                            </span>
                        </h1>

                        <p className="text-lg md:text-xl text-gray-500 mb-10 max-w-2xl mx-auto leading-relaxed">
                            The official platform for students and staff to report and recover lost items within the campus premises.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                            <Link
                                to="/report?type=LOST"
                                className="w-full sm:w-auto px-8 py-3.5 bg-primary text-white text-base font-bold rounded-xl hover:bg-blue-700 transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5 flex items-center justify-center gap-2"
                            >
                                <Search size={18} />
                                I Lost Something
                            </Link>
                            <Link
                                to="/report?type=FOUND"
                                className="w-full sm:w-auto px-8 py-3.5 bg-white text-primary border border-primary/30 text-base font-bold rounded-xl hover:border-primary hover:bg-blue-50 transition-all flex items-center justify-center gap-2"
                            >
                                <MapPin size={18} />
                                I Found Something
                            </Link>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Feature Highlights */}
            <section className="py-24 bg-gray-50 flex-1">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="text-center mb-16">
                        <h2 className="text-2xl font-bold text-gray-900 mb-3">Community Driven Recovery</h2>
                        <p className="text-gray-500 max-w-xl mx-auto text-base">A simple process to help return items to their owners.</p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {/* Feature 1 */}
                        <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300">
                            <div className="w-14 h-14 bg-blue-50 text-primary rounded-xl flex items-center justify-center mb-6">
                                <Search size={28} />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-3">Search</h3>
                            <p className="text-gray-500 text-sm leading-relaxed">
                                Browse through the list of found items or report what you've lost.
                            </p>
                        </div>

                        {/* Feature 2 */}
                        <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300">
                            <div className="w-14 h-14 bg-blue-50 text-primary rounded-xl flex items-center justify-center mb-6">
                                <MapPin size={28} />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-3">Identify</h3>
                            <p className="text-gray-500 text-sm leading-relaxed">
                                Use location tags to specify where items were lost or found on campus.
                            </p>
                        </div>

                        {/* Feature 3 */}
                        <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300">
                            <div className="w-14 h-14 bg-blue-50 text-primary rounded-xl flex items-center justify-center mb-6">
                                <ArrowRight size={28} />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-3">Connect</h3>
                            <p className="text-gray-500 text-sm leading-relaxed">
                                Directly contact the person to arrange the return of the item.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-white border-t border-gray-100 py-8">
                <div className="max-w-7xl mx-auto px-4 text-center">
                    <p className="text-gray-400 text-sm">
                        © {new Date().getFullYear()} University of Vavuniya. All rights reserved.
                    </p>
                </div>
            </footer>
        </div>
    );
};

export default LandingPage;
