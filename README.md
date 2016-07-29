# cya-git *WARNING: work in progress!*

installs a git hook to validate commit messages  
version: [unreleased][CHANGELOG]

## Installation

* clone
* npm link

## Setup

Create `~/.jira-queryrc`, see [jira-query] for details.  Currently only works
when all info is present.  Hook will not wait for user prompts.

```json
{
  "jira-url": "https://jira.pants-online.com",
  "username": "donkey.tomato",
  "password": "unguessable!"
}
```

## Usage

In the root of any git project, run `cya-git`.  From then on, when you commit,
the commit message will be checked for a valid Jira issue key prefix.  If not
found, the commit will be aborted.

### Removal

To remove cya-git checks from a project, run `cya-git -r` in the project's root.

## TODO
* Allow customization of Jira key regex.

* Make key check regex case-insensitive.
* When a key is invalid, show the user a list of their issues.
* Handle preexisting hooks.  Attempt to append to them when possible.
* Help the user setup .jira-queryrc.  Create it during installation or provide
friendly error messages and links.
* Add a pretty checkmark if it's good and an ugly x if it's bad.
* Figure out how to make hook wait for user prompts.
* Maintain user-provide info across sessions.

---
kickstarted by [npm-boom][npm-boom]

[npm-boom]: https://github.com/reergymerej/npm-boom
[jira-query]: https://github.com/reergymerej/jira-query#runtime-config
[CHANGELOG]: CHANGELOG.md
