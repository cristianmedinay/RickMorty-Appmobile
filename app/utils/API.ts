import axios, {AxiosResponse} from 'axios';

const API_URL = 'https://rickandmortyapi.com/api/character';

export class API {
  static async getCharacters(limit: number) {
    const primerArray = Array.from({length: 10}, (_, index) => limit + index);
    const response = await fetch(`${API_URL}/${primerArray}`);
    if (!response.ok) {
      throw new Error(`Error: ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  }

  static async getCharacter(id: number): Promise<AxiosResponse<any>> {
    const response = await axios.get(`${API_URL}/${id}`);
    return response;
  }
}
