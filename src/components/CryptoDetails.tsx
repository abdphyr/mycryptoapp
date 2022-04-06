import React, { useState } from 'react';
import HTMlReactParser from 'html-react-parser';
import { v4 } from 'uuid';
import { useParams } from 'react-router-dom';
import { Col, Row, Typography, Select } from 'antd';
import { NumberOutlined, CheckOutlined, MoneyCollectOutlined, DollarCircleOutlined, FundOutlined, ExclamationCircleOutlined, StopOutlined, TrophyOutlined } from '@ant-design/icons';
import { useGetCryptoDetailsQuery, useGetCryptosHistoryQuery } from '../services/cryptoApi';
import millify from 'millify';
import HTMLReactParser from 'html-react-parser';
import LineChart from './LineChart';
import { Coin, History } from '../types';

const { Title, Text } = Typography;
const { Option } = Select;

const CryptoDetails: React.FC = () => {

    let coin_id = '';
    const { coinId } = useParams()
    if (coinId) {
        coin_id = coinId
    }
    const [timePeriod, setTimePeriod] = useState('7d');
    const { data, isFetching } = useGetCryptoDetailsQuery(coin_id)
    const { data: coinHistory, isFetching: historyFetching } = useGetCryptosHistoryQuery({ coinId: coin_id, timePeriod })

    const cryptoDetails: Coin = data?.data?.coin;
    const cryptoHistory: History = coinHistory?.data;

    const time = ['3h', '24h', '7d', '30d', '1y', '3m', '3y', '5y'];

    const stats = [
        { title: 'Price to USD', value: `$ ${cryptoDetails?.price && millify(+cryptoDetails?.price)}`, icon: <DollarCircleOutlined /> },
        { title: 'Rank', value: cryptoDetails?.rank, icon: <NumberOutlined /> },
        { title: 'Market Cap', value: `$ ${cryptoDetails?.marketCap && millify(+cryptoDetails?.marketCap)}`, icon: <DollarCircleOutlined /> },
        { title: 'All-time-high(daily avg.)', value: `$ ${cryptoDetails?.allTimeHigh?.price && millify(+cryptoDetails?.allTimeHigh?.price)}`, icon: <TrophyOutlined /> },
    ];

    const genericStats = [
        { title: 'Number Of Markets', value: cryptoDetails?.numberOfMarkets, icon: <FundOutlined /> },
        { title: 'Number Of Exchanges', value: cryptoDetails?.numberOfExchanges, icon: <MoneyCollectOutlined /> },
        { title: 'Aprroved Supply', value: cryptoDetails?.supply?.confirmed ? <CheckOutlined /> : <StopOutlined />, icon: <ExclamationCircleOutlined /> },
        { title: 'Total Supply', value: `$ ${cryptoDetails?.supply?.total && millify(+cryptoDetails?.supply?.total)}`, icon: <ExclamationCircleOutlined /> },
        { title: 'Circulating Supply', value: `$ ${cryptoDetails?.supply?.circulating && millify(+cryptoDetails?.supply?.circulating)}`, icon: <ExclamationCircleOutlined /> },
    ];

    if (!cryptoDetails) return <>Loading...</>;

    return (
        <Col className='coin-detail-container'>
            <Col className='coin-heading-container'>
                <Title level={2} className="coin-name">
                    {cryptoDetails.name}  price
                </Title>
                <p>
                    {cryptoDetails?.name} live price in USD dollars.
                    View  value statistics,market cup and supply
                </p>
            </Col>
            <Select
                defaultValue="7d"
                className='select-timeperiod'
                placeholder="set time period"
                onChange={(value) => setTimePeriod(value)}
            >
                {time.map((date) => <Option key={date}>{date}</Option>)}
            </Select>
            <div className='lineChart'><LineChart historyFetching={historyFetching} cryptoHistory={cryptoHistory} currentPrice={millify(Number.parseInt(cryptoDetails.price))} coinName={cryptoDetails.name} /></div>
            <Col className="stats-container">
                <Col className="coin-value-statistics">
                    <Col className="coin-value-statistics-heading">
                        <Title level={3} className="coin-details-heading">{cryptoDetails?.name} Value Statistics</Title>
                        <p>An overview showing the statistics of {cryptoDetails?.name}, such as the base and quote currency, the rank, and trading volume.</p>
                    </Col>
                    {stats.map(({ icon, title, value }) => (
                        <Col className="coin-stats" key={v4()} >
                            <Col className="coin-stats-name">
                                <Text>{icon}</Text>
                                <Text>{title}</Text>
                            </Col>
                            <Text className="stats">{value}</Text>
                        </Col>
                    ))}
                </Col>
                <Col className="other-stats-info">
                    <Col className="coin-value-statistics-heading">
                        <Title level={3} className="coin-details-heading">Other Stats Info</Title>
                        <p>An overview showing the statistics of {cryptoDetails?.name}, such as the base and quote currency, the rank, and trading volume.</p>
                    </Col>
                    {genericStats.map(({ icon, title, value }) => (
                        <Col className="coin-stats" key={v4()} >
                            <Col className="coin-stats-name">
                                <Text>{icon}</Text>
                                <Text>{title}</Text>
                            </Col>
                            <Text className="stats">{value}</Text>
                        </Col>
                    ))}
                </Col>
            </Col>
            <Col className='coin-desc-link'>
                <Row className='coin-desc'>
                    <Title className='coin-details-heading'>
                        What is {cryptoDetails?.name}
                        {HTMLReactParser(cryptoDetails.description)}
                    </Title>
                </Row>
                <Col className='coin-links'>
                    <Title level={3} className='coin-details-heading'>
                        {cryptoDetails?.name} Links
                    </Title>
                    {cryptoDetails.links.map((link) => (
                        <Row className='coin-link' key={v4()}>
                            <Title level={3} className='coin-name'>{link.type}</Title>
                            <a href={link.url} target="_blank">
                                {link.name}
                            </a>
                        </Row>
                    ))}
                </Col>
            </Col>
        </Col>
    );
};

export default CryptoDetails;