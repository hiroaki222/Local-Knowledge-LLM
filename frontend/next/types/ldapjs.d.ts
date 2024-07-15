declare module 'ldapjs' {
    export function createClient(options: any): Client;

    export interface Client {
        bind(dn: string, password: string, callback: (err: Error | null) => void): void;
        add(dn: string, entry: any, callback: (err: Error | null) => void): void;
        unbind(callback: (err: Error | null) => void): void;
    }
}
