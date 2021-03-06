export const PORT = Number(process.env.PORT) || 3000;

export const REFRESH_TOKEN_NAME = 'rteofkreensh';

export const USER = {
  ID_MAX_LENGTH: 30,
  ID_MIN_LENGTH: 3,
  PASSWORD_MAX_LENGTH: 20,
  PASSWORD_MIN_LENGTH: 4,
  PROVIDER_LENGTH: 45,
  PHONE_LENGTH: 12,
};

export const ADDRESS = {
  NAME_MIN_LENGTH: 1,
  NAME_MAX_LENGTH: 10,
  RECEIVER_MIN_LENGTH: 1,
  RECEIVER_MAX_LENGTH: 20,
  ADDRESS_MIN_LENGTH: 1,
  ADDRESS_MAX_LENGTH: 50,
};

export const ORDER = {
  ADDRESS_MAX_LENGTH: 50,
  ADDRESS_MIN_LENGTH: 3,
  RECEIVER_MAX_LENGTH: 20,
  QUANTITY_MIN: 1,
};

export const REVIEW = {
  TITLE_MIN_LENGTH: 2,
  TITLE_MAX_LENGTH: 30,
  CONTENTS_MIN_LENGTH: 5,
  MAX_SCORE: 5,
  MIN_SCORE: 1,
};

export const CATEGORY_DATA = [
  { id: '000000', name: '전체' },
  { id: '080000', name: '문구' },
  { id: '080100', name: '노트/메모지' },
  { id: '080101', name: '베이직 노트' },
  { id: '080102', name: '스프링 노트' },
  { id: '080103', name: '메모지' },
  { id: '080104', name: '다이어리' },
  { id: '080200', name: '데코레이션' },
  { id: '080201', name: '스탬프' },
  { id: '080202', name: '스티커' },
  { id: '080203', name: '테이프' },
  { id: '080204', name: '포스터' },
  { id: '080205', name: '피규어' },
  { id: '080300', name: '필기류/필통' },
  { id: '080400', name: '카드/편지/봉투' },
  { id: '080500', name: '파일/바인더' },
  { id: '090000', name: '리빙' },
  { id: '090100', name: '데코레이션' },
  { id: '090101', name: '뱃지/와펜' },
  { id: '090102', name: '열쇠고리' },
  { id: '090103', name: '네임택' },
  { id: '090104', name: '시트지' },
  { id: '090200', name: '피크닉' },
  { id: '090201', name: '돗자리' },
  { id: '090202', name: '픽 세트' },
  { id: '090203', name: '비치용품' },
  { id: '090204', name: '목베개' },
  { id: '090300', name: '휴대폰' },
  { id: '090301', name: '폰케이스' },
  { id: '090302', name: '그립톡' },
  { id: '090400', name: '꾸미기' },
  { id: '090500', name: '수납' },
  { id: '090501', name: '연필꽂이' },
  { id: '090502', name: '카드케이스' },
  { id: '090600', name: '의류' },
  { id: '090601', name: '양말' },
  { id: '090602', name: '티셔츠' },
  { id: '090603', name: '마스크' },
  { id: '090604', name: '가방' },
  { id: '090605', name: '수건' },
  { id: '090700', name: '식기' },
  { id: '090701', name: '컵' },
  { id: '090702', name: '접시' },
  { id: '090703', name: '아이스트레이' },
  { id: '090800', name: '위생' },
  { id: '110000', name: 'ㅋㅋ에디션' },
  { id: '120000', name: '콜라보레이션' },
  { id: '170000', name: '배달이친구들' },
  { id: '140000', name: '책' },
  { id: '160000', name: '선물세트' },
  { id: '180000', name: '을지로에디션' },
];
