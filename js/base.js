
function initConfirmDiv($this){
    $this.html('<div class="custom-confirm-overlay" id="confirm-overlay">\n' +
        '    <div class="custom-confirm" id="custom-confirm">\n' +
        '        <div class="confirm-icon">\n' +
        '            <i class="fas fa-exclamation-circle"></i>\n' +
        '        </div>\n' +
        '        <h3 class="confirm-title" id="confirm-title">确认操作</h3>\n' +
        '        <p class="confirm-message" id="confirm-message">您确定要执行此操作吗？</p>\n' +
        '        <div class="confirm-buttons">\n' +
        '            <button class="confirm-btn confirm" id="confirm-ok">确定</button>\n' +
        '            <button class="confirm-btn cancel" id="confirm-cancel">取消</button>\n' +
        '        </div>\n' +
        '    </div>\n' +
        '</div>');
};



// 自定义确认框函数
function showConfirm(title, message, confirmCallback, cancelCallback) {
    var $overlay = $('#confirm-overlay');
    var $confirmBox = $('#custom-confirm');
    var $titleElement = $('#confirm-title');
    var $messageElement = $('#confirm-message');
    var $okButton = $('#confirm-ok');
    var $cancelButton = $('#confirm-cancel');

    // 设置标题和消息
    $titleElement.text(title);
    $messageElement.text(message);

    // 显示确认框
    $overlay.addClass('active');
    setTimeout(() => {
        $confirmBox.addClass('active');
    }, 10);

    // 创建Promise来处理用户选择
    return new Promise((resolve) => {
        // 确定按钮点击事件
        var onConfirm = () => {
        hideConfirm();
    if (confirmCallback) confirmCallback();
    resolve(true);
};

    // 取消按钮点击事件
    var onCancel = () => {
        hideConfirm();
        if (cancelCallback) cancelCallback();
        resolve(false);
    };

    // 添加事件监听器
    $okButton.off('click').on('click', onConfirm);
    $cancelButton.off('click').on('click', onCancel);

    // 点击遮罩层也可以取消
    $overlay.off('click').on('click', function(e) {
        if (e.target === this) {
            onCancel();
        }
    });
});
}

// 隐藏确认框
function hideConfirm() {
    var $overlay = $('#confirm-overlay');
    var $confirmBox = $('#custom-confirm');

    $confirmBox.removeClass('active');
    setTimeout(() => {
        $overlay.removeClass('active');
}, 300);
}
