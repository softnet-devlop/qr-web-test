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

import { QRCodeCanvas } from 'qrcode.react';
import { useState, useEffect } from 'react';

export interface IData {
  code_seqno: number;
  qrCodeEncoder: string;
  macAddress: string;
  memberSeqNo: number;
  loginId: string;
}

export const PostsPage = () => {
  const [qrCodeList, setQRCodeList] = useState<IData[]>([]);
  useEffect(() => {
    fetch('https://compass-qr.inphrcare.com/qrcode/get-qr')
      .then((response) => response.json())

      .then((data) => {
        const encodedData = data.slice(0, 10).map((item: IData) => ({
          ...item,
          loginId: encodeURIComponent(item.loginId),
        }));
        setQRCodeList(encodedData);
      });
  }, []);

  console.log(qrCodeList);

  const bandNoList = [25, 26, 27, 28, 29, 30, 40, 41, 42, 43];

  return (
    <div>
      {qrCodeList &&
        qrCodeList.map(
          ({ code_seqno, macAddress, memberSeqNo, loginId }, index) => (
            <div
              key={code_seqno}
              className='w-full h-screen flex flex-col items-center justify-center'
            >
              <div className='text-xl mb-6'>{index + 1}번 QR코드</div>
              <div className='p-16 flex flex-col items-center border'>
                <QRCodeCanvas
                  value={`https://compass-qr-web.inphrcare.com/appRedirect?mac_address=${macAddress}&member_seqNo=${memberSeqNo}&login_id=${loginId}`}
                  size={200}
                />
                <div className='mt-8 text-center'>
                  <p className='text-lg font-bold mb-2'>
                    밴드번호:{' '}
                    {index < bandNoList.length ? bandNoList[index] : ''}
                  </p>
                  <p className='text-lg mb-2'>아이디: {loginId}</p>
                  <p className='text-lg'>맥주소: {macAddress}</p>
                </div>
              </div>
            </div>
          )
        )}
    </div>
  );
};
