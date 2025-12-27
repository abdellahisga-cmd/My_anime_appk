import 'package:flutter/material.dart';
import 'package:better_player/better_player.dart';

void main() => runApp(MyApp());

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'AnimeStream',
      theme: ThemeData.dark(),
      home: HomeScreen(),
    );
  }
}

class HomeScreen extends StatelessWidget {
  final sampleHls = 'http://localhost:8080/media/demo/1/episode_master.m3u8';

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('قائمة الأنمي')),
      body: ListView(
        children: [
          ListTile(
            title: Text('Episode 1'),
            onTap: () {
              Navigator.push(context, MaterialPageRoute(builder: (_) => PlayerPage(url: sampleHls)));
            },
          ),
        ],
      ),
    );
  }
}

class PlayerPage extends StatefulWidget {
  final String url;
  PlayerPage({required this.url});
  @override
  _PlayerPageState createState() => _PlayerPageState();
}

class _PlayerPageState extends State<PlayerPage> {
  BetterPlayerController? _controller;

  @override
  void initState() {
    super.initState();
    BetterPlayerDataSource dataSource = BetterPlayerDataSource(
      BetterPlayerDataSourceType.network,
      widget.url,
      useAsmsSubtitles: true, // if using adaptive streams
    );
    _controller = BetterPlayerController(BetterPlayerConfiguration(
      aspectRatio: 16 / 9,
      autoPlay: true,
      allowedScreenSleep: false,
      controlsConfiguration: BetterPlayerControlsConfiguration(
        enableQualities: true,
      ),
    ), betterPlayerDataSource: dataSource);
  }

  @override
  void dispose() {
    _controller?.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(),
      body: BetterPlayer(controller: _controller!),
    );
  }
}