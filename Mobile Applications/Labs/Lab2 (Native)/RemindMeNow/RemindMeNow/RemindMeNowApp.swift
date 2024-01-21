import SwiftUI

@main
struct RemindMeNowApp: App {
	
	@StateObject var reminderListViewModel: ReminderListViewModel = ReminderListViewModel()
	
	var body: some Scene {
		WindowGroup {
			NavigationView {
				ReminderListView()
			}
			.environmentObject(reminderListViewModel)
		}
	}
}
