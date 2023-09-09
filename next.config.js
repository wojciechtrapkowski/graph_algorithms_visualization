/** @type {import('next').NextConfig} */

const isProduction = process.env.NEXT_PUBLIC_ENV === 'production';

module.exports = {
  ...(isProduction
    ? {
        output: 'export',
        assetPrefix: '/./path_finding_visualization',
      }
    : {}),
};
