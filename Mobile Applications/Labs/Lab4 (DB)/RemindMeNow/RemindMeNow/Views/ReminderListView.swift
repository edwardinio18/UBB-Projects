import SwiftUI

struct ReminderListView: View {
	@EnvironmentObject var viewModel: ReminderListViewModel
	
	@State private var showConfirmationDialog = false
	@State private var reminderToDelete: Int? = nil
	@State private var showSheet: Bool = false
	
	@State private var showErrorAlert: Bool = false
	@State private var errorAlertTitle: String = ""
	
	var body: some View {
		List {
			ForEach(viewModel.reminders) { reminder in
				NavigationLink(destination: EditReminderView(reminder: reminder)) {
					ReminderRowView(reminder: reminder)
				}
				.swipeActions(edge: .trailing) {
					Button(role: .destructive) {
						reminderToDelete = reminder.id
						showConfirmationDialog = true
					} label: {
						Label("Delete", systemImage: "trash")
					}
				}
			}
		}
		.toolbar {
			ToolbarItem(placement: .navigationBarLeading) {
				Text("My Reminders")
					.font(.title)
					.bold()
					.monospaced()
			}
			
			ToolbarItem(placement: .navigationBarTrailing) {
				Button(action: {
					showSheet = true
				}) {
					Image(systemName: "plus")
						.foregroundColor(.white)
				}
			}
		}
		.alert("Delete Reminder", isPresented: $showConfirmationDialog) {
			Button("Delete", role: .destructive) {
				deleteSelectedReminder()
			}
			Button("Cancel", role: .cancel) { }
		} message: {
			Text("Are you sure you want to delete this reminder?")
		}
		.alert("Error", isPresented: $showErrorAlert) {
			Button("OK", role: .cancel) { }
		} message: {
			Text(errorAlertTitle)
		}
		.sheet(isPresented: $showSheet, content: {
			AddReminderView()
		})
	}
	
	private func deleteSelectedReminder() {
		if let reminderId = reminderToDelete {
			withAnimation {
				do {
					try viewModel.deleteReminder(id: reminderId)
				} catch let error as RepositoryError {
					errorAlertTitle = error.localizedDescription
					showErrorAlert = true
				} catch let error as DatabaseError {
					errorAlertTitle = error.localizedDescription
					showErrorAlert = true
				} catch {
					errorAlertTitle = "An unexpected error occurred."
					showErrorAlert = true
				}
			}
		}
	}
}

struct ReminderListView_Previews: PreviewProvider {
	static var previews: some View {
		NavigationView {
			ReminderListView()
				.environmentObject(ReminderListViewModel())
		}
	}
}
