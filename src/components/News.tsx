

import React, { useState } from 'react';
import { Select, Typography, Row, Col, Avatar, Card } from 'antd';
import moment from 'moment';
import { useGetCryptosNewsQuery } from '../services/cryptoNewsApi'
import { useGetCryptosQuery } from '../services/cryptoApi';
import { NewsItem, Cryptos } from '../types';

const { Title, Text } = Typography;
const { Option } = Select
const demoImage = "https://coinrevolution.com/wp-content/uploads/2020/06/cryptonews.jpg";

interface NewsProps {
    sipmlified?: boolean;
}

const News: React.FC<NewsProps> = ({ sipmlified }) => {

    const [newsCategory, setNewsCategory] = useState("Cryptocurrency")
    const { data: cryptoNews, isFetching } = useGetCryptosNewsQuery({ newsCategory, count: sipmlified ? 6 : 12 });
    const { data } = useGetCryptosQuery(50);

    const cryptos: Cryptos['coins'] = data?.data?.coins;
    const news: NewsItem[] = cryptoNews?.value;

    if (!news) return <>Loading ...</>

    return (
        <Row gutter={[24, 24]}>
            {!sipmlified && (
                <Col span={24}>
                    <Select
                        showSearch
                        className='select-news'
                        placeholder="Select new category"
                        optionFilterProp='children'
                        onChange={(e) => setNewsCategory(e)}
                    >
                        <Option value="Cryptocurrency">Cryptocurrency</Option>
                        {cryptos?.map((currency) => <Option key={currency.uuid} value={currency.name}>{currency.name}</Option>)}
                    </Select>
                </Col>
            )}
            {news.map((news, id) => (
                <Col xs={24} sm={12} lg={8} key={id}>
                    <Card hoverable className='news-card'>
                        <a href={news.url} target="_blank">
                            <div className='news-image-container'>
                                <Title className="news-title" level={4}>{news.name}</Title>
                                <img width="70px" height="70px" src={news?.image?.thumbnail?.contentUrl || demoImage} alt="News image" />
                            </div>
                            <p>
                                {news.description.length > 100 ? `${news.description.substring(0, 100)}...` : news.description}
                            </p>
                            <div className='provider-container'>
                                <div>
                                    <Avatar src={news.provider[0]?.image?.thumbnail?.contentUrl || demoImage} alt="Image" />
                                    <Text className="provider-name">{news.provider[0]?.name}</Text>
                                </div>
                                <Text>{moment(news.datePublished).startOf('hour').fromNow()}</Text>
                            </div>
                        </a>
                    </Card>
                </Col>
            ))}
        </Row>
    );
};

export default News;