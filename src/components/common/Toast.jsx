import React from 'react';
import toast from 'react-hot-toast';

const Toast = {
  success: (message) => toast.success(message, {
    style: {
      background: '#10B981',
      color: '#fff',
    },
    icon: '✅',
  }),
  error: (message) => toast.error(message, {
    style: {
      background: '#EF4444',
      color: '#fff',
    },
    icon: '❌',
  }),
  warning: (message) => toast.warning(message, {
    style: {
      background: '#F59E0B',
      color: '#fff',
    },
    icon: '⚠️',
  }),
  info: (message) => toast(message, {
    style: {
      background: '#3B82F6',
      color: '#fff',
    },
    icon: 'ℹ️',
  }),
};

export default Toast;