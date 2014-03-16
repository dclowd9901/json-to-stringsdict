json-to-stringsdict
-------------------

According to Apple, this is how localization is going to work now:

https://developer.apple.com/library/Mac/releasenotes/Foundation/RN-Foundation/index.html

If you're anything like me, you can't stand looking at XML, not to mention, who's
going to want to hand an XML file like that to a translator? For everyone's sanity,
I created a small command line script that you can run on spec JSON to convert it
to a Localizable.stringsdict file, usable by Xcode.

Setup
-----

First,

    $ git clone git@github.com:dclowd9901/json-to-stringsdict.git

Then, 

    $ npm install

Use
---
Use is as easy as
    
    $ jts filename.json

Creates a Localizable.stringsdict file in the cwd.

    $ jts filename.json foo.blah

Creates the same file in the same place with the name foo.blah.

License
-------

Licensed by MIT License.