export const getInitials = (merchantName: string) => {
    if (!merchantName) return '';
    const words = merchantName.trim().split(' ');
    if (words.length === 1) return words[0].slice(0, 2);
    return words[0][0] + words[1][0];
  };
  