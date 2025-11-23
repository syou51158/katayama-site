import { Wrench, HardHat, Car, Zap, Building } from 'lucide-react';

const services = [
  {
    id: 'demolition',
    title: '解体工事',
    description: '建物の解体から更地化まで、安全確実に対応いたします。木造・鉄骨・RC造など、あらゆる構造の建物に対応可能です。',
    features: [
      '木造住宅解体',
      '鉄骨建物解体',
      'RC建物解体',
      '内装解体',
      '基礎解体',
      '産業廃棄物処理'
    ],
    icon: HardHat,
    color: 'from-[#1D2E45] to-[#2A3E5A]'
  },
  {
    id: 'exterior',
    title: '外構工事',
    description: 'お客様のライフスタイルに合わせた外構を提案・施工いたします。機能性とデザイン性を兼ね備えた外構を実現します。',
    features: [
      'カーポート設置',
      'フェンス・門扉',
      'アプローチ舗装',
      '庭園造成',
      '排水工事',
      '照明設備'
    ],
    icon: Building,
    color: 'from-[#B79B6B] to-[#C8AB7C]'
  },
  {
    id: 'paving',
    title: '舗装工事',
    description: '駐車場・道路・アプローチなど、各種舗装工事に対応。耐久性と美観を考慮した舗装をご提供いたします。',
    features: [
      'アスファルト舗装',
      'コンクリート舗装',
      'インターロッキング',
      '舗装修繕',
      '線引き工事',
      '排水溝設置'
    ],
    icon: Car,
    color: 'from-[#1D2E45] to-[#2A3E5A]'
  },
  {
    id: 'utilities',
    title: '設備工事',
    description: '電気・給排水・空調設備の設置・改修工事を行います。建物のライフサイクルに合わせた最適な設備提案をいたします。',
    features: [
      '電気配線工事',
      '給排水工事',
      '空調設備設置',
      '照明設備',
      '防災設備',
      '省エネ改修'
    ],
    icon: Zap,
    color: 'from-[#B79B6B] to-[#C8AB7C]'
  },
  {
    id: 'real-estate',
    title: '不動産・活用支援',
    description: '建物の解体後の土地活用や、不動産の有効活用についてご相談を受け付けています。最適な活用方法をご提案いたします。',
    features: [
      '土地活用コンサルティング',
      '収益物件紹介',
      '建物診断',
      'リフォーム提案',
      '賃貸管理',
      '売買仲介'
    ],
    icon: Wrench,
    color: 'from-[#1D2E45] to-[#2A3E5A]'
  }
];

export default function ServicesPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-[#1D2E45] to-[#2A3E5A] text-white py-20 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl lg:text-6xl font-bold font-serif mb-6">
            事業内容
          </h1>
          <p className="text-xl mb-8 text-gray-200 max-w-3xl mx-auto">
            片山建設工業は、解体工事・外構工事・舗装工事を中心に、
            建設業全般を手がけるプロフェッショナル集団です。
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {services.map((service, index) => {
              const Icon = service.icon;
              return (
                <div
                  key={service.id}
                  id={service.id}
                  className="bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-shadow duration-300"
                >
                  <div className={`bg-gradient-to-r ${service.color} p-8 text-white`}>
                    <div className="flex items-center mb-4">
                      <Icon className="h-8 w-8 mr-4" />
                      <h2 className="text-2xl lg:text-3xl font-bold font-serif">{service.title}</h2>
                    </div>
                    <p className="text-gray-200 leading-relaxed">
                      {service.description}
                    </p>
                  </div>
                  <div className="p-8">
                    <h3 className="text-lg font-semibold text-[#1D2E45] mb-6">主な作業内容</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {service.features.map((feature, featureIndex) => (
                        <div key={featureIndex} className="flex items-center">
                          <div className="w-2 h-2 bg-[#B79B6B] rounded-full mr-3 flex-shrink-0"></div>
                          <span className="text-gray-700">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold font-serif text-[#1D2E45] mb-4">
            お見積もり・ご相談は無料です
          </h2>
          <p className="text-xl mb-8 text-gray-600 max-w-2xl mx-auto">
            どのような工事でも、まずはお気軽にご相談ください。
            最適なご提案をさせていただきます。
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/contact"
              className="inline-flex items-center justify-center px-8 py-3 bg-[#B79B6B] hover:bg-[#C8AB7C] text-white font-semibold rounded-lg transition-colors"
            >
              お問い合わせフォーム
            </a>
            <a
              href="tel:0120-XXX-XXX"
              className="inline-flex items-center justify-center px-8 py-3 border-2 border-[#1D2E45] text-[#1D2E45] hover:bg-[#1D2E45] hover:text-white font-semibold rounded-lg transition-colors"
            >
              お電話でのお問い合わせ
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}