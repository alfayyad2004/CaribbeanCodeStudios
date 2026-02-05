"use client"

import { Share2 } from 'lucide-react'
import { Button } from '@/components/ui/button'

export function ShareButton({ title, text, url }: { title: string, text: string, url: string }) {
    const handleShare = async () => {
        if (navigator.share) {
            try {
                await navigator.share({
                    title,
                    text,
                    url
                })
            } catch (error) {
                console.log('Error sharing:', error)
            }
        } else {
            // Fallback: Copy to clipboard
            navigator.clipboard.writeText(url)
            alert('Link copied to clipboard!')
        }
    }

    return (
        <Button onClick={handleShare} variant="outline" size="icon">
            <Share2 className="h-4 w-4" />
        </Button>
    )
}
