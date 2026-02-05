import { Header } from '@/components/Header'
import { Search, Banknote, PenTool, ShieldCheck, CarFront, Globe } from 'lucide-react'

export default function Services() {
    return (
        <div className="min-h-screen bg-background text-foreground">
            <Header />

            {/* Hero Section */}
            <section className="relative h-[40vh] bg-black flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background z-10"></div>
                <div className="absolute inset-0 z-0">
                    {/* Abstract luxury background */}
                    <div className="w-full h-full bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-zinc-800 via-black to-black opacity-50"></div>
                </div>
                <div className="relative z-20 text-center px-4">
                    <h1 className="text-5xl md:text-6xl font-black tracking-tighter mb-4 text-white">
                        Premium Services
                    </h1>
                    <p className="text-xl text-zinc-400 max-w-2xl mx-auto">
                        Comprehensive automotive solutions tailored for the discerning buyer.
                    </p>
                </div>
            </section>

            <main className="container mx-auto px-4 py-20 -mt-20 relative z-30">
                <div className="grid md:grid-cols-3 gap-8">
                    {/* Service 1 */}
                    <div className="p-8 bg-card rounded-2xl border border-white/10 hover:border-primary/50 transition-colors shadow-2xl group">
                        <div className="h-14 w-14 bg-primary/10 rounded-xl flex items-center justify-center mb-6 text-primary group-hover:scale-110 transition-transform">
                            <Globe className="h-7 w-7" />
                        </div>
                        <h3 className="text-2xl font-bold mb-4 text-white">Global Sourcing</h3>
                        <p className="text-muted-foreground leading-relaxed">
                            We leverage our international network to locate high-quality RORO vehicles from Japan and Singapore, ensuring verified mileage and pristine condition.
                        </p>
                    </div>

                    {/* Service 2 */}
                    <div className="p-8 bg-card rounded-2xl border border-white/10 hover:border-primary/50 transition-colors shadow-2xl group">
                        <div className="h-14 w-14 bg-primary/10 rounded-xl flex items-center justify-center mb-6 text-primary group-hover:scale-110 transition-transform">
                            <Banknote className="h-7 w-7" />
                        </div>
                        <h3 className="text-2xl font-bold mb-4 text-white">Financing Assistance</h3>
                        <p className="text-muted-foreground leading-relaxed">
                            Our team works directly with major financial institutions to secure competitive interest rates and flexible terms for your vehicle loan application.
                        </p>
                    </div>

                    {/* Service 3 */}
                    <div className="p-8 bg-card rounded-2xl border border-white/10 hover:border-primary/50 transition-colors shadow-2xl group">
                        <div className="h-14 w-14 bg-primary/10 rounded-xl flex items-center justify-center mb-6 text-primary group-hover:scale-110 transition-transform">
                            <ShieldCheck className="h-7 w-7" />
                        </div>
                        <h3 className="text-2xl font-bold mb-4 text-white">Warranty & Support</h3>
                        <p className="text-muted-foreground leading-relaxed">
                            Drive with confidence. We offer comprehensive warranty packages and dedicated after-sales support for maintenance and parts.
                        </p>
                    </div>

                    {/* Service 4 */}
                    <div className="p-8 bg-card rounded-2xl border border-white/10 hover:border-primary/50 transition-colors shadow-2xl group">
                        <div className="h-14 w-14 bg-primary/10 rounded-xl flex items-center justify-center mb-6 text-primary group-hover:scale-110 transition-transform">
                            <PenTool className="h-7 w-7" />
                        </div>
                        <h3 className="text-2xl font-bold mb-4 text-white">Registration Handling</h3>
                        <p className="text-muted-foreground leading-relaxed">
                            Skip the hassle. We handle all Licensing Office requirements, transfers, and registration paperwork on your behalf.
                        </p>
                    </div>

                    {/* Service 5 */}
                    <div className="p-8 bg-card rounded-2xl border border-white/10 hover:border-primary/50 transition-colors shadow-2xl group">
                        <div className="h-14 w-14 bg-primary/10 rounded-xl flex items-center justify-center mb-6 text-primary group-hover:scale-110 transition-transform">
                            <CarFront className="h-7 w-7" />
                        </div>
                        <h3 className="text-2xl font-bold mb-4 text-white">Trade-Ins</h3>
                        <p className="text-muted-foreground leading-relaxed">
                            Upgrade your ride. We accept local used vehicle trade-ins at fair market valuations to help offset the cost of your new purchase.
                        </p>
                    </div>
                </div>
            </main>
        </div>
    )
}
