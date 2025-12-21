export class HttpAdapterInterface {

    get<T>(url: string): Promise<T> {
        throw new Error('Method not implemented.');
    }

}