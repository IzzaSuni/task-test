export const theme = [
  { color: "#01959F", background: "#F7FEFF", border: "#01959F" },
  { color: "#FA9810", background: "#FFFCF5", border: "#FEEABC" },
  { color: "#E11428", background: "#FFFCF5", border: "#F5B1B7" },
  { color: "#43936C", background: "#F8FBF9", border: "#B8DBCA" },
];

export const swapPosition = (arr, item, target) => {
  let temp = arr[item];
  arr[item] = arr[target];
  arr[target] = temp;
  return arr;
};
