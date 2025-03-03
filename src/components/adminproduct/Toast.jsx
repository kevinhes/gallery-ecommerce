import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Toast as BsToast } from 'bootstrap';
import { removeMessage } from '../../slice/toastSlice';

const TOAST_DURATION = 2000;

export default function Toast() {
  const messages = useSelector((state) => state.toast.messages);
  const dispatch = useDispatch();

  const toastRefs = useRef({});

  useEffect(() => {
    messages.forEach((message) => {
      let messageElement = toastRefs.current[message.id];

      if (messageElement) {
        const toastInstance = new BsToast(messageElement);
        toastInstance.show();

        setTimeout(() => {
          dispatch(removeMessage(message.id));
        }, TOAST_DURATION);
      }
    });
  }, [messages]);

  const handleDismiss = (message_id) => {
    dispatch(removeMessage(message_id));
  };

  return (
    <div
      className="toast-container position-fixed top-0 end-0 p-3"
      style={{ zIndex: 1000 }}
    >
      {messages.map((message) => (
        <div
          className="toast"
          role="alert"
          aria-live="assertive"
          aria-atomic="true"
          key={message.id}
          ref={(el) => (toastRefs.current[message.id] = el)}
        >
          <div
            className={`toast-header ${message.status === 'success' ? 'bg-success' : 'bg-danger'}`}
          >
            <strong className="me-auto text-light">
              {' '}
              {message.status === 'success' ? '成功' : '失敗'}{' '}
            </strong>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="toast"
              aria-label="Close"
              onClick={() => handleDismiss(message.id)}
            />
          </div>
          <div className="toast-body">{message.text}</div>
        </div>
      ))}
    </div>
  );
}
