import axios, {AxiosResponse} from 'axios';

const API_URL = 'https://rickandmortyapi.com/api/character';

export class SEARCH {
  static async getCharacters(
    page: number = 1,
    nameFilter?: string,
  ): Promise<AxiosResponse<any>> {
    const params = {
      page,
      name: nameFilter,
    };

    const response = await axios.get(API_URL, {params});
    return response;
  }
}
