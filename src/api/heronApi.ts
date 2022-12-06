import axios from 'axios';

export const postTransaction = async (description: string) => {
  const response = await axios.post(
    'https://app.herondata.io/api/merchants/extract/heron_hometask',
    {
      description,
    }
  );
  return response;
};
