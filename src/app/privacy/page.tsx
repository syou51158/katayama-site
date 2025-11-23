import Link from 'next/link';

export default function PrivacyPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-[#1D2E45] to-[#2A3E5A] text-white py-20 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl lg:text-6xl font-bold font-serif mb-6">
            プライバシーポリシー
          </h1>
          <p className="text-xl text-gray-200 max-w-3xl mx-auto">
            個人情報保護の重要性を認識し、適切な管理を行っております
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 lg:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="prose prose-lg max-w-none">
            <div className="bg-white rounded-2xl p-8 lg:p-12 shadow-lg">
              <div className="prose-headings:font-serif prose-headings:text-[#1D2E45] prose-p:text-gray-700 prose-strong:text-[#1D2E45]">
                <h2>1. 個人情報の収集</h2>
                <p>
                  片山建設工業株式会社（以下、「当社」）は、お問い合わせ、お見積もり依頼等を通じて、
                  お客様の氏名、連絡先等の個人情報を収集させていただく場合があります。
                </p>

                <h2>2. 個人情報の利用目的</h2>
                <p>
                  収集した個人情報は、以下の目的で利用いたします。
                </p>
                <ul>
                  <li>お問い合わせへの回答</li>
                  <li>お見積もりの作成・送付</li>
                  <li>工事に関するご連絡</li>
                  <li>サービス向上のための統計データ作成</li>
                </ul>

                <h2>3. 個人情報の管理</h2>
                <p>
                  当社は、お客様の個人情報を適切に管理し、不正アクセス、紛失、破損、改ざん、漏洩等の防止に努めます。
                </p>

                <h2>4. 第三者への開示</h2>
                <p>
                  当社は、以下の場合を除き、個人情報を第三者に開示することはありません。
                </p>
                <ul>
                  <li>お客様の同意がある場合</li>
                  <li>法令に基づく場合</li>
                  <li>人の生命、身体または財産の保護のために必要がある場合</li>
                </ul>

                <h2>5. お問い合わせ</h2>
                <p>
                  個人情報に関するお問い合わせは、以下までご連絡ください。
                </p>
                <div className="bg-gray-50 p-6 rounded-lg">
                  <p><strong>片山建設工業株式会社</strong></p>
                  <p>住所：東京都XX区XX町X-X-X</p>
                  <p>電話：0120-XXX-XXX</p>
                  <p>メール：info@katayama-k.jp</p>
                </div>

                <h2>6. プライバシーポリシーの変更</h2>
                <p>
                  本ポリシーの内容は、法令の変更や当社の事業内容の変更等により、
                  予告なく変更することがあります。変更後のプライバシーポリシーは、
                  当社ウェブサイトに掲載した時点から効力を生じるものとします。
                </p>

                <div className="mt-12 p-6 bg-[#1D2E45] text-white rounded-lg">
                  <p className="mb-0">
                    <strong>制定日：</strong>2024年4月1日<br />
                    <strong>最終更新日：</strong>2024年4月1日
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gradient-to-br from-[#1D2E45] to-[#2A3E5A] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold font-serif mb-6">
            個人情報に関するお問い合わせ
          </h2>
          <p className="text-xl mb-8 text-gray-200 max-w-2xl mx-auto">
            プライバシーポリシーに関するご質問は、お気軽にお問い合わせください。
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <Link
              href="/contact"
              className="inline-flex items-center px-8 py-4 bg-[#B79B6B] hover:bg-[#C8AB7C] text-white font-semibold rounded-lg transition-colors"
            >
              お問い合わせフォーム
            </Link>
            <a
              href="tel:0120-XXX-XXX"
              className="inline-flex items-center px-8 py-4 border-2 border-white text-white hover:bg-white hover:text-[#1D2E45] font-semibold rounded-lg transition-colors"
            >
              お電話でのお問い合わせ
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}