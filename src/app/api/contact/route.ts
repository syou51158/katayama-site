import { NextRequest, NextResponse } from 'next/server'
import { createInquiry, uploadFile } from '@/lib/supabase'

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    
    const name = formData.get('name') as string
    const email = formData.get('email') as string
    const phone = formData.get('phone') as string
    const address = formData.get('address') as string
    const requestType = formData.get('requestType') as string
    const message = formData.get('message') as string
    const consent = formData.get('consent') === 'true'
    const hCaptchaResponse = formData.get('h-captcha-response') as string

    // Validate required fields
    if (!name || !email || !requestType || !message || !consent) {
      return NextResponse.json(
        { error: '必須項目を入力してください' },
        { status: 400 }
      )
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: '有効なメールアドレスを入力してください' },
        { status: 400 }
      )
    }

    // Verify hCaptcha if in production
    if (process.env.NODE_ENV === 'production') {
      if (!hCaptchaResponse) {
        return NextResponse.json(
          { error: 'セキュリティ認証を完了してください' },
          { status: 400 }
        )
      }

      const verifyResponse = await fetch('https://hcaptcha.com/siteverify', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
          secret: process.env.HCAPTCHA_SECRET_KEY!,
          response: hCaptchaResponse,
        }),
      })

      const verifyData = await verifyResponse.json()

      if (!verifyData.success) {
        return NextResponse.json(
          { error: 'セキュリティ認証に失敗しました' },
          { status: 400 }
        )
      }
    }

    // Handle file uploads
    const files: string[] = []
    const fileFields = ['file1', 'file2', 'file3']
    
    for (const fieldName of fileFields) {
      const file = formData.get(fieldName) as File | null
      if (file && file.size > 0) {
        // Validate file size (max 10MB)
        if (file.size > 10 * 1024 * 1024) {
          return NextResponse.json(
            { error: 'ファイルサイズは10MB以下にしてください' },
            { status: 400 }
          )
        }

        // Validate file type
        const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'application/pdf']
        if (!allowedTypes.includes(file.type)) {
          return NextResponse.json(
            { error: '許可されていないファイル形式です' },
            { status: 400 }
          )
        }

        try {
          const fileName = `${Date.now()}-${file.name}`
          const filePath = `inquiries/${fileName}`
          const fileUrl = await uploadFile(file, filePath)
          files.push(fileUrl)
        } catch (error) {
          console.error('File upload error:', error)
          return NextResponse.json(
            { error: 'ファイルのアップロードに失敗しました' },
            { status: 500 }
          )
        }
      }
    }

    // Create inquiry in database
    try {
      const inquiry = await createInquiry({
        name,
        email,
        phone: phone || null,
        address: address || null,
        request_type: requestType,
        message,
        consent,
        files: files.length > 0 ? files : null,
      })

      // Send notification email (optional)
      if (process.env.SMTP_HOST) {
        try {
          const nodemailer = require('nodemailer')
          const transporter = nodemailer.createTransporter({
            host: process.env.SMTP_HOST,
            port: parseInt(process.env.SMTP_PORT || '587'),
            secure: process.env.SMTP_SECURE === 'true',
            auth: {
              user: process.env.SMTP_USER,
              pass: process.env.SMTP_PASS,
            },
          })

          await transporter.sendMail({
            from: process.env.SMTP_FROM,
            to: process.env.CONTACT_EMAIL,
            subject: `新規お問い合わせ: ${name}様`,
            html: `
              <h2>新規お問い合わせ</h2>
              <p><strong>名前:</strong> ${name}</p>
              <p><strong>メール:</strong> ${email}</p>
              <p><strong>電話:</strong> ${phone || '未記入'}</p>
              <p><strong>住所:</strong> ${address || '未記入'}</p>
              <p><strong>依頼種別:</strong> ${requestType}</p>
              <p><strong>メッセージ:</strong></p>
              <p>${message.replace(/\n/g, '<br>')}</p>
              <p><strong>ファイル:</strong> ${files.length}件</p>
            `,
          })
        } catch (emailError) {
          console.error('Email notification error:', emailError)
        }
      }

      return NextResponse.json({
        success: true,
        message: 'お問い合わせを受け付けました。担当者よりご連絡いたします。',
        inquiryId: inquiry.id,
      })

    } catch (dbError) {
      console.error('Database error:', dbError)
      return NextResponse.json(
        { error: 'データベースエラーが発生しました' },
        { status: 500 }
      )
    }

  } catch (error) {
    console.error('Contact form error:', error)
    return NextResponse.json(
      { error: 'サーバーエラーが発生しました' },
      { status: 500 }
    )
  }
}