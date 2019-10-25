const random_jokes = [
  {
    title: 'What is the object oriented way to get wealthy ?',
      body: 'Inheritance',
  },
  {
    title: 'To understand what recursion is...',
    body: "You must first understand what recursion is",
  },
  {
    title: 'What do you call a factory that sells passable products?',
    body: 'A satisfactory',
  },
];
//let random_joke_call_count = 0;
export default {
  'get /dev/random_joke': function (req, res) {

    const responseObj = random_jokes[randomNum(0,2)];
    console.log(responseObj)
    random_joke_call_count += 1;
    setTimeout(() => {
      res.json(responseObj);
    }, 500);
  },
};

function randomNum(minNum,maxNum){ 
  switch(arguments.length){ 
      case 1: 
          return parseInt(Math.random()*minNum+1,10); 
      break; 
      case 2: 
          return parseInt(Math.random()*(maxNum-minNum+1)+minNum,10); 
      break; 
          default: 
              return 0; 
          break; 
  } 
} 