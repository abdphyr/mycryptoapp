import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

interface GetCryptoHistory {
    coinId: string;
    timePeriod: string;
}

const cryptoApiHeaders = {
    'x-rapidapi-host': 'coinranking1.p.rapidapi.com',
    'x-rapidapi-key': '9f49a1a611msh8a4ea366e39baf5p1be11ejsn0d40b8bf05c0'
}
const baseUrl = 'https://coinranking1.p.rapidapi.com';
const createRequest = (url: string) => ({ url, headers: cryptoApiHeaders })

export const cryptoApi = createApi({
    reducerPath: "cryptoApi",
    baseQuery: fetchBaseQuery({ baseUrl }),
    endpoints: (builder) => ({
        getCryptos: builder.query({
            query: (count: number) => createRequest(`/coins?limit=${count}`)
        }),
        getCryptoDetails: builder.query({
            query: (coinId: string) => createRequest(`/coin/${coinId}`)
        }),
        getCryptosHistory: builder.query({
            query: ({ coinId, timePeriod }: GetCryptoHistory) => createRequest(`/coin/${coinId}/history?timePeriod=${timePeriod}`)
        })
    })
})

export const { useGetCryptosQuery, useGetCryptoDetailsQuery, useGetCryptosHistoryQuery } = cryptoApi;
