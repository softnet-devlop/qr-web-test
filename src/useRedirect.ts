export interface QRCodeItem {
  code_seqno?: string;
  macAddress: string | null;
  memberSeqNo: string | null;
  loginId: string | null;
}

export interface AppRedirectOptions {
  appScheme: string;
  playStoreUrl: string;
  appleStoreUrl: string;
}

export const useAppRedirect = ({
  macAddress,
  memberSeqNo,
  loginId,
}: QRCodeItem) => {
  //앱 스키마 url
  const appScheme = `inphr://open?mac_address=${macAddress}&member_seqNo=${memberSeqNo}&login_id=${loginId}`;
  //스토어 url
  const playStoreUrl =
    'https://play.google.com/store/apps/details?id=com.softnet.inPHRCare&pli=1';
  const appleStoreUrl = 'https://apps.apple.com/kr/app/inphr/id1277557778';

  const openApp = () => {
    //navigator.userAgent: 사용 브라우저, 운영체제, 기기 정보 조회 가능 Mozilla/5.0 (Linux; Android 11; Pixel 3 XL)
    console.log(navigator.userAgent);

    //대소문자 구분 없이 Android, ios 확인하고 true/false 반환
    const isAndroid = /Android/i.test(navigator.userAgent);
    const isIOS = /iPhone|iPad/i.test(navigator.userAgent);
    // const isChrome = /Chrome/i.test(navigator.userAgent);

    const storeUrl = isAndroid ? playStoreUrl : isIOS ? appleStoreUrl : null;

    // const startTime = Date.now();
    console.log(appScheme);

    // Android Intent URL 생성
    // const intentUrl = `intent://open?mac_address=${macAddress}&member_seqNo=${memberSeqNo}&login_id=${loginId}#Intent;scheme=inphrtest;package=com.softnet.inPHRCare;S.browser_fallback_url=${encodeURIComponent(
    //   playStoreUrl
    // )};end`;

    //   if (isAndroid && isChrome) {
    //     // Android Chrome에서 Intent URL 사용
    //     console.log(intentUrl);
    //     const iframe = document.createElement('iframe');
    //     iframe.style.display = 'none';
    //     iframe.src = intentUrl;
    //     document.body.appendChild(iframe);
    //     document.body.removeChild(iframe);
    //     // window.location.href = intentUrl;
    //   } else if (isIOS) {
    //     //iframe(inline frame): html안에 다른 html 삽입 가능
    //     const iframe = document.createElement('iframe');
    //     iframe.style.display = 'none';
    //     iframe.src = appScheme;
    //     document.body.appendChild(iframe);
    //     document.body.removeChild(iframe);
    //   }

    //   //앱 실행 후 대기 2초 후 redirect
    //   setTimeout(() => {
    //     if (Date.now() - startTime < 2000) {
    //       return;
    //     }
    //     if (storeUrl) {
    //       window.location.href = storeUrl;
    //     }
    //   }, 2000);
    // };

    // 초기 상태 'focus'
    let windowState = 'focus';

    // blur 이벤트 리스너 추가
    const handleBlur = () => {
      windowState = 'blur'; // 블러 상태로 변경
    };

    window.addEventListener('blur', handleBlur);

    // 앱 실행 시도
    window.location.href = appScheme;

    // 2초 후 상태 확인
    setTimeout(() => {
      // blur 상태면 앱이 실행 중임
      if (windowState === 'blur') {
        console.log('앱이 설치되어 실행');
      } else {
        // 설치되어 있지 않은 경우 스토어로 리다이렉트
        if (storeUrl) {
          window.location.href = storeUrl;
        }
      }

      // 이벤트 리스너 제거
      window.removeEventListener('blur', handleBlur);
    }, 2000);
  };

  return openApp;
};
