import { createClient } from "ldapjs"
import { ldapSignIn } from "./lib/actions/ldap-signin"

const client = createClient({
    url: "ldap://ldap:3890",
  })

client.bind("cn=admin,ou=people,dc=ldap,dc=centre,dc=com", "password", (err) => {
  console.log(err ? "no" : "ok")
  client.unbind()
})

// console.log(process.env.LDAP_URL)

const res = await ldapSignIn("admin", "password")

MONGO_URL=mongo://mongo:27017