import { Header } from '@/components/Header'
import { Button } from '@/components/ui/button'
import { Phone, Mail, MapPin, Clock, Facebook, Instagram } from 'lucide-react'
import { ContactForm } from '@/components/ContactForm'

export default function Contact() {
    return (
        <div className="min-h-screen bg-background text-foreground">
            <Header />

            <main>
                {/* Header */}
                <div className="bg-zinc-950 py-24 px-4 text-center border-b border-white/5">
                    <h1 className="text-5xl font-black mb-6 text-white">Get in Touch</h1>
                    <p className="text-xl text-zinc-400">We're here to help you find your perfect drive.</p>
                </div>

                <div className="container mx-auto px-4 py-16">
                    <div className="grid md:grid-cols-2 gap-16">

                        {/* Contact Details */}
                        <div className="space-y-12">
                            <div>
                                <h3 className="text-2xl font-bold mb-8 border-b border-white/10 pb-4">Contact Information</h3>
                                <div className="space-y-8">
                                    <div className="flex items-start">
                                        <div className="bg-primary/20 p-4 rounded-full mr-6">
                                            <Phone className="h-6 w-6 text-primary" />
                                        </div>
                                        <div>
                                            <p className="text-sm text-muted-foreground uppercase tracking-wider mb-1">Call/WhatsApp</p>
                                            <p className="text-xl font-bold text-white">+1 (868) 123-4567</p>
                                            <p className="text-lg text-zinc-400">+1 (868) 765-4321</p>
                                        </div>
                                    </div>

                                    <div className="flex items-start">
                                        <div className="bg-primary/20 p-4 rounded-full mr-6">
                                            <Mail className="h-6 w-6 text-primary" />
                                        </div>
                                        <div>
                                            <p className="text-sm text-muted-foreground uppercase tracking-wider mb-1">Email Us</p>
                                            <p className="text-xl font-medium text-white">sales@rollon-rolloff.com</p>
                                        </div>
                                    </div>

                                    <div className="flex items-start">
                                        <div className="bg-primary/20 p-4 rounded-full mr-6">
                                            <MapPin className="h-6 w-6 text-primary" />
                                        </div>
                                        <div>
                                            <p className="text-sm text-muted-foreground uppercase tracking-wider mb-1">Visit Our Showroom</p>
                                            <p className="text-lg text-white">123 Auto Avenue, Chaguanas</p>
                                            <p className="text-zinc-500 mt-1">Trinidad & Tobago</p>
                                        </div>
                                    </div>

                                    <div className="flex items-start">
                                        <div className="bg-primary/20 p-4 rounded-full mr-6">
                                            <Clock className="h-6 w-6 text-primary" />
                                        </div>
                                        <div>
                                            <p className="text-sm text-muted-foreground uppercase tracking-wider mb-1">Opening Hours</p>
                                            <p className="text-white"><span className="w-24 inline-block text-zinc-500">Mon - Fri:</span> 8:00 AM - 5:00 PM</p>
                                            <p className="text-white"><span className="w-24 inline-block text-zinc-500">Sat:</span> 9:00 AM - 2:00 PM</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Form */}
                        {/* Form */}
                        <div className="bg-card p-8 md:p-10 rounded-3xl border border-white/10 shadow-2xl">
                            <h3 className="text-2xl font-bold mb-6">Send a Message</h3>
                            <ContactForm />
                        </div>
                    </div>
                </div>
            </main>
        </div>
    )
}
