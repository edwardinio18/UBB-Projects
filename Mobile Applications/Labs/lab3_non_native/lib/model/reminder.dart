class Reminder {
  final int id;
  final String title;
  final String date;
  final String time;
  final String category;
  final String priority;
  final String note;
  final bool isCompleted;

  Reminder({
    required this.id,
    required this.title,
    required this.date,
    required this.time,
    required this.category,
    required this.priority,
    required this.note,
    this.isCompleted = false,
  });

  Reminder updateCompletion() {
    return Reminder(
      id: id,
      title: title,
      date: date,
      time: time,
      category: category,
      priority: priority,
      note: note,
      isCompleted: !isCompleted,
    );
  }
}
