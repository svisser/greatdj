Killer playlists for parties!

Allows you to create playlists on the fly, with a search component that doesn't affect the currently playing song.
Only supports YouTube for now, but might support SoundCloud and others in the near future.

Built using Facebook's React, Browserify, Gulp and some other friends.


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

* To test your project, start a development server like [http-server](https://www.npmjs.org/package/http-server) on the root directory and open `http://localhost:8080`.


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
