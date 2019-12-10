// import {create6502} from '6502'
// import {createMemory} from 'memory'
// import {bus} from 'bus'

const create6502 = require('./6502').create6502
const createMemory = require('./memory').createMemory
const bus = require('./bus').bus

const fs = require('fs')



// let mem = createMemory(bus)
// let chip = create6502(mem)

fs.readFile('./6502_functional_test.bin', (err, data) => {
  if (err) throw err



  console.log('opcode', data[14261])

  let memory = {
    // view: new DataView(data),
    buf: data,
  }

  memory.read = (address) => {
    return memory.buf[address]
    // return memory.view.getUint8(address)
  }

  memory.write = (address, val) => {
    return memory.buf[address] = val
    // memory.view.setUint8(address, val)
  }

  let chip = create6502(memory)

  let run = true

  while (run !== false) {
    run = chip.next()
    console.log(run)
  }

  console.log('\nFINISHED')
  console.log(chip.registers)
})

// chip.next()
// chip.next()
// chip.next()
// chip.next()
// chip.next()
// chip.next()
// chip.next()
// chip.next()
// chip.next()
// chip.next()
// chip.next()
// chip.next()


// let pulse = (timestamp) => {
//   console.log(timestamp)
// }
//
// window.requestAnimationFrame(pulse)
// bus.pulseClock()
// bus.pulseClock()
// bus.pulseClock()
// bus.pulseClock()
