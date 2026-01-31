import React from 'react';
import { Shield, Users, MapPin, Search, AlertCircle, Phone } from 'lucide-react';

const AboutPage = () => {
    return (
        <div className="flex flex-col min-h-screen bg-gray-50/50">
            {/* Header Section */}
            <div className="bg-white border-b border-gray-100">
                <div className="max-w-5xl mx-auto px-4 py-16 text-center">
                    <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 tracking-tight">
                        About <span className="text-primary">Orbit</span>
                    </h1>
                    <p className="text-xl text-gray-500 max-w-2xl mx-auto leading-relaxed">
                        The official digital lost and found platform for the <span className="font-semibold text-gray-900">University of Vavuniya</span>.
                    </p>
                </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 max-w-5xl mx-auto px-4 py-12 space-y-12">

                {/* Mission Section */}
                <section className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 md:p-10">
                    <div className="flex flex-col md:flex-row gap-8 items-start">
                        <div className="bg-blue-50 p-4 rounded-xl">
                            <Shield className="w-8 h-8 text-primary" />
                        </div>
                        <div>
                            <h2 className="text-2xl font-bold text-gray-900 mb-4">Our Mission</h2>
                            <p className="text-gray-600 text-lg leading-relaxed">
                                To create a safe, efficient, and centralized community space where students, faculty, and staff can collaboratively recover lost belongings. We aim to replace fragmented social media posts with a dedicated, privacy-focused solution tailored specifically for our campus environment.
                            </p>
                        </div>
                    </div>
                </section>

                {/* Values Grid */}
                <section>
                    <h2 className="text-2xl font-bold text-gray-900 mb-8 px-2">Why We Built This</h2>
                    <div className="grid md:grid-cols-3 gap-6">
                        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                            <div className="w-10 h-10 bg-emerald-50 text-emerald-600 rounded-lg flex items-center justify-center mb-4">
                                <Users size={20} />
                            </div>
                            <h3 className="text-lg font-bold text-gray-900 mb-2">Community First</h3>
                            <p className="text-gray-500 text-sm leading-relaxed">
                                Fostering a culture of honesty and helpfulness among the student body and staff members.
                            </p>
                        </div>
                        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                            <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-lg flex items-center justify-center mb-4">
                                <Shield size={20} />
                            </div>
                            <h3 className="text-lg font-bold text-gray-900 mb-2">Trust & Privacy</h3>
                            <p className="text-gray-500 text-sm leading-relaxed">
                                A secure environment where contact details are shared only when necessary for item recovery.
                            </p>
                        </div>
                        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                            <div className="w-10 h-10 bg-purple-50 text-purple-600 rounded-lg flex items-center justify-center mb-4">
                                <MapPin size={20} />
                            </div>
                            <h3 className="text-lg font-bold text-gray-900 mb-2">Campus Specific</h3>
                            <p className="text-gray-500 text-sm leading-relaxed">
                                Categories and locations are customized to the University of Vavuniya's buildings and lecture halls.
                            </p>
                        </div>
                    </div>
                </section>

                {/* Important Guidelines */}
                <section className="bg-blue-900 rounded-3xl p-8 md:p-12 text-white overflow-hidden relative">
                    {/* Background Pattern */}
                    <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>

                    <div className="relative z-10">
                        <div className="flex items-center gap-3 mb-6">
                            <AlertCircle className="text-blue-300" />
                            <h2 className="text-2xl font-bold">University Recovery Protocol</h2>
                        </div>

                        <div className="space-y-6 text-blue-100">
                            <div className="flex gap-4">
                                <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0 font-bold text-sm">1</div>
                                <p>If you find a valuable item (wallet, phone, ID, laptop), please list it on Orbit immediately.</p>
                            </div>
                            <div className="flex gap-4">
                                <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0 font-bold text-sm">2</div>
                                <p>If the owner does not contact you within <strong>24 hours</strong>, the item must be handed over to the University Security Office.</p>
                            </div>
                            <div className="flex gap-4">
                                <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0 font-bold text-sm">3</div>
                                <p>For Student IDs found during exams, please hand them over to the nearest Examination Supervisor.</p>
                            </div>
                        </div>

                        <div className="mt-8 pt-8 border-t border-white/10 flex flex-col md:flex-row md:items-center justify-between gap-4">
                            <p className="text-sm text-blue-300">
                                This platform is a project by the Faculty of Technological Studies.
                            </p>
                            <div className="flex items-center gap-2 text-sm font-semibold bg-white/10 px-4 py-2 rounded-lg">
                                <Phone size={16} />
                                Security Unit: +94 24 222 3316
                            </div>
                        </div>
                    </div>
                </section>
            </div>

            {/* Footer */}
            <footer className="bg-white border-t border-gray-100 py-8 text-center text-sm text-gray-400">
                © {new Date().getFullYear()} University of Vavuniya. All rights reserved.
            </footer>
        </div>
    );
};

export default AboutPage;
