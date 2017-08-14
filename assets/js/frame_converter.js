const frame_converter= new Object();



frame_converter.getKey= function (obj, index){
  var element;

  element = obj[Object.keys(obj)[index]];

  return element;
};

frame_converter.countSize = function(obj) {
    var size = 0, key;
    for (key in obj) {
        if (obj.hasOwnProperty(key)) size++;
    }
    return size;
};

 frame_converter.pushFrames = function(frameObj, frame, animArray){
  for (var p=0;p< (Math.ceil(frameObj.duration*.1)/2.5);p++){
    animArray.push(frame)
  }
  return animArray;
};

 frame_converter.getAnimArray= function(jsonObj,initArray){
  var newAnimArray = [];

  if(!initArray){
    jsonObj.frameCount = frame_converter.countSize(jsonObj.frames)

    for(var i = 0;i < jsonObj.frameCount; i++){
      var newKey = frame_converter.getKey(jsonObj.frames, i);
      newAnimArray = frame_converter.pushFrames(newKey, i, newAnimArray);
    }

  }else{
    jsonObj.frameCount = initArray.length;

    initArray.forEach(function(index, value){
      var newKey = frame_converter.getKey(jsonObj.frames, index);
      newAnimArray = frame_converter.pushFrames(newKey, index, newAnimArray);
    })
  }

  return newAnimArray;

};



