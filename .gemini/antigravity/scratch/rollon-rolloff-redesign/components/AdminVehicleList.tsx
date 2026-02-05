"use client"

import { useState } from 'react'
import { createClient } from '@/utils/supabase/client'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Loader2, Trash2, Edit, AlertCircle } from 'lucide-react'

interface Vehicle {
    id: string
    make: string
    model: string
    year: number
    price_ttd: number
    status: string
}

export function AdminVehicleList({ initialVehicles }: { initialVehicles: Vehicle[] }) {
    const [vehicles, setVehicles] = useState<Vehicle[]>(initialVehicles)
    const [loadingId, setLoadingId] = useState<string | null>(null)
    const supabase = createClient()
    const router = useRouter()

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure you want to delete this vehicle? This cannot be undone.')) return
        setLoadingId(id)

        const { error } = await supabase.from('vehicles').delete().eq('id', id)

        if (error) {
            alert('Error deleting vehicle')
            console.error(error)
        } else {
            setVehicles(vehicles.filter(v => v.id !== id))
            router.refresh()
        }
        setLoadingId(null)
    }

    const handleStatusChange = async (id: string, newStatus: string) => {
        // Optimistic update
        setVehicles(vehicles.map(v => v.id === id ? { ...v, status: newStatus } : v))

        const { error } = await supabase.from('vehicles').update({ status: newStatus }).eq('id', id)

        if (error) {
            alert('Error updating status')
            // Revert on error - simplified for now, usually would re-fetch
            const { data } = await supabase.from('vehicles').select('*').eq('id', id).single()
            if (data) {
                setVehicles(vehicles.map(v => v.id === id ? data : v))
            }
        } else {
            router.refresh()
        }
    }

    if (vehicles.length === 0) {
        return (
            <div className="text-center p-12 bg-zinc-900 rounded-lg border border-zinc-800 text-zinc-500">
                <AlertCircle className="mx-auto h-12 w-12 mb-4 opacity-50" />
                <h3 className="text-lg font-medium mb-2">No Vehicles Found</h3>
                <p>Get started by adding your first vehicle to the inventory.</p>
            </div>
        )
    }

    return (
        <div className="bg-zinc-900 rounded-lg border border-zinc-800 overflow-hidden">
            <div className="overflow-x-auto">
                <table className="w-full text-left">
                    <thead className="bg-zinc-950 text-zinc-400 border-b border-zinc-800">
                        <tr>
                            <th className="p-4 whitespace-nowrap">Vehicle</th>
                            <th className="p-4 whitespace-nowrap">Status</th>
                            <th className="p-4 whitespace-nowrap">Price (TTD)</th>
                            <th className="p-4 whitespace-nowrap text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-zinc-800">
                        {vehicles.map((vehicle) => (
                            <tr key={vehicle.id} className="hover:bg-zinc-800/50 transition-colors">
                                <td className="p-4">
                                    <div className="font-bold text-white">{vehicle.year} {vehicle.make} {vehicle.model}</div>
                                    <div className="text-xs text-zinc-500 font-mono mt-1">{vehicle.id.slice(0, 8)}...</div>
                                </td>
                                <td className="p-4">
                                    <select
                                        value={vehicle.status}
                                        onChange={(e) => handleStatusChange(vehicle.id, e.target.value)}
                                        className={`bg-transparent border rounded px-2 py-1 text-xs font-semibold focus:outline-none focus:ring-1 focus:ring-white/20 cursor-pointer
                                            ${vehicle.status === 'In Stock' ? 'bg-green-950 text-green-400 border-green-900' :
                                                vehicle.status === 'Sold' ? 'bg-red-950 text-red-400 border-red-900' :
                                                    'bg-yellow-950 text-yellow-400 border-yellow-900'}`}
                                    >
                                        <option value="In Stock" className="bg-zinc-900">In Stock</option>
                                        <option value="In Transit" className="bg-zinc-900">In Transit</option>
                                        <option value="Sold" className="bg-zinc-900">Sold</option>
                                    </select>
                                </td>
                                <td className="p-4 font-mono text-zinc-300">
                                    ${vehicle.price_ttd?.toLocaleString()}
                                </td>
                                <td className="p-4 text-right whitespace-nowrap">
                                    <div className="flex justify-end items-center space-x-2">
                                        <Link href={`/admin/edit/${vehicle.id}`}>
                                            <Button size="icon" variant="ghost" className="h-8 w-8 hover:text-white hover:bg-zinc-700">
                                                <Edit className="h-4 w-4" />
                                            </Button>
                                        </Link>
                                        <Button
                                            size="icon"
                                            variant="destructive"
                                            className="h-8 w-8 bg-red-900/20 text-red-500 hover:bg-red-900/50 hover:text-red-400 border border-red-900/50"
                                            onClick={() => handleDelete(vehicle.id)}
                                            disabled={loadingId === vehicle.id}
                                        >
                                            {loadingId === vehicle.id ? (
                                                <Loader2 className="h-4 w-4 animate-spin" />
                                            ) : (
                                                <Trash2 className="h-4 w-4" />
                                            )}
                                        </Button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
