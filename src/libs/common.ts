export function getTypeName(type: number) {
  switch (type) {
    case 1:
      return 'Start'
    case 2:
      return 'Goal'
    case 3:
      return 'Lucky'
    case 4:
      return 'UnLucky'
    case 5:
      return 'findWork'
    case 6:
      return 'work'
    case 7:
      return 'marry'
    case 8:
      return 'birth'
    default:
      return '-'
  }
}
