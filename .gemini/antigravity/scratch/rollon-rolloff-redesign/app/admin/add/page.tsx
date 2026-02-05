import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'
import { AdminVehicleForm } from '@/components/AdminVehicleForm'

export default async function AddVehiclePage() {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
        redirect('/login')
    }

    return (
        <div className="min-h-screen bg-black text-white p-8">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-3xl font-bold mb-8">Add New Vehicle</h1>
                <AdminVehicleForm />
            </div>
        </div>
    )
}
