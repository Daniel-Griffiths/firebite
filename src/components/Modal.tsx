import posed from 'react-pose'
import ReactDOM from 'react-dom'
import styled from 'styled-components'
import React, { Component } from 'react'

const modalRoot = document.getElementById('modal-root') as any

const ModalContainer = posed.div({
  enter: {
    y: 0,
    opacity: 1,
    delay: 300,
    transition: {
      y: { type: 'spring', stiffness: 1000, damping: 15 },
      default: { duration: 300 }
    }
  },
  exit: {
    y: 50,
    opacity: 0,
    transition: { duration: 150 }
  }
});

const ModalShade = posed.div({
  enter: { opacity: 1 },
  exit: { opacity: 0 }
});

interface Props {
	show: boolean,
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

		const { show } = this.props

		return ReactDOM.createPortal(
			<StyledModalShade 
				key="modal" {...this.props}
				pose={show ? 'enter' : 'exit'} 
				style={{ pointerEvents: show ? 'all' : 'none' }}
			>
	  			<StyledModalContainer pose={show ? 'enter' : 'exit'} key="model-container">{this.props.children}</StyledModalContainer>
			</StyledModalShade>
			,this.el
		)
	}
}

const StyledModalShade = styled(ModalShade)`
  top: 0px;
  left: 0px;
  width: 100%;
  z-index: 100;
  height: 100%;
  display: flex;
  position: fixed;
  align-items: center;
  animation: fadein 0.3s;
  justify-content: center;
  background: rgba(0, 0, 0, 0.8);
`

const StyledModalContainer = styled(ModalContainer)`
  width: 100%;
  padding: 1rem;
  background: #fff;
  max-width: 25rem;
  border-radius: 3px;
  animation: fadeinUp 0.5s;
`