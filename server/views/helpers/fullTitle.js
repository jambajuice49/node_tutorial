// console.log ("file read");
let _ = require('lodash');

module.exports = function (context) {
    console.log("I;m in");
    let baseTitle = "Ruby on Tails Tutorial Sample App";
    // console.log(page_title);
    // console.log(page_title.length);
    //return baseTitle;
    if (this['Title']  == undefined){
        console.log("context is empty");
        return baseTitle;
        // this['Title'] = baseTitle
        // return context.fn(this);
    }
    else{
      console.log("context is not empty");
      console.log(context);
      console.log(this);
      return this['Title'] + " | " + baseTitle;
    //   context['Title'] = context['Title'] + " | " + baseTitle;
    //   return context.fn(this);
    }
}
