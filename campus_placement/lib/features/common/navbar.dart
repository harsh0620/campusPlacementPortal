import 'package:campus_placement/constants/colors.dart';
import 'package:campus_placement/features/admin_management/UI/admin_home.dart';
import 'package:campus_placement/features/login/UI/login_page.dart';
import 'package:campus_placement/features/student_management/UI/student_companies_page.dart';
import 'package:campus_placement/features/student_management/UI/student_home.dart';
import 'package:campus_placement/features/student_management/UI/student_job.dart';
import 'package:campus_placement/features/student_management/UI/student_profiel.dart';
import 'package:campus_placement/features/student_management/UI/student_settings.dart';
import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';

import '../../auth/auth_bloc.dart';
import '../login/cubit/login_cubit.dart';
import 'nav.dart';

class CommonNavbar extends StatefulWidget {
  final String loc;
  final Widget child;
  const CommonNavbar({super.key, required this.loc, required this.child});

  @override
  State<CommonNavbar> createState() => _CommonNavbarState();
}

class _CommonNavbarState extends State<CommonNavbar> {
  // ignore: prefer_typing_uninitialized_variables
  late final user;
  late TextEditingController editingController;
  int _selectedIndex = 0;
  List<TabData> studentTabList = [
    TabData(
        iconWidget: Icon(Icons.home),
        tooltip: 'Home',
        child: StudentHomeWrapper()),
    TabData(
        iconWidget: Icon(Icons.work), tooltip: 'Jobs', child: StudentJobs()),
    TabData(
        iconWidget: Icon(Icons.business),
        tooltip: 'Companies',
        child: StudentCompaniesPage()),
    TabData(
        iconWidget: Icon(Icons.person),
        tooltip: 'Profile',
        child: StudentProfile()),
    TabData(
        iconWidget: Icon(Icons.settings),
        tooltip: 'Settings',
        child: StudentSettingsWrapper()),
  ];

  List<TabData> adminTabList = [
    TabData(iconWidget: Icon(Icons.home), tooltip: 'Home', child: AdminHome()),
    TabData(iconWidget: Icon(Icons.work), tooltip: 'Jobs', child: AdminHome()),
    TabData(
        iconWidget: Icon(Icons.school), tooltip: 'Jobs', child: AdminHome()),
    TabData(
        iconWidget: Icon(Icons.business),
        tooltip: 'Companies',
        child: AdminHome()),
    TabData(
        iconWidget: Icon(Icons.person), tooltip: 'Profile', child: AdminHome()),
    TabData(
        iconWidget: Icon(Icons.settings),
        tooltip: 'Settings',
        child: AdminHome()),
  ];

  List<TabData> companyTabList = [
    TabData(iconWidget: Icon(Icons.home), tooltip: 'Home', child: AdminHome()),
    TabData(iconWidget: Icon(Icons.work), tooltip: 'Jobs', child: AdminHome()),
    TabData(
        iconWidget: Icon(Icons.person), tooltip: 'Profile', child: AdminHome()),
    TabData(
        iconWidget: Icon(Icons.settings),
        tooltip: 'Settings',
        child: AdminHome()),
  ];

  @override
  void initState() {
    super.initState();
    user = context.read<AuthBloc>().state.user;

    editingController = TextEditingController();
  }

  @override
  Widget build(BuildContext context) {
    // print('$user');
    // // if (user != null) {
    // print('USER ROLE ${user?["role"]}');
    // }

    return Scaffold(
      appBar: AppBar(
        backgroundColor: ColorConst.white,
        centerTitle: false,
        title: Text(
          'CPP',
          style: TextStyle(fontSize: 36.sp, fontWeight: FontWeight.w700),
          // type: TextType.heading2,
        ),
        actions: [
          // Padding(
          //   padding: EdgeInsets.only(right: 10.w),
          //   child: Container(
          //     width: 200.w,
          //     decoration: BoxDecoration(
          //         borderRadius: BorderRadius.circular(8.r),
          //         border: Border.all(color: ColorConst.grey)),
          //     child: Row(
          //       children: [
          //         InkWell(
          //           onTap: () {},
          //           child: Icon(
          //             Icons.arrow_back,
          //           ),
          //         ),
          //         SizedBox(
          //           width: 5.w,
          //         ),
          //         CustomTextFormField(
          //           controller: editingController,
          //           hint: 'Search tab',
          //         )
          //       ],
          //     ),
          //   ),
          // ),
          // SizedBox(width: 10.w),
          InkWell(
            overlayColor:
                MaterialStateColor.resolveWith((states) => Colors.transparent),
            onTap: () {
              showMenu(
                context: context,
                position: RelativeRect.fromLTRB(120.w, 60.h, 0, 0),
                items: [
                  PopupMenuItem(
                      child: Column(
                    children: [
                      Column(
                        children: [
                          Text("${user?['name']}"),
                          ElevatedButton(
                              onPressed: () {
                                Navigator.pop(context);
                                context.read<LoginCubit>().resetLoginState();
                                context.read<AuthBloc>().add(LogoutEvent());
                              },
                              child: Text('Log Out'))
                        ],
                      )
                      // PopupMenuItem(child: )
                    ],
                  ))
                  // PopupMenuItem(
                  //   child: ListTile(
                  //     leading: const Icon(Icons.logout),
                  //     title: const Text('Logout'),
                  //     splashColor: Colors.transparent,
                  //     focusColor: Colors.transparent,
                  //     hoverColor: Colors.transparent,
                  //     onTap: () {
                  //       Navigator.pop(context);
                  //       context.read<LoginCubit>().resetLoginState();
                  //       context.read<AuthBloc>().add(LogoutEvent());
                  //     },
                  //   ),
                  // ),
                ],
              );
            },
            child: Row(
              mainAxisSize: MainAxisSize.min,
              children: [
                CircleAvatar(
                  backgroundColor: ColorConst.white,
                  child: Text(
                    "HC",
                    style: const TextStyle(
                        color: ColorConst.black, fontWeight: FontWeight.bold),
                  ),
                ),
                SizedBox(width: 4.w),
                const Icon(Icons.arrow_drop_down),
                SizedBox(width: 20.w),
              ],
            ),
          ),
        ],
        automaticallyImplyLeading: false,
      ),
      body: _availableTabs()[_selectedIndex].child,
      // body: ,
      // body: Row(
      //   children: [
      //     Navbar(
      //       tabs: _availableTabs(),
      //     ),
      //     Expanded(child: widget.child),
      //   ],
      // ),
      bottomNavigationBar: Theme(
        data: Theme.of(context).copyWith(
            // sets the background color of the `BottomNavigationBar`
            canvasColor: Colors.green,
            // sets the active color of the `BottomNavigationBar` if `Brightness` is light
            primaryColor: Colors.red,
            textTheme: Theme.of(context)
                .textTheme
                .copyWith(caption: new TextStyle(color: Colors.yellow))),
        child: BottomNavigationBar(
          // backgroundColor: ColorConst.black,
          type: BottomNavigationBarType.fixed,
          elevation: 0,
          // selectedFontSize: 20,
          showSelectedLabels: true,
          unselectedIconTheme: IconThemeData(
            color: Colors.white,
          ),
          unselectedItemColor: Colors.white,
          selectedIconTheme: IconThemeData(color: Colors.amberAccent, size: 40),
          selectedItemColor: Colors.amberAccent,
          selectedLabelStyle: TextStyle(fontWeight: FontWeight.bold),
          items: List.generate(_availableTabs().length, (index) {
            return BottomNavigationBarItem(
                label: _availableTabs()[index].tooltip,
                icon: _availableTabs()[index].iconWidget,
                tooltip: _availableTabs()[index].tooltip);
          }),
          currentIndex: _selectedIndex,
          onTap: (value) {
            setState(() {
              _selectedIndex = value;
            });
          },
        ),
      ),
    );
  }

  List<TabData> _availableTabs() {
    // print("User: - ${user}");
    // List<Widget> list = [];
    // if (user?['role']) {}
    if (user?['role'] == 'admin') {
      print("admin tab list");
      return adminTabList;
    } else if (user?['role'] == 'student') {
      print("student tab list");
      return studentTabList;
    } else {
      return companyTabList;
    }

    // return list;
  }
}

class TabData {
  final String tooltip;
  final Widget iconWidget;
  final Widget? child;

  TabData({required this.tooltip, required this.iconWidget, this.child});
}
