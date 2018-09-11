const app = getApp();

Page({
  showSuccessToast() {
    app.toasterService.success('成功提示');
  }
});
