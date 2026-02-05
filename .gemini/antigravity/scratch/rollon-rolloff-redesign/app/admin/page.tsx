import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'
import { AdminVehicleList } from '@/components/AdminVehicleList'

export default async function AdminPage() {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
        redirect('/login')
    }

    const { data: vehicles } = await supabase
        .from('vehicles')
        .select('*')
        .order('created_at', { ascending: false })

    return (
        <div className="min-h-screen bg-black text-white p-8">
            <div className="max-w-7xl mx-auto">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-bold">Vehicle Management</h1>
                    <Link href="/admin/add">
                        <Button variant="premium">
                            <Plus className="mr-2 h-4 w-4" /> Add New Vehicle
                        </Button>
                    </Link>
                </div>

                <AdminVehicleList initialVehicles={vehicles || []} />
            </div>
        </div>
    )
}
