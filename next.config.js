/** @type {import('next').NextConfig} */




const nextConfig = {
  poweredByHeader: false,
    images: {
        remotePatterns: [
          {
            protocol: 'https',
            hostname: 'szitjksnkskfwbckrzfc.supabase.co',
            port: '',
            pathname: '/storage/v1/object/public/**',
          },
          {
            protocol: 'https',
            hostname: 'th.bing.com',
            port: '',
            pathname: '/th/**',
          },
        ],
      },
      typescript: {
        ignoreBuildErrors: true,
      },
};

module.exports = nextConfig;
