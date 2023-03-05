/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}'
  ],
  theme: {
    extend: {
      fontFamily: {
        Montserrat: ['Montserrat', 'sans-serif'],
        Inter: ['Inter', 'sans-serif']
      },
      colors: {
        'mn-blue': '#283A52',
        'mn-yellow': '#F3F440',
        'mn-gold-medium': '#DE8F68',
        'mn-gold': '#DF9844',
        'mn-blue-hover': '#4C94C4',
        'mn-red': '#B73E3E',

        'mn-green': '#03754A',
        'mynie-blue': '#144F58',
        'mynie-pink' : '#E87883',
        'mynie-purple': '#DDC2EA',
        'mynie-green-light': '#01947B',
        'mynie-yellow': '#FC997C',
        'mynie-light-blue': '#396EB0',
        'messenger-gray': '#E4E6EB',
        'messenger-blue': '#1A6ED8',
        'messenger-green': '#5FB073',
        'mynie-header': '#344767',
        'mynie-text': '#9FA7B7'
      },
      rotate: {
        '320': '320deg'
      }
    }
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/aspect-ratio'),
    require('@tailwindcss/line-clamp')
  ]
}
