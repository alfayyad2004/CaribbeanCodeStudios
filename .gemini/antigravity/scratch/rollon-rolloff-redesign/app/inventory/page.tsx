import { Header } from '@/components/Header'
import { InventoryGrid } from '@/components/InventoryGrid'
import { InventoryFilters } from '@/components/InventoryFilters'
import { createClient } from '@/utils/supabase/server'

export const metadata = {
    title: 'Inventory - R&R Trading',
    description: 'Browse our selection of quality RORO and local used vehicles.'
}

export default async function InventoryPage({
    searchParams,
}: {
    searchParams: { [key: string]: string | string[] | undefined }
}) {
    const supabase = await createClient()

    let query = supabase
        .from('vehicles')
        .select('*')
        .order('created_at', { ascending: false })

    // Apply Filter Logic
    const q = searchParams['q'] as string
    const make = searchParams['make'] as string
    const minPrice = searchParams['minPrice'] as string
    const maxPrice = searchParams['maxPrice'] as string

    if (q) {
        query = query.textSearch('fts', q, { type: 'websearch', config: 'english' })
    }
    if (make) {
        query = query.eq('make', make)
    }
    if (minPrice) {
        query = query.gte('price_ttd', minPrice)
    }
    if (maxPrice) {
        query = query.lte('price_ttd', maxPrice)
    }

    const { data: vehicles } = await query

    return (
        <div className="min-h-screen bg-background text-foreground">
            <Header />
            <main className="container mx-auto px-4 py-12">
                <div className="mb-8">
                    <h1 className="text-4xl font-bold mb-2">Our Inventory</h1>
                    <p className="text-muted-foreground">Find the perfect vehicle for your lifestyle.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-8 items-start">
                    {/* Sidebar Filters */}
                    <div className="hidden md:block">
                        <InventoryFilters />
                    </div>

                    {/* Mobile Filters (You might want a collapsible Sheet here later, but stacking is okay for now) */}
                    <div className="md:hidden">
                        {/* Simplified mobile view or just show Filters */}
                        <InventoryFilters />
                    </div>

                    {/* Results Grid */}
                    <div className="md:col-span-3">
                        <InventoryGrid vehicles={vehicles || []} />
                    </div>
                </div>
            </main>
        </div>
    )
}
