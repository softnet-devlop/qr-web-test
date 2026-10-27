// 앱 스키마 / 스토어 URL
const APP_SCHEME_BASE = 'inphr://open';
export const PLAY_STORE_URL =
  'https://play.google.com/store/apps/details?id=com.softnet.inPHRCare&pli=1';
// iOS 앱 (bundleId: com.softnet.inPHRCare, App Store ID: 1277557778)
export const APP_STORE_URL = 'https://apps.apple.com/kr/app/inphr/id1277557778';

// iPhone / iPad / iPod 여부 (User-Agent 기준)
// iPadOS 13+ Safari 는 기본적으로 Mac UA 를 보내므로 터치 지원 여부로 함께 판별
export const isIOS = (): boolean => {
  const ua = navigator.userAgent;
  if (/iPhone|iPad|iPod/i.test(ua)) {
    return true;
  }
  return /Macintosh/i.test(ua) && navigator.maxTouchPoints > 1;
};

// QR URL 의 쿼리(mac_address, member_seqNo, login_id, bandNumber 등)를
// 그대로 앱 스키마로 전달. 각 키/값은 encodeURIComponent 로 인코딩
export const buildAppSchemeUrl = (search: string): string => {
  const params = new URLSearchParams(search);
  const query = Array.from(params.entries())
    .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
    .join('&');
  return query ? `${APP_SCHEME_BASE}?${query}` : APP_SCHEME_BASE;
};

// 안드로이드 등 iOS 외: 앱 실행 시도 후 2초 안에 blur 가 없으면 플레이 스토어로 이동 (기존 방식)
export const openAppWithStoreFallback = (appUrl: string) => {
  let windowState = 'focus';

  const handleBlur = () => {
    windowState = 'blur';
  };

  window.addEventListener('blur', handleBlur);

  // 앱 실행 시도
  window.location.href = appUrl;

  setTimeout(() => {
    if (windowState === 'blur') {
      console.log('앱이 설치되어 실행');
    } else {
      // 설치되어 있지 않은 경우 스토어로 리다이렉트
      window.location.href = PLAY_STORE_URL;
    }
    window.removeEventListener('blur', handleBlur);
  }, 2000);
};
