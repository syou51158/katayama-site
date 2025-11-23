import Link from 'next/link';

export default function LegalPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-[#1D2E45] to-[#2A3E5A] text-white py-20 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl lg:text-6xl font-bold font-serif mb-6">
            特定商取引法に基づく表記
          </h1>
          <p className="text-xl text-gray-200 max-w-3xl mx-auto">
            特定商取引法に基づく表示事項
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 lg:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="prose prose-lg max-w-none">
            <div className="bg-white rounded-2xl p-8 lg:p-12 shadow-lg">
              <div className="prose-headings:font-serif prose-headings:text-[#1D2E45] prose-p:text-gray-700 prose-strong:text-[#1D2E45]">
                <h2>事業者情報</h2>
                <table className="w-full border-collapse border border-gray-300">
                  <tbody>
                    <tr>
                      <td className="border border-gray-300 p-3 bg-gray-50 font-medium">商号</td>
                      <td className="border border-gray-300 p-3">片山建設工業株式会社</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 p-3 bg-gray-50 font-medium">代表者</td>
                      <td className="border border-gray-300 p-3">代表取締役 片山 太郎</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 p-3 bg-gray-50 font-medium">所在地</td>
                      <td className="border border-gray-300 p-3">〒XXX-XXXX<br />東京都XX区XX町X-X-X</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 p-3 bg-gray-50 font-medium">電話番号</td>
                      <td className="border border-gray-300 p-3">0120-XXX-XXX</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 p-3 bg-gray-50 font-medium">メールアドレス</td>
                      <td className="border border-gray-300 p-3">info@katayama-k.jp</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 p-3 bg-gray-50 font-medium">URL</td>
                      <td className="border border-gray-300 p-3">https://www.katayama-k.jp</td>
                    </tr>
                  </tbody>
                </table>

                <h2>販売価格</h2>
                <p>
                  各工事により異なります。お見積もりをご依頼ください。
                  お見積もりは無料です。
                </p>

                <h2>代金の支払方法</h2>
                <ul>
                  <li>銀行振込</li>
                  <li>現金支払い</li>
                  <li>小切手支払い</li>
                </ul>

                <h2>支払時期</h2>
                <p>
                  契約締結後、工事完了後に請求書を発行し、14日以内にお支払いいただきます。
                </p>

                <h2>工事期間</h2>
                <p>
                  工事内容により異なります。お見積もり時に詳細な工期をご提示いたします。
                </p>

                <h2>返品・キャンセルについて</h2>
                <p>
                  工事着手前であればキャンセル可能です。ただし、設計・準備にかかった費用をご負担いただく場合があります。
                  工事着手後のキャンセルについては、別途ご相談させていただきます。
                </p>

                <h2>免責事項</h2>
                <p>
                  天災地変、不可抗力により工事が遅延・中止となった場合、
                  当社は責任を負いかねますのでご了承ください。
                </p>

                <h2>管轄裁判所</h2>
                <p>
                  本契約に関する一切の紛争は、東京地方裁判所を第一審の専属的合意管轄裁判所とします。
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gradient-to-br from-[#1D2E45] to-[#2A3E5A] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold font-serif mb-6">
            ご不明な点がございましたら
          </h2>
          <p className="text-xl mb-8 text-gray-200 max-w-2xl mx-auto">
            特定商取引法に関するご質問は、お気軽にお問い合わせください。
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