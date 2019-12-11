const bin2Dec = (n) => {
  let dec = n & 0x01
  dec += ((n >> 1) & 0x01) * 10
  return dec
}

const dec2bin = (n) => {
  let bin = n % 10
  bin += (((n - bin) / 10) % 10) * 0x10
  return bin
}

const getInstructions = (cpu) => {

  const getValue = (inst) => {
    if (inst.target === 'accumulator') {
      return cpu.registers.accumulator
    }

    // console.log(inst.opcode.mode)
    let value = inst.opcode.mode === 'immediate' ? inst.target : cpu.readData(inst.target)
    return value
  }

  const output = (address, data) => {
    if (address === 'accumulator') {
      cpu.registers.accumulator = data
      return data
    } else {
      return cpu.writeData(address, data)
    }
  }

  const setJump = (inst) => {
    cpu.registers.programCounter = inst.target
  }

  const add = (n) => {
    let bit = (cpu.registers.accumulator & 0x80) >> 7
    let res = cpu.registers.accumulator + n + cpu.getCarryFlag()
    cpu.setCarryFlag(res > 0xff)
    res &= 0xff
    cpu.setOverflowFlag(bit != (res & 0x80) >> 7)
    cpu.setNegativeFlag(res >= 0x80)
    cpu.setZeroFlag(res === 0)
    cpu.registers.accumulator = res
  }

  const addDecimal = (n) => {
    let a = bin2Dec(cpu.registers.accumulator)
    n = bin2Dec(n)
    let res = a + n + cpu.getCarryFlag()

    cpu.setCarryFlag((res > 99))
    res = res > 99 ? res - 99 : res

    cpu.setZeroFlag(res === 0)
    cpu.setOverflow(res > 79 || res < -20)
    res = dec2bin(res)
    cpu.setNegativeFlag((res & 0x80) >> 7)

    cpu.registers.accumulator = res
  }

  const subtract = (n) => {
    let res = ((cpu.registers.accumulator + 0x100 * cpu.getCarryFlag()) - n) & 0x1ff
    cpu.setOverflowFlag(res >= 0x80 || res <= -0x80)
    cpu.setCarryFlag((res & 0x100) >> 8)
    res &= 0xff
    cpu.setZeroFlag(res === 0)
    cpu.setNegativeFlag(res >= 0x80)
    cpu.registers.accumulator = res
  }

  const subtractDecimal = (n) => {
    let a = bin2Dec(cpu.registers.accumulator)
    n = bin2Dec(n)
    let res = a - n - ~cpu.getCarryFlag()

    if (!(res < 0)) {
      cpu.setCarryFlag(0)
      res = 100 + res
    }

    cpu.setZeroFlag(res === 0)
    cpu.setOverflow(res > 79 || res < -20)
    res = dec2bin(res)
    cpu.setNegativeFlag((res & 0x80) >> 7)

    cpu.registers.accumulator = res
  }

  const compare = (inst, comp) => {
    let n = getValue(inst)
    cpu.setCarryFlag(n <= comp)
    let res = comp - n
    cpu.setZeroFlag(res === 0)
    res &= 0xff
    cpu.setNegativeFlag(res >= 0x80)
  }

  const load = (inst, reg) => {
    // console.log('load value', getValue(inst))
    cpu.registers[reg] = getValue(inst)
    cpu.setNegativeFlag((cpu.registers[reg] & 0x80) >> 7)
    cpu.setZeroFlag(cpu.registers[reg] === 0)
  }

  instructions = {
    adc: (inst) => {
      let value = getValue(inst)

      // let v = cpu.registers.accumulator & 0x80
      // let c = cpu.getCarryFlag() ? 1 : 0
      // let sum = cpu.registers.accumulator + value + c
      //
      // cpu.registers.accumulator = sum & 0xff
      // cpu.setCarryFlag(sum > 0xff)
      // cpu.setOverflowFlag(v !== cpu.registers.accumulator & 0x80)
      // cpu.setNegativeFlag(cpu.registers.accumulator >= 0x80)
      // cpu.setZeroFlag(sum === 0)

      if (cpu.getDecimalFlag()) {
        addDecimal(value)
      } else {
        add(value)
      }
    },

    and: (inst) => {
      let value = getValue(inst)
      cpu.registers.accumulator = cpu.registers.accumulator & value
      cpu.setZeroFlag(cpu.registers.accumulator === 0)
      cpu.setNegativeFlag(cpu.registers.accumulator >= 0x80)
    },

    asl: (inst) => {
      let value = getValue(inst)
      let carry = value & 0x80 >> 7
      value = value << 1
      value = value & 0xff

      cpu.setCarryFlag(carry)
      cpu.setZeroFlag(value === 0)
      cpu.setNegativeFlag(value & 0x80 >> 7 === 1)

      cpu.writeData(inst.target, value)
    },

    bcc: (inst) => {
      if (!cpu.getCarryFlag()) {
        setJump(inst)
      }
    },

    bcs: (inst) => {
      if (cpu.getCarryFlag()) {
        setJump(inst)
      }
    },

    beq: (inst) => {
      if (cpu.getZeroFlag()) {
        setJump(inst)
      }
    },

    bit: (inst) => {
      let val = getValue(inst)
      cpu.setZeroFlag(cpu.registers.accumulator & val)
      cpu.setNegativeFlag(val & 0x80 >> 7)
      cpu.setOverflowFlag(val & 0x40 >> 6)
    },

    bmi: (inst) => {
      if (cpu.getNegativeFlag()) {
        setJump(inst)
      }
    },

    bne: (inst) => {
      if (!cpu.getZeroFlag()) {
        setJump(inst)
      }
    },

    bpl: (inst) => {
      if (!cpu.getNegativeFlag()) {
        setJump(inst)
      }
    },

    brk: (inst) => {
      console.log('BREAK', cpu.registers.programCounter)

      cpu.pushToStack((cpu.programCounter & 0xff00) >> 8)
      cpu.pushToStack(cpu.programCounter & 0xff)
      cpu.setBreakFlag(true)
      cpu.pushToStack(cpu.registers.processorStatus)
      let address = cpu.readData(0xfffe)
      address += cpu.readData(0xffff) * 0x100
      cpu.registers.programCounter = address
      // cpu.state = 'BRK'
    },

    bvc: (inst) => {
      if (!cpu.getOverflowFlag()) {
        setJump(inst)
      }
    },

    bvs: (inst) => {
      if (cpu.getOverflowFlag()) {
        setJump(inst)
      }
    },

    clc: (inst) => {
      cpu.setCarryFlag(0)
    },

    cld: (inst) => {
      cpu.setDecimalFlag(0)
    },

    cli: (inst) => {
      cpu.setInterruptFlag(0)
    },

    clv: (inst) => {
      cpu.setOverflowFlag(0)
    },

    cmp: (inst) => {
      compare(inst, cpu.registers.accumulator)
    },

    cpx: (inst) => {
      compare(inst, cpu.registers.x)
    },

    cpy: (inst) => {
      compare(inst, cpu.registers.y)
    },

    dec: (inst) => {
      let val = (getValue(inst) - 1) & 0xff
      cpu.writeData(inst.target, val)
    },

    dex: (inst) => {
      cpu.registers.x = --cpu.registers.x & 0xff
    },

    dey: (inst) => {
      cpu.registers.y = --cpu.registers.y & 0xff
    },

    eor: (inst) => {
      cpu.registers.accumulator = cpu.registers.accumulator ^ getValue(inst)
      cpu.setZeroFlag(cpu.registers.accumulator === 0)
      cpu.setNegativeFlag(cpu.registers.accumulator & 0x80 >> 7)
    },

    inc: (inst) => {
      let val = (getValue(inst) + 1) & 0xff
      cpu.writeData(inst.target, val)
    },

    inx: (inst) => {
      cpu.registers.x = ++cpu.registers.x & 0xff
      return Promise.resolve()
    },

    iny: (inst) => {
      cpu.registers.y = ++cpu.registers.y & 0xff
      return Promise.resolve()
    },

    jmp: (inst) => {
      setJump(inst)
    },

    jsr: (inst) => {
      cpu.pushToStack((cpu.programCounter & 0xff00) >> 8)
      cpu.pushToStack(cpu.programCounter & 0xff)
      setJump(target)
    },

    lda: (inst) => {
      load(inst, 'accumulator')
    },

    ldx: (inst) => {
      load(inst, 'x')
    },

    ldy: (inst) => {
      load(inst, 'y')
    },

    lsr: (inst) => {
      let val = getValue(inst)
      cpu.setZeroFlag(0)
      cpu.setCarryFlag(val & 0x01)
      cpu.writeData(inst.target, val >> 1)
    },

    nop: (inst) => {

    },

    ora: (inst) => {
      cpu.registers.accumulator |= getValue(inst)
      cpu.setZeroFlag(cpu.registers.accumulator === 0)
      cpu.setNegativeFlag((cpu.registers.accumulator & 0x80) >> 7)
    },

    pha: (inst) => {
      cpu.pushToStack(cpu.registers.accumulator)
    },

    php: (inst) => {
      cpu.pushToStack(cpu.registers.processorStatus)
    },

    pla: (inst) => {
      cpu.registers.accumulator = cpu.popFromStack()
      cpu.setZeroFlag(cpu.registers.accumulator === 0)
      cpu.setNegativeFlag((cpu.registers.accumulator & 0x80) >> 7)
    },

    plp: (inst) => {
      cpu.registers.processorStatus = cpu.popFromStack()
    },

    rol: (inst) => {
      let val = getValue(inst) << 1 + cpu.getCarryFlag()
      cpu.setCarryFlag((val & 0x100) >> 8)
      val &= 0xFF
      cpu.setZeroFlag(val === 0)
      cpu.setNegativeFlag((val & 0x80) >> 7)
      cpu.writeData(inst.target, val)
    },

    ror: (inst) => {
      let val = getValue(inst) + 0x100 * cpu.getCarryFlag()
      cpu.setCarryFlag(val & 0x01)
      val = (val >> 1) & 0xff
      cpu.setZeroFlag(val === 0)
      cpu.setNegativeFlag((val & 0x80) >> 7)
      cpu.writeData(inst.target, val)
    },

    rti: (inst) => {
      cpu.setInterruptFlag(0)
      cpu.registers.processorStatus = cpu.popFromStack()
      cpu.registers.programCounter = cpu.popFromStack()
      cpu.registers.programCounter = cpu.popFromStack() * 0x100
    },

    rts: (inst) => {
      cpu.registers.programCounter = cpu.popFromStack()
    },

    sbc: (inst) => {
      let val = getValue(inst)

      if (cpu.getDecimalFlag()) {
        subtractDecimal(val)
      } else {
        subtract(val)
      }
    },

    sec: (inst) => {
      cpu.setCarryFlag(1)
    },

    sed: (inst) => {
      cpu.setDecimalFlag(1)
    },

    sei: (inst) => {
      cpu.setInterruptFlag(1)
    },

    sta: (inst) => {
      cpu.writeData(inst.target, cpu.registers.accumulator)
    },

    stx: (inst) => {
      cpu.writeData(inst.target, cpu.registers.x)
    },

    sty: (inst) => {
      cpu.writeData(inst.target, cpu.registers.y)
    },

    tax: (inst) => {
      cpu.registers.x = cpu.registers.accumulator
      cpu.setZeroFlag(cpu.registers.x === 0)
      cpu.setNegativeFlag(cpu.registers.x >= 0x80)
    },

    tay: (inst) => {
      cpu.registers.y = cpu.registers.accumulator
      cpu.setZeroFlag(cpu.registers.y === 0)
      cpu.setNegativeFlag(cpu.registers.y >= 0x80)
    },

    tsx: (inst) => {
      cpu.registers.x = cpu.registers.stackPointer
      cpu.setZeroFlag(cpu.registers.x === 0)
      cpu.setNegativeFlag(cpu.registers.x >= 0x80)
    },

    txa: (inst) => {
      cpu.registers.accumulator = cpu.registers.x
      cpu.setZeroFlag(cpu.registers.accumulator === 0)
      cpu.setNegativeFlag(cpu.registers.accumulator >= 0x80)
    },

    txs: (inst) => {
      cpu.registers.stackPointer = cpu.registers.x
    },

    // txy: (inst) => {
    //   cpu.registers.y = cpu.registers.x
    //   cpu.setZeroFlag(cpu.registers.y === 0)
    //   cpu.setNegativeFlag(cpu.registers.y >= 0x80)
    //   return Promise.resolve()
    // },

    tya: (inst) => {
      cpu.registers.accumulator = cpu.registers.y
      cpu.setZeroFlag(cpu.registers.accumulator === 0)
      cpu.setNegativeFlag(cpu.registers.accumulator >= 0x80)
    },

    print: (inst) => {
      cpu.writeData(0x0c03, 0)
      console.log('')
      console.loc('******* PRINTIN', cpu.registers.accumulator, '************')
      console.log('')
    },

    load: (inst) => {
      console.log('')
      console.loc('******* LOAD ************')
      console.log('')
      cpu.registers.programCounter = 0x0816
    },

    scan: (inst) => {
      cpu.registers.accumulator = 3
    },

    exit: (inst) => {
      cpu.stop = true
      console.log('')
      console.loc('******* EXIT ************')
      console.log('')
    }
  }
  return instructions
}



module.exports = {
  getInstructions: getInstructions
}
