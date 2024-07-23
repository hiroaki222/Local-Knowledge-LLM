declare module 'ldapjs' {
    export interface Client {
      bind(dn: string, password: string, callback: (error: Error | null) => void): void;
      unbind(): void;
      add(dn: string, entry: object, callback: (error: Error | null) => void): void;
    }
  
    export function createClient(options: { url: string }): Client;
  }