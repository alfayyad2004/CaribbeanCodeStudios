"use client"

import { useState } from "react"
import { createClient } from "@/utils/supabase/client"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { X, Upload, Loader2 } from "lucide-react"
import Image from "next/image"

interface VehicleFormProps {
    vehicle?: any // Use proper type if available, but 'any' is fine for rapid dev here
    isEditing?: boolean
}

export function AdminVehicleForm({ vehicle, isEditing = false }: VehicleFormProps) {
    const router = useRouter()
    const supabase = createClient()
    const [loading, setLoading] = useState(false)
    const [images, setImages] = useState<string[]>(vehicle?.images || [])
    const [formData, setFormData] = useState({
        make: vehicle?.make || '',
        model: vehicle?.model || '',
        year: vehicle?.year || new Date().getFullYear(),
        price_ttd: vehicle?.price_ttd || '',
        mileage: vehicle?.mileage || '',
        condition: vehicle?.condition || 'RORO',
        status: vehicle?.status || 'In Stock',
        specs: vehicle?.specs ? JSON.stringify(vehicle.specs, null, 2) : '{\n  "fuel": "Petrol",\n  "transmission": "Automatic"\n}',
    })

    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files || e.target.files.length === 0) return
        setLoading(true)

        const files = Array.from(e.target.files)
        const newImages = []

        for (const file of files) {
            const fileExt = file.name.split('.').pop()
            const fileName = `${Math.random()}.${fileExt}`
            const filePath = `${fileName}`

            const { error: uploadError } = await supabase.storage
                .from('vehicle-images')
                .upload(filePath, file)

            if (uploadError) {
                console.error('Error uploading image:', uploadError)
                continue
            }

            const { data: { publicUrl } } = supabase.storage
                .from('vehicle-images')
                .getPublicUrl(filePath)

            newImages.push(publicUrl)
        }

        setImages([...images, ...newImages])
        setLoading(false)
    }

    const removeImage = (index: number) => {
        setImages(images.filter((_, i) => i !== index))
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)

        try {
            const payload = {
                ...formData,
                images,
                specs: JSON.parse(formData.specs), // Validate JSON
                mileage: Number(formData.mileage),
                price_ttd: Number(formData.price_ttd),
                year: Number(formData.year)
            }

            if (isEditing && vehicle?.id) {
                const { error } = await supabase
                    .from('vehicles')
                    .update(payload)
                    .eq('id', vehicle.id)

                if (error) throw error
            } else {
                const { error } = await supabase
                    .from('vehicles')
                    .insert([payload])

                if (error) throw error
            }

            router.push('/admin')
            router.refresh()
        } catch (error) {
            alert('Error saving vehicle. Please check your inputs (especially JSON specs).')
            console.error(error)
        } finally {
            setLoading(false)
        }
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-8 max-w-4xl mx-auto bg-card p-8 rounded-xl border border-border">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                    <Label htmlFor="make">Make</Label>
                    <Input
                        id="make"
                        value={formData.make}
                        onChange={e => setFormData({ ...formData, make: e.target.value })}
                        required
                        placeholder="Toyota"
                    />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="model">Model</Label>
                    <Input
                        id="model"
                        value={formData.model}
                        onChange={e => setFormData({ ...formData, model: e.target.value })}
                        required
                        placeholder="Corolla"
                    />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="year">Year</Label>
                    <Input
                        id="year"
                        type="number"
                        value={formData.year}
                        onChange={e => setFormData({ ...formData, year: e.target.value })}
                        required
                    />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="price">Price (TTD)</Label>
                    <Input
                        id="price"
                        type="number"
                        value={formData.price_ttd}
                        onChange={e => setFormData({ ...formData, price_ttd: e.target.value })}
                        required
                    />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="condition">Condition</Label>
                    <select
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                        value={formData.condition}
                        onChange={e => setFormData({ ...formData, condition: e.target.value })}
                    >
                        <option value="RORO">RORO</option>
                        <option value="Local Used">Local Used</option>
                    </select>
                </div>
                <div className="space-y-2">
                    <Label htmlFor="status">Status</Label>
                    <select
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                        value={formData.status}
                        onChange={e => setFormData({ ...formData, status: e.target.value })}
                    >
                        <option value="In Stock">In Stock</option>
                        <option value="In Transit">In Transit</option>
                        <option value="Sold">Sold</option>
                    </select>
                </div>
                <div className="space-y-2">
                    <Label htmlFor="mileage">Mileage</Label>
                    <Input
                        id="mileage"
                        type="number"
                        value={formData.mileage}
                        onChange={e => setFormData({ ...formData, mileage: e.target.value })}
                        required
                    />
                </div>
            </div>

            <div className="space-y-4">
                <Label>Features & Specifications</Label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {['Air Conditioning', 'Power Windows', 'Power Locks', 'Power Steering', 'Reverse Camera', 'Bluetooth', 'Leather Seats', 'Sunroof', 'Push to Start', 'Alloy Wheels', 'Fog Lights', 'Turbo'].map((feature) => {
                        const currentSpecs = formData.specs ? JSON.parse(formData.specs) : {}
                        const isChecked = !!currentSpecs[feature]

                        return (
                            <label key={feature} className="flex items-center space-x-2 border p-3 rounded-lg cursor-pointer hover:bg-muted transition-colors">
                                <input
                                    type="checkbox"
                                    checked={isChecked}
                                    onChange={(e) => {
                                        const newSpecs = { ...currentSpecs }
                                        if (e.target.checked) {
                                            newSpecs[feature] = "Yes" // Or true
                                        } else {
                                            delete newSpecs[feature]
                                        }
                                        setFormData({ ...formData, specs: JSON.stringify(newSpecs, null, 2) })
                                    }}
                                    className="w-4 h-4 rounded border-gray-300 text-primary focus:ring-primary"
                                />
                                <span className="text-sm font-medium">{feature}</span>
                            </label>
                        )
                    })}
                </div>

                <div className="space-y-2 mt-4">
                    <Label>Additional Notes (Description)</Label>
                    <Textarea
                        placeholder="Enter any additional details, description or custom specs here..."
                        value={formData.specs ? (JSON.parse(formData.specs)['description'] || '') : ''}
                        onChange={(e) => {
                            const currentSpecs = formData.specs ? JSON.parse(formData.specs) : {}
                            const newSpecs = { ...currentSpecs, description: e.target.value }
                            setFormData({ ...formData, specs: JSON.stringify(newSpecs, null, 2) })
                        }}
                        className="h-24"
                    />
                </div>
                {/* Hidden input to maintain compat if needed, or just remove raw text area */}
            </div>

            <div className="space-y-4">
                <Label>Images</Label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                    {images.map((img, idx) => (
                        <div key={idx} className="relative aspect-video rounded-md overflow-hidden border border-border group">
                            <Image src={img} alt="Vehicle" fill className="object-cover" />
                            <button
                                type="button"
                                onClick={() => removeImage(idx)}
                                className="absolute top-1 right-1 bg-red-600 p-1 rounded-full text-white opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                                <X className="h-4 w-4" />
                            </button>
                        </div>
                    ))}
                    <label className="flex flex-col items-center justify-center border-2 border-dashed border-border rounded-md aspect-video cursor-pointer hover:border-primary/50 transition-colors">
                        <Upload className="h-6 w-6 text-muted-foreground mb-2" />
                        <span className="text-xs text-muted-foreground">Upload Images</span>
                        <input type="file" multiple accept="image/*" className="hidden" onChange={handleImageUpload} />
                    </label>
                </div>
            </div>

            <div className="flex justify-end space-x-4">
                <Button variant="outline" type="button" onClick={() => router.back()}>Cancel</Button>
                <Button type="submit" disabled={loading} className="bg-primary text-primary-foreground hover:bg-primary/90">
                    {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    {isEditing ? 'Update Vehicle' : 'Create Vehicle'}
                </Button>
            </div>
        </form>
    )
}
