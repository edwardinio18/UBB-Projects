import Foundation

class Reminder: Identifiable, Codable {
	
	let id: Int
	let title: String
	let date: String
	let time: String
	let category: String
	let priority: String
	let note: String
	let isCompleted: Bool
	
	init(id: Int, title: String, date: String, time: String, category: String, priority: String, note: String, isCompleted: Bool = false) {
		self.id = id
		self.title = title
		self.date = date
		self.time = time
		self.category = category
		self.priority = priority
		self.note = note
		self.isCompleted = isCompleted
	}
	
	init(title: String, date: String, time: String, category: String, priority: String, note: String, isCompleted: Bool = false) {
		self.id = -1
		self.title = title
		self.date = date
		self.time = time
		self.category = category
		self.priority = priority
		self.note = note
		self.isCompleted = isCompleted
	}
	
	func updateCompletion() -> Reminder {
		return Reminder(id: self.id, title: self.title, date: self.date, time: self.time, category: self.category, priority: self.priority, note: self.note, isCompleted: !self.isCompleted)
	}
}
