import { useEffect } from 'react';

import { useAppRedirect } from './useRedirect';

export const AppRedirectPage = () => {
  const queryParams = new URLSearchParams(location.search);
  const macAddress = queryParams.get('mac_address');
  const memberSeqNo = queryParams.get('member_seqNo');
  const loginId = queryParams.get('login_id');

  const params = {
    macAddress: macAddress,
    memberSeqNo: memberSeqNo,
    loginId: loginId,
  };

  const openApp = useAppRedirect(params);

  useEffect(() => {
    setTimeout(() => {
      openApp();
    }, 100);
  }, [openApp]);
  return (
    <div className='flex flex-wrap w-full my-4 text-xl'>
      {/* <Link
        to={`inphrtest://open?mac_address=${macAddress}&member_seqNo=${memberSeqNo}&login_id=${loginId}`}
      >{`inphrest://open?mac_address=${macAddress}&member_seqNo=${memberSeqNo}&login_id=${loginId}`}</Link> */}
    </div>
  );
};
