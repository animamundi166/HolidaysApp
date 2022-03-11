import axios from "axios";

export interface IBaseAllCountries {
  countryCode: string;
  name: string;
};

const getAllCountries = async (): Promise<IBaseAllCountries[]> => {
  const response = await axios.get<IBaseAllCountries[]>('https://date.nager.at/api/v3/AvailableCountries');
  return response.data;
};

export default getAllCountries;
