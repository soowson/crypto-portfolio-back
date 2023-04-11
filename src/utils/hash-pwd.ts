import * as crypto from 'crypto';

export const hashPwd = (p: string): string => {
  const hmac = crypto.createHmac(
    'sha512',
    'asijh2189 ye291odjsakndxzxi782c90 juolj904365',
  );
  hmac.update(p);
  return hmac.digest('hex');
};
