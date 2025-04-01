const colorPalette = [
    "16, 24, 39",
    "20, 83, 45",
    "120, 53, 15",
    "127, 29, 29",
    "158, 25, 86",
    "51, 31, 128",
    "187, 71, 36",
    "232, 105, 21",
    "72, 66, 167",
    "53, 122, 91",
    "2, 5, 141",
  ];
  
  // Optional: Cache per merchant to keep color consistent
  const merchantColorMap: { [key: string]: string } = {};
  
  export const getMerchantColor = (merchantName: string) => {
    if (merchantColorMap[merchantName]) return merchantColorMap[merchantName];
    const randomColor = colorPalette[Math.floor(Math.random() * colorPalette.length)];
    merchantColorMap[merchantName] = randomColor;
    return randomColor;
  };
  
  export const getInitials = (merchantName: string) => {
    if (!merchantName) return "";
    const words = merchantName.trim().split(" ");
    if (words.length === 1) return words[0].slice(0, 2);
    return words[0][0] + words[1][0];
  };
  