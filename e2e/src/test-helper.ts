export default class TestHelper {
  static async sleep(duration) {
    return new Promise(resolve => {
      setTimeout(() => {
        console.log(`Slept for ${duration}`);
        resolve();
      }, duration);
    });
  }

  static async retry(action, retryDelay, retryCount) {
    try {
      await action();
    } catch (error) {
      if (retryCount <= 0) {
        throw error;
      } else {
        await TestHelper.sleep(retryDelay);
        await TestHelper.retry(action, retryDelay, retryCount - 1);
      }
    }
  }
}
