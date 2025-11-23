import { MapPin, Phone, Mail, Clock, Award, Users, Building } from 'lucide-react';

export default function CompanyPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-[#1D2E45] to-[#2A3E5A] text-white py-20 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl lg:text-6xl font-bold font-serif mb-6">
            会社概要
          </h1>
          <p className="text-xl text-gray-200 max-w-3xl mx-auto">
            私たちについて、より詳しくご紹介いたします
          </p>
        </div>
      </section>

      {/* Company Overview */}
      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl lg:text-4xl font-bold text-[#1D2E45] mb-8 font-serif">
                会社情報
              </h2>
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="w-6 h-6 bg-[#B79B6B] rounded-full flex items-center justify-center mr-4 mt-1 flex-shrink-0">
                    <Building className="h-3 w-3 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-[#1D2E45] mb-1">商号</h3>
                    <p className="text-gray-700">片山建設工業株式会社</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="w-6 h-6 bg-[#B79B6B] rounded-full flex items-center justify-center mr-4 mt-1 flex-shrink-0">
                    <Users className="h-3 w-3 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-[#1D2E45] mb-1">代表者</h3>
                    <p className="text-gray-700">代表取締役 片山 太郎</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="w-6 h-6 bg-[#B79B6B] rounded-full flex items-center justify-center mr-4 mt-1 flex-shrink-0">
                    <MapPin className="h-3 w-3 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-[#1D2E45] mb-1">所在地</h3>
                    <p className="text-gray-700">〒XXX-XXXX<br />東京都XX区XX町X-X-X</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="w-6 h-6 bg-[#B79B6B] rounded-full flex items-center justify-center mr-4 mt-1 flex-shrink-0">
                    <Phone className="h-3 w-3 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-[#1D2E45] mb-1">電話番号</h3>
                    <p className="text-gray-700">0120-XXX-XXX</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="w-6 h-6 bg-[#B79B6B] rounded-full flex items-center justify-center mr-4 mt-1 flex-shrink-0">
                    <Mail className="h-3 w-3 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-[#1D2E45] mb-1">メールアドレス</h3>
                    <p className="text-gray-700">info@katayama-k.jp</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="bg-gradient-to-br from-[#1D2E45] to-[#B79B6B] rounded-2xl p-8 aspect-square flex items-center justify-center">
                <div className="text-center text-white">
                  <div className="w-24 h-24 bg-white/20 rounded-full mx-auto mb-6 flex items-center justify-center">
                    <Building className="h-12 w-12" />
                  </div>
                  <h3 className="text-2xl font-bold mb-2">片山建設工業</h3>
                  <p className="text-sm opacity-90">KATAYAMA CONSTRUCTION</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Business Details */}
      <section className="py-16 lg:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-[#1D2E45] mb-4 font-serif">
              事業詳細
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              私たちが提供するサービスの詳細情報
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <h3 className="text-xl font-bold text-[#1D2E45] mb-4 font-serif">設立</h3>
              <p className="text-gray-700 mb-4">平成XX年X月X日</p>
              <h3 className="text-xl font-bold text-[#1D2E45] mb-4 font-serif">資本金</h3>
              <p className="text-gray-700">XXX万円</p>
            </div>
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <h3 className="text-xl font-bold text-[#1D2E45] mb-4 font-serif">事業内容</h3>
              <ul className="space-y-2 text-gray-700">
                <li>• 解体工事</li>
                <li>• 外構工事</li>
                <li>• 舗装工事</li>
                <li>• 設備工事</li>
                <li>• 不動産・活用支援</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Licenses & Certifications */}
      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-[#1D2E45] mb-4 font-serif">
              許認可・資格
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              お客様に安心してご依頼いただけるよう、各種許認可を取得しております
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white rounded-2xl p-8 shadow-lg border-l-4 border-[#B79B6B]">
              <div className="w-12 h-12 bg-[#B79B6B] rounded-full flex items-center justify-center mb-6">
                <Award className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-[#1D2E45] mb-4 font-serif">建設業許可</h3>
              <p className="text-gray-700">
                建設大臣許可<br />
                一般建設業（建設業法に基づく）
              </p>
            </div>
            <div className="bg-white rounded-2xl p-8 shadow-lg border-l-4 border-[#1D2E45]">
              <div className="w-12 h-12 bg-[#1D2E45] rounded-full flex items-center justify-center mb-6">
                <Award className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-[#1D2E45] mb-4 font-serif">東京都知事許可</h3>
              <p className="text-gray-700">
                専門建設業<br />
                建設業法に基づく
              </p>
            </div>
            <div className="bg-white rounded-2xl p-8 shadow-lg border-l-4 border-[#B79B6B]">
              <div className="w-12 h-12 bg-[#B79B6B] rounded-full flex items-center justify-center mb-6">
                <Award className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-[#1D2E45] mb-4 font-serif">産業廃棄物処理業</h3>
              <p className="text-gray-700">
                産業廃棄物収集運搬業<br />
                東京都知事許可
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Service Areas */}
      <section className="py-16 lg:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-[#1D2E45] mb-4 font-serif">
              対応エリア
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              主に以下の地域でサービスを提供しております
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <h3 className="text-lg font-bold text-[#1D2E45] mb-4">東京都</h3>
              <ul className="space-y-2 text-gray-700 text-sm">
                <li>• 世田谷区</li>
                <li>• 港区</li>
                <li>• 渋谷区</li>
                <li>• 品川区</li>
                <li>• 目黒区</li>
              </ul>
            </div>
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <h3 className="text-lg font-bold text-[#1D2E45] mb-4">神奈川県</h3>
              <ul className="space-y-2 text-gray-700 text-sm">
                <li>• 川崎市</li>
                <li>• 横浜市</li>
                <li>• 相模原市</li>
                <li>• 藤沢市</li>
                <li>• 茅ヶ崎市</li>
              </ul>
            </div>
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <h3 className="text-lg font-bold text-[#1D2E45] mb-4">埼玉県</h3>
              <ul className="space-y-2 text-gray-700 text-sm">
                <li>• 川口市</li>
                <li>• 越谷市</li>
                <li>• 草加市</li>
                <li>• 朝霞市</li>
                <li>• 和光市</li>
              </ul>
            </div>
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <h3 className="text-lg font-bold text-[#1D2E45] mb-4">千葉県</h3>
              <ul className="space-y-2 text-gray-700 text-sm">
                <li>• 市川市</li>
                <li>• 船橋市</li>
                <li>• 松戸市</li>
                <li>• 柏市</li>
                <li>• 流山市</li>
              </ul>
            </div>
          </div>
          <div className="text-center mt-8">
            <p className="text-gray-600">
              その他の地域もご相談ください。可能な限り対応させていただきます。
            </p>
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
            会社について、サービスについて、どんなことでもお気軽にお問い合わせください。
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