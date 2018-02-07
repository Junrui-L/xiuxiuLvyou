var localStore = function (storeName, storeStyle) {

  var storage = window[storeStyle];
  if (!window[storeStyle]) {
    //alert("浏览器支持localstorage");
    return false;
  }

  var set = function (key, value) {
    //存储
    var mydata = storage.getItem(storeName);
    if (!mydata) {
      this.init();
      mydata = storage.getItem(storeName);
    }
    mydata = JSON.parse(mydata);
    mydata.data[key] = value;
    storage.setItem(storeName, JSON.stringify(mydata));
    return mydata.data;

  };

  var get = function (key) {
    //读取
    var mydata = storage.getItem(storeName);
    if (!mydata) {
      return false;
    }
    mydata = JSON.parse(mydata);

    return mydata.data[key];
  };

  var remove = function (key) {
    //读取
    var mydata = storage.getItem(storeName);
    if (!mydata) {
      return false;
    }

    mydata = JSON.parse(mydata);
    delete mydata.data[key];
    storage.setItem(storeName, JSON.stringify(mydata));
    return mydata.data;
  };

  var clear = function () {
    //清除对象
    storage.removeItem(storeName);
  };

  var init = function () {
    storage.setItem(storeName, '{"data":{}}');
  };

  return {
    set: set,
    get: get,
    remove: remove,
    init: init,
    clear: clear
  };
}
