export function makeRand(length = 10) {
  var result = "";
  var characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

export const calcPoints = (amount: number) => {
  let points = 0;
  if (amount >= 5000) {
    if (amount <= 10000) {
      points = amount * (1 / 100);
    } else if (amount > 10000 && amount < 25000) {
      points = amount * (2.5 / 100);
    } else if (amount > 25000) {
      points = amount * (5 / 100);
    }
  }
  return points;
};
