const nextConfig = {
  typescript:{
    ignoreBuildErrors:true
  },
  eslint:{
  ignoreDuringBuilds:true
  },
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
