import { DFError }   from '../../elements/library'

export default function Error ({ errorString }) {
  return <DFError>errorString</DFError>
}