import Foundation

class ApiService {
	func fetchReminders() -> [Reminder] {
		let manager = FileManager.default
		guard let url = manager.urls(for: .documentDirectory, in: .userDomainMask).first else {
			return []
		}
		
		let filePath = url.appendingPathComponent("reminders.json")
		
		if !manager.fileExists(atPath: filePath.path) {
			return []
		}
		
		do {
			let data = try Data(contentsOf: filePath)
			let decoder = JSONDecoder()
			let reminders = try decoder.decode([Reminder].self, from: data)
			return reminders
		} catch {
			return []
		}
		
	}
	
	func saveReminders(reminders: [Reminder]) {
		let encoder = JSONEncoder()
		encoder.outputFormatting = .prettyPrinted
		
		let data = try! encoder.encode(reminders)
		
		let manager = FileManager.default
		guard let url = manager.urls(for: .documentDirectory, in: .userDomainMask)
			.first else {
			return
		}
		
		manager.createFile(atPath: url.appendingPathComponent("reminders.json").path, contents: data, attributes: nil)
	}
}
