/** @type {import('next').NextConfig} */
import CaseSensitivePathsPlugin from'case-sensitive-paths-webpack-plugin'

const nextConfig = {
    webpack(config, options) {
        config.plugins.push(new CaseSensitivePathsPlugin())
return config
    },
    images:{
        domains:['res.cloudinary.com']
    }
};

export default nextConfig;
