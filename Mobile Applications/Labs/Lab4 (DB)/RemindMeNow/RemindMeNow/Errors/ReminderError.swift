enum ReminderError: Error {
	case emptyTitle
	case shortTitle
	
	case invalidTime
	
	case emptyNote
	case shortNote
}
