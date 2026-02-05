import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Header } from '@/components/Header'

export default function NotFound() {
    return (
        <div className="min-h-screen bg-black text-white">
            <Header />
            <div className="container mx-auto px-4 h-[80vh] flex flex-col items-center justify-center text-center">
                <h1 className="text-9xl font-black text-primary/20">404</h1>
                <h2 className="text-4xl font-bold -mt-12 mb-6">Page Not Found</h2>
                <p className="text-xl text-zinc-400 max-w-md mb-8">
                    The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
                </p>
                <Link href="/">
                    <Button variant="premium" size="lg">
                        Return Home
                    </Button>
                </Link>
            </div>
        </div>
    )
}
