import { createClient } from '@/utils/supabase/server'
import { redirect, notFound } from 'next/navigation'
import { AdminVehicleForm } from '@/components/AdminVehicleForm'

export default async function EditVehiclePage({ params }: { params: { id: string } }) {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
        redirect('/login')
    }

    const { data: vehicle } = await supabase
        .from('vehicles')
        .select('*')
        .eq('id', params.id)
        .single()

    if (!vehicle) {
        notFound()
    }

    return (
        <div className="min-h-screen bg-black text-white p-8">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-3xl font-bold mb-8">Edit Vehicle</h1>
                <AdminVehicleForm vehicle={vehicle} isEditing />
            </div>
        </div>
    )
}
