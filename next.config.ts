const nextConfig = {
  images: {
    remotePatterns: [{ protocol: "https", hostname: "*" }],
  },
  // experimental: {
  //   ppr: "incremental",
  // },
  devIndicators: {
    position: "bottom-right",
  },
};

export default nextConfig;
