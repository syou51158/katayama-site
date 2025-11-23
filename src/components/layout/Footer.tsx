import Link from 'next/link';
import { Phone, Mail, MapPin, ExternalLink } from 'lucide-react';

const footerLinks = {
  company: [
    { name: '会社概要', href: '/company' },
    { name: '代表挨拶', href: '/about' },
    { name: '施工実績', href: '/works' },
    { name: 'お知らせ', href: '/news' },
  ],
  services: [
    { name: '解体工事', href: '/services#demolition' },
    { name: '外構工事', href: '/services#exterior' },
    { name: '舗装工事', href: '/services#paving' },
    { name: '設備工事', href: '/services#utilities' },
  ],
  legal: [
    { name: 'プライバシーポリシー', href: '/privacy' },
    { name: '特定商取引法に基づく表記', href: '/legal' },
    { name: 'サイトマップ', href: '/sitemap.xml' },
  ],
};

export default function Footer() {
  return (
    <footer className="bg-[#1D2E45] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="col-span-1 lg:col-span-2">
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 bg-[#B79B6B] rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">片</span>
              </div>
              <div className="ml-3">
                <h3 className="text-lg font-bold font-serif">片山建設工業株式会社</h3>
                <p className="text-sm text-gray-300">KATAYAMA CONSTRUCTION CO., LTD.</p>
              </div>
            </div>
            <div className="space-y-3 text-sm text-gray-300">
              <div className="flex items-start space-x-2">
                <MapPin className="h-4 w-4 mt-1 text-[#B79B6B] flex-shrink-0" />
                <span>
                  〒XXX-XXXX<br />
                  東京都XX区XX町X-X-X
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4 text-[#B79B6B]" />
                <span>0120-XXX-XXX</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4 text-[#B79B6B]" />
                <span>info@katayama-k.jp</span>
              </div>
            </div>
          </div>

          {/* Company Links */}
          <div>
            <h4 className="text-sm font-semibold mb-4 text-[#B79B6B]">会社情報</h4>
            <ul className="space-y-2">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-300 hover:text-white transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services Links */}
          <div>
            <h4 className="text-sm font-semibold mb-4 text-[#B79B6B]">事業内容</h4>
            <ul className="space-y-2">
              {footerLinks.services.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-300 hover:text-white transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-sm text-gray-400 mb-4 md:mb-0">
              © 2024 片山建設工業株式会社. All rights reserved.
            </div>
            <div className="flex space-x-6">
              {footerLinks.legal.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="text-sm text-gray-400 hover:text-white transition-colors"
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}