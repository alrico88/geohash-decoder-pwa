import {Toast} from 'vant';

export default {
  methods: {
    notifyClipSuccess() {
      Toast.success('Copied', {
        duration: 500,
      });
    },
    notifyClipError() {
      Toast.success('Could not copy', {
        duration: 500,
      });
    },
  },
};
