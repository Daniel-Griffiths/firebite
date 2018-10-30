import ReactDOM from 'react-dom'
import styled from 'styled-components'
import React, { Component } from 'react'

const modalRoot = document.getElementById('modal-root') as any

interface Props {
	show: boolean
}

export default class Modal extends Component<Props> {

	public el = document.createElement('div')

	public componentDidMount() {
		// The portal element is inserted in the DOM tree after
		// the Modal's children are mounted, meaning that children
		// will be mounted on a detached DOM node. If a child
		// component requires to be attached to the DOM tree
		// immediately when mounted, for example to measure a
		// DOM node, or uses 'autoFocus' in a descendant, add
		// state to Modal and only render the children when Modal
		// is inserted in the DOM tree.
		modalRoot.appendChild(this.el)
	}

	public componentWillUnmount() {
		modalRoot.removeChild(this.el)
	}

	public render() {
		if (this.props.show) {
		  return ReactDOM.createPortal(
		    <StyledModal {...this.props}>
		      <StyledModalContainer>{this.props.children}</StyledModalContainer>
		    </StyledModal>,
		    this.el
		  )
		}

		return null
	}
}

const StyledModal = styled.div`
  top: 0px;
  left: 0px;
  width: 100%;
  z-index: 100;
  height: 100%;
  display: flex;
  animation: fadein 0.3s;
  position: absolute;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.8);
`

const StyledModalContainer = styled.div`
  width: 100%;
  padding: 1rem;
  background: #fff;
  max-width: 25rem;
  border-radius: 3px;
  animation: fadeinUp 0.5s;
`