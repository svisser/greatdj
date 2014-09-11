Killer playlists for parties!

GreatDJ was originally about searching Youtube and creating playlists on the fly that play automatically.
Lately, though, it has become all sorts of strange things:

 * You can save playlists, it creates a unique URL you can share with your best best friends (beware, though, saving overrites!)
 * It has a party mode, disabled by default, which syncs the playlist and playing position across all the devices in this mode currently on that playlist. Useful, for instance, if you have it playing in a computer and want to push some tunes using your phone. Or your friend's phone. Or if there's dozens of you trying to get your songs to play at the same time.
 * If you enable party mode, if there are other clients connected you'll sync with the latest version they have, which might be different from the one saved in the server.
 * If you don't enable party mode, you'll always get the saved version.
 * This might all change, I'm not sure.

Built using Facebook's React, Socket.IO, Browserify, Gulp and a bunch of other cool tech.
Requires MongoDB for saving and loading playlists.

## Demo
[http://great.dj] (http://great.dj/)

## Development

In order to run it locally you'll need to:

* Install [Gulp](http://gulpjs.com/)

    ```sh
    $ [sudo] npm install -g gulp
    ```

* Install local dependencies:

    ```sh
    $ npm install
    ```

* Run gulp (watch) to create dist/ folder. It watches/compiles LESS files to CSS and JSX to JS:

    ```sh
    $ gulp
    ```

* Start the development server

    ```sh
    $ node server.js
    ```


* To build the distribution files before releasing a new version.

    ```sh
    $ gulp build
    ```

* Check the deploy batch script.

## Contributing

1. Fork it!
2. Create your feature branch: `git checkout -b my-new-feature`
3. Commit your changes: `git commit -m 'Add some feature'`
4. Push to the branch: `git push origin my-new-feature`
5. Submit a pull request :D

## License

[MIT License](http://opensource.org/licenses/MIT)
