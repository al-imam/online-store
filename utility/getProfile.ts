function getProfile(char: string) {
  const colorWhile = Math.floor(Math.random() * 360);
  return {
    bg: `hsl(${colorWhile} 100% 75%)`,
    fg: `hsl(${colorWhile} 100% 5%)`,
    char,
  };
}

export default getProfile;
