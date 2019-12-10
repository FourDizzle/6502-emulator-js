
const FLAG_INDEX = {
  carry: 0,
  zero: 1,
  interrupt: 2,
  decimal: 3,
  overflow: 6,
  negative: 7,
  break: 5
}

let flags = new Array(8).fill(0)

const addStatusFlagFns = (cpu) => {

  const setFlag = (flag, x) => {
    let val = x ? 1 : 0
    flags[FLAG_INDEX[flag]] = val

    let res = 0
    for (let i = 0; i < flags.length; i++) {
      res += flags[i] << i
    }

    cpu.registers.processorStatus = res
  }

  cpu.setCarryFlag = setFlag.bind(cpu, 'carry')
  cpu.setZeroFlag = setFlag.bind(cpu, 'zero')
  cpu.setInterruptFlag = setFlag.bind(cpu, 'interrupt')
  cpu.setDecimalFlag = setFlag.bind(cpu, 'decimal')
  cpu.setOverflowFlag = setFlag.bind(cpu, 'overflow')
  cpu.setNegativeFlag = setFlag.bind(cpu, 'negative')

  cpu.setBreakFlag = setFlag.bind(cpu, 'break')

  const getFlag = (cpu, flag) => ((cpu.registers.processorStatus >> FLAG_INDEX[flag]) & 0x01)

  cpu.getCarryFlag = () => {
    return getFlag(cpu, 'carry')
  }

  cpu.getZeroFlag = () => {
    return getFlag(cpu, 'zero')
  }

  cpu.getInterruptFlag = () => {
    return getFlag(cpu, 'interrupt')
  }

  cpu.getDecimalFlag = () => {
    return getFlag(cpu, 'decimal')
  }

  cpu.getOverflowFlag = () => {
    return getFlag(cpu, 'overflow')
  }

  cpu.getNegativeFlag = () => {
    return getFlag(cpu, 'negative')
  }

  cpu.getBreakFlag = () => {
    return getFlag(cpu, 'break')
  }

  return cpu
}

module.exports = {
  addStatusFlagFns: addStatusFlagFns
}
