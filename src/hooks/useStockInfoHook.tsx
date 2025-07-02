import { useEffect } from "react";
import { httpRequest, HttpResponse } from "@/utils/http";
import { useStockInfoStore, IStockInterface } from "@/store/useStockInfoStore";
export function useStockInfo(dataId: string) {
  const setStockInfo = useStockInfoStore((state) => state.setStockInfo);

  useEffect(() => {
    httpRequest(
      "/api/v4/data",
      {
        method: "GET",
      },
      {
        dataset: "TaiwanStockInfo",
        data_id: dataId,
      }
    ).then((response: HttpResponse) => {
      const stockData = response.data.data as IStockInterface[];
      if (stockData && stockData.length > 0) {
        setStockInfo(stockData[0]);
      }
      console.log(response.data);
    });
  }, [dataId, setStockInfo]);
}
