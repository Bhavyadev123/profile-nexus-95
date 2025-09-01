import { Provider } from 'react-redux';
import { useEffect } from 'react';
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { store } from './store/store';
import { Layout } from './components/layout/Layout';
import HomePage from "./pages/HomePage";
import ProfileFormPage from "./pages/ProfileFormPage";
import ProfilePage from "./pages/ProfilePage";
import NotFound from "./pages/NotFound";
import { useAppDispatch } from './store/hooks';
import { loadProfileFromStorage } from './store/profileSlice';

const queryClient = new QueryClient();

const AppContent = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(loadProfileFromStorage());
  }, [dispatch]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="profile-form" element={<ProfileFormPage />} />
          <Route path="profile" element={<ProfilePage />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

const App = () => (
  <Provider store={store}>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <AppContent />
      </TooltipProvider>
    </QueryClientProvider>
  </Provider>
);

export default App;
