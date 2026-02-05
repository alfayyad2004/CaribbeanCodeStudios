"use client"

import { useState } from "react"
import { createClient } from "@/utils/supabase/client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Loader2 } from "lucide-react"

export function ContactForm() {
    const [loading, setLoading] = useState(false)
    const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle')
    const supabase = createClient()

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setLoading(true)
        setStatus('idle')

        const formData = new FormData(e.currentTarget)
        const data = {
            first_name: formData.get('first_name') as string,
            last_name: formData.get('last_name') as string,
            email: formData.get('email') as string,
            message: formData.get('message') as string,
        }

        try {
            const { error } = await supabase.from('contact_messages').insert([data])
            if (error) throw error
            setStatus('success')
                ; (e.target as HTMLFormElement).reset()
        } catch (error) {
            console.error(error)
            setStatus('error')
        } finally {
            setLoading(false)
        }
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                    <label className="text-sm font-medium text-muted-foreground">First Name</label>
                    <Input name="first_name" required className="bg-background border-input" />
                </div>
                <div className="space-y-2">
                    <label className="text-sm font-medium text-muted-foreground">Last Name</label>
                    <Input name="last_name" required className="bg-background border-input" />
                </div>
            </div>
            <div className="space-y-2">
                <label className="text-sm font-medium text-muted-foreground">Email Address</label>
                <Input type="email" name="email" required className="bg-background border-input" />
            </div>
            <div className="space-y-2">
                <label className="text-sm font-medium text-muted-foreground">Message</label>
                <Textarea name="message" required className="bg-background border-input min-h-[150px]" />
            </div>

            <Button disabled={loading} className="w-full h-12 text-base font-semibold bg-white text-black hover:bg-zinc-200">
                {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {status === 'success' ? 'Message Sent!' : 'Send Message'}
            </Button>

            {status === 'error' && (
                <p className="text-red-500 text-sm text-center">Failed to send message. Please try again.</p>
            )}
        </form>
    )
}
