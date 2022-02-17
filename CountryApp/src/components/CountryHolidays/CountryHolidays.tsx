import { FC, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import getHolidays, { IHoliday } from "../../api/getHolidays";
import { DatePicker, Divider, Button, Spin, Timeline, Space, message } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import style from './CountryHolidays.module.scss';

const CountryHolidays: FC = () => {
  const [holidays, setHolidays] = useState<IHoliday[] | null>(null);
  const [year, setYear] = useState<number>(2022);
  const { countryCode } = useParams();
  const navigate = useNavigate();
  // const [searchParams] = useSearchParams();

  // const dateAsString = searchParams.get('date');

  const fetchHolidays = async () => {
    // const date = dateAsString
    //   ? new Date(dateAsString)
    //   : new Date();
    const newHolidays = await getHolidays(countryCode!, year);
    setHolidays(newHolidays);
  };

  useEffect(() => {
    fetchHolidays();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  const handleCountryClick = (countryCode: string) => {
    navigate(`/countries/${countryCode}`)
  };

  const onChange = (date: any, dateString: string) => {
    setYear(Number(dateString));
  }

  const error = () => {
    message.error('Please select a year');
  };

  const handleShowHolidays = () => {
    if (year === 0) {
      error();
    }
    else {
      handleOnYear(countryCode!, year);
    }
  }

  const handleOnYear = async (countryCode: string, year: string | number) => {
    const newHolidays = await getHolidays(countryCode!, Number(year));
    setHolidays(newHolidays);
  };

  const handleMainPageClick = () => {
    navigate('/')
  };

  return (
    <div className={style.main}>
      {!holidays && <Spin indicator={<LoadingOutlined style={{ fontSize: 30 }} spin />} />}
      <div>
        <Space direction="vertical">
          <DatePicker onChange={onChange} picker="year" />
        </Space>
        <Button onClick={handleShowHolidays} type="primary">Show Holidays</Button>
      </div>
      <Divider />
      <Timeline mode="alternate">
        {holidays && (
          holidays.map((info) => (
            <div className={style.timeline} key={`${info.name}${info.date}`}>
              <Timeline.Item color="green" className={style.item} label={info.date}><b>{info.localName}</b> ({info.name})</Timeline.Item>
            </div>
          )))}
      </Timeline>
      <Divider />
      <div className={style.buttons}>
        <Button onClick={() => handleCountryClick(countryCode!)} type="primary">Back to the Country Page</Button>
        <Button onClick={handleMainPageClick} type="primary">Back to the Main Page</Button>
      </div>
    </div >
  )
};

export default CountryHolidays;
