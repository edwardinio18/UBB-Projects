import 'package:flutter/cupertino.dart';
import 'package:intl/intl.dart';

import '../common/category.dart';
import '../common/priority.dart';
import '../error/reminder_error.dart';
import '../model/reminder.dart';
import '../view_model/reminder_list_view_model.dart';

class EditReminderView extends StatefulWidget {
  final Reminder reminder;
  final ReminderListViewModel viewModel;

  const EditReminderView({
    Key? key,
    required this.reminder,
    required this.viewModel,
  }) : super(key: key);

  @override
  _EditReminderViewState createState() => _EditReminderViewState();
}

class _EditReminderViewState extends State<EditReminderView> {
  final TextEditingController titleController = TextEditingController();
  final TextEditingController noteController = TextEditingController();
  DateTime selectedDate = DateTime.now();
  DateTime selectedTime = DateTime.now();
  Category category = Category.personal;
  Priority priority = Priority.high;

  bool showAlert = false;
  String alertTitle = '';

  @override
  void initState() {
    super.initState();
    titleController.text = widget.reminder.title;
    noteController.text = widget.reminder.note;

    DateFormat format = DateFormat("dd/MM/yyyy");
    selectedDate = format.parse(widget.reminder.date);

    format = DateFormat("HH:mm");
    selectedTime = format.parse(widget.reminder.time);

    category = Category.values.firstWhere((c) => c.name == widget.reminder.category);
    priority = Priority.values.firstWhere((p) => p.name == widget.reminder.priority);
  }

  void saveButtonPressed() async {
    try {
      widget.viewModel.updateReminder(
        id: widget.reminder.id,
        title: titleController.text,
        date: selectedDate,
        time: selectedTime,
        category: category.name,
        priority: priority.name,
        note: noteController.text,
      );
      Navigator.pop(context);
    } on ReminderError catch (error) {
      setState(() {
        alertTitle = error.message;
        showAlert = true;
      });

      showCupertinoDialog(
        context: context,
        builder: (BuildContext context) {
          return CupertinoAlertDialog(
            title: const Text('Error'),
            content: Text(alertTitle),
            actions: <CupertinoDialogAction>[
              CupertinoDialogAction(
                isDefaultAction: true,
                onPressed: () {
                  Navigator.pop(context);
                },
                child: const Text('OK'),
              ),
            ],
          );
        },
      );
    }
  }

  Future<void> _showCategoryPicker(BuildContext context) async {
    await showCupertinoModalPopup<void>(
      context: context,
      builder: (BuildContext context) {
        return _buildBottomPicker(
          CupertinoPicker(
            itemExtent: 32.0,
            onSelectedItemChanged: (int index) {
              setState(() {
                category = Category.values[index];
              });
            },
            children: Category.values.map((Category category) {
              return Center(
                child: Text(
                  category.name,
                  style: const TextStyle(color: CupertinoColors.black),
                ),
              );
            }).toList(),
          ),
        );
      },
    );
  }

  Future<void> _showPriorityPicker(BuildContext context) async {
    await showCupertinoModalPopup<void>(
      context: context,
      builder: (BuildContext context) {
        return _buildBottomPicker(
          CupertinoPicker(
            itemExtent: 32.0,
            onSelectedItemChanged: (int index) {
              setState(() {
                priority = Priority.values[index];
              });
            },
            children: Priority.values.map((Priority priority) {
              return Center(
                child: Text(
                  priority.name,
                  style: const TextStyle(color: CupertinoColors.black),
                ),
              );
            }).toList(),
          ),
        );
      },
    );
  }

  Widget _buildBottomPicker(Widget picker) {
    return Container(
      height: MediaQuery.of(context).copyWith().size.height * 0.33,
      padding: const EdgeInsets.only(top: 6.0),
      color: CupertinoColors.white,
      child: DefaultTextStyle(
        style: const TextStyle(
          color: CupertinoColors.black,
          fontSize: 22.0,
        ),
        child: GestureDetector(
          onTap: () {},
          child: SafeArea(
            top: false,
            child: picker,
          ),
        ),
      ),
    );
  }

  Future<void> _showDatePicker(BuildContext context) async {
    final DateTime? picked = await showCupertinoModalPopup(
      context: context,
      builder: (BuildContext builder) {
        return Container(
          height: MediaQuery.of(context).copyWith().size.height * 0.33,
          color: CupertinoColors.white,
          child: CupertinoDatePicker(
            maximumYear: DateTime.now().year + 2,
            minimumDate: DateTime.now().subtract(const Duration(days: 1)),
            mode: CupertinoDatePickerMode.date,
            initialDateTime: selectedDate,
            onDateTimeChanged: (DateTime newDate) {
              setState(() {
                selectedDate = newDate;
              });
            },
          ),
        );
      },
    );
    if (picked != null && picked != selectedDate) {
      setState(() {
        selectedDate = picked;
      });
    }
  }

  Future<void> _showTimePicker(BuildContext context) async {
    final DateTime? picked = await showCupertinoModalPopup(
      context: context,
      builder: (BuildContext builder) {
        return Container(
          height: MediaQuery.of(context).copyWith().size.height * 0.33,
          color: CupertinoColors.white,
          child: CupertinoDatePicker(
            mode: CupertinoDatePickerMode.time,
            initialDateTime: selectedTime,
            onDateTimeChanged: (DateTime newTime) {
              setState(() {
                selectedTime = newTime;
              });
            },
          ),
        );
      },
    );
    if (picked != null && picked != selectedTime) {
      setState(() {
        selectedTime = picked;
      });
    }
  }

  Widget _buildDateRow() {
    return Row(
      mainAxisAlignment: MainAxisAlignment.spaceBetween,
      children: [
        const Padding(
          padding: EdgeInsets.only(left: 6.0),
          child: Text('Date', style: TextStyle(color: CupertinoColors.white)),
        ),
        Padding(
          padding: const EdgeInsets.only(right: 10.0),
          child: Text(
            DateFormat.yMMMd().format(selectedDate),
            style: const TextStyle(
              color: CupertinoColors.white,
              fontSize: 16,
              fontWeight: FontWeight.bold,
            ),
          ),
        ),
      ],
    );
  }

  Widget _buildTimeRow() {
    return Row(
      mainAxisAlignment: MainAxisAlignment.spaceBetween,
      children: [
        const Padding(
          padding: EdgeInsets.only(left: 6.0),
          child: Text('Time', style: TextStyle(color: CupertinoColors.white)),
        ),
        Padding(
          padding: const EdgeInsets.only(right: 10.0),
          child: Text(
            DateFormat.Hm().format(selectedTime),
            style: const TextStyle(
              color: CupertinoColors.white,
              fontSize: 16,
              fontWeight: FontWeight.bold,
            ),
          ),
        ),
      ],
    );
  }

  Widget _buildCategoryRow() {
    return Row(
      mainAxisAlignment: MainAxisAlignment.spaceBetween,
      children: [
        const Padding(
          padding: EdgeInsets.only(left: 6.0),
          child: Text('Category', style: TextStyle(color: CupertinoColors.white)),
        ),
        Padding(
          padding: const EdgeInsets.only(right: 10.0),
          child: Text(
            category.name,
            style: const TextStyle(
              color: CupertinoColors.white,
              fontSize: 16,
              fontWeight: FontWeight.bold,
            ),
          ),
        ),
      ],
    );
  }

  Widget _buildPriorityRow() {
    return Row(
      mainAxisAlignment: MainAxisAlignment.spaceBetween,
      children: [
        const Padding(
          padding: EdgeInsets.only(left: 6.0),
          child: Text('Priority', style: TextStyle(color: CupertinoColors.white)),
        ),
        Padding(
          padding: const EdgeInsets.only(right: 10.0),
          child: Text(
            priority.name,
            style: const TextStyle(
              color: CupertinoColors.white,
              fontSize: 16,
              fontWeight: FontWeight.bold,
            ),
          ),
        ),
      ],
    );
  }

  @override
  Widget build(BuildContext context) {
    return CupertinoTheme(
        data: const CupertinoThemeData(
          brightness: Brightness.dark,
          primaryColor: CupertinoColors.white,
          textTheme: CupertinoTextThemeData(
            textStyle: TextStyle(color: CupertinoColors.white, fontSize: 16),
          ),
        ),
        child: CupertinoPageScaffold(
          backgroundColor: CupertinoColors.black,
          navigationBar: CupertinoNavigationBar(
            middle: const Text('New Reminder', style: TextStyle(fontWeight: FontWeight.bold)),
            leading: CupertinoButton(
              padding: EdgeInsets.zero,
              child: const Text('Cancel'),
              onPressed: () => Navigator.pop(context),
            ),
            backgroundColor: CupertinoColors.systemGrey.withOpacity(0.5),
          ),
          child: SafeArea(
              child: Column(children: [
            Expanded(
              child: ListView(
                children: [
                  Padding(
                    padding: const EdgeInsets.only(top: 20),
                    child: CupertinoFormSection.insetGrouped(
                      backgroundColor: CupertinoColors.black,
                      children: [
                        CupertinoTextFormFieldRow(
                          controller: titleController,
                          placeholder: 'Required',
                          placeholderStyle: const TextStyle(color: CupertinoColors.inactiveGray),
                          cursorColor: CupertinoColors.black,
                          prefix: const Padding(
                            padding: EdgeInsets.only(
                              left: 6.0,
                            ),
                            child: Text(
                              'Title',
                              style: TextStyle(
                                color: CupertinoColors.white,
                              ),
                            ),
                          ),
                          style: const TextStyle(color: CupertinoColors.white),
                        ),
                        CupertinoFormRow(
                          child: GestureDetector(
                            onTap: () => _showCategoryPicker(context),
                            child: _buildCategoryRow(),
                          ),
                        ),
                        CupertinoFormRow(
                          child: GestureDetector(
                            onTap: () => _showPriorityPicker(context),
                            child: _buildPriorityRow(),
                          ),
                        ),
                        CupertinoFormRow(
                          child: GestureDetector(
                            onTap: () => _showDatePicker(context),
                            child: _buildDateRow(),
                          ),
                        ),
                        CupertinoFormRow(
                          child: GestureDetector(
                            onTap: () => _showTimePicker(context),
                            child: _buildTimeRow(),
                          ),
                        ),
                        CupertinoTextFormFieldRow(
                          controller: noteController,
                          placeholder: 'Required',
                          keyboardType: TextInputType.multiline,
                          cursorColor: CupertinoColors.black,
                          placeholderStyle: const TextStyle(color: CupertinoColors.systemGrey, height: -1.05),
                          prefix: const Padding(
                            padding: EdgeInsets.only(left: 6.0),
                            child: Align(
                              alignment: Alignment.centerLeft,
                              child: SizedBox(
                                height: 57.0,
                                child: Text(
                                  'Note',
                                  style: TextStyle(
                                    color: CupertinoColors.white,
                                    fontWeight: FontWeight.w400,
                                  ),
                                ),
                              ),
                            ),
                          ),
                          style: const TextStyle(color: CupertinoColors.white),
                          maxLines: 3,
                        )
                      ],
                    ),
                  ),
                ],
              ),
            ),
            Padding(
              padding: const EdgeInsets.only(bottom: 20),
              child: CupertinoButton.filled(
                padding: const EdgeInsets.symmetric(horizontal: 165),
                onPressed: saveButtonPressed,
                pressedOpacity: 0.75,
                child: const Text('Save'),
              ),
            ),
          ])),
        ));
  }
}
