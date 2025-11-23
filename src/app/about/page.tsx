import Image from 'next/image';
import { Award, Users, Shield, Phone, Mail } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-[#1D2E45] to-[#2A3E5A] text-white py-20 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl lg:text-6xl font-bold font-serif mb-6">
              代表挨拶
            </h1>
            <p className="text-xl text-gray-200 max-w-3xl mx-auto">
              私たちの理念と、お客様への想いをご紹介いたします
            </p>
          </div>
        </div>
      </section>

      {/* Representative Message */}
      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="mb-8">
                <h2 className="text-3xl lg:text-4xl font-bold text-[#1D2E45] mb-6 font-serif">
                  信頼と実績で、<br />
                  地域に貢献します
                </h2>
                <div className="prose prose-lg max-w-none">
                  <p className="text-gray-700 leading-relaxed mb-6">
                    私は、建設業という仕事を通じて、地域社会の発展に貢献したいという思いで、
                    片山建設工業を創業いたしました。
                  </p>
                  <p className="text-gray-700 leading-relaxed mb-6">
                    創業以来、「安全第一」をモットーに、お客様のニーズに真摯に向き合い、
                    確かな技術と誠実な対応で、多くの方にご支持いただいております。
                  </p>
                  <p className="text-gray-700 leading-relaxed mb-6">
                    これからも、お客様の夢や想いを形にするお手伝いをさせていただき、
                    地域に根ざした企業として、信頼されるサービスを提供してまいります。
                  </p>
                </div>
              </div>
              <div className="border-l-4 border-[#B79B6B] pl-6">
                <p className="text-lg font-semibold text-[#1D2E45] mb-2">
                  片山建設工業株式会社
                </p>
                <p className="text-xl font-bold text-[#1D2E45] mb-4">
                  代表取締役　片山 太郎
                </p>
                <div className="text-sm text-gray-600">
                  <p>建設業経験：25年</p>
                  <p>資格：建設業許可（建設大臣許可）、各種専門工事資格</p>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="bg-gradient-to-br from-[#1D2E45] to-[#B79B6B] rounded-2xl p-8 aspect-square flex items-center justify-center">
                <div className="text-center text-white">
                  <div className="w-32 h-32 bg-white/20 rounded-full mx-auto mb-4 flex items-center justify-center">
                    <span className="text-4xl font-bold">代表</span>
                  </div>
                  <h3 className="text-xl font-bold mb-2">片山 太郎</h3>
                  <p className="text-sm opacity-90">代表取締役</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Company Values */}
      <section className="py-16 lg:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-[#1D2E45] mb-4 font-serif">
              私たちの価値観
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              私たちが大切にしている、3つの価値観
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-2xl p-8 shadow-lg text-center">
              <div className="w-16 h-16 bg-[#1D2E45] rounded-full flex items-center justify-center mx-auto mb-6">
                <Shield className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-[#1D2E45] mb-4 font-serif">安全第一</h3>
              <p className="text-gray-600 leading-relaxed">
                すべての作業において、安全を最優先に考えます。
                近隣への配慮と、作業員の安全を確保します。
              </p>
            </div>
            <div className="bg-white rounded-2xl p-8 shadow-lg text-center">
              <div className="w-16 h-16 bg-[#B79B6B] rounded-full flex items-center justify-center mx-auto mb-6">
                <Users className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-[#1D2E45] mb-4 font-serif">お客様第一</h3>
              <p className="text-gray-600 leading-relaxed">
                お客様のニーズに真摯に向き合い、
                最適なソリューションをご提供します。
              </p>
            </div>
            <div className="bg-white rounded-2xl p-8 shadow-lg text-center">
              <div className="w-16 h-16 bg-[#1D2E45] rounded-full flex items-center justify-center mx-auto mb-6">
                <Award className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-[#1D2E45] mb-4 font-serif">技術追求</h3>
              <p className="text-gray-600 leading-relaxed">
                常に最新の技術と知識を追求し、
                高品質な工事を提供します。
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Qualifications */}
      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-[#1D2E45] mb-4 font-serif">
              保有資格・許可
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              お客様に安心してご依頼いただけるよう、各種資格を取得しております
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="bg-white rounded-2xl p-8 shadow-lg border-l-4 border-[#B79B6B]">
              <h3 className="text-xl font-bold text-[#1D2E45] mb-4 font-serif">建設業許可</h3>
              <ul className="space-y-2 text-gray-700">
                <li>• 建設大臣許可（建設業法に基づく一般建設業）</li>
                <li>• 東京都知事許可（建設業法に基づく専門建設業）</li>
              </ul>
            </div>
            <div className="bg-white rounded-2xl p-8 shadow-lg border-l-4 border-[#1D2E45]">
              <h3 className="text-xl font-bold text-[#1D2E45] mb-4 font-serif">専門技術者</h3>
              <ul className="space-y-2 text-gray-700">
                <li>• 建設機械施工技士</li>
                <li>• 解体作業主任者</li>
                <li>• 玉掛け技能講習修了者</li>
                <li>• 小型移動式クレーン操作者</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-16 lg:py-24 bg-gradient-to-br from-[#1D2E45] to-[#2A3E5A] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold font-serif mb-6">
            お気軽にご相談ください
          </h2>
          <p className="text-xl mb-8 text-gray-200 max-w-2xl mx-auto">
            どんなことでも、私たちにできることから始めさせていただきます。
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <a
              href="tel:0120-XXX-XXX"
              className="inline-flex items-center px-8 py-4 bg-[#B79B6B] hover:bg-[#C8AB7C] text-white font-semibold rounded-lg transition-colors"
            >
              <Phone className="mr-2 h-5 w-5" />
              0120-XXX-XXX
            </a>
            <a
              href="mailto:info@katayama-k.jp"
              className="inline-flex items-center px-8 py-4 border-2 border-white text-white hover:bg-white hover:text-[#1D2E45] font-semibold rounded-lg transition-colors"
            >
              <Mail className="mr-2 h-5 w-5" />
              info@katayama-k.jp
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}