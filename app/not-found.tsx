"use client";

import Link from "next/link";
import { Home, ArrowLeft, Search, Compass } from "lucide-react";

export default function NotFound() {
    return (
        <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-background px-6 py-12 text-foreground">
            {/* Background decoration */}
            <div className="pointer-events-none absolute inset-0 overflow-hidden">
                <div className="absolute -left-32 -top-32 h-80 w-80 rounded-full bg-primary/10 blur-3xl" />
                <div className="absolute -bottom-32 -right-32 h-80 w-80 rounded-full bg-primary/10 blur-3xl" />
            </div>

            <div className="relative mx-auto w-full max-w-lg text-center">
                {/* Icon */}
                <div className="mx-auto mb-8 flex h-20 w-20 items-center justify-center rounded-3xl border border-border bg-muted/50 shadow-sm">
                    <Compass className="h-10 w-10 text-primary" />
                </div>

                {/* Error code */}
                <p className="mb-3 text-sm font-semibold uppercase tracking-[0.3em] text-primary">
                    Error 404
                </p>

                <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">
                    Page not found
                </h1>

                <p className="mx-auto mt-5 max-w-md text-base leading-7 text-muted-foreground sm:text-lg">
                    Oops! The page you're looking for doesn't exist, may have been moved,
                    or the link might be incorrect.
                </p>

                {/* Actions */}
                <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
                    <Link
                        href="/"
                        className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3 font-medium text-primary-foreground transition-opacity hover:opacity-90"
                    >
                        <Home className="h-4 w-4" />
                        Back to Home
                    </Link>

                    <button
                        onClick={() => window.history.back()}
                        className="inline-flex items-center justify-center gap-2 rounded-xl border border-border bg-background px-6 py-3 font-medium transition-colors hover:bg-muted"
                    >
                        <ArrowLeft className="h-4 w-4" />
                        Go Back
                    </button>
                </div>

                {/* Helpful link */}
                <div className="mt-12 border-t border-border pt-6">
                    <p className="text-sm text-muted-foreground">
                        Think this is a mistake? Try returning to the homepage or checking
                        the URL.
                    </p>
                </div>
            </div>
        </main>
    );
}