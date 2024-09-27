// import { useState, Suspense } from "react";
// import { ErrorBoundary, FallbackProps } from "react-error-boundary";

// import { PostsList } from "@/PostsList";
// import { UserIdSelect } from "@/UserIdSelect";

// export const PostsPage = () => {
//   const [userId, setUserId] = useState<number>(1);

//   const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
//     setUserId(Number(event.currentTarget.value));
//   };

//   const handleError = (error: Error) => {
//     console.error(error);
//   };

//   return (
//     <>
//       <UserIdSelect handleChange={handleChange} />
//       <ErrorBoundary
//         FallbackComponent={ErrorBoundaryFallback}
//         onError={handleError}
//       >
//         <Suspense fallback={<SuspenseFallback />}>
//           <PostsList userId={userId} />
//         </Suspense>
//       </ErrorBoundary>
//     </>
//   );
// };

// const ErrorBoundaryFallback = ({ error }: FallbackProps) => {
//   console.error(error);
//   return <h1>Error!!!</h1>;
// };

// const SuspenseFallback = () => {
//   return <h1>Loading...</h1>;
// };

import { Html5Qrcode } from 'html5-qrcode';
import QRCode, { QRCodeCanvas } from 'qrcode.react';
import { useState, useEffect, useRef } from 'react';

interface IData {
  code_seqno: number;
  qrCodeEncoder: string;
  macAddress: string;
  memberSeqNo: number;
  loginId: string;
}

export const PostsPage = () => {
  const [qrCodeList, setQRCodeList] = useState<IData[]>([]);
  useEffect(() => {
    fetch('http://localhost:8282/qrcode/get-qr')
      .then((response) => response.json())

      .then((data) => {
        const encodedData = data.map((item: IData) => ({
          ...item,
          loginId: encodeURIComponent(item.loginId),
        }));
        setQRCodeList(encodedData);
      });
  }, []);

  console.log(qrCodeList);

  // const handleRegisterOnClick = () => {

  //   fetch("http://localhost:8282/member/register")
  //   .then((response) => response.json())
  //   .then((data) => console.log(data));

  // }

  // const [scannedCode, setScannedCode] = useState("");
  // const [scanner, setScanner] = useState(null);
  // const scannerRef = useRef(null);

  // // QR 코드 스캔 성공 콜백 함수
  // const onScanSuccess = (decodedText: any, decodedResult: any) => {
  //   setScannedCode(decodedText);
  //   console.log(`Scanned code: ${decodedText}`);

  //   // QR 코드 값을 백엔드 API에 전송
  //   registerMember(decodedText);

  //   // QR 코드 스캔 성공 후 스캔을 중지합니다.
  //   // stopScanner();
  // };

  // // QR 코드 스캔 실패 콜백 함수
  // const onScanError = (error: any) => {
  //   console.warn(`Scan error: ${error}`);
  // };

  // // QR 코드 스캐너 초기화
  // const startScanner = () => {
  //   if (scannerRef.current && !scanner) {
  //     const html5QrCode = new Html5Qrcode("qr-reader");
  //     setScanner(html5QrCode);
  //     html5QrCode
  //       .start(
  //         { facingMode: "environment" }, // 카메라 방향
  //         { fps: 10, qrbox: 250 }, // 카메라 설정
  //         onScanSuccess,
  //         onScanError
  //       )
  //       .catch((err) => {
  //         console.error("Failed to start QR Code scanning.", err);
  //       });
  //   }
  // };

  // QR 코드 스캐너 중지
  // const stopScanner = () => {
  //   if (scanner) {
  //     scanner
  //       .stop()
  //       .then(() => {
  //         console.log("QR Code scanning stopped.");
  //         setScanner(null);
  //       })
  //       .catch((err) => {
  //         console.error("Failed to stop scanning.", err);
  //       });
  //   }
  // };

  // 백엔드 API에 회원 등록 요청
  // const registerMember = async (code: any) => {
  //   try {
  //     const response = await fetch("http://localhost:8080/api/register", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({ member: code }), // QR 코드 값 전달
  //     });

  //     if (response.ok) {
  //       const result = await response.json();
  //       console.log("Member registered:", result);
  //     } else {
  //       console.error("Failed to register member.");
  //     }
  //   } catch (error) {
  //     console.error("Error registering member:", error);
  //   }
  // };

  const qrUrl = `https://www.inphrcare.com`;

  return (
    <>
      {/* <button onClick={startScanner}>Start Scanner</button>
      <div
        id="qr-reader"
        ref={scannerRef}
        style={{ width: "300px", height: "300px" }}
      ></div> */}

      {/* {qrCodeList.length > 0 &&
        qrCodeList.map(({ code_seqno, qrCodeEncoder, mac_address }) => (
          <div key={code_seqno} style={{ width: "150px", display: "flex" }}>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <img
                key={qrCodeEncoder}
                src={`data:image/png;base64,${qrCodeEncoder}`}
                alt="QR Code"
              />
              <p>{mac_address}</p>
            </div>
          </div>
        ))} */}

      {/* <div className="flex flex-wrap w-full">
        <div className="w-80">01</div>
        <div className="w-80">02</div>
        <div className="w-80">03</div>
      </div> */}
      <div className='flex flex-wrap w-full my-4'>
        {qrCodeList &&
          qrCodeList.map(({ code_seqno, macAddress, memberSeqNo, loginId }) => (
            <div key={code_seqno} className='px-2'>
              <QRCodeCanvas
                // value={`https://www.inphrcare.com?mac_address=${macAddress}`}
                value={`inPHRTest://open?mac_address=${macAddress}&member_seqNo=${memberSeqNo}&login_id=${loginId}`}
                size={120}
              />
            </div>
          ))}
      </div>
    </>
  );
};
