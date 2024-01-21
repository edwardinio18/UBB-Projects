import SwiftUI

struct EditReminderView: View {
	
	@State var reminder: Reminder
	
	@EnvironmentObject var reminderListViewModel: ReminderListViewModel
	@Environment(\.presentationMode) var presentationMode
	
	@State private var titleTextField: String
	@State private var dateDateField: Date
	@State private var timeDateField: Date
	@State private var categoryEnumField: Category
	@State private var priorityEnumField: Priority
	@State private var noteTextField: String
	
	@State private var alertTitle: String = ""
	@State private var showAlert: Bool = false
	
	var futureDateRange: ClosedRange<Date> {
		let currentDate = Date()
		let futureDate = Calendar.current.date(byAdding: .year, value: 10, to: currentDate)
		return currentDate...futureDate!
	}
	
	init(reminder: Reminder) {
		let dateTimeFormatter = DateFormatter()
		
		dateTimeFormatter.dateFormat = "dd/MM/yyyy"
		let date = dateTimeFormatter.date(from: reminder.date)
		
		dateTimeFormatter.dateFormat = "HH:mm"
		let time = dateTimeFormatter.date(from: reminder.time)
		
		self._reminder = State(initialValue: reminder)
		self._titleTextField = State(initialValue: reminder.title)
		self._dateDateField = State(initialValue: date!)
		self._timeDateField = State(initialValue: time!)
		self._categoryEnumField = State(initialValue: Category(rawValue: reminder.category) ?? .personal)
		self._priorityEnumField = State(initialValue: Priority(rawValue: reminder.priority) ?? .high)
		self._noteTextField = State(initialValue: reminder.note)
	}
	
	var body: some View {
		NavigationView {
			VStack {
				HStack {
					Text("Edit Reminder")
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
					Text("< Back")
						.foregroundColor(.white)
						.monospaced()
				})
			.navigationBarTitle("", displayMode: .inline)
			.alert(isPresented: $showAlert) {
				self.getAlert()
			}
		}
		.navigationBarBackButtonHidden(true)
	}
	
	func saveButtonPressed() {
		do {
			try self.reminderListViewModel.updateReminder(id: self.reminder.id, title: titleTextField, date: dateDateField, time: timeDateField, category: categoryEnumField.rawValue, priority: priorityEnumField.rawValue, note: noteTextField, isCompleted: self.reminder.isCompleted)
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
		} catch let error as RepositoryError {
			self.alertTitle = error.localizedDescription
			self.showAlert.toggle()
		} catch let error as DatabaseError {
			self.alertTitle = error.localizedDescription
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

struct EditReminderView_Previews: PreviewProvider {
	static var previews: some View {
		EditReminderView(reminder: Reminder(id: 0, title: "Birthday", date: "08/06/2001", time: "12:00", category: "Personal", priority: "High", note: "My birthday"))
			.environmentObject(ReminderListViewModel())
	}
}
