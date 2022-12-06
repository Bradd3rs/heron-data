import axios from 'axios';

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
