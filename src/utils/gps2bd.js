export function bd_encrypt(gg_lon, gg_lat) {
  var X_PI = Math.PI * 3000.0 / 180.0
  var x = gg_lon
  var y = gg_lat
  var z = Math.sqrt(x * x + y * y) + 0.00002 * Math.sin(y * X_PI)
  var theta = Math.atan2(y, x) + 0.000003 * Math.cos(x * X_PI)
  var bd_lon = z * Math.cos(theta) + 0.0065
  var bd_lat = z * Math.sin(theta) + 0.006
  return {
    bd_lat: bd_lat, bd_lon: bd_lon
  }
}
