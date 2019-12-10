
const addStack = (cpu) => {

  cpu.pushToStack = (val) => {
    cpu.writeData(cpu.registers.stackPointer, val)
    cpu.registers.stackPointer = ((cpu.registers.stackPointer - 1) & 0xff) + 0x100
  }

  cpu.popFromStack = () => {
    cpu.registers.stackPointer = ((cpu.registers.stackPointer + 1) & 0xff) + 0x100
    return cpu.readData(cpu.registers.stackPointer)
  }
}

module.exports = {
  addStack: addStack
}
