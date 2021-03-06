/**
 * 에러를 생성
 * @param {string} code - 개발자를 위한 에러 코드
 * @param {string} message - 위의 에러 코드로 구분이 부족할 때 사용하기 위한 메세지
 * @return {CustomError} 커스텀 에러 객체
 */

interface ParamType {
  message: string;
  code: string;
  customMessage?: string;
}

export class CustomError extends Error {
  code: string;

  customMessage?: string;

  constructor(code: string, message: string, customMessage?: string) {
    super(message);

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, CustomError);
    }

    this.code = code;
    this.customMessage = customMessage;
  }
}

function errorGenerator({ message, code, customMessage }: ParamType): CustomError {
  return new CustomError(code, message, customMessage);
}

export default errorGenerator;
