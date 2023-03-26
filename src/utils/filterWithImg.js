const filterWithImg = (charList) => {
  return charList.filter(
    (char) =>
      char.thumbnail !==
        "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg" &&
      char.thumbnail !==
        "http://i.annihil.us/u/prod/marvel/i/mg/f/60/4c002e0305708.gif"
  );
};

export default filterWithImg;
