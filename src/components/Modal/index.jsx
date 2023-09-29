import { Component } from 'react';
import { Overlay, Popup } from './Modal.style';

class Modal extends Component {
  componentDidMount() {
    document.addEventListener('keydown', this.handlePressEsc);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handlePressEsc);
  }

  handlePressEsc = e => {
    if (e.code === 'Escape') {
      this.props.onClose();
    }
  };

  handleBackdropClick = e => {
    if (e.currentTarget === e.target) {
      this.props.onClose();
    }
  };

  render() {
    const {
      modalImage: { src, alt },
    } = this.props;

    return (
      <Overlay className="overlay" onClick={this.handleBackdropClick}>
        <Popup>
          <img src={src} alt={alt} />
        </Popup>
      </Overlay>
    );
  }
}

export default Modal;
