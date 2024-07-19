import { NextResponse } from 'next/server';
import ldap from 'ldapjs';

export async function POST(req: Request) {
  const { username, password } = await req.json();

  const client = ldap.createClient({
    url: process.env.LDAP_URL as string,
  });

  return new Promise((resolve) => {
    client.bind(process.env.LDAP_ADMIN_DN as string, process.env.LDAP_ADMIN_PASSWORD as string, (err) => {
      if (err) {
        client.unbind();
        resolve(NextResponse.json({ error: 'LDAP接続エラー' }, { status: 500 }));
        return;
      }

      const entry = {
        cn: username,
        sn: username,
        objectClass: ['inetOrgPerson', 'organizationalPerson', 'person', 'top'],
        userPassword: password,
      };

      client.add(`cn=${username},${process.env.LDAP_BASE_DN}`, entry, (err) => {
        client.unbind();
        if (err) {
          resolve(NextResponse.json({ error: 'ユーザー登録エラー' }, { status: 400 }));
        } else {
          resolve(NextResponse.json({ message: 'ユーザー登録成功' }, { status: 201 }));
        }
      });
    });
  });
}