const css = (el,attr) => {
  let transformAttrs = ['translateX','translateY','translateZ','rotate','rotateX','rotateY','rotateX','skew','skewX','skewY','scale','scaleX','scaleY',]
　　const type = obj => {
    let typeStr = Object.prototype.toString.call(obj);
    let type = typeStr.match(/\[object (.*)\]/)[1].toLowerCase();
    return type;
  };
  // true表示获取，false表示设置
  const isGet = type(attr) === 'object' ? false : true;
  if(isGet){
    // 判断是否获取c3属性
    if(transformAttrs.includes(attr)){
      return transform()
    }else{
      return parseFloat(getComputedStyle(el)[attr])
    }
  }else{
    // 设置属性
    for(let [key,value] of Object.entries(attr)){
        el.style[key] = key === 'opacity' ? value : value + "px";
    }
    // 设置c3属性。会对上面进行一个覆盖。
    transform(attr);
    return true;
  }
  function transform(attr){
    // 给元素加上一个属性transform用来保存c3属性。
    if(!el.transform){
      el.transform={};
    }
    if(isGet){
      // 如果用户没有设置就给一个默认值。
      if(!Object.keys(tranformAttrs).includes(attr)){
        // 返回默认值
        if(attr==='scale'){
          return 1;
        }else{
          return 0;
        }
      }
      return el.transform[attr];
    }
    let cssStr = '';
    // 设置属性
    for(let [k,v] of Object.entries(attr)){
      if(transformAttrs.includes(k)){
        el.transform[k] = v;
      switch(k){
        case 'rotate':
        case 'rotateX':
        case 'rotateY':
        case 'rotateZ':
        case 'skewX':
        case 'skewY':
        cssStr+= `${k}(${v}deg)`;
        break;
        case 'scale':
        case 'scaleX':
        case 'scaleY':
        cssStr+=`${k}(${value})`;
        break;
        case 'translateX':
        case 'translateY':
        case 'translateZ':
        cssStr+=`${k}(${v}px)`;
        break;
      }
      }
    }
    el.style.transform = cssStr;
  }
}