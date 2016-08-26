
(function() {
  'use strict';

  window._ = {};

  // Returns whatever value is passed as the argument. This function doesn't
  // seem very useful, but remember it--if a function needs to provide an
  // iterator when the user does not pass one in, this will be handy.


  // INTERNAL NOTES: Interesting findings here. Identities of empty objects {} are not equal. Finds strings to be false.

  _.identity = function(val) {
    return val;
  };


  /**
   * COLLECTIONS
   * ===========
   *
   * In this section, we'll have a look at functions that operate on collections
   * of values; in JavaScript, a 'collection' is something that can contain a
   * number of values--either an array or an object.
   *
   *
   * IMPORTANT NOTE!
   * ===========
   *
   * The .first function is implemented for you, to help guide you toward success
   * in your work on the following functions. Whenever you see a portion of the
   * assignment pre-completed, be sure to read and understanding it fully before
   * you proceed. Skipping this step will lead to considerably more difficulty
   * implementing the sections you are responsible for.
   */

  // Return an array of the first n elements of an array. If n is undefined,
  // return just the first element.


  // INTERNAL NOTES: Returns index 0 if the argument is undefined; otherwise slice the array from first to n, though if n is more than the array, returns the entire array. If n = 0, returns an empty array.
  _.first = function(array, n) {

    return n === undefined ? array[0] : array.slice(0, n);

  };



  // Like first, but for the last elements. If n is undefined, return just the last element



  // INTERNAL NOTES: If n is undefined, return the last element in the array. If n > the array.length, return the array. If it's less, slice the array from the length minus n to array.length. This is interesting b/c it's counting from the end of the array.
  _.last = function(array, n) {

    return n === undefined ? array.pop() : ((n >= array.length) ? array : array.slice(array.length - n, array.length));

  };





  // Call iterator(value, key, collection) for each element of collection.
  // Accepts both arrays and objects.
  //
  // Note: _.each does not have a return value, but rather simply runs the
  // iterator function over each item in the input collection.


  // INTERNAL NOTES: If collection is an Array, loop through each one and run the iterator. Else if the collection length is undefined (i.e. it's an object), find each key in the object and run the iterator over the value of each key in that object.
  _.each = function(collection, iterator) {

    if (Array.isArray(collection)) {
      for (var i = 0; i < collection.length; i++){
        iterator(collection[i], i, collection);
      }
    } else if (collection.length === undefined) {
      for (var key in collection) {
        iterator(collection[key], key, collection);
      }
    }

  };


  // Returns the index at which value can be found in the array, or -1 if value
  // is not present in the array.

  // INTERNAL NOTES: This was provided to us, but was a unique one. By setting the result to -1, it iterates over each item in the array and compares if the item is the target and the result is -1 (b/c we are looking for the first index). Then sets the result to index, returning the result of the index that the target is found. If we were looking for the last index of, we would remove the second condition of result === -1.
  _.indexOf = function(array, target){
    // TIP: Here's an example of a function that needs to iterate, which we've
    // implemented for you. Instead of using a standard `for` loop, though,
    // it uses the iteration helper `each`, which you will need to write.

    var result = -1;

    _.each(array, function(item, index) {
      if (item === target && result === -1) { //Because we are looking for the first index
        result = index;
      }
    });

    return result;
  };


  // Return all elements of an array that pass a truth test.

  // INTERNAL NOTES: Filters over a collection to see if items pass the test and pushes the items that do pass to a new array
  _.filter = function(collection, test) {

    var result = [];

    for (var i = 0; i < collection.length; i++) {
     if (test(collection[i])) {
       result.push(collection[i]);
     }
   }

   return result;

  };



  // Return all elements of an array that don't pass a truth test.

  // INTERNAL NOTES: The opposite of filter. Created a function called negate that takes a function and returns a function that does the opposite of what our original function argument intends to do. Then created a negativeTest variable running the negate function on the test before passing it as the test in filter.
  _.reject = function(collection, test) {

    function negate (something) { //Negate takes a function and returns a function that does the opposite of what our original function argument intends to do
      return function () {
          return !something.apply(this, arguments);
      };
    }

    var negativeTest = negate(test);

    return _.filter(collection, negativeTest);

    // TIP: see if you can re-use _.filter() here, without simply
    // copying code in and modifying it

  };


  // Produce a duplicate-free version of the array.

  // INTERNAL NOTES: Creates a new array. Created a function that pushes numbers that don't exist already in new array to it. We then use this function as a callback for our each function to loop through our array.
  _.uniq = function(array) {

    var newArray = [];

    function operation(num) {
      if (_.indexOf(newArray, num) < 0) {
        newArray.push(num);
      }
    }

    _.each(array, operation);

    return newArray;
  };


  // Return the results of applying an iterator to each element.
  // INTERNAL NOTES: Created a function that pushes the application of iterator on the argument that was passed onto it. We then use that function as a callback for our each function to loop through our array.
  _.map = function(collection, iterator) {
    var newArray = [];

    function operation(num) {
      newArray.push(iterator(num));
    }

    _.each(collection, operation);

    return newArray;

    // map() is a useful primitive iteration function that works a lot
    // like each(), but in addition to running the operation on all
    // the members, it also maintains an array of results.
  };

  /*
   * TIP: map is really handy when you want to transform an array of
   * values into a new array of values. _.pluck() is solved for you
   * as an example of this.
   */

  // Takes an array of objects and returns and array of the values of
  // a certain property in it. E.g. take an array of people and return
  // an array of just their ages

  // INTERNAL NOTES: Uses map to iterate over the collection (presumably an array of objects) and uses a callback function that returns the value of the property key of each element of the collection.

  _.pluck = function(collection, key) {
    // TIP: map is really handy when you want to transform an array of
    // values into a new array of values. _.pluck() is solved for you
    // as an example of this.
    return _.map(collection, function(item){

      return item[key];

    });
  };

  // Reduces an array or object to a single value by repetitively calling
  // iterator(accumulator, item) for each item. accumulator should be
  // the return value of the previous iterator call.
  //
  // You can pass in a starting value for the accumulator as the third argument
  // to reduce. If no starting value is passed, the first element is used as
  // the accumulator, and is never passed to the iterator. In other words, in
  // the case where a starting value is not passed, the iterator is not invoked
  // until the second element, with the first element as it's second argument.
  //
  // Example:
  //   var numbers = [1,2,3];
  //   var sum = _.reduce(numbers, function(total, number){
  //     return total + number;
  //   }, 0); // should be 6
  //
  //   var identity = _.reduce([5], function(total, number){
  //     return total + number * number;
  //   }); // should be 5, regardless of the iterator function passed in
  //          No accumulator is given so the first element is used.

  // INTERNAL NOTES: See comments provided.
  _.reduce = function(collection, iterator, accumulator) {

    var accum;
    var index;

    var collect;

    // If the collection is an array, set 'collect' to the collection. Else if it's an object, map over its keys and set 'collect' to an array of the values of all keys.
    if ( Array.isArray(collection) ){
      collect = collection;
    } else if (collection.length === undefined) {
      collect = _.map(Object.keys(collection), function (key){ return collection[key]; })  // An array of values of our collection object
    }

    // If the number of arguments provided is 3, meaning there is a collection, iterator and accumulator, first to-be-reviewed index is set to 0 and 'accum' is set to the accumulator. Else if there is no accumulator provided, set 'index' to 1 and set 'accum' to the first element of collect.

    if (arguments.length == 3) {
      index = 0;
      accum = accumulator;
    } else if (arguments.length < 3) {
      index = 1;
      accum = collect[0];
    }

    // While 'index' is less than length of 'collect', go through the elements of 'collect' starting from the element at 'index' and updating the value of 'accum' with the applicaiton of iterator on 'accum' and the current element.

    while (index < collect.length) {
      accum = iterator(accum, collect[index]);
      index++
    }

    return accum;

  };

  // Determine if the array or object contains a given value (using `===`).

  // INTERNAL NOTES: Uses the reduce function starting with false as the initial value and returning true if the target value was found within the array, else returns false.

  _.contains = function(collection, target) {
    // TIP: Many iteration problems can be most easily expressed in
    // terms of reduce(). Here's a freebie to demonstrate!

    return _.reduce(collection, function(wasFound, item) {
      if (wasFound) {
        return true;
      }
      return item === target;
    }, false);

  };


  // Determine whether all of the elements match a truth test.

  //INTERNAL NOTES: If the number of arguments provided is less than 2, meaning we are not provided with an iterator, uses the Boolean(), as the iterator, to evaluate the truthyness or falseyness of the collection items themselves. Uses the reduce function starting with true as the initial value and a callback function that evaluates to true if both the accumulator and the test on the current item evaluate to true. That means and at each point if the test on the current item evaluates to false, the value of the accumulator remains false all the way to the end of the loop and then gets returned.

  _.every = function(collection, iterator) {
    // TIP: Try re-using reduce() here.

    if (arguments.length == 2) {
      return _.reduce(collection, function(accumulator, item){
        return (accumulator == true && Boolean(iterator(item)) == true) ? true : false;
      }, true)
    } else if (arguments.length < 2) {
      return _.reduce(collection, function(accumulator, item){
        return (accumulator == true && Boolean(item == true)) ? true : false;
      }, true)
    }

  };

  // Determine whether any of the elements pass a truth test. If no iterator is
  // provided, provide a default one

  //INTERNAL NOTES: First defined an isTrue function to evaluate if the argument is true or false. If there is not an iterator, the callback is set to isTrue. If there is, then the callback equals the iterator. Setting the accumulator to false, for each item, if the accum is true or the item is true, then it evaluates the accum to true. Otherwise it's false. Uses the reduce function starting with false as the initial value and a callback function that evaluates to true if either the accumulator or the test on the current item evaluate to true. That means at each point if the test on the current item evaluates to true, the value of the accumulator remains true all the way to the end of the loop and then gets returned.

  _.some = function(collection, iterator) {

    function isTrue(value) {
      if (value == true) {
        return true;
      } else {
        return false;
      }
    }

    var callBack;

    if (arguments.length < 2) {
      callBack = isTrue;
    } else {
      callBack = iterator;
    }

    var accum = false;
    for (var i = 0; i < collection.length; i++){
      if (accum == true || Boolean(callBack(collection[i])) == true){
        accum = true;
      } else {
        accum = false;
      }
    }

    return accum;
    //at least one element that evalutes to true when the callback is applied
    // TIP: There's a very clever way to re-use every() here.
  };


  /**
   * OBJECTS
   * =======
   *
   * In this section, we'll look at a couple of helpers for merging objects.
   */

  // Extend a given object with all the properties of the passed in
  // object(s).
  //
  // Example:
  //   var obj1 = {key1: "something"};
  //   _.extend(obj1, {
  //     key2: "something new",
  //     key3: "something else new"
  //   }, {
  //     bla: "even more stuff"
  //   }); // obj1 now contains key1, key2, key3 and bla

  //INTERNAL NOTES: Created an array of arguments passed on to our function into sourceArray. For each object in the sourceArray and for each property in the current object, add the property and its respectivce value to the destination object.

  _.extend = function(destination) {

    var sourceArray = Array.prototype.slice.call(arguments); //Create an array of arguments passed on to our function

    // For each object in the sourceArray and for each property in the current object, add the property and its respectivce value to the destination object
    for (var j = 0; j < sourceArray.length; j++) {
      for (var key in sourceArray[j]) {
          destination[key]=sourceArray[j][key];
      }
    }

    return destination;

  };

  // Like extend, but doesn't ever overwrite a key that already
  // exists in obj

  //INTERNAL NOTES: Created an array of arguments passed on to our function into sourceArray. For each object in the sourceArray and for each property in the current object, if the property does not already exist in the destination object, add the property and its respectivce value to the destination object.

  _.defaults = function(destination) {

    var sourceArray = Array.prototype.slice.call(arguments); //Create an array of arguments passed on to our function

    //For each object in the sourceArray and for each property in the current object, if the property does not already exist in the destination object, add the property and its respectivce value to the destination object.
    for (var j = 0; j < sourceArray.length; j++) {
      for (var key in sourceArray[j]) {
        if (destination[key] === undefined){
          destination[key] = sourceArray[j][key];
        }
      }
    }

    return destination;

  };


  /**
   * FUNCTIONS
   * =========
   *
   * Now we're getting into function decorators, which take in any function
   * and return out a new version of the function that works somewhat differently
   */

  // Return a function that can be called at most one time. Subsequent calls
  // should return the previously returned value.

  //INTERNAL NOTES: Since we want to update the local variables defined in our function, we need to use a closure, meaning to return a function that binds those local variables to itself. First define a local variable alreadyCalled and set that to false. And then return a function that runs the original function with the given arguments if alreadyCalled evaluates to false, else return the current value of the variable result in the outer context.

  _.once = function(func) {
    // TIP: These variables are stored in a "closure scope" (worth researching),
    // so that they'll remain available to the newly-generated function every
    // time it's called.
    var alreadyCalled = false;
    var result;

    // TIP: We'll return a new function that delegates to the old one, but only
    // if it hasn't been called before.
    return function() {
      if (!alreadyCalled) {
        // TIP: .apply(this, arguments) is the standard way to pass on all of the
        // infromation from one function call to another.
        result = func.apply(this, arguments);
        alreadyCalled = true;
      }
      // The new function always returns the originally computed result.
      return result;
    };
  };

  // Memoize an expensive function's results by storing them. You may assume
  // that the function takes only one argument and that it is a primitive.
  // memoize could be renamed to oncePerUniqueArgumentList; memoize does the
  // same thing as once, but based on many sets of unique arguments.
  //
  // _.memoize should return a function that, when called, will check if it has
  // already computed the result for the given argument and return that value
  // instead if possible.


  //INTERNAL NOTES: Since we want to update the local variables defined in our function, we need to use a closure, meaning to return a function that binds those local variables to itself. Here we want to keep track of the arguments passed on to our original function. Therefore, we use an object and return a function that checks whether the argument provided is already stored in our object as a property and if so, returns the value associated with that property and if not, runs the original function on the argument and store the result as its respective value in the object.

  _.memoize = function(func) {

    var dict={};

    var createMemo = function(n) {
      if (dict[n] === undefined) { // Checks whether the argument provided is already stored in our object as a property and if so, returns the value associated with that property and if not, runs the original function on the argument and store the result as its respective value in the object.
        dict[n] = func.apply(this, arguments);
      }
      return dict[n];
    }
   return createMemo;
  };

  // Delays a function for the given number of milliseconds, and then calls
  // it with the arguments supplied.
  //
  // The arguments for the original function are passed after the wait
  // parameter. For example _.delay(someFunction, 500, 'a', 'b') will
  // call someFunction('a', 'b') after 500ms

  //INTERNAL NOTES: Created an array of the provided arguments. Used setTimeout method to call the provided function after wait milliseconds.
  _.delay = function(func, wait) {

    var args = Array.prototype.slice.call(arguments, 2);
    return setTimeout(function () { return func.apply(this, args); }, wait);

  };



  /**
   * ADVANCED COLLECTION OPERATIONS
   * ==============================
   */

  // Randomizes the order of an array's contents.
  //
  // TIP: This function's test suite will ask that you not modify the original
  // input array. For a tip on how to make a copy of an array, see:
  // http://mdn.io/Array.prototype.slice

  //INTERNAL NOTES: First define an empty array which will be then returned as the shuffled array. Since we want to keep track of the new index of each of our array elements in the shuffled array, we define an object that stores the record. As long as the number of the properties in our storing object is less than the number of elements in the array, our while loop first generates a random number between 0 and the length of the array and if the generated number does not already exist in the storing object, it will be added with an arbitrary value of yours truely, and pushes the array element at the index equal to the random number into our result array.

  _.shuffle = function(array) {

    var result = [];

    var dict = {};

    var curRandomNo;

    while (Object.keys(dict).length < array.length) {  //Object.keys(dict) is an array of keys

      curRandomNo = Math.floor(Math.random() * array.length);

      if (dict[String(curRandomNo)] === undefined){

        dict[String(curRandomNo)] = "Sara and Afsoon :-)";
        result.push(array[curRandomNo]);

      }
    }

    return result;
  };



  /**
   * EXTRA CREDIT
   * =================
   *
   * Note: This is the end of the pre-course curriculum. Feel free to continue,
   * but nothing beyond here is required.
   */

  // Calls the method named by functionOrKey on each value in the list.
  // Note: You will need to learn a bit about .apply to complete this.
  _.invoke = function(collection, functionOrKey, args) {
  };

  // Sort the object's values by a criterion produced by an iterator.
  // If iterator is a string, sort objects by that property with the name
  // of that string. For example, _.sortBy(people, 'name') should sort
  // an array of people by their name.
  _.sortBy = function(collection, iterator) {
  };

  // Zip together two or more arrays with elements of the same index
  // going together.
  //
  // Example:
  // _.zip(['a','b','c','d'], [1,2,3]) returns [['a',1], ['b',2], ['c',3], ['d',undefined]]
  _.zip = function() {
  };

  // Takes a multidimensional array and converts it to a one-dimensional array.
  // The new array should contain all elements of the multidimensional array.
  //
  // Hint: Use Array.isArray to check if something is an array
  _.flatten = function(nestedArray, result) {
  };

  // Takes an arbitrary number of arrays and produces an array that contains
  // every item shared between all the passed-in arrays.
  _.intersection = function() {
  };

  // Take the difference between one array and a number of other arrays.
  // Only the elements present in just the first array will remain.
  _.difference = function(array) {
  };

  // Returns a function, that, when invoked, will only be triggered at most once
  // during a given window of time.  See the Underbar readme for extra details
  // on this function.
  //
  // Note: This is difficult! It may take a while to implement.
  _.throttle = function(func, wait) {
  };
}());
