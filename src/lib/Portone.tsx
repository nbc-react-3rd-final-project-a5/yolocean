declare global {
  interface Window {
    IMP: any;
  }
}

interface Payment {
  amount: number;
  name: string;
  buyer_tel: string;
  buyer_email?: string;
}

// const test = {
//   amount : 100,
//   name : "욜로오션 제품 렌탈",
//   buyer_tel : "01012345678",
//   buyer_email : "nbc@gmail.com"
// }

const createPayment = ({ amount, name, buyer_tel, buyer_email }: Payment) => {
  let IMP = window.IMP;
  IMP.init("imp18733233");
  const data = {
    pg: "kcp", // PG사
    pay_method: "card", // 결제수단
    merchant_uid: `mid_${new Date().getTime()}`, // 주문번호
    amount: amount, // 결제금액
    name: name || "테스트 결제", // 주문명
    buyer_tel: buyer_tel || "01012341234", // 구매자 전화번호
    buyer_email: buyer_email || "example@example", // 구매자 이메일
    popup: true
  };

  IMP.request_pay(data, callback);
};

const createCertification = () => {
  let IMP = window.IMP;
  IMP.init("imp18733233");
  const data = {
    pg: "inicis_unified",
    merchant_uid: `mid_${new Date().getTime()}`,
    company: "욜로오션",
    popup: true
  };

  IMP.certification(data, callback);
};

function callback(response: any) {
  const { success, merchant_uid, error_msg } = response;

  if (success) {
    // 결제 및 인증에 성공한 뒤 실행할 코드
    alert("결제 성공");
  } else {
    // 결제 및 인증에 실패한 뒤 실행할 코드
    alert(`결제 실패: ${error_msg}`);
  }
}

export { createPayment, createCertification };
