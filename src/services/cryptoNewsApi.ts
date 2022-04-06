
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

interface GetCryptoNews {
    newsCategory: string;
    count: number;
}

const cryptoNewsHeaders = {
    'x-bingapis-sdk': 'true',
    'x-rapidapi-host': 'bing-news-search1.p.rapidapi.com',
    'x-rapidapi-key': '9f49a1a611msh8a4ea366e39baf5p1be11ejsn0d40b8bf05c0'
}

const baseUrl = 'https://bing-news-search1.p.rapidapi.com'
const createRequest = (url: string) => ({ url, headers: cryptoNewsHeaders })

export const cryptoNewsApi = createApi({
    reducerPath: "cryptoNewsApi",
    baseQuery: fetchBaseQuery({ baseUrl }),
    endpoints: (builder) => ({
        getCryptosNews: builder.query({
            query: ({ newsCategory, count }: GetCryptoNews) => createRequest(`/news/search?q=${newsCategory}&safeSearch=Off&textFormat=Raw&freshness=Day&count=${count}`)
        })
    })
})

export const {
    useGetCryptosNewsQuery,
} = cryptoNewsApi;