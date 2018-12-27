function uiNotification (NotificationProvider) {
  NotificationProvider.setOptions({
    delay: 5000,
    positionX: 'right',
    startTop: 50,
    positionY: 'top'
  })
}

module.exports = uiNotification
