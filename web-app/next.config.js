/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'export', // 'standalone' yerine 'export' yazmalısın.
  images: {
    unoptimized: true, // Statik export'ta image optimization hatası almamak için bu şart.
  },
}

module.exports = nextConfig