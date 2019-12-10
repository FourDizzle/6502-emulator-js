const program = [
  0x09, 0xA9, 0x42, 0x69, 0xff, 0x4c, 0x01, 0x00, 0x00,
]

let data = new Array(0xffff)

data.fill(0)

for (let i = 0; i < program.length; i++) {
  data[i] = program[i]
}

data[0xfffc] = 0x45
data[0xfffd] = 0x23

data[0x2345] = 0xa2
data[0x2346] = 0x22
data[0x2347] = 0x4c
data[0x2348] = 0x01
data[0x2349] = 0x00

const createMemory = () => {
  let memory = {
    write: (address, val) => {data[address] = val},
    read: (address) => data[address],
  }

  return memory
}

// export { createMemory }

module.exports = {
  createMemory
}
