import SwiftUI

struct AddReminderView: View {
	
	@EnvironmentObject var reminderListViewModel: ReminderListViewModel
	@Environment(\.presentationMode) var presentationMode
	
	@State private var titleTextField: String = ""
	@State private var dateDateField: Date = Date()
	@State private var timeDateField: Date = Date()
	@State private var categoryEnumField: Category = .personal
	@State private var priorityEnumField: Priority = .high
	@State private var noteTextField: String = ""
	
	@State private var alertTitle: String = ""
	@State private var showAlert: Bool = false
	
	var futureDateRange: ClosedRange<Date> {
		let currentDate = Date()
		let futureDate = Calendar.current.date(byAdding: .year, value: 10, to: currentDate)
		return currentDate...futureDate!
	}
	
	var body: some View {
		NavigationView {
			VStack {
				HStack {
					Text("New Reminder")
						.font(.title)
						.bold()
						.monospaced()
						.frame(maxWidth: .infinity, alignment: .leading)
						.padding(.leading, 20)
						.padding(.top, 10)
				}
				
				Form {
					Section {
						HStack {
							Text("Title")
								.monospaced()
							TextField("Required", text: $titleTextField)
								.monospaced()
						}
						
						HStack {
							Text("Date")
								.monospaced()
							DatePicker("", selection: $dateDateField, in: futureDateRange, displayedComponents: [.date])
						}
						
						HStack {
							Text("Time")
								.monospaced()
							DatePicker("", selection: $timeDateField, displayedComponents: [.hourAndMinute])
						}
						
						HStack {
							Text("Category")
								.monospaced()
							Picker("", selection: $categoryEnumField) {
								ForEach(Category.allCases, id: \.self) { category in
									Text(category.rawValue)
										.tag(category)
								}
							}
						}
						
						HStack {
							Text("Priority")
								.monospaced()
							Picker("", selection: $priorityEnumField) {
								ForEach(Priority.allCases, id: \.self) { priority in
									Text(priority.rawValue)
										.tag(priority)
								}
							}
						}
						
						HStack {
							VStack(alignment: .leading) {
								Text("Note")
									.monospaced()
								Spacer()
							}
							.padding(.top, 6.5)
							TextField("Required", text: $noteTextField, axis: .vertical)
								.lineLimit(3, reservesSpace: true)
								.monospaced()
						}
					}
				}
				.padding(.top, -15)
				
				VStack(alignment: .center) {
					Button(action: {
						saveButtonPressed()
					}) {
						Text("Save".uppercased())
							.foregroundColor(.white)
							.monospaced()
							.font(.title3)
					}
					.frame(maxWidth: .infinity)
					.padding()
					.background(Color.blue)
					.cornerRadius(8)
				}
				.padding(20)
			}
			.navigationBarItems(
				leading: Button(action: {
					presentationMode.wrappedValue.dismiss()
				}) {
					Text("Cancel")
						.foregroundColor(.white)
						.monospaced()
				})
			.navigationBarTitle("", displayMode: .inline)
			.alert(isPresented: $showAlert) {
				self.getAlert()
			}
		}
	}
	
	func saveButtonPressed() {
		do {
			try self.reminderListViewModel.addReminder(title: titleTextField, date: dateDateField, time: timeDateField, category: categoryEnumField.rawValue, priority: priorityEnumField.rawValue, note: noteTextField)
			presentationMode.wrappedValue.dismiss()
		} catch let error as ReminderError {
			switch error {
			case .emptyTitle:
				self.alertTitle = "Please enter a title."
			case .shortTitle:
				self.alertTitle = "Please enter a title with at least 5 characters."
			case .invalidTime:
				self.alertTitle = "Please choose a time in the future."
			case .emptyNote:
				self.alertTitle = "Please enter a note."
			case .shortNote:
				self.alertTitle = "Please enter a note with at least 5 characters."
			}
			self.showAlert.toggle()
		} catch {
			self.alertTitle = "An unexpected error occurred."
			self.showAlert.toggle()
		}
	}
	
	func getAlert() -> Alert {
		return Alert(title: Text(alertTitle))
	}
}

struct AddReminderView_Previews: PreviewProvider {
	static var previews: some View {
		AddReminderView()
			.environmentObject(ReminderListViewModel())
	}
}
