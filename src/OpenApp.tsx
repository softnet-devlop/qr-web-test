import { useEffect, useMemo, useRef } from 'react';

import {
  APP_STORE_URL,
  buildAppSchemeUrl,
  isIOS,
  openAppWithStoreFallback,
} from './useRedirect';

export const AppRedirectPage = () => {
  const appUrl = useMemo(() => buildAppSchemeUrl(window.location.search), []);
  const ios = useMemo(() => isIOS(), []);
  const started = useRef(false);

  useEffect(() => {
    // iOS: 자동 실행하지 않음
    //  - 앱이 설치돼 있으면 Universal Link 로 이 페이지를 거치지 않고 앱이 바로 열림
    //  - 이 페이지가 보인다면 앱이 없거나(또는 인앱 브라우저 등) → 버튼으로 안내
    //  - 커스텀 스킴 자동 실행 시 앱이 없으면 Safari 오류 알림이 뜨므로 사용하지 않음
    if (ios || started.current) {
      return;
    }
    started.current = true;

    setTimeout(() => {
      openAppWithStoreFallback(appUrl);
    }, 100);
  }, [appUrl, ios]);

  if (!ios) {
    return <div className='flex flex-wrap w-full my-4 text-xl' />;
  }

  return (
    <div className='min-h-screen flex flex-col items-center justify-center px-6 text-center'>
      <p className='text-xl font-bold mb-2'>inPHR 앱이 필요합니다</p>
      <p className='text-base text-gray-600 mb-8'>
        앱을 설치한 뒤 QR 코드를 다시 찍어 주세요.
      </p>
      <a
        href={APP_STORE_URL}
        className='w-full max-w-xs py-3 mb-3 rounded-lg bg-blue-600 text-white text-lg font-semibold'
      >
        App Store에서 설치
      </a>
      <a
        href={appUrl}
        className='w-full max-w-xs py-3 rounded-lg border border-gray-300 text-lg'
      >
        이미 설치했다면 앱 열기
      </a>
    </div>
  );
};
