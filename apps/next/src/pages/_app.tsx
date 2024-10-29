import { useEffect } from "react";
import { useRouter } from "next/router";
import { api } from "@fergeh/trpc";
import type { AppProps } from "../common/app-providers";
import "../styles/globals.css";

const GA_MEASUREMENT_ID = "G-4CVTQTFL7R";

const App = (props: AppProps) => {
  const { Component, pageProps } = props;
  const router = useRouter();

  useEffect(() => {
    // Add Google Analytics script
    const script = document.createElement("script");
    script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
    script.async = true;
    document.head.appendChild(script);

    // Initialize Google Analytics
    window.dataLayer = window.dataLayer || [];
    function gtag(...args: any[]) {
      window.dataLayer.push(args);
    }
    gtag("js", new Date());
    gtag("config", GA_MEASUREMENT_ID, { page_path: window.location.pathname });

    // Track page views on route changes
    const handleRouteChange = (url: string) => {
      gtag("config", GA_MEASUREMENT_ID, { page_path: url });
    };

    router.events.on("routeChangeComplete", handleRouteChange);
    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, [router.events]);

  if (Component.PageWrapper !== undefined) return Component.PageWrapper(props);
  return <Component {...pageProps} />;
};

export default api.withTRPC(App);
