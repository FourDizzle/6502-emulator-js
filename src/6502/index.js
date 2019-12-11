const OPCODES = require('./opcodes')
const addPipline = require('./pipeline').addPipline
const addStatusFlagFns = require('./status-flags').addStatusFlagFns
const addStack = require('./stack').addStack

// const MODE = {
//   ACCUMULATOR: 'accumulator',
//   IMMEDIATE: 'immediate',
//   IMPLIED: 'implied',
//   RELATIVE: 'relative',
//   ABSOLUTE: 'absolute',
//   ABSOLUTEX: 'absoluteX',
//   ABSOLUTEY: 'absoluteY',
//   ZEROPAGE: 'zeroPage',
//   ZEROPAGEX: 'zeroPageX',
//   ZEROPAGEY: 'zeroPageY',
//   INDIRECT: 'indirect',
//   INDIRECTX: 'indirectX',
//   INDIRECTY: 'indirectY',
// }

const create6502 = (memory) => {
  let cpu = {
    state: 'RESET',

    stop: false,
    
    vectors: {
      NMI: 0xfffa,
      RESET: 0xfffc,
      IRQ: 0xfffe,
      BRK: 0xfffe,
    },

    masterclock: 0,
    registers: {
      instruction: 0,
      accumulator: 0,
      x: 0,
      y: 0,
      stackPointer: 0x00,
      programCounter: 0,
      processorStatus: 0,
    },

    tcu: 0,

    pins: {
      memoryAddressBus: 0,
      busEnable: 0,
      memoryDataBus: 0,
      memoryReady: 0,
      irqb: 0,
      mlb: 0,
      nmib: 0,
      phi1o: 0,
      phi2:0,
      phi2o: 0,
      ready: 1,
      reset: 0,
      rw: 0,
      setOverflow: 0,
      sync: 0,
    },

    hasInterruptRequest: false,
  }

  cpu.opcodes = OPCODES

  cpu.readData = (address) => {
    return memory.read(address)
  }

  cpu.writeData = (address, data) => {
    if (typeof address === 'string') {
      cpu.registers[address] = data
    } else {
      memory.write(address, data)
    }
  }

  cpu.reset = () => cpu.state = 'RESET'
  cpu.break = () => cpu.state = 'BRK'
  cpu.nmi = () => cpu.state = 'NMI'
  cpu.interrupt = () => cpu.state = 'IRQ'

  addStatusFlagFns(cpu)
  addStack(cpu)

  addPipline(cpu)

  return cpu
}

module.exports = {
  create6502
}
