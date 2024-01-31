declare global {
  interface Window {
    IMP: any;
  }
}

interface PortOneRes {
  success: boolean;
  error_code: string;
  error_msg: string;
  /**
   * 고유 인증번호
   */
  imp_uid: string;
  /**
   * 주문 번호
   */
  merchant_uid: string;
}

interface CallBackReturn {
  isPass: boolean;
  msg: string;
}

// 테스트 결제
const createPayment = ({ amount, buyer_tel, userId }: { amount: number; buyer_tel: string; userId: string }) => {
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
      popup: false,
      m_redirect_url: `${process.env.NEXT_PUBLIC_DOMAIN_URL}/payment/${userId}`
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
      popup: false,
      m_redirect_url: `${process.env.NEXT_PUBLIC_DOMAIN_URL}/auth`
    };

    // 인증창 팝업
    IMP.certification(data, async (res: PortOneRes) => {
      const { success, imp_uid, merchant_uid, error_msg, error_code } = res;
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

// 모바일 화면에서 리다이렉션 했을 때 URL에 담긴 정보의 진위를 판별하는 함수
const vaildateMobileCertification = (targetUrl: string, phone_number: string) => {
  return new Promise<CallBackReturn>(async (resolve) => {
    const { searchParams } = new URL(targetUrl);
    const getValue = (param: string) => searchParams.get(param);

    const success = getValue("success");
    const imp_uid = getValue("imp_uid");
    const merchant_uid = getValue("merchant_uid");

    // 1. 인증을 취소하거나 성공하지 못했을때
    if (!success) {
      const data = {
        isPass: false,
        msg: "인증이 진행되지 않았습니다."
      };
      resolve(data);
    }

    // 2. 모든 값이 있을 때 access token을 받아 검증한다.
    if (success && imp_uid && merchant_uid) {
      const vaildation = await fetch("/api/certification", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ imp_uid, merchant_uid, phone_number })
      });

      const result: CallBackReturn = await vaildation.json();
      resolve(result);
    }
  });
};

// 모바일 화면에서 리다이렉션 했을 때 URL에 담긴 정보의 진위를 판별하는 함수
const vaildateMobilePayment = (targetUrl: string, amount: number) => {
  return new Promise<CallBackReturn>(async (resolve) => {
    const { searchParams } = new URL(targetUrl);
    const getValue = (param: string) => searchParams.get(param);

    const success = getValue("imp_success");
    const imp_uid = getValue("imp_uid");
    const merchant_uid = getValue("merchant_uid");

    // 1. 인증을 취소하거나 성공하지 못했을때
    if (!success) {
      const data = {
        isPass: false,
        msg: "결제가 취소되었습니다."
      };
      resolve(data);
    }

    // 2. 모든 값이 있을 때 access token을 받아 검증한다.
    if (success && imp_uid && merchant_uid) {
      const vaildation = await fetch("/api/certification/payment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ imp_uid, merchant_uid, amount })
      });

      const result: CallBackReturn = await vaildation.json();
      resolve(result);
    }
  });
};

export { createPayment, createCertification, vaildateMobileCertification, vaildateMobilePayment };
