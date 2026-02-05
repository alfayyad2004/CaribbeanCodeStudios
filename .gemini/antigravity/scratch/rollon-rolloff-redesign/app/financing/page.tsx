import { Header } from '@/components/Header'
import { LoanCalculator } from '@/components/LoanCalculator'
import { CheckCircle2, FileText, CreditCard } from 'lucide-react'

export default function Financing() {
    return (
        <div className="min-h-screen bg-background text-foreground">
            <Header />

            <section className="relative py-20 bg-zinc-950">
                <div className="container mx-auto px-4 text-center">
                    <h1 className="text-5xl font-bold mb-6 text-white text-transparent bg-clip-text bg-gradient-to-r from-white to-zinc-500">
                        Seamless Financing
                    </h1>
                    <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-12">
                        We bridge the gap between you and your dream car with tailored financial solutions.
                    </p>
                </div>
            </section>

            <main className="container mx-auto px-4 pb-20">
                <div className="grid lg:grid-cols-2 gap-12 items-start">
                    {/* Left Column: Calculator */}
                    <div className="sticky top-24">
                        <LoanCalculator />
                    </div>

                    {/* Right Column: Requirements & Info */}
                    <div className="space-y-12">
                        <div>
                            <h2 className="text-3xl font-bold mb-8">Requirements</h2>
                            <div className="space-y-4">
                                {[
                                    "Two forms of valid ID (DP/Passport/ID Card)",
                                    "Job Letter (Not older than 3 months)",
                                    "Recent Payslip (Last month)",
                                    "Proof of Address (Utility Bill < 3 months)",
                                    "Bank Statements (Last 3-6 months)"
                                ].map((req, i) => (
                                    <div key={i} className="flex items-center p-4 bg-card border border-white/5 rounded-lg">
                                        <CheckCircle2 className="h-6 w-6 text-green-500 mr-4 flex-shrink-0" />
                                        <span className="text-zinc-300 font-medium">{req}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="p-8 rounded-2xl bg-gradient-to-br from-zinc-900 to-black border border-white/10">
                            <h3 className="text-xl font-bold mb-4 flex items-center">
                                <FileText className="mr-2 h-5 w-5 text-primary" />
                                The Process
                            </h3>
                            <ol className="relative border-l border-zinc-800 ml-2 space-y-8">
                                <li className="ml-6">
                                    <span className="absolute -left-3 flex items-center justify-center w-6 h-6 bg-primary rounded-full ring-4 ring-black">
                                        1
                                    </span>
                                    <h4 className="font-semibold text-white">Consultation</h4>
                                    <p className="text-sm text-muted-foreground mt-1">Visit us to choose your vehicle and discuss terms.</p>
                                </li>
                                <li className="ml-6">
                                    <span className="absolute -left-3 flex items-center justify-center w-6 h-6 bg-zinc-800 rounded-full ring-4 ring-black text-xs">
                                        2
                                    </span>
                                    <h4 className="font-semibold text-white">Application</h4>
                                    <p className="text-sm text-muted-foreground mt-1">Submit your documents to our financial partners.</p>
                                </li>
                                <li className="ml-6">
                                    <span className="absolute -left-3 flex items-center justify-center w-6 h-6 bg-zinc-800 rounded-full ring-4 ring-black text-xs">
                                        3
                                    </span>
                                    <h4 className="font-semibold text-white">Approval & Delivery</h4>
                                    <p className="text-sm text-muted-foreground mt-1">Once approved, drive away in your new vehicle.</p>
                                </li>
                            </ol>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    )
}
