import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

const contactSchema = z.object({
  name: z.string().min(2, 'お名前を入力してください'),
  email: z.string().email('有効なメールアドレスを入力してください'),
  phone: z.string().optional(),
  address: z.string().optional(),
  request_type: z.enum(['demolition', 'exterior', 'paving', 'utilities', 'other', 'estimate']),
  message: z.string().min(10, '詳細を10文字以上入力してください'),
  files: z.array(z.string()).optional(),
  consent: z.boolean().refine(val => val === true, {
    message: '個人情報の取り扱いに同意してください'
  }),
  captchaToken: z.string().min(1, '認証を完了してください'),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validate input data
    const validatedData = contactSchema.parse(body);
    
    // TODO: Verify hCaptcha token
    // const captchaResponse = await fetch('https://hcaptcha.com/siteverify', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    //   body: `response=${validatedData.captchaToken}&secret=${process.env.HCAPTCHA_SECRET}`,
    // });
    // const captchaResult = await captchaResponse.json();
    
    // if (!captchaResult.success) {
    //   return NextResponse.json(
    //     { error: '認証に失敗しました。もう一度お試しください。' },
    //     { status: 400 }
    //   );
    // }
    
    // TODO: Insert into Supabase
    // const { data, error } = await supabaseAdmin
    //   .from('inquiries')
    //   .insert([{
    //     name: validatedData.name,
    //     email: validatedData.email,
    //     phone: validatedData.phone,
    //     address: validatedData.address,
    //     request_type: validatedData.request_type,
    //     message: validatedData.message,
    //     files: validatedData.files || [],
    //     consent: validatedData.consent,
    //   }]);
    
    // if (error) {
    //   throw error;
    // }
    
    // TODO: Send email notification
    // await sendEmailNotification(validatedData);
    
    // For now, just log the data
    console.log('Contact form submission:', validatedData);
    
    return NextResponse.json(
      { message: 'お問い合わせを受け付けました。' },
      { status: 200 }
    );
    
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: '入力内容に誤りがあります。', details: error.issues },
        { status: 400 }
      );
    }
    
    console.error('Contact form error:', error);
    return NextResponse.json(
      { error: 'サーバーエラーが発生しました。' },
      { status: 500 }
    );
  }
}