import { FC } from "react";
import { Route, Routes } from "react-router-dom";
import App from "./App";
import CountryInfo from './components/CountryInfo/CountryInfo'
import CountryHolidays from './components/CountryHolidays/CountryHolidays'

const AppRoutes: FC = () => {
  return (
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/countries/:countryCode" element={<CountryInfo />} />
      <Route path="/countries/:countryCode/holidays" element={<CountryHolidays />} />
      <Route path="*" element="Not Found" />
    </Routes>
  );
};

export default AppRoutes;
