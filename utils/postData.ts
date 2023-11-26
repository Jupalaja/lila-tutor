// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function postData(url: string, data: any): Promise<boolean> {
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
  
      return response.ok;
    } catch (err) {
      console.error('Failed to send data', err);
      return false;
    }
  }
  
  export default postData;
  