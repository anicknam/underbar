
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
    return n === undefined ? array.pop() : ((n>=array.length)? array : array.slice(array.length-n, array.length));
  };





  // Call iterator(value, key, collection) for each element of collection.
  // Accepts both arrays and objects.
  //
  // Note: _.each does not have a return value, but rather simply runs the
  // iterator function over each item in the input collection.


  // INTERNAL NOTES: If collection is an Array, loop through each one and run the iterator. Else if the collection length is undefined (it's an object), find each key in the array and run the iterator over each one.
  _.each = function(collection, iterator) {
    if (Array.isArray(collection)) {
      for (var i=0; i<collection.length; i++){
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

  // INTERNAL NOTES: This was provided to us, but was a unique one. By setting the result to -1, it iterates over each item in the array and compares if the item is the target and the result is -1 (which of course it is b/c it was set that way), then sets the result to index, returning the result of the index that the target is found.
  _.indexOf = function(array, target){
    // TIP: Here's an example of a function that needs to iterate, which we've
    // implemented for you. Instead of using a standard `for` loop, though,
    // it uses the iteration helper `each`, which you will need to write.
    var result = -1;

    _.each(array, function(item, index) {
      if (item === target && result === -1) {
        result = index;
      }
    });

    return result;
  };



  // Return all elements of an array that pass a truth test.

  // INTERNAL NOTES: Filters over a collection to see if items pass the test and pushes the items that do to a new array
  _.filter = function(collection, test) {
    var result=[];
    for (var i = 0; i < collection.length; i++) {
     if (test(collection[i])) {
       result.push(collection[i]);
     }
   }
   return result;
  };



  // Return all elements of an array that don't pass a truth test.

  // INTERNAL NOTES: The opposite of filter. Created a function called negate that takes an argument and applies the unknown arguments to the function returning them as false. Then created a negativeTest variable running the negate function on the test, then passing it in as the test in filter assuring that the array returned is all of the items that do not pass the test
  _.reject = function(collection, test) {

    function negate (something) {
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

  // INTERNAL NOTES: Creates a new array. Created a function, operation, that pushes numbers that don't exist already in new array to it. This means it will run until all the numbers already exist. We run this function on the array using each.
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
  // INTERNAL NOTES: Applies our function to each item in the old Array and pushes it to a new Array
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

  // INTERNAL NOTES: Uses map to iterate over the collection and runs a function that returns the item value of the property given
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

  // INTERNAL NOTES:
  _.reduce = function(collection, iterator, accumulator) {

    var accum;
    var index;

    var collect;

    // If the collection is an array, set collect = to the collection. Else if it's an object, map over their keys and create an array of the objects and set that to collect.
    if (Array.isArray(collection)){
      collect=collection;
    } else if (collection.length === undefined) {
      collect = _.map(Object.keys(collection),function (key){return collection[key];})  // An array of values of our collection object
    }

    // If the arguments = 3, meaning there is a collection, iterator and accumulator, index is 0 and accum is = to the accumulator. Else if there is no accumulator set the index to 1 and set the accum to the first element of collect

    if (arguments.length == 3) {
      index = 0;
      accum = accumulator;
    } else if (arguments.length < 3) {
      index = 1;
      accum = collect[0];
    }

    // While the index is less than collect.length, run the iterator on each index adding them together


    while (index < collect.length) {
      accum = iterator(accum, collect[index]);
      index++
    }

    return accum;

  };

  // Determine if the array or object contains a given value (using `===`).

  // INTERNAL NOTES: Reduces the collection and runs the function to return true if the target is found, else returns false
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

  //INTERNAL NOTES: If there is a collection and iterator passed, the collection is reduced and if the accumulator evaluates as true and
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

  //INTERNAL NOTES: Frist defined an isTrue function to evaluate if items are true or false. If there is not an iterator, the callback is true. If there is, then the callback equals the iterator. Setting the accumulator to false, for each item, if the accum is true or the item is true, then it evaluates the accum to true. Otherwise it's false.
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
    for (var i=0;i<collection.length;i++){
      if (accum==true || Boolean(callBack(collection[i])) == true){
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

  //INTERNAL NOTES: Created an empty sourceArray. Push each item to the sourceArray. For each item in teh source array and for every property in the source Array, set the destination key to the source array key of the array.
  _.extend = function(destination) {

    var sourceArray = [];

    for (var i = 1; i < arguments.length; i++) {
      sourceArray.push(arguments[i]);
    }

    for (var j = 0; j < sourceArray.length; j++) {
      for (var key in sourceArray[j]) {
          destination[key]=sourceArray[j][key];
      }
    }

    return destination;

  };

  // Like extend, but doesn't ever overwrite a key that already
  // exists in obj

  //INTERNAL NOTES: Created an empty array and iterated over each item in "this" and pushed to source array. Then iterated over sourceArray and then the key value if the destination was an object, set it to the source array property
  _.defaults = function(destination) {

    var sourceArray = [];

    for (var i = 1; i < arguments.length; i++) {
      sourceArray.push(arguments[i]);
    }

    for (var j = 0; j < sourceArray.length; j++) {
      for (var key in sourceArray[j]) {
        if (destination[key] === undefined){
          destination[key]=sourceArray[j][key];
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

  //
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



  _.memoize = function(func) {

    var dict={};

    var createMemo = function(n) {
      var result;
      if (dict[n] === undefined) {
        result = func.apply(this, arguments);
        dict[n] = result;
      }
      return result;
    }
   return createMemo;
  };

  // Delays a function for the given number of milliseconds, and then calls
  // it with the arguments supplied.
  //
  // The arguments for the original function are passed after the wait
  // parameter. For example _.delay(someFunction, 500, 'a', 'b') will
  // call someFunction('a', 'b') after 500ms

  //INTERNAL NOTES: Created a new empty array and called it with "this" and an argument of 2. Used setTimeout method to return the applied properties from func and wait
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
  _.shuffle = function(array) {
    var result=[];
    var dict = {};

    var curRandomNo;
    while (Object.keys(dict).length < array.length) {  //Object.keys(dict) is an array of keys
      curRandomNo = Math.floor(Math.random() * array.length);
      if (dict[String(curRandomNo)] === undefined){
        dict[String(curRandomNo)] = 1;
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
