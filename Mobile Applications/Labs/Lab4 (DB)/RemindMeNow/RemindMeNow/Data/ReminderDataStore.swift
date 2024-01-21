import Foundation
import SQLite

class ReminderDataStore {
	static let DIR_REMINDER_DB = "ReminderDB"
	static let STORE_NAME = "reminder.sqlite3"
	
	private let reminders = Table("reminders")
	
	private let id = Expression<Int>("id")
	private let title = Expression<String>("title")
	private let date = Expression<String>("date")
	private let time = Expression<String>("time")
	private let category = Expression<String>("category")
	private let priority = Expression<String>("priority")
	private let note = Expression<String>("note")
	private let isCompleted = Expression<Bool>("isCompleted")
	
	static let shared = ReminderDataStore()
	
	private var db: Connection? = nil
	
	@Published var dataChanged: Bool = false
	
	private init() {
		if let docDir = FileManager.default.urls(for: .documentDirectory, in: .userDomainMask).first {
			let dirPath = docDir.appendingPathComponent(Self.DIR_REMINDER_DB)
			
			do {
				try FileManager.default.createDirectory(atPath: dirPath.path, withIntermediateDirectories: true, attributes: nil)
				let dbPath = dirPath.appendingPathComponent(Self.STORE_NAME).path
				db = try Connection(dbPath)
				self.createTable()
			} catch {
				db = nil
				print(error)
			}
		} else {
			db = nil
		}
	}
	
	private func createTable() {
		guard let database = db else {
			return
		}
		
		do {
			try database.run(reminders.create { table in
				table.column(id, primaryKey: .autoincrement)
				table.column(title)
				table.column(date)
				table.column(time)
				table.column(category)
				table.column(priority)
				table.column(note)
				table.column(isCompleted)
			})
		} catch {
			print(error)
		}
	}
	
	func getAll() -> [Reminder] {
		var reminders: [Reminder] = []
		
		guard let database = db else {
			return []
		}
		
		do {
			for reminder in try database.prepare(self.reminders) {
				reminders.append(Reminder(
					id: reminder[id],
					title: reminder[title],
					date: reminder[date],
					time: reminder[time],
					category: reminder[category],
					priority: reminder[priority],
					note: reminder[note],
					isCompleted: reminder[isCompleted]
				))
			}
		} catch {
			print(error)
		}
		return reminders
	}
	
	func getAllAsync(completion: @escaping ([Reminder]) -> Void) {
		DispatchQueue.global(qos: .background).async {
			let reminders = self.getAll()
			DispatchQueue.main.async {
				completion(reminders)
			}
		}
	}
	
	func add(reminder: Reminder) throws {
		guard let database = db else {
			return
		}
		
		do {
			let insert = reminders.insert(
				title <- reminder.title,
				date <- reminder.date,
				time <- reminder.time,
				category <- reminder.category,
				priority <- reminder.priority,
				note <- reminder.note,
				isCompleted <- reminder.isCompleted
			)
			try database.run(insert)
		} catch {
			throw DatabaseError.insertError
		}
	}
	
	func update(reminder: Reminder) throws {
		guard let database = db else {
			return
		}
		
		do {
			let reminderToUpdate = reminders.filter(self.id == reminder.id)
			let update = reminderToUpdate.update(
				title <- reminder.title,
				date <- reminder.date,
				time <- reminder.time,
				category <- reminder.category,
				priority <- reminder.priority,
				note <- reminder.note,
				isCompleted <- reminder.isCompleted
			)
			try database.run(update)
		} catch {
			throw DatabaseError.updateError
		}
	}
	
	func delete(id: Int) throws {
		guard let database = db else {
			return
		}
		
		do {
			let reminderToDelete = reminders.filter(self.id == id)
			try database.run(reminderToDelete.delete())
		} catch {
			throw DatabaseError.deleteError
		}
	}
}
