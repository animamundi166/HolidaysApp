export interface IHoliday {
  date: string;
  localName: string;
  name: string;
}

const getHolidays = async (countryCode: string, year: number): Promise<IHoliday[]> => {
  const response = await fetch(`https://date.nager.at/api/v3/publicholidays/${year}/${countryCode}`);
  const holidays = await response.json();
  return holidays;
};

export default getHolidays;
