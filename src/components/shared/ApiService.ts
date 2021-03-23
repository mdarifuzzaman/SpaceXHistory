export async function GetContentFromHub(url: string, token: string): Promise<any>{
    process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
    let endpoint = url;
    try{
        const requestOptions = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json', 'accept': 'application/json', 'X-Auth-Token': token }
        };

        const response = await fetch(endpoint, requestOptions).then((response: any) => response.json());
        return response;
    }
    catch (error) {
        return console.log(error);
    }
}