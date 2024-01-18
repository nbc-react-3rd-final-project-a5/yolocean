import { NextResponse, NextRequest } from "next/server";

// [POST] 결제 인증 정보를 받을 수 있게 imp_uid를 post한 뒤 access_token을 발급받는다.
export async function POST(req: NextRequest): Promise<NextResponse<{ data: boolean; msg: string; error?: any }>> {
  const { imp_uid, merchant_uid, phone_number } = await req.json();

  console.log(`imp_uid : ${imp_uid}`);
  console.log(`merchant_uid : ${merchant_uid}`);
  console.log(`phone_number : ${phone_number}`);
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

    const getInfo = await fetch(`https://api.iamport.kr/certifications/${imp_uid}`, {
      method: "GET",
      headers: { Authorization: access_token }
    });

    const certificationsInfo = await getInfo.json();
    if (phone_number === certificationsInfo.response.phone) {
      return NextResponse.json(
        { data: true, msg: "입력한 핸드폰 번호와 인증 핸드폰 번호가 일치합니다." },
        { status: 200 }
      );
    } else {
      return NextResponse.json(
        { data: false, msg: "입력한 핸드폰 번호와 인증 핸드폰 번호가 일치하지않습니다." },
        { status: 200 }
      );
    }
  } catch (error) {
    return NextResponse.json(
      {
        data: false,
        msg: "인증과정 중 에러가 발생하였습니다.",
        error
      },
      { status: 500 }
    );
  }
}
