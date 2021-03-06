import styled               from 'styled-components'
import { orderStatusColor } from '../helper'

const DFButton = styled.button`
  
  cursor: pointer;
  text-transform: lowercase; 
  border-radius: 3px;
  background:var(--main-bg-color);  
  color: var(--sub-bg-color);
  &:hover {
    border: 1px solid var(--main-border-color);
    background: var(--sub-bg-color);
    color: var(--white-txt-color);
  }
  font-size: 1em;
  border: 1px solid var(--main-border-color);
  ${props => props.solid && `
    background: var(--brand-color );
  `}
  ${props => props.cancel && `
    background: var(--error-color);
    color: var(--white-txt-color);
  `}
  ${props => props.confirm && `color: var(--white-txt-color);background: var(--success-color);`}
  ${props => props.unactive && `
    background: var(--disabled-bg-color);
    color: var(--disabled-txt-color);
    cursor: none;
    pointer-events: none;
  `}
`

const DFIcon = styled.i`
  color: var(--brand-color);
  font-size: 2rem;
  display: inline-block;

  ${props => props.clickable && `
    cursor: pointer;
    &:hover {
      color: var(--main-txt-color);
    }
  `}
  ${props => (props.status) && `color: ${orderStatusColor(props.status)}` }
`

const DFLabel = styled.label`
  display: block;

  color: var(--main-txt-color);
  ${props => props.required && `
    color: var(--required-txt);
  `}
  ${props => props.filled && `
    color: var(--main-txt-color);
  `}
  ${props => props.small && `
    font-size: 1rem;
  `}
      
`

const DFContainer = styled.div`
  
`

const DFPageContainer = styled.div`
  width: 75%;
  margin: 0 auto;
`

const DFMenuItem = styled.div`
  display: inline-block;

  ${props => props.ordered && `
    background: var(--main-bg-color);
  `}
`

const DFInputsField = styled.div`
  ${props => props.txtfield && `
    display: flex;
  `}
  ${props => props.flexitem && `
      flex: 1;
    `}
`

const DFSelect = styled.div`
    background: var(--required-bg);
    position: relative;
    z-index: 123;
    border-radius: 6px;
    padding: 3px;
  ${props => props.required && `
    background: var(--required-bg);
  `}
  ${props => props.filled && `
    background: none;
  `}
  position: relative;
  z-index: 123;
  @media only screen and (max-width: 800px) {
    width: 260px;
  }
`
const DFError = styled.p`
  color: var(--error-color);
  display: none;
  ${props => props.active && `
    display: block;
  `}
`
const DFNote = styled.p`
  color: var(--warning-color);
  border: 3px dashed var(--main-border-color);
  background: var(--highlight-bg-color);
`

const DFInput = {
  TxtArea: styled.textarea`
    padding: 12px;
    background: var(--main-bg-color);
    border: 1px solid var(--main-border-color);
    min-width: 320px;
    border-radius: 2px;
    font-size: 1rem;
    color: var(--main-txt-color);
    @media only screen and (max-width: 800px) {
      min-width: 190px;
    }
    ${props => props.required && `
      background: var(--required-bg);
    `}
    ${props => props.filled && `
      background: var(--white-bg-color);
    `}
  `,
  Txt: styled.input`
    background: var(--main-bg-color);
    border: 1px solid var(--main-border-color);
    min-width: 320px;
    border-radius: 2px;
    font-size: 1rem;
    color: var(--main-txt-color);
    @media only screen and (max-width: 800px) {
      min-width: 190px!important;
    }
    ${props => props.required && `
      background: var(--required-bg);
    `}
    ${props => props.filled && `
      background: var(--white-bg-color);
    `}
  `
}


const DFPageTitle = styled.h1`
  text-align: center;
  font-weight: normal;
`

const DFSectionTitle = styled.h4`
  font-size: 1rem;
  border-bottom: 1px dotted var(--main-border-color);
`

const DFSubTitle = styled.h3`
  font-size: 1.2rem;
`

const DFItem = styled.p`
   ${props => (props.status) && `color: var(--white-txt-color);background: ${orderStatusColor(props.status)}` }

`
const DFBlock = styled.div`
  ${props => props.floated && `
      float: left;
      width: 47%;
    `}
  ${props => props.flexrow && `
      display: flex;
    `}
  ${props => props.flexitem && `
      flex: 1;
    `}
  ${props => props.clear && `
      clear: left;
    `}
`

export {
  DFButton,
  DFContainer,
  DFPageContainer,
  DFInput,
  DFMenuItem,
  DFLabel,
  DFError,
  DFNote,
  DFPageTitle,
  DFSectionTitle,
  DFSubTitle,
  DFItem,
  DFSelect,
  DFInputsField,
  DFBlock,
  DFIcon
}

