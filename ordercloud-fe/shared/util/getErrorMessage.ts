import { ErrorType } from '../components'

export const getErrorMessage = (
  e,
  defaultMessage = 'Възникна проблем. Моля опитайте по-късно.'
): ErrorType => {
  if (e.message) return { message: e.message }
  return { message: defaultMessage }
}
