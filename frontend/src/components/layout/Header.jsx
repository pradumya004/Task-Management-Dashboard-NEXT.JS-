'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const Header = () => {
    const pathname = usePathname();

    const navigation = [
        { name: 'Dashboard', href: '/' },
        { name: 'Kanban', href: '/kanban' },
    ];

    const isActive = (href) => {
        if (href === '/') {
            return pathname === '/';
        }
        return pathname.startsWith(href);
    };

    return (
        <header className="bg-white border-b border-gray-200">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    {/* Logo */}
                    <div className="flex items-center">
                        <Link href="/" className="text-xl font-bold text-gray-900">
                            TaskBoard
                        </Link>
                    </div>

                    {/* Navigation */}
                    <nav className="flex space-x-8">
                        {navigation.map((item) => (
                            <Link
                                key={item.name}
                                href={item.href}
                                className={`
                  px-3 py-2 rounded-md text-sm font-medium transition-colors
                  ${isActive(item.href)
                                        ? 'bg-blue-200 text-blue-700'
                                        : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
                                    }
                `}
                            >
                                {item.name}
                            </Link>
                        ))}
                    </nav>

                    {/* User section (optional for later) */}
                    <div className="flex items-center">
                        <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                            <span className="text-white text-sm font-medium">U</span>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;