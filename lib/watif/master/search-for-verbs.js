import changeCase from 'change-case'

export default function searchForVerbs (obj) {
  const prototypes = getPrototypeChain(obj)
  let verbs = findVerbNames(prototypes)
  verbs = checkPredicates(obj, verbs)
  verbs = verbs.map(verb => changeCase.lower(verb))
  return verbs
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
    const prefixRe = /^verb/
    const verbMethods = methodNames.filter(name => prefixRe.test(name))
    const verbs = verbMethods
      .map(name => name.replace(prefixRe, ''))
    return memo.concat(verbs)
  }, [])
}

function checkPredicates (obj, verbs) {
  return verbs.filter(verb => {
    const predicateName = `can${verb}`
    if (!obj[predicateName]) return true
    else return obj[predicateName]()
  })
}
