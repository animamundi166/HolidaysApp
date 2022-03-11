import { FC, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import getCountryInfo, { ICountryInfo } from "../../api/getCountryInfo";
import { Button, Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import { Avatar } from '@mui/material';
import style from './CountryInfo.module.scss';


const CountryInfo: FC = () => {
  const [countryInfo, setCountryInfo] = useState<ICountryInfo | null>(null);
  const { countryCode } = useParams();
  const navigate = useNavigate();

  const fetchCountryInfo = async () => {
    setCountryInfo(null);
    const newCountryInfo = await getCountryInfo(countryCode!);
    setCountryInfo(newCountryInfo);
  };

  const handleCountryClick = (countryCode: string) => {
    navigate(`/countries/${countryCode}`)
  };

  const handleMainPageClick = () => {
    navigate('/')
  };

  const handleHolydaysClick = (countryCode: string) => {
    navigate(`/countries/${countryCode}/holidays`)
  };

  useEffect(() => {
    fetchCountryInfo();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [countryCode]);

  return (
    <div className={style.main}>
      {!countryInfo && <Spin indicator={<LoadingOutlined style={{ fontSize: 30 }} spin />} />}
      {countryInfo && (
        <div className={style.info}>
          <div>
            <img src={`https://flagcdn.com/w320/${countryInfo.countryCode.toLowerCase()}.png`}
              alt={countryInfo.officialName} />
          </div>
          <div>{countryInfo.officialName}</div>
          <div className={style.avatars}>
            {countryInfo.borders.map(({ countryCode }) => (
              <Avatar
                className={style.avatar}
                key={countryCode}
                onClick={() => handleCountryClick(countryCode)}
              >
                {countryCode}
              </Avatar>
            ))}
          </div>
          <div className={style.buttons}>
            <Button onClick={handleMainPageClick} type="primary">Main Page</Button>
            <Button onClick={() => handleHolydaysClick(countryInfo.countryCode)} type="primary">Holidays</Button>
          </div>
        </div>
      )}
    </div>
  )
};

export default CountryInfo;
