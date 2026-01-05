'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { authClient } from '@/lib/auth-client';
import { Loader2, LogIn, LogOut, Menu, X, LayoutDashboard, ListTodo } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import { cn } from '@/lib/utils';

export function Navbar() {
    const { data: session, isPending: loading } = authClient.useSession();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const profileRef = useRef<HTMLDivElement>(null);
    const router = useRouter();
    const pathname = usePathname();

    // Close profile dropdown when clicking outside
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
                setIsProfileOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    // Close mobile menu on route change
    useEffect(() => {
        // eslint-disable-next-line
        setIsMobileMenuOpen(false);
    }, [pathname]);

    const handleSignOut = async () => {
        try {
            await authClient.signOut();
            router.push('/');
        } catch (error) {
            console.error('Error signing out:', error);
        }
    };

    const navLinks = [
        { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
        // Add more public/protected links here if needed
    ];

    return (
        <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-md supports-[backdrop-filter]:bg-background/60">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex h-16 items-center justify-between">

                    {/* Logo & Desktop Nav */}
                    <div className="flex items-center gap-8">
                        <Link href="/" className="flex items-center gap-2 group">
                            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-lg shadow-primary/20 group-hover:scale-105 transition-transform">
                                <ListTodo className="h-5 w-5" />
                            </div>
                            <span className="text-lg font-bold bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/70">
                                Todo App
                            </span>
                        </Link>

                        {/* Desktop Navigation */}
                        <nav className="hidden md:flex items-center gap-6">
                            {session && navLinks.map((link) => (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    className={cn(
                                        "text-sm font-medium transition-colors hover:text-primary",
                                        pathname === link.href ? "text-primary" : "text-muted-foreground"
                                    )}
                                >
                                    {link.label}
                                </Link>
                            ))}
                        </nav>
                    </div>

                    {/* Right Side Actions */}
                    <div className="flex items-center gap-4">
                        {loading ? (
                            <Button variant="ghost" size="icon" disabled>
                                <Loader2 className="h-5 w-5 animate-spin" />
                            </Button>
                        ) : session ? (
                            // Authenticated State
                            <div className="relative" ref={profileRef}>
                                <button
                                    onClick={() => setIsProfileOpen(!isProfileOpen)}
                                    className="flex items-center gap-2 rounded-full border border-border p-1 pl-3 transition-colors hover:bg-muted/50 focus:outline-none focus:ring-2 focus:ring-primary/20"
                                >
                                    <span className="text-sm font-medium hidden sm:inline-block">
                                        {session.user.name}
                                    </span>
                                    <Avatar className="h-8 w-8">
                                        <AvatarImage src={session.user.image || undefined} alt={session.user.name} />
                                        <AvatarFallback>{session.user.name.charAt(0).toUpperCase()}</AvatarFallback>
                                    </Avatar>
                                </button>

                                {/* Profile Dropdown */}
                                {isProfileOpen && (
                                    <div className="absolute right-0 mt-2 w-56 origin-top-right rounded-xl border bg-card p-2 shadow-lg ring-1 ring-black/5 focus:outline-none animate-in fade-in zoom-in-95 duration-200">
                                        <div className="px-2 py-1.5 mb-1 border-b">
                                            <p className="text-sm font-medium leading-none">{session.user.name}</p>
                                            <p className="text-xs text-muted-foreground mt-1 truncate">{session.user.email}</p>
                                        </div>

                                        <Link
                                            href="/dashboard"
                                            className="flex items-center gap-2 w-full rounded-md px-2 py-2 text-sm text-foreground hover:bg-muted transition-colors"
                                            onClick={() => setIsProfileOpen(false)}
                                        >
                                            <LayoutDashboard className="h-4 w-4" />
                                            Dashboard
                                        </Link>

                                        {/* Placeholder for future profile/settings page */}
                                        {/* <Link 
                      href="/settings" 
                      className="flex items-center gap-2 w-full rounded-md px-2 py-2 text-sm text-foreground hover:bg-muted transition-colors"
                    >
                      <Settings className="h-4 w-4" />
                      Settings
                    </Link> */}

                                        <button
                                            onClick={handleSignOut}
                                            className="flex items-center gap-2 w-full rounded-md px-2 py-2 text-sm text-destructive hover:bg-destructive/10 transition-colors mt-1"
                                        >
                                            <LogOut className="h-4 w-4" />
                                            Sign Out
                                        </button>
                                    </div>
                                )}
                            </div>
                        ) : (
                            // Unauthenticated State
                            <div className="hidden md:flex items-center gap-2">
                                <Link href="/sign-in">
                                    <Button variant="ghost" size="sm" className="gap-2">
                                        <LogIn className="h-4 w-4" />
                                        Sign In
                                    </Button>
                                </Link>
                                <Link href="/sign-up">
                                    <Button size="sm">Get Started</Button>
                                </Link>
                            </div>
                        )}

                        {/* Mobile Menu Button */}
                        <button
                            className="md:hidden p-2 rounded-md hover:bg-accent transition-colors"
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        >
                            {isMobileMenuOpen ? (
                                <X className="h-6 w-6" />
                            ) : (
                                <Menu className="h-6 w-6" />
                            )}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            {isMobileMenuOpen && (
                <div className="md:hidden border-t bg-background/95 backdrop-blur-md">
                    <div className="space-y-1 px-4 pb-3 pt-2">
                        {session ? (
                            <>
                                <div className="flex items-center gap-3 px-3 py-3 mb-2 border-b">
                                    <Avatar className="h-10 w-10">
                                        <AvatarImage src={session.user.image || undefined} alt={session.user.name} />
                                        <AvatarFallback>{session.user.name.charAt(0).toUpperCase()}</AvatarFallback>
                                    </Avatar>
                                    <div>
                                        <p className="text-sm font-medium">{session.user.name}</p>
                                        <p className="text-xs text-muted-foreground">{session.user.email}</p>
                                    </div>
                                </div>
                                {navLinks.map((link) => (
                                    <Link
                                        key={link.href}
                                        href={link.href}
                                        className="flex items-center gap-2 block rounded-md px-3 py-2 text-base font-medium hover:bg-muted transition-colors"
                                    >
                                        <link.icon className="h-4 w-4" />
                                        {link.label}
                                    </Link>
                                ))}
                                <button
                                    onClick={handleSignOut}
                                    className="flex items-center gap-2 w-full text-left rounded-md px-3 py-2 text-base font-medium text-destructive hover:bg-destructive/10 transition-colors"
                                >
                                    <LogOut className="h-4 w-4" />
                                    Sign Out
                                </button>
                            </>
                        ) : (
                            <div className="flex flex-col gap-2 p-2">
                                <Link href="/sign-in">
                                    <Button variant="ghost" className="w-full justify-start gap-2">
                                        <LogIn className="h-4 w-4" />
                                        Sign In
                                    </Button>
                                </Link>
                                <Link href="/sign-up">
                                    <Button className="w-full">Get Started</Button>
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </header>
    );
}
