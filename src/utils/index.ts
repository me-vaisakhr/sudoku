export const getRandomNumberFromList = (list: any[]) => {
  return list[Math.floor(Math.random() * list.length)];
};

export const getRandomNumber = (maxRange: number) => {
  return Math.floor(Math.random() * (maxRange - 1) + 1);
};

export const getCellRow = (index: number, rowLength: number) => {
  return Math.floor(index / rowLength);
};

export const getCellCol = (index: number, colLength: number) => {
  return index % colLength;
};
