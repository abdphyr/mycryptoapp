import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, LineElement, PointElement, LinearScale, Title, CategoryScale } from 'chart.js';
import { Col, Row, Typography } from 'antd';
import { History } from '../types';

ChartJS.register(LineElement, PointElement, LinearScale, CategoryScale, Title);

interface ChartProps {
    cryptoHistory: History;
    historyFetching: boolean;
    currentPrice: string;
    coinName: string;
}

const LineChart: React.FC<ChartProps> = (props) => {
    const { cryptoHistory, historyFetching, currentPrice, coinName } = props
    const coinPrice = [];
    const coinTimestamp = [];



    if (!historyFetching) {
        for (let i = 0; i < cryptoHistory.history?.length; i += 1) {
            coinPrice.push(cryptoHistory?.history[i].price);
            coinTimestamp.push(new Date(cryptoHistory?.history[i].timestamp).toLocaleDateString());
        }
    }

    const data = {
        labels: coinTimestamp,
        datasets: [
            {
                label: 'Price In USD',
                data: coinPrice,
                fill: false,
                backgroundColor: '#0071bd',
                borderColor: '#0071bd',
            },
        ],
    };

    const options = {
        scales: {
            yAxes: [
                {
                    ticks: {
                        beginAtZero: true,
                    },
                },
            ],
        },
    };

    return (
        <>
            <Row className="chart-header">
                <Typography.Title level={2} className="chart-title">{coinName} Price Chart </Typography.Title>
                <Col className="price-container">
                    <Typography.Title level={5} className="price-change">Change: {cryptoHistory?.change}%</Typography.Title>
                    <Typography.Title level={5} className="current-price">Current {coinName} Price: $ {currentPrice}</Typography.Title>
                </Col>
            </Row>
            <Line data={data} />
        </>
    );
};

export default LineChart;