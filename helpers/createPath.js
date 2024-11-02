import path from 'path'

const createPath = (name) => path.resolve('.', 'vievs', `${name}.ejs`)

export default createPath