import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const image = formData.get('image') as File;

    if (!image) {
      return NextResponse.json({ error: '未上传图片' }, { status: 400 });
    }

    const apiFormData = new FormData();
    apiFormData.append('image_file', image);
    apiFormData.append('size', 'auto');

    const response = await fetch('https://api.remove.bg/v1.0/removebg', {
      method: 'POST',
      headers: {
        'X-Api-Key': process.env.REMOVEBG_API_KEY || '',
      },
      body: apiFormData,
    });

    if (!response.ok) {
      throw new Error('API 调用失败');
    }

    const imageBlob = await response.blob();
    return new NextResponse(imageBlob, {
      headers: {
        'Content-Type': 'image/png',
      },
    });
  } catch (error) {
    return NextResponse.json(
      { error: '处理失败，请重试' },
      { status: 500 }
    );
  }
}
