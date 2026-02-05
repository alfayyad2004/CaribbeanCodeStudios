import { VehicleCard } from './VehicleCard'

export function InventoryGrid({ vehicles }: { vehicles: any[] }) {
    if (!vehicles || vehicles.length === 0) {
        return (
            <div className="col-span-full text-center py-20 text-muted-foreground">
                <p>No vehicles found directly. Check back soon!</p>
            </div>
        )
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {vehicles.map((vehicle) => (
                <VehicleCard key={vehicle.id} vehicle={vehicle} />
            ))}
        </div>
    )
}
