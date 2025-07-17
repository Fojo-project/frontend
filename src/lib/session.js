'use server';
import { cookies } from 'next/headers';

export async function getSessionCookie() {
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get('SESSION_COOKIE');

  if (!sessionCookie) return null;
  try {
    return JSON.parse(sessionCookie.value);
  } catch (error) {
    if (error) return null;
  }
}
export async function setSessionCookie(session) {
  const cookieStore = await cookies();
  const sessionValue = JSON.stringify(session);

  cookieStore.set('SESSION_COOKIE', sessionValue, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 60 * 60 * 24 * 7,
  });
}
export async function clearSessionCookie() {
  const cookieStore = await cookies();
  cookieStore.delete('SESSION_COOKIE', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
  });
}
