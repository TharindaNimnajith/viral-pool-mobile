const projectStatusEnum = Object.freeze({
  New: 0,
  Ongoing: 1,
  Completed: 2
})

const jobAcceptationStatusEnum = Object.freeze({
  Pending: 0,
  Accepted: 1,
  Completed: 2,
  Rejected: 3
})

const contentSubmissionStatusEnum = Object.freeze({
  Default: 0,
  Created: 1,
  Pending: 2,
  Rejected: 3,
  Approved: 4
})

const resultSubmissionStatusEnum = Object.freeze({
  Default: 0,
  Created: 1,
  Pending: 2,
  Rejected: 3,
  Approved: 4
})

const notificationTypeEnum = Object.freeze({
  Default: 0,
  NewJob: 1,
  ContentRejected: 2,
  ContentAccepted: 3,
  ResultRejected: 4,
  ResultAccepted: 5,
  PaymentAdded: 6
})

const socialMediaPlatformNameEnum = Object.freeze({
  Youtube: 'YouTube',
  Facebook: 'FaceBook',
  Instagram: 'Instagram',
  Tiktok: 'TikTok'
})

const socialMediaPlatformActiveStatusEnum = Object.freeze({
  Deactivated: 0,
  Activated: 1
})

export {
  projectStatusEnum,
  jobAcceptationStatusEnum,
  contentSubmissionStatusEnum,
  resultSubmissionStatusEnum,
  notificationTypeEnum,
  socialMediaPlatformNameEnum,
  socialMediaPlatformActiveStatusEnum
}
