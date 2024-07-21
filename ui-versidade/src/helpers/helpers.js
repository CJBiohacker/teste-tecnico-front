const helpers = {}

helpers.getTrueKeys = (obj) => {
  const allowedKeys = ['xxl', 'xl', 'lg', 'md', 'sm', 'xs']
  const result = Object.keys(obj).filter((key) => allowedKeys.includes(key) && obj[key])

  return result
}

export default helpers
