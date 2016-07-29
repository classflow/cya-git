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
* Figure out how to make hook wait for user prompts.
* Maintain user-provide info across sessions.
* Allow customization of Jira key regex.
* Handle preexisting hooks.  Attempt to append to them when possible.
* When a key is invalid, show the user a list of their issues.
* Add uninstall option.
* Help the user setup .jira-queryrc.  Create it during installation or provide
friendly error messages and links.

---
kickstarted by [npm-boom][npm-boom]

[npm-boom]: https://github.com/reergymerej/npm-boom
[jira-query]: https://github.com/reergymerej/jira-query#runtime-config
[CHANGELOG]: CHANGELOG.md
