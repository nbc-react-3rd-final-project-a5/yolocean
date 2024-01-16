import React from "react";

const CommonGuide = () => {
  return (
    <>
      <ul className="text-[14px] font-[500]  ">
        <h3 className="text-tc-base font-[600] text-[16px] my-[10px]">상품결제정보</h3>

        <li className="leading-snug">
          - 고액결제의 경우 안전을 위해 카드사에서 확인전화를 드릴 수도 있습니다. 확인과정에서 도난 카드의 사용이나 타인
          명의의 주문등 정상적인 주문이 아니라고 판단될 경우 임의로 주문을 보류 또는 취소할 수 있습니다.
        </li>
        <li className="leading-snug">
          - 무통장 입금은 상품 구매 대금은 PC뱅킹, 인터넷뱅킹, 텔레뱅킹 혹은 가까운 은행에서 직접 입금하시면 됩니다.
        </li>
        <li className="leading-snug">
          - 주문시 입력한 입금자명과 실제입금자의 성명이 반드시 일치하여야 하며, 7일 이내로 입금을 하셔야 하며 입금되지
          않은 주문은 자동취소 됩니다.
        </li>
      </ul>

      <ul className="text-[14px]">
        <h3 className="text-tc-base font-[600] text-[16px] mt-[20px] mb-[10px]">배송정보</h3>
        <li className="leading-snug">배송 방법 : 택배, 현장수령령</li>
        <li className="leading-snug">배송 지역 : 전국지역</li>
        <li className="leading-snug"> 배송 비용 : 무료</li>
        <li className="leading-snug"> 배송 기간 : 2일 ~ 7일 </li>
        <li className="leading-snug">
          배송 안내 : 반품 및 교환시 배송비 7000원이 발생됨을 알려드립니다.(일부품목 제외)
          <br /> 산간벽지나 도서지방은 별도의 추가금액을 지불하셔야 하는 경우가 있습니다.
          <br /> 고객님께서 주문하신 상품은 입금 확인후 배송해 드립니다. 다만, 상품종류에 따라서 상품의 배송이 다소
          지연될 수 있습니다.
          <br /> 오후 1시전까지의 결제완료된 주문건은 당일 발송해 드립니다. 오후 1시 이후 취소 요청건은 택배준비중으로
          출고전 취소가 불가능 합니다. 제품을 받으신후 반품 요청 해주시길 바랍니다. 반품비는 고객부담입니다.
        </li>
      </ul>

      <ul className="text-[14px]">
        <h3 className="text-tc-base font-[600] text-[16px] mt-[20px] mb-[10px]">교환 및 반품정보</h3>
        <ul>
          <h4 className="text-tc-base text-[16px] my-[10px]">교환 및 반품이 가능한 경우</h4>
          <li className="leading-snug">
            - 상품을 공급 받으신 날로부터 7일이내 교환 및 반품이 가능합니다.(일부품목 제외)
          </li>
          <li className="leading-snug">
            - 공급받으신 상품 및 용역의 내용이 표시.광고 내용과 다르거나 다르게 이행된 경우에는 공급받은 날로부터 3개월
            이내, 그사실을 알게 된 날로부터 30일 이내 가능합니다.
          </li>
        </ul>
        <ul>
          <h4 className="text-tc-base  text-[16px] mt-[20px] mb-[10px]"> 교환 및 반품이 불가능한 경우</h4>
          <li className="leading-snug">- 상품에 부착된 택 및 품질보증서를 제거하거나 제거한 흔적이 있는 경우 </li>
          <li className="leading-snug">
            - 착용한 흔적이 있는경우 (썬크림 or 화장품 또는 기타 물질이 묻어 상품이 오염된 경우)
          </li>
          <li className="leading-snug"> - 상품에 보풀이 일어났거나 세탁기 사용흔적이 있는 경우</li>
          <li className="leading-snug">- 고객님께서 받으신 사은품을 함께 반품하지 않은 경우</li>
          <li className="leading-snug">- 고객님의 책임 있는 사유로 상품등이 멸실 또는 훼손된 경우.</li>
          <li className="leading-snug">- 포장 개봉 후 포장이 훼손되어 상품가치가 상실된 경우</li>
          <li className="leading-snug">- 고객님의 사용 또는 일부 소비에 의하여 상품의 가치가 현저히 감소한 경우</li>
          <li className="leading-snug">
            - 시간의 경과에 의하여 재판매가 곤란할 정도로 상품등의 가치가 현저히 감소한 경우
          </li>
        </ul>
        <p className="my-[20px]">
          ※ 욜로오션션 전 제품은 현장수령/무료배송송입니다. 단, 배송된 건에 한해 반품, 환불을 하실 경우 상품반송 비용
          7000원은 고객님께서 부담하셔야 합니다.
          <br />
          (일부품목 제외) (색상 교환, 사이즈 교환 등 포함)
        </p>
      </ul>
    </>
  );
};

export default CommonGuide;
