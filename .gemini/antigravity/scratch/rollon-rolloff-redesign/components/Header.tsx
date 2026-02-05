import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Phone, Search, Menu } from 'lucide-react'

export function Header() {
    return (
        <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-black/80 backdrop-blur-md supports-[backdrop-filter]:bg-black/50">
            <div className="container mx-auto px-4 h-20 flex items-center justify-between">
                <Link href="/" className="flex items-center space-x-2">
                    <div className="relative h-12 w-48">
                        <Image
                            src="/logo.png"
                            alt="R&R Trading"
                            fill
                            className="object-contain" // Preserves aspect ratio
                            priority
                        />
                    </div>
                </Link>

                {/* Desktop Nav */}
                <nav className="hidden md:flex items-center space-x-8">
                    <Link href="/inventory" className="text-sm font-medium text-gray-300 hover:text-white transition-colors">
                        Inventory
                    </Link>
                    <Link href="/services" className="text-sm font-medium text-gray-300 hover:text-white transition-colors">
                        Services
                    </Link>
                    <Link href="/financing" className="text-sm font-medium text-gray-300 hover:text-white transition-colors">
                        Financing
                    </Link>
                    <Link href="/contact" className="text-sm font-medium text-gray-300 hover:text-white transition-colors">
                        Contact
                    </Link>
                </nav>

                <div className="flex items-center space-x-4">
                    {/* Mobile Search - just link to inventory */}
                    <Link href="/inventory">
                        <Button variant="ghost" size="icon" className="text-white md:hidden">
                            <Search className="h-5 w-5" />
                        </Button>
                    </Link>
                    <Button variant="premium" className="hidden md:inline-flex">
                        <Phone className="mr-2 h-4 w-4" />
                        WhatsApp Us
                    </Button>
                    <Button variant="ghost" size="icon" className="text-white md:hidden">
                        <Menu className="h-6 w-6" />
                    </Button>
                </div>
            </div>
        </header>
    )
}
