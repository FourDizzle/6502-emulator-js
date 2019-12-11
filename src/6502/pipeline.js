const getInstructions = require('./instruction').getInstructions

ISR_PUSH_PC_P = {
  NMI: true,
  RESET: false,
  IRQ: true,
  BRK: true,
}

ISR_SET_B = {
  NMI: false,
  RESET: false,
  IRQ: false,
  BRK: true,
}

const addPipline = (cpu) => {
  const instructions = getInstructions(cpu)

  const makeSigned = (num) => {
    let res
    if (num >= 0x80) {
      res = (0xff - num + 1) * -1;
    } else {
      res = num;
    }
    console.log('signed', res)
    return res
  }

  const getAddress = (mode, param) => {
    return modes[mode](param)
  }

  const getValue = (address) => {
    if (param === 'accumulator') {
      return cpu.registers.accumulator
    }

    let num = parseInt(param.substring(1), 16)
    if (param.charAt(0) === '#') {
      return num
    } else {
      return cpu.readData(num)
    }
  }

  const modes = {
    absolute: param => param,
    absolutey: param => param + cpu.registers.y,
    absolutex: param => param + cpu.registers.x,
    accumulator: param => 'accumulator',
    immediate: param => param,
    implied: param => null,
    indirect: param => {
      let address = cpu.readData(param)
      address += cpu.readData(param + 1) *0x100
      return address
    },
    indirectx: param => {
      let address = cpu.readData(param + cpu.registers.x)
      address += cpu.readData(param + cpu.registers.x + 1) * 0x100
      return address
    },
    indirecty: param => {
      let address = cpu.readData(param)
      address += cpu.readData(param + 1) * 0x100
      address += cpu.registers.y
      return address
    },
    relative: param => {
      let address = cpu.registers.programCounter + makeSigned(param)
      return address;
    },
    zeropage: param => param,
    zeropagex: param => (param + cpu.registers.x) & 0xff,
    zeropagey: param => (param + cpu.registers.y) & 0xff,
  }

  const setTarget = (inst) => {
    inst.target = modes[inst.opcode.mode](inst.param)
    console.log('target set', inst)
    return inst
  }

  const isr = () => {

    cpu.setInterruptFlag(1)

    if (ISR_SET_B[cpu.state]) {
      cpu.setBreakFlag(1)
    } else {
      cpu.setBreakFlag(0)
    }

    if (ISR_PUSH_PC_P[cpu.state]) {
      cpu.pushToStack((cpu.registers.programCounter & 0xff00) >> 8)
      cpu.pushToStack(cpu.registers.programCounter & 0xff)
      cpu.pushToStack(cpu.registers.processorStatus)
    } else if (cpu.state === 'RESET') {

    }

    if(cpu.state === 'RESET') {
      cpu.registers.stackPointer = 0xfd
    }

    let address = cpu.readData(cpu.vectors[cpu.state])
    address += cpu.readData(cpu.vectors[cpu.state] + 1) * 0x100

    cpu.registers.programCounter = address

    console.log('finished isr')
    console.log(cpu.registers)
    console.log('\n')

    if (cpu.state !== 'BRK') cpu.state = 'RUN'
  }

  const checkISR = () => {
    if (cpu.getInterruptFlag() !== 1 && cpu.state !== 'RUN') {
      isr()
    }
  }

  const fetch = () => {
    // console.log('reg', cpu.registers)
    let opcode = cpu.opcodes[cpu.readData(cpu.registers.programCounter)]

    if (!opcode) {
      opcode = cpu.opcodes[0xea]
    }

    let instruction = {
      opcode: opcode,
      param: 0
    }

    cpu.registers.programCounter++

    for (let i = 0; i < instruction.opcode.length - 1; i++) {
      instruction.param += cpu.readData(cpu.registers.programCounter)
      cpu.registers.programCounter++
    }

    return instruction
  }

  const decode = (instruction) => {
    cpu.registers.instruction = instruction.opcode.hex

    return instruction
  }

  const execute = instruction => {
    // console.log('instruction', instruction.opcode.opcode)
    // console.log('registers', cpu.registers)

    instruction = setTarget(instruction)

    let name = instruction.opcode.opcode
    let mode = instruction.opcode.mode
    let param = instruction.param

    instructions[name](instruction)
    // cpu.registers.predecode = cpu.read(cpu.registers.programCounter)

    cpu.masterclock += instruction.opcode.cycles

    console.log('after', name)
    console.log(cpu.registers)
    console.log('\n')

    return instruction
  }

  cpu.next = () => {
    if (cpu.state !== 'BRK') {
      checkISR()
      let instruction = fetch()
      instruction = decode(instruction)
      return execute(instruction)
    }

    return false
  }

  return cpu;
}

module.exports = {
  addPipline: addPipline,
}
