import 'package:flutter/cupertino.dart';
import 'package:flutter_slidable/flutter_slidable.dart';

import '../view_model/reminder_list_view_model.dart';
import './reminder_row_view.dart';
import 'add_reminder_view.dart';

class ReminderListView extends StatefulWidget {
  const ReminderListView({Key? key}) : super(key: key);

  @override
  _ReminderListViewState createState() => _ReminderListViewState();
}

class _ReminderListViewState extends State<ReminderListView> {
  final ReminderListViewModel viewModel = ReminderListViewModel();

  void _onViewModelChanged() {
    if (mounted) {
      setState(() {});
    }
  }

  @override
  void initState() {
    super.initState();
    viewModel.addListener(_onViewModelChanged);
    viewModel.loadReminders();
  }

  @override
  void dispose() {
    viewModel.removeListener(_onViewModelChanged);
    super.dispose();
  }

  void _confirmDeletion(int reminderId) {
    showCupertinoDialog(
      context: context,
      builder: (BuildContext context) => CupertinoAlertDialog(
        title: const Text('Delete Reminder'),
        content: const Text('Are you sure you want to delete this reminder?'),
        actions: <Widget>[
          CupertinoDialogAction(
            child: const Text('Cancel'),
            onPressed: () {
              Navigator.of(context).pop();
            },
          ),
          CupertinoDialogAction(
            isDestructiveAction: true,
            onPressed: () {
              viewModel.deleteReminder(reminderId);
              Navigator.of(context).pop();
              setState(() {});
            },
            child: const Text('Delete'),
          ),
        ],
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    return CupertinoTheme(
      data: const CupertinoThemeData(
        brightness: Brightness.dark,
        primaryColor: CupertinoColors.white,
        textTheme: CupertinoTextThemeData(
          textStyle: TextStyle(color: CupertinoColors.white),
        ),
      ),
      child: CupertinoPageScaffold(
        backgroundColor: CupertinoColors.black,
        navigationBar: CupertinoNavigationBar(
          middle: const Text(
            'My Reminders',
            style: TextStyle(fontWeight: FontWeight.bold, color: CupertinoColors.white),
          ),
          trailing: CupertinoButton(
            padding: EdgeInsets.zero,
            onPressed: () {
              showCupertinoModalPopup(
                context: context,
                builder: (BuildContext context) => AddReminderView(viewModel: viewModel),
              );
            },
            child: const Icon(CupertinoIcons.add, color: CupertinoColors.white),
          ),
          backgroundColor: CupertinoColors.black,
        ),
        child: SafeArea(
          child: viewModel.reminders.isEmpty
              ? const Center(
                  child: Text('No reminders found',
                      style: TextStyle(color: CupertinoColors.white, fontWeight: FontWeight.bold, fontSize: 20.0)))
              : ListView.builder(
                  itemCount: viewModel.reminders.length,
                  itemBuilder: (context, index) {
                    final reminder = viewModel.reminders[index];
                    return Slidable(
                      actionPane: const SlidableDrawerActionPane(),
                      actionExtentRatio: 0.25,
                      secondaryActions: <Widget>[
                        IconSlideAction(
                          caption: 'Delete',
                          color: CupertinoColors.destructiveRed,
                          icon: CupertinoIcons.delete,
                          onTap: () => _confirmDeletion(reminder.id),
                        ),
                      ],
                      child: ReminderRowView(
                        reminder: reminder,
                        viewModel: viewModel,
                      ),
                    );
                  },
                ),
        ),
      ),
    );
  }
}
