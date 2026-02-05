"use client";
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Badge } from 'lucide-react'; // Placeholder for Badge component if using shadcn, or simple div
import { motion } from 'framer-motion';

// Simple Badge component since we didn't add shadcn badge
function StatusBadge({ status }: { status: string }) {
    const colors = {
        'In Stock': 'bg-green-500/20 text-green-400 border-green-500/50',
        'In Transit': 'bg-yellow-500/20 text-yellow-400 border-yellow-500/50',
        'Sold': 'bg-red-500/20 text-red-400 border-red-500/50',
    };
    // @ts-ignore
    const colorClass = colors[status] || 'bg-gray-500/20 text-gray-400';

    return (
        <span className={`px-2 py-1 rounded text-xs font-medium border ${colorClass} uppercase tracking-wider`}>
            {status}
        </span>
    );
}

export function VehicleCard({ vehicle }: { vehicle: any }) {
    // Fallback image if no images array or empty
    const imageUrl = vehicle.images && vehicle.images.length > 0
        ? vehicle.images[0]
        : '/placeholder-car.jpg'; // Need a placeholder placeholder

    return (
        <motion.div
            whileHover={{ y: -5 }}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="group relative bg-card border border-border rounded-xl overflow-hidden shadow-lg hover:shadow-primary/10 transition-all duration-300"
        >
            <Link href={`/inventory/${vehicle.id}`}>
                <div className="relative aspect-[16/9] w-full overflow-hidden">
                    <Image
                        src={imageUrl}
                        alt={`${vehicle.year} ${vehicle.make} ${vehicle.model}`}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                    <div className="absolute top-3 left-3 flex gap-2">
                        <StatusBadge status={vehicle.status} />
                        {vehicle.condition === 'Local Used' && (
                            <span className="px-2 py-1 rounded text-xs font-medium bg-blue-500/20 text-blue-400 border border-blue-500/50 uppercase tracking-wider">
                                Local Used
                            </span>
                        )}
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />

                    <div className="absolute bottom-3 right-3">
                        <span className="text-xl font-bold text-white drop-shadow-md">
                            ${vehicle.price_ttd?.toLocaleString()} TTD
                        </span>
                    </div>
                </div>

                <div className="p-5">
                    <h3 className="text-xl font-bold text-foreground mb-1 group-hover:text-primary transition-colors">
                        {vehicle.year} {vehicle.make} {vehicle.model}
                    </h3>
                    <div className="flex justify-between text-sm text-muted-foreground mb-4">
                        <span>{vehicle.mileage?.toLocaleString()} km</span>
                        <span>Automatic</span> {/* Clean this up if generic */}
                    </div>

                    <Button className="w-full" variant="outline">
                        View Details
                    </Button>
                </div>
            </Link>
        </motion.div>
    );
}
