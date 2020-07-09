/* eslint no-bitwise: 0, no-mixed-operators: 0 */
import axios from 'axios';

const sessionId = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
  const r = Math.random() * 16 | 0;
  return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
});

export default function install(Vue, options, router) {
  const {
    connection,
    language,
    platform,
    userAgent,
    vendor,
  } = navigator;


  router.onReady(async () => {
    try {
      await axios.post(`http://localhost:8081/session/${sessionId}`, {
        browser: {
          connection,
          language,
          platform,
          userAgent,
          vendor,
        },
        path: router.currentRoute.fullPath,
      });
    } catch (e) {
      console.error(e);
    }

    router.afterEach(async (to) => {
      try {
        await axios.post(`http://localhost:8081/session/${sessionId}/page`, {
          path: to.fullPath,
        });
      } catch (e) {
        console.error(e);
      }
    });
  });
}
