"use client"

import { useRouter, useSearchParams } from 'next/navigation'
import { useState, useEffect } from 'react'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
// import { Slider } from "@/components/ui/slider" // Not using slider yet
// Actually, simple inputs are easier to verify quickly without installing shadcn slider primitive if not present.
// I'll use inputs for Min/Max Price.

export function InventoryFilters() {
    const router = useRouter()
    const searchParams = useSearchParams()

    // State for filters
    const [search, setSearch] = useState(searchParams.get('q') || '')
    const [minPrice, setMinPrice] = useState(searchParams.get('minPrice') || '')
    const [maxPrice, setMaxPrice] = useState(searchParams.get('maxPrice') || '')
    const [make, setMake] = useState(searchParams.get('make') || '')

    // Debounce search/filter application or Apply Button
    const applyFilters = () => {
        const params = new URLSearchParams()
        if (search) params.set('q', search)
        if (minPrice) params.set('minPrice', minPrice)
        if (maxPrice) params.set('maxPrice', maxPrice)
        if (make) params.set('make', make)

        router.push(`/inventory?${params.toString()}`)
    }

    const clearFilters = () => {
        setSearch('')
        setMinPrice('')
        setMaxPrice('')
        setMake('')
        router.push('/inventory')
    }

    return (
        <div className="space-y-6 bg-card p-6 rounded-lg border border-border h-fit sticky top-24">
            <div>
                <h3 className="text-lg font-semibold mb-4">Filter Vehicles</h3>
                <div className="space-y-4">
                    <div className="space-y-2">
                        <Label>Search</Label>
                        <Input
                            placeholder="e.g. Corolla, SUV..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </div>

                    <div className="space-y-2">
                        <Label>Make</Label>
                        <select
                            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                            value={make}
                            onChange={(e) => setMake(e.target.value)}
                        >
                            <option value="">All Makes</option>
                            <option value="Toyota">Toyota</option>
                            <option value="Honda">Honda</option>
                            <option value="Nissan">Nissan</option>
                            <option value="Mazda">Mazda</option>
                            <option value="Suzuki">Suzuki</option>
                            {/* Add more as needed or fetch dynamically */}
                        </select>
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                        <div className="space-y-2">
                            <Label>Min Price</Label>
                            <Input
                                type="number"
                                placeholder="0"
                                value={minPrice}
                                onChange={(e) => setMinPrice(e.target.value)}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label>Max Price</Label>
                            <Input
                                type="number"
                                placeholder="Max"
                                value={maxPrice}
                                onChange={(e) => setMaxPrice(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="pt-4 space-y-2">
                        <Button onClick={applyFilters} className="w-full">Apply Filters</Button>
                        <Button onClick={clearFilters} variant="outline" className="w-full">Clear</Button>
                    </div>
                </div>
            </div>
        </div>
    )
}
