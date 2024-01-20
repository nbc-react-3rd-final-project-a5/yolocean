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
        <h3 className="text-tc-base font-[600] text-[16px] mt-[20px] mb-[10px]">수령 안내</h3>
        <li className="leading-snug">수령 방법 : 현장수령</li>
        <li className="leading-snug"> 수령 기간 : 2일 ~ 7일 </li>
        <li className="leading-snug">
          수령 안내 : 주문하신 상품은 현장에서 직접 수령이 가능합니다.
          <br /> 반품 및 교환시 추가 비용이 발생할 수 있으며, 자세한 내용은 상담 부탁드립니다.
          <br /> 오후 1시전까지의 주문건은 당일 수령이 가능합니다. 오후 1시 이후 주문건은 익일 수령 예정이며,
          <br /> 특별한 사유로 인해 수령이 지연될 경우 고객님께 안내 드리겠습니다.
        </li>
      </ul>

      <ul className="text-[14px]">
        <h3 className="text-tc-base font-[600] text-[16px] mt-[20px] mb-[10px]">수령 및 렌탈 정보</h3>
        <ul>
          <h4 className="text-tc-base text-[16px] my-[10px]">수령 및 렌탈 상품 안내</h4>
          <li className="leading-snug">- 현장에서 상품을 직접 수령하거나 렌탈 서비스를 이용하실 수 있습니다.</li>
          <li className="leading-snug">
            - 상품을 수령하신 날로부터 7일 이내에는 교환 및 반품이 가능합니다. (일부 품목 제외)
          </li>
          <li className="leading-snug">
            - 렌탈 서비스 이용 시에는 계약 내용을 정확히 확인하시고, 광고 내용과 일치하는지 확인해주세요.
          </li>
          <li className="leading-snug">
            - 상품 또는 용역의 내용이 표시나 광고 내용과 다르게 이행된 경우, 상품 수령 후 3개월 이내 또는 그 사실을 알게
            된 날로부터 30일 이내에 교환 및 반품이 가능합니다.
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
        <p className="my-[20px]">※ 욜로오션션 전 제품은 현장수령입니다.</p>
      </ul>
    </>
  );
};

export default CommonGuide;
