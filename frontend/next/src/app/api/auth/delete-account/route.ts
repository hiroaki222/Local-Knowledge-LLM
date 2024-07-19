import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import ldap from 'ldapjs';
import { authOptions } from '../[...nextauth]/route';

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: '認証されていません' }, { status: 401 });
  }

  const { password } = await req.json();

  const client = ldap.createClient({
    url: process.env.LDAP_URL as string,
  });

  return new Promise((resolve) => {
    client.bind(session.user.name as string, password, (err) => {
      if (err) {
        client.unbind();
        resolve(NextResponse.json({ error: '認証エラー' }, { status: 401 }));
        return;
      }

      client.del(`cn=${session.user.name},${process.env.LDAP_BASE_DN}`, (err) => {
        client.unbind();
        if (err) {
          resolve(NextResponse.json({ error: 'アカウント削除エラー' }, { status: 500 }));
        } else {
          resolve(NextResponse.json({ message: 'アカウント削除成功' }, { status: 200 }));
        }
      });
    });
  });
}