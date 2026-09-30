import type { NextConfig } from "next"

const nextConfig: NextConfig = {
    allowedDevOrigins: [
        'http://192.168.1.50:3000',
        'http://localhost:3000',
        '192.168.1.50'
    ]
}

export default nextConfig
