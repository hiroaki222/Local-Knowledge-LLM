"use client"

import { ldapSignUp } from "@/lib/actions/ldap-signup"

export default function Page() {
  return <button onClick={() => ldapSignUp("aaaaa", "bbbbb")}>abba</button>
}