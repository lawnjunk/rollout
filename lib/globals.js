global.debug = (...args) => {
  console.log(...args)
  return args.join(' ')
}

global.map = (ctx, callback) => {
  let type = Array.isArray(ctx) ? 'array' : typeof ctx
  switch(type){
    case 'object':
    let result = {} 
      for(key in ctx){
        result[key] = callback(ctx[key], key, ctx)
      }
      return result;
    case 'string':
    case 'array':
      return Array.prototype.map.call(ctx, callback)
    default:
      throw new Error('must map an object')
  }
}
