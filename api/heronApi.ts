import axios from 'axios';

// post data to the endpoint https://app.herondata.io/api/transactions with basic auth using axios
// returns the response from the endpoint
export const postTransaction = async (data: IDBTransaction) => {
  const response = await axios.post(
    'https://app.herondata.io/api/transactions',
    data,
    {
      auth: {
        username,
        password,
      },
    }
  );
  return response;
};
