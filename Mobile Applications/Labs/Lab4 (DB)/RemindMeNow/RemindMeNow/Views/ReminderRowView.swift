import SwiftUI

struct ReminderRowView: View {
	@EnvironmentObject var reminderListViewModel: ReminderListViewModel
	
	let reminder: Reminder
	
	@State private var alertTitle: String = ""
	@State private var showErrorAlert: Bool = false
	
	var body: some View {
		HStack {
			Image(systemName: reminder.isCompleted ? "checkmark.circle.fill" : "circle")
				.padding(.trailing, 10.0)
				.onTapGesture {
					withAnimation(.smooth(duration: 0.15)) {
						do {
							try self.reminderListViewModel.updateReminderCompletion(reminder: reminder)
						} catch let error as RepositoryError {
							self.alertTitle = error.localizedDescription
							self.showErrorAlert.toggle()
						} catch let error as DatabaseError {
							self.alertTitle = error.localizedDescription
							self.showErrorAlert.toggle()
						} catch {
							self.alertTitle = error.localizedDescription
							self.showErrorAlert.toggle()
						}
					}
				}
			VStack(alignment: .leading) {
				Text(reminder.title)
					.font(
						.headline
							.bold()
							.monospaced()
					)
					.lineLimit(1)
					.truncationMode(.tail)
				Text(reminder.note)
					.font(
						.subheadline
							.monospaced()
					)
					.lineLimit(1)
					.truncationMode(.tail)
				HStack {
					Text(reminder.date)
						.font(
							.subheadline
								.monospaced()
						)
					Text("·")
						.font(
							.subheadline
								.monospaced()
						)
					Text(reminder.time)
						.font(
							.subheadline
								.monospaced()
						)
				}
			}
		}
		.alert(isPresented: $showErrorAlert) {
			self.getErrorAlert()
		}
	}
	
	func getErrorAlert() -> Alert {
		return Alert(title: Text(alertTitle))
	}
}

struct ReminderRowView_Previews: PreviewProvider {
	static var previews: some View {
		ReminderRowView(reminder: Reminder(id: 0, title: "Test Reminder", date: "08/06/2001", time: "12:00", category: "Personal", priority: "High", note: "My birthday!", isCompleted: true))
			.environmentObject(ReminderListViewModel())
	}
}
