const stringlengrh = function(inputPhrase, maximumlength){
  if (inputPhrase.length <= maximumlength){
    return true;
  }else{
    return false;
  }

};

const palindrome = function(inputPhrase){
  let string = inputPhrase.replaceAll('', '');
  string = string.toUpperCase();
  let newPhrase = '';
  for (let i = string.length - 1; i >= 0;i--){
    newPhrase += string[i];
  }
  if (newPhrase === string){
    return true;
  }
  return false;
};


