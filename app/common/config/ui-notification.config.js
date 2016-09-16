

function uiNotification(NotificationProvider) {
    NotificationProvider.setOptions({
        delay: 5000,
        positionX: 'right',
        positionY: 'bottom'
    })
}

module.exports = uiNotification;