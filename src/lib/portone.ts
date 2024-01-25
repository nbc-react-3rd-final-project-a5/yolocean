declare global {
  interface Window {
    IMP: any;
  }
}

interface PortOneRes {
  success: boolean;
  error_code: string;
  error_msg: string;
  imp_uid: string;
  merchant_uid: string;
}

interface CallBackReturn {
  isPass: boolean;
  msg: string;
}

// 테스트 결제
const createPayment = ({ amount, buyer_tel }: { amount: number; buyer_tel: string }) => {
  return new Promise<CallBackReturn>((resolve) => {
    let IMP = window.IMP;
    IMP.init(`${process.env.NEXT_PUBLIC_PORTONE_CODE}`);

    const data = {
      amount: amount, // 결제금액
      buyer_tel: buyer_tel, // 구매자 전화번호
      pg: "kcp", // PG사
      pay_method: "card", // 결제수단
      merchant_uid: `mid_${new Date().getTime()}`, // 주문번호
      name: "욜로오션 렌탈 서비스",
      currency: "KRW",
      popup: true
    };

    IMP.request_pay(data, (res: any) => {
      const { success, error_msg } = res;
      if (success) {
        // 결제 성공 시 실행할 로직
        resolve({ isPass: true, msg: `결제 성공` });
      } else {
        // 결제 실패 시 실행할 로직
        resolve({ isPass: false, msg: `결제 실패: ${error_msg}` });
      }
    });
  });
};

// 테스트 인증
const createCertification = async (phone_number: string) => {
  return new Promise<CallBackReturn>((resolve) => {
    let IMP = window.IMP;
    IMP.init(`${process.env.NEXT_PUBLIC_PORTONE_CODE}`);
    const data = {
      pg: "inicis_unified",
      merchant_uid: `mid_${new Date().getTime()}`,
      company: "욜로오션",
      popup: true
    };

    // 인증창 팝업
    IMP.certification(data, async (res: PortOneRes) => {
      const { success, imp_uid, merchant_uid, error_msg } = res;
      if (success) {
        // 인증 성공 시 실행할 로직
        const checkPhoneNumber = await fetch("/api/certification", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ imp_uid, merchant_uid, phone_number })
        });
        const result: CallBackReturn = await checkPhoneNumber.json();
        resolve(result);
      } else {
        // 인증 실패 시 실행할 로직
        resolve({ isPass: false, msg: `인증 실패 : ${error_msg}` });
      }
    });
  });
};

export { createPayment, createCertification };
