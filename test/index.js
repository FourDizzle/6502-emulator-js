const fs = require('fs')

const create6502 = require('../src/6502').create6502

const createMemory = () => {
  let data = new Array(0x10000).fill(0)

  let irqHandler = [
    0x48, 0x8A, 0x48, 0x98,
    0x48, 0xBA, 0xBD, 0x04,
    0x01, 0x29, 0x10, 0xF0,
    0x03, 0x6C, 0x16, 0x03,
    0x6C, 0x14, 0x03
  ]

  return {
    data: data,
    read: (address) => data[address],
    write: (address, val) => data[address] = val,
    loadTestBin: (buf) => {
      let startAddress = buf[0]
      startAddress += buf[1] * 0x100

      for (let i = 0; i < buf.length - 2; i++) {
        data[startAddress + i] = buf[i + 2]
      }

      data[0x0002] = 0x00
      data[0xA002] = 0x00
      data[0xA003] = 0x80
      data[0xFFFE] = 0x48
      data[0xFFFF] = 0xFF
      data[0x01FE] = 0xFF
      data[0x01FF] = 0x7F

      for (let i = 0; i < irqHandler.length; i++) {
        data[0xff48 + i] = irqHandler[i]
      }
    }
  };
}

fs.readFile('./bin/start', (err, data) => {
  if (err) throw err

  let mem = createMemory()
  mem.loadTestBin(data)

  let chip = create6502(mem)
  chip.registers.stackPointer = 0xfd
  chip.registers.processorStatus = 0x04
  chip.registers.programCounter = 0x0801
  chip.state = 'RUN'

  chip.opcodes[0x02] = {
    mode: 'implied',
    opcode: 'print',
    target: 'mode',
    hex: 0x02,
    length: 1,
    cycles: 4,
    extracycles: ''
  }

  chip.opcodes[0x12] = {
    mode: 'implied',
    opcode: 'load',
    target: 'mode',
    hex: 0x12,
    length: 1,
    cycles: 4,
    extracycles: ''
  }

  chip.opcodes[0x22] = {
    mode: 'implied',
    opcode: 'scan',
    target: 'mode',
    hex: 0x22,
    length: 1,
    cycles: 4,
    extracycles: ''
  }

  chip.opcodes[0x32] = {
    mode: 'implied',
    opcode: 'exit',
    target: 'mode',
    hex: 0x32,
    length: 1,
    cycles: 4,
    extracycles: ''
  }

  data[0xffd2] = 0x02
  data[0xe16f] = 0x12
  data[0xffe4] = 0x22
  data[0x8000] = 0x32
  data[0xa474] = 0x32

  console.log(data[data[0x0314]])

  let run = true
  // while (run && !chip.stop) {
  //   run = chip.next()
  // }
})
