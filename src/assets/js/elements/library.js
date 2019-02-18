import styled from 'styled-components'

const DFButton = styled.button`
  background: transparent;
  border: 2px solid var(--main-txt-color);  
  color: 2px solid var(--main-txt-color);
  background: var(--highlight-bg-color);
  margin: 0em 0.5em;
  padding: 0.6em 1em;
  cursor: pointer;
  font-size: 0.9em;
  text-transform: lowercase;
  &:hover {
    background: var(--sub-bg-color);
  }

  ${props => props.unactive && `
    background: var(--highlight-bg-color);
    color: #c3c3c3;
    cursor: none;
    pointer-events: none;
  `}
`

const DFLabel = styled.label`
  display: block;
  padding: 10px 0;
  color: var(--main-txt-color);
  ${props => props.required && `
    color: var(--required-txt);
  `}
  ${props => props.filled && `
    color: var(--main-txt-color);
  `}
`

const DFContainer = styled.div`

`

const DFPageContainer = styled.div`
  text-align: center;
  padding: 8px;
`

const DFMenuItem = styled.div`
  text-align: left;
  padding: 12px;
  background: var(--sub-bg-color);
  margin: 4px;
  
  display: inline-block;
  width: 400px;
  height: 400px;
  float: left;
  ${props => props.ordered && `
    background: var(--highlight-bg-color);
  `}
`

const DFInputsField = styled.div`
  
`

const DFSelect = styled.div`
  border-radius: 6px;
  ${props => props.required && `
    border: 1px solid var(--required-bg);
  `}
  ${props => props.filled && `
    border: none;
  `}
`

const DFInput = {
  Txt: styled.input`
    border: 1px solid #ddd;
    padding: 4px 24px;
    font-size: 15px;
    background: var(--highlight-bg-color);
    ${props => props.required && `
      background: var(--required-bg);
    `}
    ${props => props.filled && `
      background: var(--highlight-bg-color);
    `}
  `
}

const DFError = styled.p`
`

const DFPageTitle = styled.h1`
`

const DFSectionTitle = styled.h3`
`

const DFSubTitle = styled.h3`
`

const DFItem = styled.p`
`

export {
  DFButton,
  DFContainer,
  DFPageContainer,
  DFInput,
  DFMenuItem,
  DFLabel,
  DFError,
  DFPageTitle,
  DFSectionTitle,
  DFSubTitle,
  DFItem,
  DFSelect,
  DFInputsField
}

