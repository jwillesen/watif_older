export default function searchForVerbs (obj) {
  const prototypes = getPrototypeChain(obj)
  const verbs = findVerbNames(prototypes)
  return checkPredicates(obj, verbs)
}

function getPrototypeChain (obj) {
  const result = []
  do {
    result.push(obj)
    obj = Object.getPrototypeOf(obj)
  } while (obj)
  return result
}

function findVerbNames (prototypes) {
  return prototypes.reduce((memo, prototype) => {
    const methodNames = Object.getOwnPropertyNames(prototype)
    const prefixRe = /^verb_/
    const verbMethods = methodNames.filter(name => /^verb_/.test(name))
    const verbs = verbMethods.map(name => name.replace(prefixRe, ''))
    return memo.concat(verbs)
  }, [])
}

function checkPredicates (obj, verbs) {
  return verbs.filter(verb => {
    const predicateName = `can_${verb}`
    if (!obj[predicateName]) return true
    else return obj[predicateName]()
  })
}
