import { RouterProvider } from "react-router-dom";
import router from "./routes/MainRoute";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,

      retry: (failureCount, error) => {
        if (
          error?.response?.status === 401 ||
          error?.response?.status === 403 ||
          error?.response?.status === 404
        ) {
          return false;
        }

        return failureCount < 1;
      },

      // onError: (err) =>
      //   notifications("Error", `${err?.response?.data?.message}`, "error"),
    },

    mutations: {
      // onError: (err) =>
      //   notifications("Error", `${err?.response?.data?.message}`, "error"),
    },
  },
});

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
};

export default App;
