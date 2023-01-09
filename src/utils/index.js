export const theme = [
  { color: "#01959F", background: "#F7FEFF", border: "#01959F" },
  { color: "#FA9810", background: "#FFFCF5", border: "#FEEABC" },
  { color: "#E11428", background: "#FFFCF5", border: "#F5B1B7" },
  { color: "#43936C", background: "#F8FBF9", border: "#B8DBCA" },
];

export const swapPosition = (arr, item, target) => {
  const newArr = arr.slice();
  let temp = newArr[item];
  newArr[item] = newArr[target];
  newArr[target] = temp;
  return { newArr };
};

export const swapMovePosition = (arr, target, obj) => {
  console.log(obj);
  const newArr2 = arr.slice();
  newArr2.splice(target, 0, obj);
  return { newArr2 };
};
