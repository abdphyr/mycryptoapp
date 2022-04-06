

export interface Cryptos {
    coins: {
        "24hVolume": string;
        btcPrice: string;
        change: string;
        coinrankingUrl: string;
        color: string;
        iconUrl: string;
        listedAt: number;
        lowVolume: boolean;
        marketCap: string;
        name: string;
        price: string;
        rank: number;
        sparkline: string[];
        symbol: string;
        tier: number;
        uuid: string;
    }[];
    stats: {
        bestCoins: {
            coinrankingUrl: string;
            iconUrl: string;
            name: string;
            symbol: string;
            uuid: string;
        }[];
        btcDominance: number;
        newestCoins: {
            coinrankingUrl: string;
            iconUrl: string;
            name: string;
            symbol: string;
            uuid: string;
        }[];
        referenceCurrencyRate: 1
        total: number;
        total24hVolume: string;
        totalCoins: number;
        totalExchanges: number;
        totalMarketCap: string;
        totalMarkets: number;
    }
}

export interface Coin {
    "24hVolume": string;
    allTimeHigh: { price: string, timestamp: number }
    btcPrice: string;
    change: string;
    coinrankingUrl: string;
    color: string
    description: string;
    iconUrl: string;
    links: {
        name: string;
        type: string;
        url: string;
    }[]
    listedAt: number
    lowVolume: boolean;
    marketCap: string;
    name: string;
    numberOfExchanges: number
    numberOfMarkets: number;
    price: string;
    priceAt: number
    rank: number;
    sparkline: string[];
    supply: {
        confirmed: boolean,
        total: string;
        circulating: string;
    }
    symbol: string;
    tier: number;
    uuid: string;
    websiteUrl: string;
}

export interface History {
    history: {
        price: string;
        timestamp: number;
    }[];
    change: string;
}

export interface NewsItem {
    category: string;
    datePublished: string;
    description: string;
    image: {
        _type: "ImageObject";
        thumbnail: {
            contentUrl: string;
            height: number;
            width: number;
            _type: "ImageObject";
        }
    };
    name: string;
    provider: {
        _type: "Organization";
        name: string;
        image: {
            _type: "ImageObject";
            thumbnail: {
                contentUrl: string;
                _type: "ImageObject";
            }
        }
    }[];
    url: string;
    _type: "NewsArticle"
}