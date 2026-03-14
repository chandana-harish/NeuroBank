import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// Mock data representing the dashboard state based on the image provided
const mockDashboardData = {
  user: {
    firstName: "George",
    lastName: "Smith",
  },
  insights: {
    message: "Your Transaction Volume has increased by 5% Since last Month",
  },
  balance: {
    total: 80820,
    percentageChange: 12,
    transactionsCount: 44,
    categoriesCount: 12,
    history: [
      { day: "15", amount: 75000 },
      { day: "16", amount: 76500 },
      { day: "17", amount: 76000 },
      { day: "18", amount: 77000 },
      { day: "19", amount: 78500 },
      { day: "20", amount: 78000 },
      { day: "21", amount: 80820 },
      { day: "22", amount: 80200 },
      { day: "23", amount: 80500 },
      { day: "24", amount: 80820 }
    ]
  },
  earnings: {
    total: 80820,
    percentageChange: 7,
    progressPercentage: 58,
  },
  transactions: [
    { id: 1, merchant: "PlayStation", amount: -19.99, card: "**** 0224", date: "31 Mar, 3:20 PM", type: "expense", logo: "Gamepad2" },
    { id: 2, merchant: "Netflix", amount: -30.00, card: "**** 0224", date: "29 Mar, 5:11 PM", type: "expense", logo: "Film" },
    { id: 3, merchant: "Airbnb", amount: -300.00, card: "**** 4432", date: "29 Mar, 1:20 PM", type: "expense", logo: "Home" },
    { id: 4, merchant: "Tommy C.", amount: 27.00, card: "**** 0224", date: "27 Mar, 2:31 AM", type: "income", logo: "User" },
    { id: 5, merchant: "Apple", amount: -10.00, card: "**** 4432", date: "27 Mar, 11:04 PM", type: "expense", logo: "Smartphone" }
  ],
  spending: {
    total: 91468,
    percentageChange: -2,
    categories: [
      { name: "Clothing", value: 34 },
      { name: "Groceries", value: 16 },
      { name: "Pets", value: 8 },
      { name: "Bills", value: 6 }
    ]
  }
};

export const api = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: '/' }), // Using dummy root since it's mock
  reducerPath: 'adminApi',
  endpoints: (build) => ({
    getDashboard: build.query({
      queryFn: async () => {
        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 800));
        return { data: mockDashboardData };
      }
    })
  })
});

export const { useGetDashboardQuery } = api;
