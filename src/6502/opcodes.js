const OPCODES = {
  0x69: {
    mode: 'immediate',
    opcode: 'adc',
    target: 'mode',
    hex: 0x69,
    length: 2,
    cycles: 2,
    extracycles: ''
  },
  0x65: {
    mode: 'zeropage',
    opcode: 'adc',
    target: 'mode',
    hex: 0x65,
    length: 2,
    cycles: 3,
    extracycles: ''
  },
  0x75: {
    mode: 'zeropagex',
    opcode: 'adc',
    target: 'mode',
    hex: 0x75,
    length: 2,
    cycles: 4,
    extracycles: ''
  },
  0x6d: {
    mode: 'absolute',
    opcode: 'adc',
    target: 'mode',
    hex: 0x6d,
    length: 3,
    cycles: 4,
    extracycles: ''
  },
  0x7d: {
    mode: 'absolutex',
    opcode: 'adc',
    target: 'mode',
    hex: 0x7d,
    length: 3,
    cycles: 4,
    extracycles: '*'
  },
  0x79: {
    mode: 'absolutey',
    opcode: 'adc',
    target: 'mode',
    hex: 0x79,
    length: 3,
    cycles: 4,
    extracycles: '*'
  },
  0x61: {
    mode: 'indirectx',
    opcode: 'adc',
    target: 'mode',
    hex: 0x61,
    length: 2,
    cycles: 6,
    extracycles: ''
  },
  0x71: {
    mode: 'indirecty',
    opcode: 'adc',
    target: 'mode',
    hex: 0x71,
    length: 2,
    cycles: 5,
    extracycles: '*'
  },
  0x29: {
    mode: 'immediate',
    opcode: 'and',
    target: 'mode',
    hex: 0x29,
    length: 2,
    cycles: 2,
    extracycles: ''
  },
  0x25: {
    mode: 'zeropage',
    opcode: 'and',
    target: 'mode',
    hex: 0x25,
    length: 2,
    cycles: 3,
    extracycles: ''
  },
  0x35: {
    mode: 'zeropagex',
    opcode: 'and',
    target: 'mode',
    hex: 0x35,
    length: 2,
    cycles: 4,
    extracycles: ''
  },
  0x2d: {
    mode: 'absolute',
    opcode: 'and',
    target: 'mode',
    hex: 0x2d,
    length: 3,
    cycles: 4,
    extracycles: ''
  },
  0x3d: {
    mode: 'absolutex',
    opcode: 'and',
    target: 'mode',
    hex: 0x3d,
    length: 3,
    cycles: 4,
    extracycles: '*'
  },
  0x39: {
    mode: 'absolutey',
    opcode: 'and',
    target: 'mode',
    hex: 0x39,
    length: 3,
    cycles: 4,
    extracycles: '*'
  },
  0x21: {
    mode: 'indirectx',
    opcode: 'and',
    target: 'mode',
    hex: 0x21,
    length: 2,
    cycles: 6,
    extracycles: ''
  },
  0x31: {
    mode: 'indirecty',
    opcode: 'and',
    target: 'mode',
    hex: 0x31,
    length: 2,
    cycles: 5,
    extracycles: '*'
  },
  0x0a: {
    mode: 'accumulator',
    opcode: 'asl',
    target: 'mode',
    hex: 0x0a,
    length: 1,
    cycles: 2,
    extracycles: ''
  },
  0x06: {
    mode: 'zeropage',
    opcode: 'asl',
    target: 'mode',
    hex: 0x06,
    length: 2,
    cycles: 5,
    extracycles: ''
  },
  0x16: {
    mode: 'zeropagex',
    opcode: 'asl',
    target: 'mode',
    hex: 0x16,
    length: 2,
    cycles: 6,
    extracycles: ''
  },
  0x0e: {
    mode: 'absolute',
    opcode: 'asl',
    target: 'mode',
    hex: 0x0e,
    length: 3,
    cycles: 6,
    extracycles: ''
  },
  0x1e: {
    mode: 'absolutex',
    opcode: 'asl',
    target: 'mode',
    hex: 0x1e,
    length: 3,
    cycles: 7,
    extracycles: ''
  },
  0x90: {
    mode: 'relative',
    opcode: 'bcc',
    target: 'mode',
    hex: 0x90,
    length: 2,
    cycles: 2,
    extracycles: '**'
  },
  0xb0: {
    mode: 'relative',
    opcode: 'bcs',
    target: 'mode',
    hex: 0xb0,
    length: 2,
    cycles: 2,
    extracycles: '**'
  },
  0xf0: {
    mode: 'relative',
    opcode: 'beq',
    target: 'mode',
    hex: 0xf0,
    length: 2,
    cycles: 2,
    extracycles: '**'
  },
  0x24: {
    mode: 'zeropage',
    opcode: 'bit',
    target: 'mode',
    hex: 0x24,
    length: 2,
    cycles: 3,
    extracycles: ''
  },
  0x2c: {
    mode: 'absolute',
    opcode: 'bit',
    target: 'mode',
    hex: 0x2c,
    length: 3,
    cycles: 4,
    extracycles: ''
  },
  0x30: {
    mode: 'relative',
    opcode: 'bmi',
    target: 'mode',
    hex: 0x30,
    length: 2,
    cycles: 2,
    extracycles: '**'
  },
  0xd0: {
    mode: 'relative',
    opcode: 'bne',
    target: 'mode',
    hex: 0xd0,
    length: 2,
    cycles: 2,
    extracycles: '**'
  },
  0x10: {
    mode: 'relative',
    opcode: 'bpl',
    target: 'mode',
    hex: 0x10,
    length: 2,
    cycles: 2,
    extracycles: '**'
  },
  0x00: {
    mode: 'implied',
    opcode: 'brk',
    target: 'mode',
    hex: 0x00,
    length: 1,
    cycles: 7,
    extracycles: ''
  },
  0x50: {
    mode: 'relative',
    opcode: 'bvc',
    target: 'mode',
    hex: 0x50,
    length: 2,
    cycles: 2,
    extracycles: '**'
  },
  0x70: {
    mode: 'relative',
    opcode: 'bvc',
    target: 'mode',
    hex: 0x70,
    length: 2,
    cycles: 2,
    extracycles: '**'
  },
  0x18: {
    mode: 'implied',
    opcode: 'clc',
    target: 'mode',
    hex: 0x18,
    length: 1,
    cycles: 2,
    extracycles: ''
  },
  0xd8: {
    mode: 'implied',
    opcode: 'cld',
    target: 'mode',
    hex: 0xd8,
    length: 1,
    cycles: 2,
    extracycles: ''
  },
  0x58: {
    mode: 'implied',
    opcode: 'cli',
    target: 'mode',
    hex: 0x58,
    length: 1,
    cycles: 2,
    extracycles: ''
  },
  0xb8: {
    mode: 'implied',
    opcode: 'clv',
    target: 'mode',
    hex: 0xb8,
    length: 1,
    cycles: 2,
    extracycles: ''
  },
  0xc9: {
    mode: 'immediate',
    opcode: 'cmp',
    target: 'mode',
    hex: 0xc9,
    length: 2,
    cycles: 2,
    extracycles: ''
  },
  0xc5: {
    mode: 'zeropage',
    opcode: 'cmp',
    target: 'mode',
    hex: 0xc5,
    length: 2,
    cycles: 3,
    extracycles: ''
  },
  0xd5: {
    mode: 'zeropagex',
    opcode: 'cmp',
    target: 'mode',
    hex: 0xd5,
    length: 2,
    cycles: 4,
    extracycles: ''
  },
  0xcd: {
    mode: 'absolute',
    opcode: 'cmp',
    target: 'mode',
    hex: 0xcd,
    length: 3,
    cycles: 4,
    extracycles: ''
  },
  0xdd: {
    mode: 'absolutex',
    opcode: 'cmp',
    target: 'mode',
    hex: 0xdd,
    length: 3,
    cycles: 4,
    extracycles: '*'
  },
  0xd9: {
    mode: 'absolutey',
    opcode: 'cmp',
    target: 'mode',
    hex: 0xd9,
    length: 3,
    cycles: 4,
    extracycles: '*'
  },
  0xc1: {
    mode: 'indirectx',
    opcode: 'cmp',
    target: 'mode',
    hex: 0xc1,
    length: 2,
    cycles: 6,
    extracycles: ''
  },
  0xd1: {
    mode: 'indirecty',
    opcode: 'cmp',
    target: 'mode',
    hex: 0xd1,
    length: 2,
    cycles: 5,
    extracycles: '*'
  },
  0xe0: {
    mode: 'immediate',
    opcode: 'cpx',
    target: 'mode',
    hex: 0xe0,
    length: 2,
    cycles: 2,
    extracycles: ''
  },
  0xe4: {
    mode: 'zeropage',
    opcode: 'cpx',
    target: 'mode',
    hex: 0xe4,
    length: 2,
    cycles: 3,
    extracycles: ''
  },
  0xec: {
    mode: 'absolute',
    opcode: 'cpx',
    target: 'mode',
    hex: 0xec,
    length: 3,
    cycles: 4,
    extracycles: ''
  },
  0xc0: {
    mode: 'immediate',
    opcode: 'cpy',
    target: 'mode',
    hex: 0xc0,
    length: 2,
    cycles: 2,
    extracycles: ''
  },
  0xc4: {
    mode: 'zeropage',
    opcode: 'cpy',
    target: 'mode',
    hex: 0xc4,
    length: 2,
    cycles: 3,
    extracycles: ''
  },
  0xcc: {
    mode: 'absolute',
    opcode: 'cpy',
    target: 'mode',
    hex: 0xcc,
    length: 3,
    cycles: 4,
    extracycles: ''
  },
  0xc6: {
    mode: 'zeropage',
    opcode: 'dec',
    target: 'mode',
    hex: 0xc6,
    length: 2,
    cycles: 5,
    extracycles: ''
  },
  0xd6: {
    mode: 'zeropagex',
    opcode: 'dec',
    target: 'mode',
    hex: 0xd6,
    length: 2,
    cycles: 6,
    extracycles: ''
  },
  0xce: {
    mode: 'absolute',
    opcode: 'dec',
    target: 'mode',
    hex: 0xce,
    length: 3,
    cycles: 6,
    extracycles: ''
  },
  0xde: {
    mode: 'absolutex',
    opcode: 'dec',
    target: 'mode',
    hex: 0xde,
    length: 3,
    cycles: 7,
    extracycles: ''
  },
  0xca: {
    mode: 'implied',
    opcode: 'dec',
    target: 'mode',
    hex: 0xca,
    length: 1,
    cycles: 2,
    extracycles: ''
  },
  0x88: {
    mode: 'implied',
    opcode: 'dec',
    target: 'mode',
    hex: 0x88,
    length: 1,
    cycles: 2,
    extracycles: ''
  },
  0x49: {
    mode: 'immediate',
    opcode: 'eor',
    target: 'mode',
    hex: 0x49,
    length: 2,
    cycles: 2,
    extracycles: ''
  },
  0x45: {
    mode: 'zeropage',
    opcode: 'eor',
    target: 'mode',
    hex: 0x45,
    length: 2,
    cycles: 3,
    extracycles: ''
  },
  0x55: {
    mode: 'zeropagex',
    opcode: 'eor',
    target: 'mode',
    hex: 0x55,
    length: 2,
    cycles: 4,
    extracycles: ''
  },
  0x4d: {
    mode: 'absolute',
    opcode: 'eor',
    target: 'mode',
    hex: 0x4d,
    length: 3,
    cycles: 4,
    extracycles: ''
  },
  0x5d: {
    mode: 'absolutex',
    opcode: 'eor',
    target: 'mode',
    hex: 0x5d,
    length: 3,
    cycles: 4,
    extracycles: '*'
  },
  0x59: {
    mode: 'absolutey',
    opcode: 'eor',
    target: 'mode',
    hex: 0x59,
    length: 3,
    cycles: 4,
    extracycles: '*'
  },
  0x41: {
    mode: 'indirectx',
    opcode: 'eor',
    target: 'mode',
    hex: 0x41,
    length: 2,
    cycles: 6,
    extracycles: ''
  },
  0x51: {
    mode: 'indirecty',
    opcode: 'eor',
    target: 'mode',
    hex: 0x51,
    length: 2,
    cycles: 5,
    extracycles: '*'
  },
  0xe6: {
    mode: 'zeropage',
    opcode: 'inc',
    target: 'mode',
    hex: 0xe6,
    length: 2,
    cycles: 5,
    extracycles: ''
  },
  0xf6: {
    mode: 'zeropagex',
    opcode: 'inc',
    target: 'mode',
    hex: 0xf6,
    length: 2,
    cycles: 6,
    extracycles: ''
  },
  0xee: {
    mode: 'absolute',
    opcode: 'inc',
    target: 'mode',
    hex: 0xee,
    length: 3,
    cycles: 6,
    extracycles: ''
  },
  0xfe: {
    mode: 'absolutex',
    opcode: 'inc',
    target: 'mode',
    hex: 0xfe,
    length: 3,
    cycles: 7,
    extracycles: ''
  },
  0xe8: {
    mode: 'implied',
    opcode: 'inx',
    target: 'mode',
    hex: 0xe8,
    length: 1,
    cycles: 2,
    extracycles: ''
  },
  0xc8: {
    mode: 'implied',
    opcode: 'iny',
    target: 'mode',
    hex: 0xc8,
    length: 1,
    cycles: 2,
    extracycles: ''
  },
  0x4c: {
    mode: 'absolute',
    opcode: 'jmp',
    target: 'mode',
    hex: 0x4c,
    length: 3,
    cycles: 3,
    extracycles: ''
  },
  0x6c: {
    mode: 'indirect',
    opcode: 'jmp',
    target: 'mode',
    hex: 0x6c,
    length: 3,
    cycles: 5,
    extracycles: ''
  },
  0x20: {
    mode: 'absolute',
    opcode: 'jsr',
    target: 'mode',
    hex: 0x20,
    length: 3,
    cycles: 6,
    extracycles: ''
  },
  0xa9: {
    mode: 'immediate',
    opcode: 'lda',
    target: 'mode',
    hex: 0xa9,
    length: 2,
    cycles: 2,
    extracycles: ''
  },
  0xa5: {
    mode: 'zeropage',
    opcode: 'lda',
    target: 'mode',
    hex: 0xa5,
    length: 2,
    cycles: 3,
    extracycles: ''
  },
  0xb5: {
    mode: 'zeropagex',
    opcode: 'lda',
    target: 'mode',
    hex: 0xb5,
    length: 2,
    cycles: 4,
    extracycles: ''
  },
  0xad: {
    mode: 'absolute',
    opcode: 'lda',
    target: 'mode',
    hex: 0xad,
    length: 3,
    cycles: 4,
    extracycles: ''
  },
  0xbd: {
    mode: 'absolutex',
    opcode: 'lda',
    target: 'mode',
    hex: 0xbd,
    length: 3,
    cycles: 4,
    extracycles: '*'
  },
  0xb9: {
    mode: 'absolutey',
    opcode: 'lda',
    target: 'mode',
    hex: 0xb9,
    length: 3,
    cycles: 4,
    extracycles: '*'
  },
  0xa1: {
    mode: 'indirectx',
    opcode: 'lda',
    target: 'mode',
    hex: 0xa1,
    length: 2,
    cycles: 6,
    extracycles: ''
  },
  0xb1: {
    mode: 'indirecty',
    opcode: 'lda',
    target: 'mode',
    hex: 0xb1,
    length: 2,
    cycles: 5,
    extracycles: '*'
  },
  0xa2: {
    mode: 'immediate',
    opcode: 'ldx',
    target: 'x' ,
    hex: 0xa2,
    length: 2,
    cycles: 2,
    extracycles: ''
  },
  0xa6: {
    mode: 'zeropage',
    opcode: 'ldx',
    target: 'x' ,
    hex: 0xa6,
    length: 2,
    cycles: 3,
    extracycles: ''
  },
  0xb6: {
    mode: 'zeropagey',
    opcode: 'ldx',
    target: 'x' ,
    hex: 0xb6,
    length: 2,
    cycles: 4,
    extracycles: ''
  },
  0xae: {
    mode: 'absolute',
    opcode: 'ldx',
    target: 'x' ,
    hex: 0xae,
    length: 3,
    cycles: 4,
    extracycles: ''
  },
  0xbe: {
    mode: 'absolutey',
    opcode: 'ldx',
    target: 'x' ,
    hex: 0xbe,
    length: 3,
    cycles: 4,
    extracycles: '*'
  },
  0xa0: {
    mode: 'immediate',
    opcode: 'ldy',
    target: 'y' ,
    hex: 0xa0,
    length: 2,
    cycles: 2,
    extracycles: ''
  },
  0xa4: {
    mode: 'zeropage',
    opcode: 'ldy',
    target: 'y' ,
    hex: 0xa4,
    length: 2,
    cycles: 3,
    extracycles: ''
  },
  0xb4: {
    mode: 'zeropagex',
    opcode: 'ldy',
    target: 'y' ,
    hex: 0xb4,
    length: 2,
    cycles: 4,
    extracycles: ''
  },
  0xac: {
    mode: 'absolute',
    opcode: 'ldy',
    target: 'y' ,
    hex: 0xac,
    length: 3,
    cycles: 4,
    extracycles: ''
  },
  0xbc: {
    mode: 'absolutex',
    opcode: 'ldy',
    target: 'y' ,
    hex: 0xbc,
    length: 3,
    cycles: 4,
    extracycles: '*'
  },
  0x4a: {
    mode: 'accumulator',
    opcode: 'lsr',
    target: 'mode',
    hex: 0x4a,
    length: 1,
    cycles: 2,
    extracycles: ''
  },
  0x46: {
    mode: 'zeropage',
    opcode: 'lsr',
    target: 'mode',
    hex: 0x46,
    length: 2,
    cycles: 5,
    extracycles: ''
  },
  0x56: {
    mode: 'zeropagex',
    opcode: 'lsr',
    target: 'mode',
    hex: 0x56,
    length: 2,
    cycles: 6,
    extracycles: ''
  },
  0x4e: {
    mode: 'absolute',
    opcode: 'lsr',
    target: 'mode',
    hex: 0x4e,
    length: 3,
    cycles: 6,
    extracycles: ''
  },
  0x5e: {
    mode: 'absolutex',
    opcode: 'lsr',
    target: 'mode',
    hex: 0x5e,
    length: 3,
    cycles: 7,
    extracycles: ''
  },
  0xea: {
    mode: 'implied',
    opcode: 'nop',
    target: 'mode',
    hex: 0xea,
    length: 1,
    cycles: 2,
    extracycles: ''
  },
  0x09: {
    mode: 'immediate',
    opcode: 'ora',
    target: 'mode',
    hex: 0x09,
    length: 2,
    cycles: 2,
    extracycles: ''
  },
  0x05: {
    mode: 'zeropage',
    opcode: 'ora',
    target: 'mode',
    hex: 0x05,
    length: 2,
    cycles: 3,
    extracycles: ''
  },
  0x15: {
    mode: 'zeropagex',
    opcode: 'ora',
    target: 'mode',
    hex: 0x15,
    length: 2,
    cycles: 4,
    extracycles: ''
  },
  0x0d: {
    mode: 'absolute',
    opcode: 'ora',
    target: 'mode',
    hex: 0x0d,
    length: 3,
    cycles: 4,
    extracycles: ''
  },
  0x1d: {
    mode: 'absolutex',
    opcode: 'ora',
    target: 'mode',
    hex: 0x1d,
    length: 3,
    cycles: 4,
    extracycles: '*'
  },
  0x19: {
    mode: 'absolutey',
    opcode: 'ora',
    target: 'mode',
    hex: 0x19,
    length: 3,
    cycles: 4,
    extracycles: '*'
  },
  0x01: {
    mode: 'indirectx',
    opcode: 'ora',
    target: 'mode',
    hex: 0x01,
    length: 2,
    cycles: 6,
    extracycles: ''
  },
  0x11: {
    mode: 'indirecty',
    opcode: 'ora',
    target: 'mode',
    hex: 0x11,
    length: 2,
    cycles: 5,
    extracycles: '*'
  },
  0x48: {
    mode: 'implied',
    opcode: 'pha',
    target: 'mode',
    hex: 0x48,
    length: 1,
    cycles: 3,
    extracycles: ''
  },
  0x08: {
    mode: 'implied',
    opcode: 'php',
    target: 'mode',
    hex: 0x08,
    length: 1,
    cycles: 3,
    extracycles: ''
  },
  0x68: {
    mode: 'implied',
    opcode: 'pla',
    target: 'mode',
    hex: 0x68,
    length: 1,
    cycles: 4,
    extracycles: ''
  },
  0x28: {
    mode: 'implied',
    opcode: 'plp',
    target: 'mode',
    hex: 0x28,
    length: 1,
    cycles: 4,
    extracycles: ''
  },
  0x2a: {
    mode: 'accumulator',
    opcode: 'rol',
    target: 'mode',
    hex: 0x2a,
    length: 1,
    cycles: 2,
    extracycles: ''
  },
  0x26: {
    mode: 'zeropage',
    opcode: 'rol',
    target: 'mode',
    hex: 0x26,
    length: 2,
    cycles: 5,
    extracycles: ''
  },
  0x36: {
    mode: 'zeropagex',
    opcode: 'rol',
    target: 'mode',
    hex: 0x36,
    length: 2,
    cycles: 6,
    extracycles: ''
  },
  0x2e: {
    mode: 'absolute',
    opcode: 'rol',
    target: 'mode',
    hex: 0x2e,
    length: 3,
    cycles: 6,
    extracycles: ''
  },
  0x3e: {
    mode: 'absolutex',
    opcode: 'rol',
    target: 'mode',
    hex: 0x3e,
    length: 3,
    cycles: 7,
    extracycles: ''
  },
  0x6a: {
    mode: 'accumulator',
    opcode: 'ror',
    target: 'mode',
    hex: 0x6a,
    length: 1,
    cycles: 2,
    extracycles: ''
  },
  0x66: {
    mode: 'zeropage',
    opcode: 'ror',
    target: 'mode',
    hex: 0x66,
    length: 2,
    cycles: 5,
    extracycles: ''
  },
  0x76: {
    mode: 'zeropagex',
    opcode: 'ror',
    target: 'mode',
    hex: 0x76,
    length: 2,
    cycles: 6,
    extracycles: ''
  },
  0x6e: {
    mode: 'absolute',
    opcode: 'ror',
    target: 'mode',
    hex: 0x6e,
    length: 3,
    cycles: 6,
    extracycles: ''
  },
  0x7e: {
    mode: 'absolutex',
    opcode: 'ror',
    target: 'mode',
    hex: 0x7e,
    length: 3,
    cycles: 7,
    extracycles: ''
  },
  0x40: {
    mode: 'implied',
    opcode: 'rti',
    target: 'mode',
    hex: 0x40,
    length: 1,
    cycles: 6,
    extracycles: ''
  },
  0x60: {
    mode: 'implied',
    opcode: 'rts',
    target: 'mode',
    hex: 0x60,
    length: 1,
    cycles: 6,
    extracycles: ''
  },
  0xe9: {
    mode: 'immediate',
    opcode: 'sbc',
    target: 'accumulator' ,
    hex: 0xe9,
    length: 2,
    cycles: 2,
    extracycles: ''
  },
  0xe5: {
    mode: 'zeropage',
    opcode: 'sbc',
    target: 'accumulator' ,
    hex: 0xe5,
    length: 2,
    cycles: 3,
    extracycles: ''
  },
  0xf5: {
    mode: 'zeropagex',
    opcode: 'sbc',
    target: 'accumulator' ,
    hex: 0xf5,
    length: 2,
    cycles: 4,
    extracycles: ''
  },
  0xed: {
    mode: 'absolute',
    opcode: 'sbc',
    target: 'accumulator' ,
    hex: 0xed,
    length: 3,
    cycles: 4,
    extracycles: ''
  },
  0xfd: {
    mode: 'absolutex',
    opcode: 'sbc',
    target: 'accumulator' ,
    hex: 0xfd,
    length: 3,
    cycles: 4,
    extracycles: '*'
  },
  0xf9: {
    mode: 'absolutey',
    opcode: 'sbc',
    target: 'accumulator' ,
    hex: 0xf9,
    length: 3,
    cycles: 4,
    extracycles: '*'
  },
  0xe1: {
    mode: 'indirectx',
    opcode: 'sbc',
    target: 'accumulator' ,
    hex: 0xe1,
    length: 2,
    cycles: 6,
    extracycles: ''
  },
  0xf1: {
    mode: 'indirecty',
    opcode: 'sbc',
    target: 'accumulator' ,
    hex: 0xf1,
    length: 2,
    cycles: 5,
    extracycles: '*'
  },
  0x38: {
    mode: 'implied',
    opcode: 'sec',
    target: 'mode',
    hex: 0x38,
    length: 1,
    cycles: 2,
    extracycles: ''
  },
  0xf8: {
    mode: 'implied',
    opcode: 'sed',
    target: 'mode',
    hex: 0xf8,
    length: 1,
    cycles: 2,
    extracycles: ''
  },
  0x78: {
    mode: 'implied',
    opcode: 'sei',
    target: 'mode',
    hex: 0x78,
    length: 1,
    cycles: 2,
    extracycles: ''
  },
  0x85: {
    mode: 'zeropage',
    opcode: 'sta',
    target: 'mode',
    hex: 0x85,
    length: 2,
    cycles: 3,
    extracycles: ''
  },
  0x95: {
    mode: 'zeropagex',
    opcode: 'sta',
    target: 'mode',
    hex: 0x95,
    length: 2,
    cycles: 4,
    extracycles: ''
  },
  0x8d: {
    mode: 'absolute',
    opcode: 'sta',
    target: 'mode',
    hex: 0x8d,
    length: 3,
    cycles: 4,
    extracycles: ''
  },
  0x9d: {
    mode: 'absolutex',
    opcode: 'sta',
    target: 'mode',
    hex: 0x9d,
    length: 3,
    cycles: 5,
    extracycles: ''
  },
  0x99: {
    mode: 'absolutey',
    opcode: 'sta',
    target: 'mode',
    hex: 0x99,
    length: 3,
    cycles: 5,
    extracycles: ''
  },
  0x81: {
    mode: 'indirectx',
    opcode: 'sta',
    target: 'mode',
    hex: 0x81,
    length: 2,
    cycles: 6,
    extracycles: ''
  },
  0x91: {
    mode: 'indirecty',
    opcode: 'sta',
    target: 'mode',
    hex: 0x91,
    length: 2,
    cycles: 6,
    extracycles: ''
  },
  0x86: {
    mode: 'zeropage',
    opcode: 'stx',
    target: 'mode',
    hex: 0x86,
    length: 2,
    cycles: 3,
    extracycles: ''
  },
  0x96: {
    mode: 'zeropagey',
    opcode: 'stx',
    target: 'mode',
    hex: 0x96,
    length: 2,
    cycles: 4,
    extracycles: ''
  },
  0x8e: {
    mode: 'absolute',
    opcode: 'stx',
    target: 'mode',
    hex: 0x8e,
    length: 3,
    cycles: 4,
    extracycles: ''
  },
  0x84: {
    mode: 'zeropage',
    opcode: 'sty',
    target: 'mode',
    hex: 0x84,
    length: 2,
    cycles: 3,
    extracycles: ''
  },
  0x94: {
    mode: 'zeropagex',
    opcode: 'sty',
    target: 'mode',
    hex: 0x94,
    length: 2,
    cycles: 4,
    extracycles: ''
  },
  0x8c: {
    mode: 'absolute',
    opcode: 'sty',
    target: 'mode',
    hex: 0x8c,
    length: 3,
    cycles: 4,
    extracycles: ''
  },
  0xaa: {
    mode: 'implied',
    opcode: 'tax',
    target: 'mode',
    hex: 0xaa,
    length: 1,
    cycles: 2,
    extracycles: ''
  },
  0xa8: {
    mode: 'implied',
    opcode: 'tay',
    target: 'mode',
    hex: 0xa8,
    length: 1,
    cycles: 2,
    extracycles: ''
  },
  0xba: {
    mode: 'implied',
    opcode: 'tsx',
    target: 'mode',
    hex: 0xba,
    length: 1,
    cycles: 2,
    extracycles: ''
  },
  0x8a: {
    mode: 'implied',
    opcode: 'txa',
    target: 'mode',
    hex: 0x8a,
    length: 1,
    cycles: 2,
    extracycles: ''
  },
  0x9a: {
    mode: 'implied',
    opcode: 'txs',
    target: 'mode',
    hex: 0x9a,
    length: 1,
    cycles: 2,
    extracycles: ''
  },
  0x98: {
    mode: 'implied',
    opcode: 'tya',
    target: 'mode',
    hex: 0x98,
    length: 1,
    cycles: 2,
    extracycles: ''
  }
}

module.exports = OPCODES
