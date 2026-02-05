import { Header } from '@/components/Header'
import { Hero } from '@/components/Hero'
import { InventoryGrid } from '@/components/InventoryGrid'
import { createClient } from '@/utils/supabase/server'

export default async function Home() {
  const supabase = await createClient()
  const { data: vehicles } = await supabase
    .from('vehicles')
    .select('*')
    .eq('status', 'In Stock')
    .order('created_at', { ascending: false })
    .limit(6)

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-primary/30">
      <Header />
      <main className="flex flex-col">
        <Hero />

        {/* Featured Inventory Section */}
        <section className="container mx-auto px-4 py-20">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl md:text-5xl font-black tracking-tighter mb-4 text-white">
                <span className="text-primary">Latest</span> Arrivals
              </h2>
              <p className="text-zinc-400 text-lg max-w-xl">
                Explore our freshest imports, handpicked for quality and performance.
              </p>
            </div>
            <a href="/inventory" className="hidden md:inline-flex items-center text-primary hover:text-white transition-colors font-medium group">
              View Full Inventory
              <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
            </a>
          </div>

          <InventoryGrid vehicles={vehicles || []} />

          <div className="mt-12 text-center md:hidden">
            <a href="/inventory" className="btn btn-outline w-full py-3 rounded-lg border border-zinc-800 text-white block hover:bg-zinc-900">
              View All Vehicles
            </a>
          </div>
        </section>
      </main>

      <footer className="bg-card text-muted-foreground py-12 border-t border-border">
        <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8 mb-8 text-sm">
          <div>
            <h3 className="text-white font-semibold mb-4">R&R Trading</h3>
            <p className="mb-4">Trinidad's premier choice for RORO and locally used vehicles.</p>
          </div>
          <div>
            <h3 className="text-white font-semibold mb-4">Inventory</h3>
            <ul className="space-y-2">
              <li><a href="/inventory" className="hover:text-primary transition-colors">All Vehicles</a></li>
              <li><a href="/inventory?q=SUV" className="hover:text-primary transition-colors">SUVs</a></li>
              <li><a href="/inventory?q=Sedan" className="hover:text-primary transition-colors">Sedans</a></li>
            </ul>
          </div>
        </div>
        <div className="container mx-auto px-4 pt-8 border-t border-white/5 text-center text-xs">
          © {new Date().getFullYear()} R&R Trading. All rights reserved.
        </div>
      </footer>
    </div>
  )
}
