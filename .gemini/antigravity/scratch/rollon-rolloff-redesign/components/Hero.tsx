"use client";
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, Search } from 'lucide-react';
import { motion } from 'framer-motion';

export function Hero() {
    const [make, setMake] = useState('');
    const [model, setModel] = useState('');
    const [price, setPrice] = useState('');

    return (
        <div className="relative h-[85vh] w-full overflow-hidden bg-black">
            {/* Video Background */}
            <div className="absolute inset-0 z-0">
                <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-black/40 z-10" />
                {/* Placeholder for video - User should replace src */}
                <video
                    className="h-full w-full object-cover opacity-60"
                    autoPlay
                    muted
                    loop
                    playsInline
                    poster="/logo.png" // Fallback
                >
                    <source src="https://videos.pexels.com/video-files/1636598/1636598-uhd_2560_1440_30fps.mp4" type="video/mp4" />
                    Your browser does not support the video tag.
                </video>
            </div>

            {/* Content Overlay */}
            <div className="relative z-20 container mx-auto px-4 h-full flex flex-col justify-center items-center text-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="max-w-4xl"
                >
                    <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 tracking-tight">
                        Drive <span className="text-primary italic">Excellence</span>
                    </h1>
                    <p className="text-xl text-gray-200 mb-10 max-w-2xl mx-auto font-light">
                        Discover Trinidad's premium selection of RORO and locally used vehicles. Unmatched quality, transparent pricing.
                    </p>
                </motion.div>

                {/* Quick Search Box */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.3, duration: 0.5 }}
                    className="w-full max-w-3xl bg-white/10 backdrop-blur-xl border border-white/20 p-6 rounded-2xl shadow-2xl"
                >
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                        <div className="space-y-1 text-left">
                            <label className="text-xs text-gray-400 ml-1">Make</label>
                            <select
                                className="w-full h-10 px-3 rounded-lg bg-black/40 border-white/20 text-white focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
                                value={make}
                                onChange={(e) => setMake(e.target.value)}
                            >
                                <option value="">All Makes</option>
                                <option value="toyota">Toyota</option>
                                <option value="honda">Honda</option>
                                <option value="nissan">Nissan</option>
                            </select>
                        </div>

                        <div className="space-y-1 text-left">
                            <label className="text-xs text-gray-400 ml-1">Model</label>
                            <select
                                className="w-full h-10 px-3 rounded-lg bg-black/40 border-white/20 text-white focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
                                value={model}
                                onChange={(e) => setModel(e.target.value)}
                            >
                                <option value="">All Models</option>
                                {/* Populate dynamically */}
                            </select>
                        </div>

                        <div className="space-y-1 text-left">
                            <label className="text-xs text-gray-400 ml-1">Price Range</label>
                            <select
                                className="w-full h-10 px-3 rounded-lg bg-black/40 border-white/20 text-white focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
                                value={price}
                                onChange={(e) => setPrice(e.target.value)}
                            >
                                <option value="">Any Price</option>
                                <option value="under-100k">Under $100k</option>
                                <option value="100k-150k">$100k - $150k</option>
                                <option value="over-150k">Over $150k</option>
                            </select>
                        </div>

                        <div className="flex items-end">
                            <Button
                                className="w-full h-10"
                                variant="premium"
                                onClick={() => {
                                    const params = new URLSearchParams();
                                    if (make) params.set('make', make);
                                    // if (model) params.set('model', model); // Model not populated yet
                                    if (price) {
                                        if (price === 'under-100k') params.set('maxPrice', '100000');
                                        if (price === '100k-150k') { params.set('minPrice', '100000'); params.set('maxPrice', '150000'); }
                                        if (price === 'over-150k') params.set('minPrice', '150000');
                                    }
                                    window.location.href = `/inventory?${params.toString()}`;
                                }}
                            >
                                <Search className="mr-2 h-4 w-4" /> Search
                            </Button>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    )
}
