/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./src/renderer/index.html', './src/**/*.{js,ts,jsx,tsx}'],
    theme: {
        extend: {
            colors: {
                white: '#D9DCD7',
                grey: '#545454',
                black: '#131313',
                red: '#b63232',
                pink_600: '#B6325B',
                pink_500: '#C76B88',
                pink_400: '#C6A3AE',
                orange_600: '#9C3F21',
                orange_500: '#DD7552',
                orange_400: '#F6B7A2',
                yellow_600: '#796D19',
                yellow_500: '#CEBF54',
                yellow_400: '#F0E69E',
                green_600: '#1C793D',
                green_500: '#65C587',
                green_400: '#A7D7B8',
                blue_600: '#2A6085',
                blue_500: '#60A4D3',
                blue_400: '#A3C7E0'
            },
            fontFamily: {
                assistant: ['Assistant'],
                supermercado: ['Supermercado One'],
                barrio: ['Barrio']
            },
            backgroundImage: {
                home: "url('../images/background_home.svg')",
                catalog: "url('../images/background_catalog.svg')"
            }
        }
    },
    plugins: []
}
