import millify from 'millify';
import { Link } from 'react-router-dom';
import { Card, Col, Row, Input } from 'antd';
import React, { useState, useEffect } from 'react';
import { useGetCryptosQuery } from '../services/cryptoApi';
import { Cryptos } from '../types';

interface CryptocurrenciesProps{
    sipmlified?: boolean;
}

const Cryptocurrencies:React.FC<CryptocurrenciesProps> = ({ sipmlified }) => {

    const count: number = sipmlified ? 10 : 50;
    const { data: cryptosList, isFetching } = useGetCryptosQuery(count);
    const [cryptos, setCryptos] = useState([] as Cryptos['coins']);
    const [searchTerm, setSearchTerm] = useState("")

    useEffect(() => {
        const filteredData: Cryptos['coins'] = cryptosList?.data?.coins
            .filter((coin: Cryptos['coins'][number]) => coin.name.toLowerCase()
                .includes(searchTerm.toLowerCase()))
        setCryptos(filteredData)
    }, [cryptosList, searchTerm]);

    if (isFetching) return <>"Loading ..."</>;

    return (
        <>
            {!sipmlified && (
                <div className='search-crypto'>
                    <Input placeholder='Search cryptocurency'
                        onChange={(e) => setSearchTerm(e.target.value)} />
                </div>
            )}
            <Row gutter={[32, 32]} className="crypto-card-container">
                {cryptos?.map((currency) => (
                    <Col xs={24} sm={12} lg={6} className="crypto-card" key={currency.uuid} >
                        <Link to={`/crypto/${currency.uuid}`}>
                            <Card
                                title={`${currency.rank}. ${currency.name}`}
                                extra={<img className='crypto-image' src={currency.iconUrl} />}
                                hoverable
                            >
                                <p>Price:{millify(Number.parseInt(currency.price))}</p>
                                <p>Market Cap:{millify(Number.parseInt(currency.marketCap))}</p>
                                <p>Daily change:{millify(Number.parseInt(currency.change))}%</p>
                            </Card>
                        </Link>
                    </Col>
                ))}
            </Row>
        </>
    );
};

export default Cryptocurrencies;