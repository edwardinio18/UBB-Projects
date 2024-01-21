import Foundation
import SwiftUI
import Combine

class ReminderListViewModel: ObservableObject {
	
	@Published var reminders: [Reminder] = []
	
	private let reminderValidator: ReminderValidator = ReminderValidator()
	private let dataStore = ReminderDataStore.shared
	
	private var cancellables = Set<AnyCancellable>()
	
	init() {
		ReminderDataStore.shared.$dataChanged
			.sink { [weak self] _ in
				self?.getReminders()
			}
			.store(in: &cancellables)
		getReminders()
	}
	
	func getReminders() {
		ReminderDataStore.shared.getAllAsync { [weak self] reminders in
			self?.reminders = reminders
		}
	}
	
	func addReminder(
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
		
		let reminder = Reminder(title: title, date: dateString, time: timeString, category: category, priority: priority, note: note)
		
		do {
			try self.reminderValidator.validate(reminder: reminder)
		} catch {
			throw error
		}
		
		do {
			try self.dataStore.add(reminder: reminder)
			
			if self.reminders.contains(where: { $0.id == reminder.id }) {
				throw RepositoryError.insertError
			}
			
			DispatchQueue.main.async {
				self.reminders.append(reminder)
			}
		} catch {
			throw error
		}
	}
	
	func updateReminder(
		id: Int,
		title: String,
		date: Date,
		time: Date,
		category: String,
		priority: String,
		note: String,
		isCompleted: Bool
	) throws {
		let dateTimeFormatter = DateFormatter()
		
		dateTimeFormatter.dateFormat = "dd/MM/yyyy"
		let dateString = dateTimeFormatter.string(from: date)
		
		dateTimeFormatter.dateFormat = "HH:mm"
		let timeString = dateTimeFormatter.string(from: time)
		
		let reminder = Reminder(id: id, title: title, date: dateString, time: timeString, category: category, priority: priority, note: note, isCompleted: isCompleted)
		
		do {
			try self.reminderValidator.validate(reminder: reminder)
		} catch {
			throw error
		}
		
		do {
			try self.dataStore.update(reminder: reminder)
			
			guard self.reminders.contains(where: { $0.id == reminder.id }) else {
				throw RepositoryError.updateError
			}
			
			DispatchQueue.main.async {
				if let index = self.reminders.firstIndex(where: { $0.id == reminder.id }) {
					self.reminders[index] = reminder
				}
			}
		} catch {
			throw error
		}
	}
	
	
	func updateReminderCompletion(reminder: Reminder) throws {
		do {
			try self.dataStore.update(reminder: reminder.updateCompletion())
			
			guard self.reminders.contains(where: { $0.id == reminder.id }) else {
				throw RepositoryError.updateCompletionError
			}
			
			DispatchQueue.main.async {
				if let index = self.reminders.firstIndex(where: { $0.id == reminder.id }) {
					self.reminders[index] = reminder
				}
			}
		} catch {
			throw error
		}
	}
	
	func deleteReminder(id: Int) throws {
		do {
			try self.dataStore.delete(id: id)
			
			guard self.reminders.contains(where: { $0.id == id }) else {
				throw RepositoryError.deleteError
			}
			
			DispatchQueue.main.async {
				self.reminders.removeAll(where: { $0.id == id })
			}
		}
		catch {
			throw error
		}
	}
}
