Killer playlists for parties!

GreatDJ was originally about searching Youtube and creating playlists on the fly that play automatically.
Lately, though, it has become all sorts of strange things:

 * You can save playlists, it creates a unique URL you can share with your best best friends (beware, though, saving overrites!)
 * It has a sync mode, on by default, which will propagate any changes on a playlist on all devices, even without actually saving the changes to the server. Useful, for instance, if you have it playing in a computer and want to push some tunes using your mobile. Or your friend's mobile. Or if there's dozens of you trying to get your song to play at the same time.
 * When connecting to a playlist, if there are any other clients connected, you'll always get the latest version, however
 * If changes are not saved and you're the only client, you'll get the saved version from the server.
 * This might all change, I'm not sure.

Built using Facebook's React, Socket.IO, Browserify, Gulp and a bunch of other cool buzzwords.
Requires MongoDB for saving and loading playlists.

## Demo
[http://greatdj.ruiramos.com] (http://greatdj.ruiramos.com/)
Feel free to use it! :)

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
`

## Contributing

1. Fork it!
2. Create your feature branch: `git checkout -b my-new-feature`
3. Commit your changes: `git commit -m 'Add some feature'`
4. Push to the branch: `git push origin my-new-feature`
5. Submit a pull request :D

## License

[MIT License](http://opensource.org/licenses/MIT)
