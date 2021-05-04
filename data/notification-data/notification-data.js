import NotificationModel from '../../models/notification-model'
import {NewProjects} from '../project-data/new-project-data'
import {OngoingProjects} from '../project-data/ongoing-project-data'
import {CompletedProjects} from '../project-data/completed-project-data'

export const Notifications = [
  new NotificationModel(
    'New Job',
    'You have been assigned a new job.',
    new Date().toLocaleDateString().toString(),
    'NewProjectDetails',
    NewProjects[0]
  ),
  new NotificationModel(
    'Ongoing Job',
    'Your submission has been rejected.',
    new Date().toLocaleDateString().toString(),
    'OngoingProjectDetails',
    OngoingProjects[0]
  ),
  new NotificationModel(
    'Completed Job',
    'You have received a payment.',
    new Date().toLocaleDateString().toString(),
    'CompletedProjectDetails',
    CompletedProjects[0]
  ),
  new NotificationModel(
    'New Job',
    'You have been assigned a new job.',
    new Date().toLocaleDateString().toString(),
    'NewProjectDetails',
    NewProjects[1]
  ),
  new NotificationModel(
    'New Job',
    'You have been assigned a new job.',
    new Date().toLocaleDateString().toString(),
    'NewProjectDetails',
    NewProjects[2]
  ),
  new NotificationModel(
    'New Job',
    'You have been assigned a new job.',
    new Date().toLocaleDateString().toString(),
    'NewProjectDetails',
    NewProjects[3]
  ),
  new NotificationModel(
    'New Job',
    'You have been assigned a new job.',
    new Date().toLocaleDateString().toString(),
    'NewProjectDetails',
    NewProjects[4]
  ),
  new NotificationModel(
    'New Job',
    'You have been assigned a new job.',
    new Date().toLocaleDateString().toString(),
    'NewProjectDetails',
    NewProjects[5]
  ),
  new NotificationModel(
    'New Job',
    'You have been assigned a new job.',
    new Date().toLocaleDateString().toString(),
    'NewProjectDetails',
    NewProjects[6]
  ),
  new NotificationModel(
    'New Job',
    'You have been assigned a new job.',
    new Date().toLocaleDateString().toString(),
    'NewProjectDetails',
    NewProjects[7]
  ),
  new NotificationModel(
    'New Job',
    'You have been assigned a new job.',
    new Date().toLocaleDateString().toString(),
    'NewProjectDetails',
    NewProjects[8]
  )
]
