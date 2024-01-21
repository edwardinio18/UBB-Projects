import Foundation
import SwiftUI

class ReminderListViewModel: ObservableObject {
	
	@Published private var reminders: [Reminder] = []
	
	private let apiService: ApiService = ApiService()
	private let reminderValidator: ReminderValidator = ReminderValidator()
	
	init() {
		self.reminders = self.apiService.fetchReminders()
	}
	
	func getReminders() -> [Reminder] {
		return self.reminders
	}
	
	func deleteReminder(id: Int) {
		self.reminders = self.reminders.filter { $0.id != id }
		self.apiService.saveReminders(reminders: reminders)
	}
	
	func addReminder(
		title: String,
		date: Date,
		time: Date,
		category: String,
		priority: String,
		note: String
	) throws {
		let highestId = self.reminders.reduce(0) { (result, reminder) -> Int in
			return result > reminder.id ? result : reminder.id
		} + 1
		
		let dateTimeFormatter = DateFormatter()
		
		dateTimeFormatter.dateFormat = "dd/MM/yyyy"
		let dateString = dateTimeFormatter.string(from: date)
		
		dateTimeFormatter.dateFormat = "HH:mm"
		let timeString = dateTimeFormatter.string(from: time)
		
		let reminder = Reminder(id: highestId, title: title, date: dateString, time: timeString, category: category, priority: priority, note: note)
		
		do {
			try self.reminderValidator.validate(reminder: reminder)
		} catch {
			throw error
		}
		
		reminders.append(reminder)
		self.apiService.saveReminders(reminders: reminders)
	}
	
	func updateReminder(
		id: Int,
		title: String,
		date: Date,
		time: Date,
		category: String,
		priority: String,
		note: String
	) throws {
		let dateTimeFormatter = DateFormatter()
		
		dateTimeFormatter.dateFormat = "dd/MM/yyyy"
		let dateString = dateTimeFormatter.string(from: date)
		
		dateTimeFormatter.dateFormat = "HH:mm"
		let timeString = dateTimeFormatter.string(from: time)
		
		let reminder = Reminder(id: id, title: title, date: dateString, time: timeString, category: category, priority: priority, note: note)
		
		do {
			try self.reminderValidator.validate(reminder: reminder)
		} catch {
			throw error
		}
		
		if let index = reminders.firstIndex(where: { $0.id == id }) {
			reminders[index] = reminder
		}
		
		self.apiService.saveReminders(reminders: reminders)
	}

	
	func updateReminderCompletion(reminder: Reminder) {
		if let index = reminders.firstIndex(where: { $0.id == reminder.id }) {
			reminders[index] = reminder.updateCompletion()
		}
		
		self.apiService.saveReminders(reminders: reminders)
	}
}
