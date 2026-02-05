"use client";
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';

export function LoanCalculator({ initialPrice = 100000 }: { initialPrice?: number }) {
    const [price, setPrice] = useState(initialPrice);
    const [downPayment, setDownPayment] = useState(Math.round(initialPrice * 0.1));
    const [rate, setRate] = useState(7.5);
    const [term, setTerm] = useState(60);
    const [monthlyPayment, setMonthlyPayment] = useState(0);

    useEffect(() => {
        // Principal
        const p = price - downPayment;
        // Monthly Rate
        const r = rate / 100 / 12;
        // Number of Payments
        const n = term;

        if (p <= 0) {
            setMonthlyPayment(0);
            return;
        }

        // Formula: M = P [ i(1 + i)^n ] / [ (1 + i)^n – 1 ]
        const m = p * (r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);

        if (isFinite(m)) {
            setMonthlyPayment(m);
        } else {
            setMonthlyPayment(0);
        }

    }, [price, downPayment, rate, term]);

    return (
        <div className="bg-card p-6 rounded-xl border border-border shadow-lg">
            <h3 className="text-xl font-bold mb-6 text-foreground">Loan Calculator</h3>

            <div className="space-y-4">
                <div>
                    <label className="block text-sm font-medium mb-1 text-muted-foreground">Vehicle Price (TTD)</label>
                    <input
                        type="number"
                        value={price}
                        onChange={(e) => setPrice(Number(e.target.value))}
                        className="w-full px-3 py-2 bg-background border border-input rounded-md focus:ring-1 focus:ring-primary outline-none"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium mb-1 text-muted-foreground">Down Payment (TTD)</label>
                    <input
                        type="number"
                        value={downPayment}
                        onChange={(e) => setDownPayment(Number(e.target.value))}
                        className="w-full px-3 py-2 bg-background border border-input rounded-md focus:ring-1 focus:ring-primary outline-none"
                    />
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium mb-1 text-muted-foreground">Interest Rate (%)</label>
                        <input
                            type="number"
                            step="0.1"
                            value={rate}
                            onChange={(e) => setRate(Number(e.target.value))}
                            className="w-full px-3 py-2 bg-background border border-input rounded-md focus:ring-1 focus:ring-primary outline-none"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1 text-muted-foreground">Term (Months)</label>
                        <select
                            value={term}
                            onChange={(e) => setTerm(Number(e.target.value))}
                            className="w-full px-3 py-2 bg-background border border-input rounded-md focus:ring-1 focus:ring-primary outline-none"
                        >
                            <option value="36">36 Months</option>
                            <option value="48">48 Months</option>
                            <option value="60">60 Months</option>
                            <option value="72">72 Months</option>
                            <option value="84">84 Months</option>
                        </select>
                    </div>
                </div>

                <div className="pt-4 mt-4 border-t border-border">
                    <div className="flex justify-between items-center">
                        <span className="text-muted-foreground">Estimated Monthly:</span>
                        <span className="text-2xl font-bold text-primary">${Math.round(monthlyPayment).toLocaleString()}</span>
                    </div>
                    <p className="text-xs text-muted-foreground mt-2 text-center">
                        *Estimate only. Subject to bank approval.
                    </p>
                </div>

                <Button className="w-full bg-green-600 hover:bg-green-700 text-white">
                    Apply for Financing
                </Button>
            </div>
        </div>
    )
}
