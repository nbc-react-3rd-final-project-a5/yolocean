import { NextResponse, NextRequest } from "next/server";

// [POST] 결제 인증 정보를 받을 수 있게 imp_uid를 post한 뒤 access_token을 발급받는다.
export async function POST(req: NextRequest): Promise<NextResponse<{ isPass: boolean; msg: string; error?: any }>> {
  const { imp_uid, merchant_uid, amount } = await req.json();

  try {
    const getToken = await fetch("https://api.iamport.kr/users/getToken", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        imp_key: process.env.NEXT_PUBLIC_PORTONE_API_KEY,
        imp_secret: process.env.NEXT_PUBLIC_PORTONE_API_KEY_SECRET
      })
    });

    const token = await getToken.json();
    const { access_token } = token.response;

    const getPaymentData = await fetch(`https://api.iamport.kr/payments/${imp_uid}`, {
      method: "GET",
      headers: { Authorization: access_token }
    });

    const paymentData = await getPaymentData.json();
    if (amount === paymentData.response.amount) {
      return NextResponse.json({ isPass: true, msg: "결제가 성공적으로 완료되었습니다." }, { status: 200 });
    } else {
      return NextResponse.json({ isPass: false, msg: "허용되지않는 결제입니다." }, { status: 200 });
    }
  } catch (error) {
    return NextResponse.json(
      {
        isPass: false,
        msg: "결제 중 에러가 발생하였습니다.",
        error
      },
      { status: 500 }
    );
  }
}
