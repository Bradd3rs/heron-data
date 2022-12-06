import axios from 'axios';
import { postTransaction } from './heronApi';

jest.mock('axios');

const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('postTransaction', () => {
  it('posts a transaction', async () => {
    const data = {
      id: '123',
      amount: 100,
      date: '2020-01-01',
      description: 'test',
      category: 'test',
    };
    mockedAxios.post.mockResolvedValueOnce({ data });
    const response = await postTransaction(data);
    expect(response).toEqual({ data });
    expect(mockedAxios.post).toHaveBeenCalledTimes(1);
    expect(mockedAxios.post).toHaveBeenCalledWith(
      'https://app.herondata.io/api/transactions',
      data,
      {
        auth: {
          username,
          password,
        },
      }
    );
  });
});
