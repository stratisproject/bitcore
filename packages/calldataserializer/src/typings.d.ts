declare module 'bitcore-lib-cirrus' {
    const value: any;
    //export default value;
    export class Address {
        constructor(buffer: Buffer | string, network?: string) {}

        toBuffer();
        toStratisBuffer();
    };
}