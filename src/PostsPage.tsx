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
        const encodedData = data.map((item: IData) => ({
          ...item,
          loginId: encodeURIComponent(item.loginId),
        }));
        setQRCodeList(encodedData);
      });
  }, []);

  console.log(qrCodeList);

  const bandNoList = [25, 26, 27, 28, 29, 30, 40, 41, 42, 43];

  return (
    <>
      <div className='flex flex-wrap w-full my-4'>
        {qrCodeList &&
          qrCodeList.map(
            ({ code_seqno, macAddress, memberSeqNo, loginId }, index) => (
              <div key={code_seqno} className='p-8'>
                <QRCodeCanvas
                  value={`https://compass-qr-web.inphrcare.com/appRedirect?mac_address=${macAddress}&member_seqNo=${memberSeqNo}&login_id=${loginId}`}
                  size={100}
                />
                <p className='font-bold text-sm'>
                  bandNo: {index < bandNoList.length ? bandNoList[index] : ''}
                </p>
                <p className='font-bold text-sm'>loginId: {loginId}</p>
                <p className=' font-thin text-sm'>{macAddress}</p>
              </div>
            )
          )}
      </div>
    </>
  );
};
