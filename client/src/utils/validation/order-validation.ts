const REGEX_PHONE = /^010-\d{4}-\d{4}$/;

const PHONE_EMPTY = '전화번호를 입력해주세요';
const PHONE_INVALID = '전화번호 형식을 확인해주세요';

const USER_EMPTY = '주문하시는 분을 입력해주세요';

const ADDRESS_EMPTY = '주소를 입력해주세요';
const ADDRESS_TOO_SHORT = '주소는 3자 이상 입력해주세요';

const ADDRESS_DETAIL_EMPTY = '상세주소를 입력해주세요';
const ADDRESS_DETAIL_TOO_SHORT = '상세주소는 2자 이상 입력해주세요';

const RECEIVER_TOO_LONG = '받는분은 20자 이하로 입력해주세요';

const phoneValidation = (phone: string): string => {
  if (!phone) return PHONE_EMPTY;
  if (!REGEX_PHONE.test(phone)) return PHONE_INVALID;

  return '';
};

const userValidation = (user: string): string => {
  if (!user) return USER_EMPTY;

  return '';
};

const addressValidation = (address: string): string => {
  if (!address) return ADDRESS_EMPTY;
  if (address.length < 3) return ADDRESS_TOO_SHORT;

  return '';
};

const addressDetailValidation = (address: string): string => {
  if (!address) return ADDRESS_DETAIL_EMPTY;
  if (address.length < 2) return ADDRESS_DETAIL_TOO_SHORT;

  return '';
};

const receiverValidation = (receiver: string): string => {
  if (receiver.length > 20) return RECEIVER_TOO_LONG;

  return '';
};

export { phoneValidation, userValidation, addressValidation, addressDetailValidation, receiverValidation };
