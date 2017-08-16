# collaborative-code-editor

Collaborative Text Editor example with selection synchronization, active user display, and real time text collaboration using ShareDB. The purpose of this repo is to give a basic example setup for [ShareDB](https://github.com/share/sharedb) with an [Ace Editor](https://github.com/ajaxorg/ace) [client](/clients/ace-editor.html) and [Code-Mirror](https://codemirror.net/) [client](/clients/code-mirror.html).

![Editor Example](/docs/example-image.png)

## Details

Uses `ot-text` as an example format, but could easily be updated to use `ot-text-tp2` or other OT formats.

Because ShareDB requires precompiling source to load, a pre-built version of sharedb is copied from [this repo](https://github.com/gkjohnson/sharedb-builds).
