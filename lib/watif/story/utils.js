export function canCallCheck (self, superFunc, defaultValue) {
  if (superFunc) return self.superFunc()
  else return defaultValue
}
