import { createClient } from '@/utils/supabase/server'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Header } from '@/components/Header'
import { LoanCalculator } from '@/components/LoanCalculator'
import { ShareButton } from '@/components/ShareButton'
import { Phone, ArrowLeft, Check, Calendar, Gauge, Settings } from 'lucide-react'
import Link from 'next/link'
import { Metadata } from 'next'

// Dynamic Metadata
export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
    const { id } = await params
    const supabase = await createClient()
    const { data: vehicle } = await supabase.from('vehicles').select('*').eq('id', id).single()

    if (!vehicle) {
        return { title: 'Vehicle Not Found' }
    }

    return {
        title: `${vehicle.year} ${vehicle.make} ${vehicle.model} - R&R Trading`,
        description: `Buy this ${vehicle.year} ${vehicle.make} ${vehicle.model} in Trinidad. Price: $${vehicle.price_ttd?.toLocaleString()} TTD. ${vehicle.condition}.`,
        openGraph: {
            images: vehicle.images?.[0] ? [vehicle.images[0]] : [],
        },
    }
}

export default async function VehicleDetails({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params
    const supabase = await createClient()
    const { data: vehicle } = await supabase
        .from('vehicles')
        .select('*')
        .eq('id', id)
        .single()

    if (!vehicle) {
        notFound()
    }

    const whatsappMessage = `Hi R&R Trading, I'm interested in the ${vehicle.year} ${vehicle.make} ${vehicle.model} listed for $${vehicle.price_ttd?.toLocaleString()} TTD. Is it available?`
    const whatsappLink = `https://wa.me/18681234567?text=${encodeURIComponent(whatsappMessage)}` // Replace with real number
    const pageUrl = `https://rr-trading.com/inventory/${vehicle.id}` // In prod use env var

    // Schema.org Structured Data
    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'Vehicle',
        brand: vehicle.make,
        model: vehicle.model,
        vehicleModelYear: vehicle.year,
        mileageFromOdometer: {
            '@type': 'QuantitativeValue',
            value: vehicle.mileage,
            unitCode: 'KMT'
        },
        offers: {
            '@type': 'Offer',
            price: vehicle.price_ttd,
            priceCurrency: 'TTD',
            availability: vehicle.status === 'In Stock' ? 'https://schema.org/InStock' : 'https://schema.org/SoldOut'
        },
        image: vehicle.images
    }

    return (
        <div className="min-h-screen bg-background text-foreground pb-20">
            <Header />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />

            <div className="container mx-auto px-4 py-8">
                <div className="flex justify-between items-center mb-6">
                    <Link href="/inventory" className="inline-flex items-center text-muted-foreground hover:text-primary transition-colors">
                        <ArrowLeft className="mr-2 h-4 w-4" /> Back to Inventory
                    </Link>
                    <ShareButton
                        title={`${vehicle.year} ${vehicle.make} ${vehicle.model}`}
                        text={`Check out this ${vehicle.make} ${vehicle.model} at R&R Trading!`}
                        url={pageUrl}
                    />
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                    {/* Main Content - Images & Key Info */}
                    <div className="lg:col-span-2 space-y-8">
                        {/* Hero Image */}
                        <div className="relative aspect-video w-full rounded-2xl overflow-hidden bg-black shadow-2xl border border-white/10">
                            <Image
                                src={vehicle.images?.[0] || '/placeholder-car.jpg'}
                                alt={`${vehicle.make} ${vehicle.model}`}
                                fill
                                className="object-cover"
                                priority
                            />
                            <div className="absolute top-4 left-4">
                                {vehicle.status === 'In Stock' && (
                                    <span className="bg-green-600 text-white px-3 py-1 rounded-full text-sm font-bold shadow-lg">In Stock</span>
                                )}
                            </div>
                        </div>

                        {/* Gallery (Thumbnail placeholders) */}
                        {vehicle.images && vehicle.images.length > 1 && (
                            <div className="grid grid-cols-4 gap-4">
                                {vehicle.images.slice(1, 5).map((img: string, idx: number) => (
                                    <div key={idx} className="relative aspect-video rounded-lg overflow-hidden border border-white/10 hover:border-primary cursor-pointer">
                                        <Image src={img} alt="Gallery" fill className="object-cover" />
                                    </div>
                                ))}
                            </div>
                        )}

                        {/* Description & Specs */}
                        <div className="bg-card rounded-xl p-8 border border-border">
                            <h2 className="text-2xl font-bold mb-6">Vehicle Specifications</h2>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                                <div className="flex flex-col">
                                    <span className="text-muted-foreground text-sm flex items-center mb-1"><Calendar className="h-4 w-4 mr-1" /> Year</span>
                                    <span className="font-semibold">{vehicle.year}</span>
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-muted-foreground text-sm flex items-center mb-1"><Settings className="h-4 w-4 mr-1" /> Make</span>
                                    <span className="font-semibold">{vehicle.make}</span>
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-muted-foreground text-sm flex items-center mb-1"><Settings className="h-4 w-4 mr-1" /> Model</span>
                                    <span className="font-semibold">{vehicle.model}</span>
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-muted-foreground text-sm flex items-center mb-1"><Gauge className="h-4 w-4 mr-1" /> Mileage</span>
                                    <span className="font-semibold">{vehicle.mileage?.toLocaleString()} km</span>
                                </div>
                            </div>

                            {/* JSON Specs */}
                            {vehicle.specs && Object.keys(vehicle.specs).length > 0 && (
                                <div className="mt-8 pt-6 border-t border-border">
                                    <h3 className="font-semibold mb-4">Features</h3>
                                    <div className="grid grid-cols-2 gap-2">
                                        {Object.entries(vehicle.specs).map(([key, value]) => (
                                            <div key={key} className="flex items-center text-sm">
                                                <Check className="h-4 w-4 text-green-500 mr-2" />
                                                <span className="capitalize text-muted-foreground">{key.replace(/_/g, ' ')}:</span>
                                                <span className="ml-1 font-medium text-foreground">
                                                    {typeof value === 'object' ? JSON.stringify(value) : String(value)}
                                                </span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Sidebar - Actions & Financing */}
                    <div className="lg:col-span-1 space-y-6">
                        <div className="bg-card rounded-xl p-6 border border-border shadow-xl sticky top-24">
                            <div className="mb-6">
                                <h1 className="text-3xl font-bold mb-2">{vehicle.year} {vehicle.make} {vehicle.model}</h1>
                                <p className="text-sm text-muted-foreground mb-4">{vehicle.condition} Vehicle</p>
                                <div className="text-4xl font-bold text-primary mb-1">
                                    ${vehicle.price_ttd?.toLocaleString()} <span className="text-lg font-normal text-muted-foreground">TTD</span>
                                </div>
                            </div>

                            <div className="space-y-4 mb-8">
                                <a href={whatsappLink} target="_blank" rel="noopener noreferrer">
                                    <Button size="lg" className="w-full bg-[#25D366] hover:bg-[#128C7E] text-white border-0">
                                        <Phone className="mr-2 h-5 w-5" /> Inquire on WhatsApp
                                    </Button>
                                </a>
                                <Button size="lg" variant="outline" className="w-full">
                                    Schedule Test Drive
                                </Button>
                            </div>

                            <div className="border-t border-border pt-6">
                                <h3 className="font-semibold mb-4 text-lg">Financing Calculator</h3>
                                <LoanCalculator initialPrice={vehicle.price_ttd} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
