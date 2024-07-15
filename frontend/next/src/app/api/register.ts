import { NextApiRequest, NextApiResponse } from 'next';
import ldap from 'ldapjs';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'POST') {
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
        return;
    }

    const { email, password } = req.body;
    const emailLocalPart = email.split('@')[0];
    const dn = `uid=${emailLocalPart},ou=users,dc=example,dc=com`;

    const client = ldap.createClient({
        url: process.env.LDAP_URI,
    });

    client.bind('cn=admin,dc=example,dc=com', 'admin_password', (err) => {
        if (err) {
            res.status(500).json({ error: 'Failed to bind to LDAP server' });
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
            if (err) {
                res.status(500).json({ error: 'Failed to add user to LDAP server' });
            } else {
                res.status(201).json({ message: 'User registered successfully' });
            }
            client.unbind((unbindErr) => {
                if (unbindErr) {
                    console.error('Failed to unbind from LDAP server:', unbindErr);
                }
            });
        });
    });
}
