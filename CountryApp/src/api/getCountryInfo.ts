import axios from "axios";

interface IBaseCountryInfo {
  commonName: string;
  officialName: string;
  countryCode: string;
  region: string;
}

export interface ICountryInfo extends IBaseCountryInfo {
  borders: IBaseCountryInfo[];
}

const getCountryInfo = async (countryCode: string): Promise<ICountryInfo> => {
  const response = await axios.get<ICountryInfo>(`https://date.nager.at/api/v3/CountryInfo/${countryCode}`);
  return response.data;
};

export default getCountryInfo;
