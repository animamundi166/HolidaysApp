import { FC, useEffect, useState } from 'react';
import getAllCountries, { IBaseAllCountries } from './api/getAllCountries';
import { useNavigate } from 'react-router-dom';
import style from './App.module.scss';
import { Select, Button, Spin, message } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import 'antd/dist/antd.css';

const App: FC = () => {
  const [countries, setCountries] = useState<IBaseAllCountries[] | null>(null);
  const [countryCode, setcountryCode] = useState('');
  const navigate = useNavigate();
  const { Option } = Select;

  const fetchAllCountries = async () => {
    const response = await getAllCountries();
    setCountries(response);
  };

  const handleChange = (value: any) => {
    setcountryCode(value);
  }

  const error = () => {
    message.error('Please select a country');
  };

  const handleOnClick = (countryCode: string) => {
    if (countryCode) {
      navigate(`/countries/${countryCode}`);
    } else { error() }
  }

  useEffect(() => {
    fetchAllCountries();
  }, []);

  return (
    <div className={style.main}>
      {!countries && <Spin indicator={<LoadingOutlined style={{ fontSize: 30 }} spin />} />}
      {countries && (
        <div>
          <Select defaultValue="Select a Country" style={{ width: 300 }} onChange={handleChange}>
            {countries.map((country) => (
              <Option
                key={country.countryCode}
                value={country.countryCode}>
                <img className={style.img}
                  loading="lazy"
                  width="20"
                  src={`https://flagcdn.com/w20/${country.countryCode.toLowerCase()}.jpg`}
                  srcSet={`https://flagcdn.com/w40/${country.countryCode.toLowerCase()}.png 2x`}
                  alt={country.name}
                />
                {country.name}
              </Option>
            ))}
          </Select>
          <Button onClick={() => handleOnClick(countryCode)} type="primary">Show Info</Button>
        </div>)}
    </div>)
}

export default App;
