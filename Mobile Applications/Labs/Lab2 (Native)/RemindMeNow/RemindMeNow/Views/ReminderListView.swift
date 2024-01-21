import SwiftUI

struct ReminderListView: View {
	@EnvironmentObject var viewModel: ReminderListViewModel
	
	@State private var showConfirmationDialog = false
	@State private var reminderId: Binding<Int?> = .constant(nil)
	@State private var showSheet: Bool = false
	
	var body: some View {
		List {
			ForEach(viewModel.getReminders()) { reminder in
				NavigationLink(destination: EditReminderView(reminder: reminder)) {
					ReminderRowView(reminder: reminder)
				}
				.swipeActions(edge: .trailing) {
					Button() {
						reminderId = .constant(reminder.id)
						self.showAlert()
					} label: {
						Label("Delete", systemImage: "trash")
							.tint(.red)
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
				HStack {
					Button(action: {
						showSheet = true
					}) {
						Image(systemName: "plus")
							.foregroundColor(.white)
					}
				}
			}
		}
		.alert(isPresented: $showConfirmationDialog) {
			Alert(title: Text("Delete Reminder"),
				  message: Text("Are you sure you want to delete this reminder?"),
				  primaryButton: .destructive(Text("Delete")) {
				if let reminderId = reminderId.wrappedValue {
					withAnimation {
						viewModel.deleteReminder(id: reminderId)
					}
				}
			},
				  secondaryButton: .cancel(Text("Cancel")) {}
			)
		}
		.sheet(isPresented: $showSheet, content: {
			AddReminderView()
		})
	}
	
	private func showAlert() {
		showConfirmationDialog = true
	}
}

struct ReminderListView_Previews: PreviewProvider {
	static var previews: some View {
		NavigationView {
			ReminderListView()
		}
		.environmentObject(ReminderListViewModel())
	}
}
