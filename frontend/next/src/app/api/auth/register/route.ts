import { NextResponse } from 'next/server';
import ldap from 'ldapjs';

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();
    const emailLocalPart = email.split('@')[0];
    const dn = `uid=${emailLocalPart},ou=users,dc=example,dc=com`;

    const client = ldap.createClient({
      url: process.env.LDAP_URI as string, // 環境変数からURLを取得
    });

    return new Promise((resolve) => {
      client.bind(process.env.LDAP_ADMIN_DN as string, process.env.LDAP_ADMIN_PASSWORD as string, (err) => {
        if (err) {
          console.error('LDAP Bind Error:', err);
          client.unbind();
          resolve(NextResponse.json({ error: 'LDAP接続エラー' }, { status: 500 }));
          return;
        }

        const entry = {
          cn: emailLocalPart,
          sn: emailLocalPart,
          mail: email,
          objectClass: ['inetOrgPerson', 'top'],
          userPassword: password,
        };

        client.add(dn, entry, (err) => {
          client.unbind();
          if (err) {
            console.error('LDAP Add Error:', err);
            resolve(NextResponse.json({ error: 'ユーザー登録エラー' }, { status: 400 }));
          } else {
            resolve(NextResponse.json({ message: 'ユーザー登録成功' }, { status: 201 }));
          }
        });
      });
    });
  } catch (error) {
    console.error('Unexpected Error:', error);
    return NextResponse.json({ error: '予期せぬエラーが発生しました' }, { status: 500 });
  }
}
