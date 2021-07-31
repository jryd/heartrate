module.exports = api => {
  const isTest = api.env('test');
  if (isTest) {
    return {
      presets: [
        'react-app',
      ],
    };
  }
};
