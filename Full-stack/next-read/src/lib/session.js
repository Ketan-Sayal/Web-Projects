import 'server-only'
import { SignJWT, jwtVerify } from 'jose'
import { cookies } from 'next/headers';
// import { SessionPayload } from '@/app/lib/definitions'
 
const secretKey = process.env.SESSION_SECRET;
const encodedKey = new TextEncoder().encode(secretKey);
 
export async function encrypt(payload) {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('3d')
    .sign(encodedKey)
}
 
export async function decrypt(session) {
  try {
    const { payload } = await jwtVerify(session, encodedKey, {
      algorithms: ['HS256'],
    });
    return payload;
  } catch (error) {
    console.log('Failed to verify session')
  }
}

export async function createSession(userId) {
    const expiryDate = new Date(Date.now()+5*24*60*60*1000);
    const payload = {_id:userId, expiryDate};
    const excryptData = await encrypt(payload);
    const cooKieStore = await cookies();
    cooKieStore.set("token", excryptData, {httpOnly:true, secure:true, expires:expiryDate, path:"/"});
}