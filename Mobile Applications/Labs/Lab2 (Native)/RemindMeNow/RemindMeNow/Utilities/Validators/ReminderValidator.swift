import SwiftUI

class ReminderValidator {
	func validate(reminder: Reminder) throws {
		if reminder.title.isEmpty {
			throw ReminderError.emptyTitle
		}
		
		if reminder.title.count < 5 {
			throw ReminderError.shortTitle
		}
		
		let dateFormatter = DateFormatter()
		dateFormatter.dateFormat = "dd/MM/yyyy HH:mm"
		
		if let reminderDate = dateFormatter.date(from: "\(reminder.date) \(reminder.time)"), reminderDate < Date() {
			throw ReminderError.invalidTime
		}
		
		if reminder.note.isEmpty {
			throw ReminderError.emptyNote
		}
		
		if reminder.note.count < 5 {
			throw ReminderError.shortNote
		}
	}
}
