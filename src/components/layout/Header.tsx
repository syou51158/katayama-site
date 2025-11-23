'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Menu, X, Phone, Mail } from 'lucide-react';

const navigation = [
  { name: 'ホーム', href: '/' },
  { name: '事業内容', href: '/services' },
  { name: '施工実績', href: '/works' },
  { name: '代表挨拶', href: '/about' },
  { name: '会社概要', href: '/company' },
  { name: 'お知らせ', href: '/news' },
  { name: 'お問い合わせ', href: '/contact' },
];

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center">
              <div className="w-14 h-14 bg-[#1D2E45] rounded-xl flex items-center justify-center shadow-sm">
                <span className="text-white font-bold text-2xl">片</span>
              </div>
              <div className="ml-3">
                <h1 className="text-2xl font-bold text-[#1D2E45] font-serif leading-tight">
                  片山建設工業
                </h1>
                <p className="text-sm text-gray-600 font-medium tracking-wide">KATAYAMA CONSTRUCTION</p>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-1">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-gray-700 hover:text-[#1D2E45] px-3 py-2 text-base font-medium transition-colors whitespace-nowrap text-center rounded-lg hover:bg-gray-50 flex items-center justify-center min-w-[80px]"
                style={{ wordBreak: 'keep-all', lineHeight: '1.4' }}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Contact Info */}
          <div className="hidden lg:flex items-center space-x-8">
            <div className="flex items-center space-x-3 text-sm text-gray-600 hover:text-[#1D2E45] transition-colors">
              <Phone className="h-5 w-5 text-[#B79B6B] flex-shrink-0" />
              <span className="whitespace-nowrap font-medium">0120-XXX-XXX</span>
            </div>
            <div className="flex items-center space-x-3 text-sm text-gray-600 hover:text-[#1D2E45] transition-colors">
              <Mail className="h-5 w-5 text-[#B79B6B] flex-shrink-0" />
              <span className="whitespace-nowrap font-medium" style={{ wordBreak: 'keep-all' }}>info@katayama-k.jp</span>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              type="button"
              className="text-gray-700 hover:text-[#1D2E45] p-2"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <span className="sr-only">メニューを開く</span>
              {mobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden">
            <div className="px-4 pt-4 pb-6 space-y-1 bg-white border-t">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="block px-4 py-3 text-lg font-medium text-gray-700 hover:text-[#1D2E45] hover:bg-gray-50 rounded-lg transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                  style={{ wordBreak: 'keep-all', lineHeight: '1.5' }}
                >
                  {item.name}
                </Link>
              ))}
              <div className="border-t pt-4 mt-4 bg-gray-50 rounded-lg">
                <div className="px-4 py-3 flex items-center space-x-3 text-base text-gray-700">
                  <Phone className="h-5 w-5 text-[#B79B6B] flex-shrink-0" />
                  <span className="whitespace-nowrap font-medium">0120-XXX-XXX</span>
                </div>
                <div className="px-4 py-3 flex items-center space-x-3 text-base text-gray-700">
                  <Mail className="h-5 w-5 text-[#B79B6B] flex-shrink-0" />
                  <span className="whitespace-nowrap font-medium" style={{ wordBreak: 'keep-all' }}>info@katayama-k.jp</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}