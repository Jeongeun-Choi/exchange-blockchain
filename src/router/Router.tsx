import ExchangedHistoryPage from "../pages/ExchangedHistoryPage";
import ExchangingPage from "../pages/ExchangingPage";

export const routes = [
  { path: "/exchanging", element: <ExchangingPage />, title: "환전하기" },
  { path: "/history", element: <ExchangedHistoryPage />, title: "거래내역" },
];
